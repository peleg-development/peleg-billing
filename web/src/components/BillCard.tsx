import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import type { Bill } from '../types/billing'
import { formatCid } from '../utils/nui'

interface BillCardProps {
  bill: Bill
  onRefund?: (billId: string) => void
  onOpenDetails?: (bill: Bill) => void
}

const BillCard = ({ bill, onRefund, onOpenDetails }: BillCardProps) => {
  const locale: Record<string, string> = (window as any).__locale || {}
  const intlLocale = locale.intl_locale || 'en-US'
  const currency = locale.currency || 'USD'
  const statusMeta = (s: Bill['status']) => {
    if (s === 'paid') return { label: (locale.paid || 'Paid'), icon: 'check-circle', text: 'text-accent-secondary' }
    if (s === 'refunded') return { label: (locale.refunded || 'Refunded'), icon: 'undo', text: 'text-accent-danger' }
    if (s === 'cancelled') return { label: (locale.cancelled || 'Cancelled'), icon: 'ban', text: 'text-white/70' }
    return { label: (locale.pending || 'Pending'), icon: 'clock', text: 'text-accent-warning' }
  }

  const formatCurrency = (amount: number) => new Intl.NumberFormat(intlLocale, { style: 'currency', currency, minimumFractionDigits: 0, maximumFractionDigits: 0 }).format(amount)
  const meta = statusMeta(bill.status)

  return (
    <div
      className="relative group rounded-2xl border border-white/10 bg-white/5  overflow-hidden cursor-pointer"
      onClick={() => onOpenDetails?.(bill)}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault()
          onOpenDetails?.(bill)
        }
      }}
    >
      <div className="p-4 pb-3">
        <div className="flex items-start justify-between">
          <div className="flex items-start gap-3 min-w-0">
            <div className="w-10 h-10 rounded-xl bg-white/10 border border-white/10 flex items-center justify-center flex-shrink-0">
              <FontAwesomeIcon icon="file-invoice-dollar" className="text-white/90 text-sm" />
            </div>
            <div className="min-w-0">
              <div className="text-white font-semibold leading-tight truncate">{bill.receiverName} <span className="text-white/40">({formatCid(bill.receiverCid)})</span></div>
              <div className="text-white/70 text-[13px] truncate">{bill.reason}</div>
            </div>
          </div>

          <div className="flex items-center gap-2">
              {/* <div className="px-2 py-1 rounded-full text-[11px] font-medium border border-white/10 bg-white/5 text-white/80">
                {bill.date}
              </div> */}
            <div className={`px-2 py-1 rounded-full text-xs font-medium border border-white/10 bg-white/5 flex items-center gap-1 ${meta.text}`}>
              <FontAwesomeIcon icon={meta.icon as any} className="text-[10px]" />
              <span>{meta.label}</span>
            </div>
          </div>
        </div>

        <div className="my-3 border-t border-dashed border-white/10" />

        <div className="flex items-end justify-between">
          <div>
            <div className="text-2xl font-extrabold text-white leading-none">{formatCurrency(bill.amount)}</div>
            <div className="text-xs text-white/50 mt-1">{bill.date}</div>
          </div>

          <div className="flex items-center gap-2">
            {(bill.status === 'paid' || bill.status === 'pending') && (
              <button
                onClick={(e) => { e.stopPropagation(); onRefund?.(bill.id) }}
                className="px-3 py-2 rounded-lg border border-white/10 bg-white/5 text-white/90 hover:bg-white/10 hover:-translate-y-0.5 active:translate-y-0 transition-all text-sm font-medium"
              >
                <FontAwesomeIcon icon="undo" className="mr-2 text-xs" />
                {locale.refund || 'Refund'}
              </button>
            )}
            {(bill.status === 'refunded' || bill.status === 'cancelled') && (
              <button
                disabled
                onClick={(e) => e.stopPropagation()}
                className="px-3 py-2 rounded-lg border border-white/10 bg-white/5 text-white/50 cursor-not-allowed text-sm font-medium"
              >
                <FontAwesomeIcon icon="undo" className="mr-2 text-xs" />
                {bill.status === 'cancelled' ? (locale.cancelled || 'Cancelled') : (locale.refunded || 'Refunded')}
              </button>
            )}
          </div>
        </div>

        <div className="mt-3 flex flex-wrap items-center gap-2">
          <div className="px-2 py-1 rounded-md border border-white/10 bg-white/5 text-white/80 text-[11px]">
            {locale.officer || 'Officer'}: {bill.senderName} ({formatCid(bill.senderCid)})
          </div>
          {(bill.status === 'refunded' || bill.status === 'cancelled') && bill.refundedByName && (
            <div className={`px-2 py-1 rounded-md text-[11px] ${bill.status === 'cancelled' ? 'border border-white/15 bg-white/5 text-white/80' : 'border border-accent-danger/40 bg-accent-danger/10 text-accent-danger'}`}>
              {bill.status === 'cancelled' ? (locale.cancelled_by || 'Cancelled by') : (locale.refunded_by || 'Refunded by')}: {bill.refundedByName}{bill.refundedByCid ? ` (${formatCid(bill.refundedByCid)})` : ''}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default BillCard


