import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

interface ConfirmDialogProps {
  open: boolean
  title: string
  message: string
  confirmText?: string
  cancelText?: string
  onConfirm: () => void
  onCancel: () => void
}

const ConfirmDialog = ({ open, title, message, confirmText = 'Confirm', cancelText = 'Cancel', onConfirm, onCancel }: ConfirmDialogProps) => {
  if (!open) return null
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-black/80 " onClick={onCancel} />
      <div className="relative z-10 w-[480px] max-w-[94vw] rounded-3xl overflow-hidden shadow-[0_20px_60px_rgba(0,0,0,0.6)] modal-scale-in">
        <div className="bg-gray-900/95 text-white border border-white/10">
          <div className="flex items-center justify-between px-5 py-4 border-b border-white/10">
            <div className="font-semibold text-base">{title}</div>
            <button onClick={onCancel} className="px-2 py-1 rounded-md hover:bg-white/10 transition">
              <FontAwesomeIcon icon={"xmark" as any} />
            </button>
          </div>
          <div className="px-6 pt-5 pb-2 text-white/80 text-sm">
            {message}
          </div>
          <div className="px-6 pb-5 flex items-center justify-end gap-2">
              <button onClick={onCancel} className="px-3 py-2 rounded-lg border border-white/10 bg-white/5 hover:bg-white/10 transition text-sm">
                {cancelText}
              </button>
              <button onClick={onConfirm} className="px-3 py-2 rounded-lg border border-accent-danger/50 bg-accent-danger/20 text-accent-danger hover:bg-accent-danger hover:text-white transition text-sm">
                {confirmText}
              </button>
            </div>
          </div>
        </div>
      </div>

  )
}

export default ConfirmDialog


