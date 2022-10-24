import { Dispatch, SetStateAction, useRef } from 'react'
import Modal from 'react-modal'

export interface SaveVersionModalProps {
  open: boolean
  setOpen: Dispatch<SetStateAction<boolean>>
  setIsFirstSave: Dispatch<SetStateAction<boolean>>
  save?: (comment?: string) => Promise<void>
}

export function SaveVersionModal({
  open,
  save,
  setOpen,
  setIsFirstSave,
}: SaveVersionModalProps) {
  const commentInput = useRef<HTMLInputElement>(null)

  return (
    <Modal
      isOpen={open}
      onRequestClose={() => setOpen(false)}
      style={{
        content: {
          top: '50%',
          left: '50%',
          bottom: 'auto',
          right: 'auto',
          transform: 'translate(-50%, -50%)',
        },
      }}
    >
      <p>Erstelle und speichere eine neue Version:</p>
      <input
        type="text"
        className="mt-3 border-gray-300 focus-visible:outline-sky-800 rounded-md p-2 block w-full border"
        ref={commentInput}
        size={50}
        placeholder="Name der neuen Version"
      />
      <div className="text-right mt-3">
        <button
          className="inline-block rounded-md p-2 mr-2 text-white bg-sky-800"
          onClick={async () => {
            await save(commentInput.current?.value)
            setIsFirstSave(true)
            setOpen(false)
          }}
        >
          Speichern
        </button>
        <button
          className="inline-block rounded-md p-2 border text-sky-800 border-gray-500"
          onClick={() => setOpen(false)}
        >
          Schließen
        </button>
      </div>
    </Modal>
  )
}
