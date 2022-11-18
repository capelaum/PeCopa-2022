import { DialogHTMLAttributes, ReactNode } from 'react'

interface DialogModalPropps extends DialogHTMLAttributes<HTMLDialogElement> {
  dialogOpen: boolean
  setDialogOpen: (dialogOpen: boolean) => void
  children: ReactNode
}

export function DialogModal({
  dialogOpen,
  setDialogOpen,
  children,
  ...rest
}: DialogModalPropps) {
  return (
    <>
      <div
        className={`modal-bg ${
          dialogOpen ? 'visible opacity-100' : 'invisible opacity-0'
        }`}
        onClick={() => setDialogOpen(false)}
      />

      <dialog {...rest} className={`dialog ${dialogOpen ? 'flex' : 'hidden'}`}>
        {children}
      </dialog>
    </>
  )
}
