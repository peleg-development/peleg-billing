interface ProgressOverlayProps {
  open: boolean
  phase: 'loading' | 'done'
  loadingText?: string
  doneText?: string
}

const ProgressOverlay = ({ open, phase, loadingText = 'Processing…', doneText = 'Saved' }: ProgressOverlayProps) => {
  if (!open) return null
  return (
    <div className="fixed inset-0 z-[70] flex items-center justify-center">
      <div className="absolute inset-0 bg-black/70 " />
      <div className="relative z-10 w-[260px] rounded-2xl border border-white/10 bg-gray-900/95 text-white p-6 shadow-2xl modal-scale-in text-center">
        {phase === 'loading' ? (
          <div className="flex flex-col items-center gap-3">
            <div className="relative w-14 h-14">
              <div className="absolute inset-0 rounded-full border-2 border-white/15" />
              <div className="absolute inset-0 rounded-full border-2 border-accent-primary animate-spin-fast border-t-transparent" />
              <div className="absolute inset-1.5 rounded-full border-2 border-accent-secondary animate-spin-slow border-b-transparent" />
            </div>
            <div className="text-sm text-white/80">{loadingText}</div>
          </div>
        ) : (
          <div className="flex flex-col items-center gap-3">
            <div className="relative w-14 h-14">
              <div className="absolute inset-0 rounded-full border-2 border-accent-secondary" />
              <div className="absolute inset-1.5 rounded-full bg-accent-secondary/20" />
              <svg viewBox="0 0 24 24" className="absolute inset-0 m-auto w-8 h-8 text-accent-secondary animate-pop" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                <path d="M20 6L9 17l-5-5" />
              </svg>
            </div>
            <div className="text-sm text-white/90 font-medium">{doneText}</div>
          </div>
        )}
      </div>
    </div>
  )
}

export default ProgressOverlay


