import { formatCid } from '../utils/nui'

interface ReceiptModalProps<Bill> {
  bill: Bill | null
  onClose: () => void
}

const ReceiptModal = <Bill extends {
  id: string
  senderName: string
  senderCid: string
  receiverName: string
  receiverCid: string
  amount: number
  reason: string
  date: string
  status: 'pending' | 'paid' | 'refunded' | 'cancelled'
}>({ bill, onClose }: ReceiptModalProps<Bill>) => {
  if (!bill) return null

  const L: any = (window as any).__locale || {}
  const intlLocale: string = L.intl_locale || 'en-US'
  const currency: string = L.currency || 'USD'
  const formatCurrency = (amount: number) => new Intl.NumberFormat(intlLocale, { style: 'currency', currency, minimumFractionDigits: 0, maximumFractionDigits: 0 }).format(amount)

  const b = bill

  return (
    <div className="fixed inset-0 z-[70] flex items-center justify-center">
      <div className="absolute inset-0 bg-black/70" onClick={onClose} />
      <div className="relative z-10 w-[560px] max-w-[94vw] rounded-3xl overflow-hidden shadow-2xl border border-black/10 bg-white text-black">
        <div className="px-6 py-4 border-b border-black/10 flex items-center justify-between">
          <div className="font-semibold text-base">{L.receipt || 'Receipt'}</div>
          <button onClick={onClose} className="px-2 py-1 rounded-md hover:bg-black/5 transition" aria-label="Close receipt">✕</button>
        </div>
        <div className="px-6 py-5">
          <div className="text-center font-extrabold text-lg">{L.billing_receipt || 'Billing Receipt'}</div>
          <div className="text-center text-xs opacity-70 mt-1">{(L.id || 'ID')} #{b.id} • {b.date}</div>

          <div className="mt-4 border-t border-dashed border-black/20" />

          <div className="mt-4 grid grid-cols-2 gap-4 text-sm">
            <div>
              <div className="font-semibold text-black/80">{L.to || 'To'}</div>
              <div className="mt-0.5">{b.receiverName}</div>
              <div className="opacity-70">{formatCid(b.receiverCid)}</div>
            </div>
            <div className="text-right">
              <div className="font-semibold text-black/80">{L.officer || 'Officer'}</div>
              <div className="mt-0.5">{b.senderName}</div>
              <div className="opacity-70">{formatCid(b.senderCid)}</div>
            </div>
          </div>

          <div className="mt-4 border-t border-dashed border-black/20" />

          <div className="mt-4">
            <div className="text-sm font-semibold text-black/80">{L.reason || 'Reason'}</div>
            <div className="text-sm mt-0.5">{b.reason}</div>
          </div>

          <div className="mt-5 flex items-end justify-between">
            <div className="text-xs">{L.status || 'Status'}: <span className="capitalize">{b.status === 'cancelled' ? (L.cancelled || 'cancelled') : b.status === 'refunded' ? (L.refunded || 'refunded') : b.status === 'paid' ? (L.paid || 'paid') : (L.pending || 'pending')}</span></div>
            <div className="text-2xl font-extrabold">{formatCurrency(b.amount)}</div>
          </div>

          <div className="mt-5 border-t border-black/10" />
          <div className="mt-2 text-center text-[11px] opacity-70">{L.thank_you || 'Thank you'}</div>
        </div>
      </div>
    </div>
  )
}

export default ReceiptModal


