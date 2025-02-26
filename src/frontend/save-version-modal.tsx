import { Dispatch, SetStateAction, useEffect, useRef } from 'react'
import Modal from 'react-modal'

export interface SaveVersionModalProps {
  open: boolean
  setOpen: Dispatch<SetStateAction<boolean>>
  save?: (comment?: string) => Promise<void>
}

export function SaveVersionModal({
  open,
  save,
  setOpen,
}: SaveVersionModalProps) {
  const commentInput = useRef<HTMLInputElement>(null)

  useEffect(() => {
    if (open) {
      setTimeout(() => {
        if (commentInput.current) commentInput.current?.focus()
      }, 10)
    }
  }, [open])

  return (
    <Modal
      isOpen={open}
      onRequestClose={() => setOpen(false)}
      style={{
        overlay: {
          zIndex: '999',
        },
        content: {
          marginTop: '4rem',
          left: '50%',
          bottom: 'auto',
          right: 'auto',
          transform: 'translateX(-50%)',
          zIndex: '99',
        },
      }}
    >
      <p>Erstelle und speichere eine neue Version:</p>
      <input
        type="text"
        className="mt-3 block w-full rounded-md border border-gray-300 p-2 focus-visible:outline-sky-800"
        ref={commentInput}
        size={50}
        placeholder="Name der neuen Version"
      />
      <div className="mt-3 text-right">
        <button
          className="ece-button-blue-transparent mr-3 text-base"
          onClick={() => setOpen(false)}
        >
          Schließen
        </button>
        <button
          className="ece-button-blue text-base"
          onClick={async () => {
            await save(commentInput.current?.value)
            setOpen(false)
          }}
        >
          Speichern
        </button>
      </div>
    </Modal>
  )
}
