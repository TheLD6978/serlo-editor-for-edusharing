import {
  Editor as Edtr,
  useScopedDispatch,
  useScopedSelector,
  useScopedStore,
} from '@edtr-io/core'
import { Renderer } from '@edtr-io/renderer'
import {
  getPendingChanges,
  hasPendingChanges as hasPendingChangesSelector,
  hasRedoActions,
  hasUndoActions,
  persist,
  serializeRootDocument,
} from '@edtr-io/store'
import { ReactNode, useCallback, useEffect, useRef, useState } from 'react'
import { useDebounce } from 'rooks'

import { Layout } from './layout'
import { createPlugins } from './plugins'
import {
  StorageFormat,
  documentType,
  variantType,
} from '../shared/storage-format'
import { Toolbar, savedBySerloString } from './toolbar'
import { SaveVersionModal } from './save-version-modal'

export interface EditorProps {
  state: StorageFormat
  ltik: string
  providerUrl: string
}

export function Editor(props: EditorProps) {
  return (
    <Edtr
      plugins={createPlugins({ ltik: props.ltik })}
      initialState={props.state.document}
    >
      {(document) => {
        return (
          <EditInner {...props} version={props.state.version}>
            {document}
          </EditInner>
        )
      }}
    </Edtr>
  )
}

function EditInner({
  children,
  ltik,
  state,
  providerUrl,
}: { children: ReactNode; version: number } & EditorProps) {
  const [isEditing, setIsEditing] = useState(true)
  const [isSaving, setIsSaving] = useState(false)
  const [saveVersionModalIsOpen, setSaveVersionModalIsOpen] = useState(false)

  const dispatch = useScopedDispatch()
  const store = useScopedStore()
  const undoable = useScopedSelector(hasUndoActions())
  const redoable = useScopedSelector(hasRedoActions())
  const pendingChanges = useScopedSelector(getPendingChanges())
  const hasPendingChanges = useScopedSelector(hasPendingChangesSelector())
  const formDiv = useRef<HTMLDivElement>(null)

  const save = useCallback(
    async (comment?: string) => {
      if (isSaving) return
      setIsSaving(true)

      try {
        const saveUrl = new URL(`${providerUrl}lti/save-content`)

        if (comment) {
          saveUrl.searchParams.append('comment', comment)
        }

        const document = serializeRootDocument()(store.getState())

        if (document === null) {
          throw new Error(
            'Transforming the document content into a saveable format failed!'
          )
        }

        const body: StorageFormat = {
          type: documentType,
          variant: variantType,
          version: state.version,
          document: document,
        }

        const response = await fetch(saveUrl.href, {
          method: 'POST',
          headers: { Authorization: `Bearer ${ltik}` },
          keepalive: true,
          body: JSON.stringify(body),
        })
        if (response.status === 200) {
          dispatch(persist())
        }
      } catch (error) {
        window.alert(
          `Aktuelle version konnte nicht gespeichert werden. Fehlermeldung: ${error.message}`
        )
      } finally {
        setIsSaving(false)
      }
    },
    [dispatch, ltik, providerUrl, state.version, store, isSaving]
  )
  const debouncedSave = useDebounce(save, 5000)

  useEffect(() => {
    if (hasPendingChanges) void debouncedSave()
  }, [hasPendingChanges, debouncedSave, pendingChanges])

  if (!isEditing) {
    return (
      <>
        <Toolbar mode="render" setIsEditing={setIsEditing} />
        <Layout>
          <Renderer plugins={createPlugins({ ltik })} state={state.document} />
        </Layout>
      </>
    )
  }

  return (
    <>
      <SaveVersionModal
        save={save}
        open={saveVersionModalIsOpen}
        setOpen={setSaveVersionModalIsOpen}
      />
      <Toolbar
        mode="edit"
        setIsEditing={setIsEditing}
        setSaveVersionModalIsOpen={setSaveVersionModalIsOpen}
        undoable={undoable}
        redoable={redoable}
        save={save}
        isSaving={isSaving}
      />
      <Layout>{children}</Layout>
      {renderExtraEditorStyles()}
      <div ref={formDiv} />
    </>
  )

  function renderExtraEditorStyles() {
    return (
      <style jsx global>{`
        .fa-4x {
          color: rgb(175, 215, 234);
          width: 3rem;
        }

        div[data-document] h3 {
          margin-top: 1.5rem;
        }

        /* fixes bug in chromium based browsers v105+ */
        /* https://github.com/ianstormtaylor/slate/issues/5110#issuecomment-1234951122 */
        div[data-slate-editor] {
          -webkit-user-modify: read-write !important;
        }
      `}</style>
    )
  }
}
