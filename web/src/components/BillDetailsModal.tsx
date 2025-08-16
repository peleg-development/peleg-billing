import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { formatCid } from '../utils/nui'

interface BillDetailsModalProps<Bill> {
  bill: Bill | null
  onClose: () => void
}

const BillDetailsModal = <Bill extends {
  id: string
  senderName: string
  senderCid: string
  receiverName: string
  receiverCid: string
  amount: number
  reason: string
  date: string
  status: 'pending' | 'paid' | 'refunded' | 'cancelled'
  refundedByName?: string
  refundedByCid?: string
  refundedAt?: string
}>({ bill, onClose }: BillDetailsModalProps<Bill>) => {
  if (!bill) return null
  const b = bill!

  const locale: Record<string, string> = (window as any).__locale || {}
  const intlLocale = locale.intl_locale || 'en-US'
  const currency = locale.currency || 'USD'
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat(intlLocale, {
      style: 'currency',
      currency,
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(amount)
  }

  const statusColor = bill.status === 'paid' ? 'text-accent-secondary' : bill.status === 'refunded' ? 'text-accent-danger' : bill.status === 'cancelled' ? 'text-white/70' : 'text-accent-warning'
  const statusIcon = bill.status === 'paid' ? 'check-circle' : bill.status === 'refunded' ? 'undo' : bill.status === 'cancelled' ? 'xmark' : 'clock'

  return (
    <>
    <div className="fixed inset-0 z-50 flex items-center justify-center no-print">
      <div className="absolute inset-0 bg-black/75" onClick={onClose} />
      <div className="relative z-10 w-[780px] max-w-[94vw] rounded-3xl overflow-hidden shadow-[0_20px_60px_rgba(0,0,0,0.6)] modal-scale-in">
        <div className="bg-[#0e1117]">
          <div className="px-6 py-5 border-b border-white/10 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-white/10 border border-white/10 flex items-center justify-center">
                <FontAwesomeIcon icon="file-invoice-dollar" className="text-white" />
              </div>
              <div>
                <div className="text-base font-semibold">{b.receiverName} <span className="text-white/50">({formatCid(b.receiverCid)})</span></div>
                <div className="text-[11px] text-white/60">Bill ID #{b.id}</div>
              </div>
            </div>
            <button onClick={onClose} className="px-2 py-1 rounded-md hover:bg-white/10 transition">
              <FontAwesomeIcon icon={"xmark" as any} />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3">
            <div className="md:col-span-2 p-6 bg-gray-900/95">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="bg-white/5 border border-white/10 rounded-xl p-4">
                  <div className="text-xs text-white/60 mb-1">{locale.amount || 'Amount'}</div>
                   <div className="text-2xl font-extrabold">{formatCurrency(b.amount)}</div>
                </div>
                <div className="bg-white/5 border border-white/10 rounded-xl p-4">
                  <div className="text-xs text-white/60 mb-1">{locale.date || 'Date'}</div>
                  <div className="font-medium">{b.date}</div>
                </div>
                <div className="bg-white/5 border border-white/10 rounded-xl p-4 sm:col-span-2">
                  <div className="text-xs text-white/60 mb-1">{locale.reason || 'Reason'}</div>
                  <div className="text-white/90">{b.reason}</div>
                </div>
                {b.status === 'refunded' && (b.refundedByName || b.refundedByCid) && (
                  <div className="bg-white/5 border border-white/10 rounded-xl p-4 sm:col-span-2">
                    <div className="text-xs text-white/60 mb-1">{locale.refunded_label || 'Refunded'}</div>
                    <div className="text-white/90">{b.refundedByName || 'Unknown'}{b.refundedByCid ? ` (${formatCid(b.refundedByCid)})` : ''}{b.refundedAt ? ` • ${b.refundedAt}` : ''}</div>
                  </div>
                )}
              </div>

              <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="bg-white/5 border border-white/10 rounded-xl p-4">
                  <div className="text-xs text-white/60 mb-1">{locale.officer || 'Officer'}</div>
                  <div className="font-semibold">{b.senderName}</div>
                  <div className="text-white/60 text-sm">{formatCid(b.senderCid)}</div>
                </div>
                <div className="bg-white/5 border border-white/10 rounded-xl p-4">
                  <div className="text-xs text-white/60 mb-1">{locale.recipient || 'Recipient'}</div>
                  <div className="font-semibold">{b.receiverName}</div>
                  <div className="text-white/60 text-sm">{formatCid(b.receiverCid)}</div>
                </div>
              </div>
            </div>
            <div className="p-6 bg-gray-900 border-l border-white/10">
              <div className="text-xs text-white/60 mb-2">{locale.status || 'Status'}</div>
              <div className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-white/10 bg-white/5 text-sm font-medium ${statusColor}`}>
                <FontAwesomeIcon icon={statusIcon as any} className="text-xs" />
                <span className="capitalize">{b.status === 'cancelled' ? (locale.cancelled || 'cancelled') : b.status === 'refunded' ? (locale.refunded || 'refunded') : b.status}</span>
              </div>

              <div className="mt-6 text-xs text-white/60">{locale.meta || 'Meta'}</div>
              <div className="mt-2 space-y-2 text-sm">
                <div className="flex items-center justify-between">
                  <span className="text-white/60">{locale.bill_id || 'Bill ID'}</span>
                  <span className="text-white/90">{b.id}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-white/60">{locale.created || 'Created'}</span>
                  <span className="text-white/90">{b.date}</span>
                </div>
              </div>

              <div className="mt-8 text-xs text-white/60">{locale.actions || 'Actions'}</div>
              <div className="mt-2 grid grid-cols-2 gap-2">
                <button className="px-3 py-2 rounded-lg border border-white/10 bg-white/5 hover:bg-white/10 transition text-sm">{locale.share || 'Share'}</button>
                <button onClick={() => document.dispatchEvent(new CustomEvent('tablet:showReceipt'))} className="px-3 py-2 rounded-lg border border-white/10 bg-white/5 hover:bg-white/10 transition text-sm">{locale.receipt || 'Receipt'}</button>
              </div>

              <div className="mt-8 text-xs text-white/50">Generated via Billing</div>
            </div>
          </div>
        </div>
      </div>
    </div>
    {/* Print-only receipt */}
    <div className="print-receipt">
      <div style={{ textAlign: 'center', fontWeight: 700, fontSize: 18, marginBottom: 8 }}>{locale.billing_receipt || 'Billing Receipt'}</div>
      <div style={{ textAlign: 'center', fontSize: 12, marginBottom: 16 }}>{(locale.id || 'ID')} #{b.id} • {b.date}</div>
      <div style={{ borderTop: '1px solid #000', margin: '8px 0' }} />
      <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 13 }}>
          <div>
            <div style={{ fontWeight: 600 }}>{locale.to || 'To'}</div>
          <div>{b.receiverName}</div>
          <div style={{ opacity: 0.7 }}>{formatCid(b.receiverCid)}</div>
        </div>
        <div style={{ textAlign: 'right' }}>
            <div style={{ fontWeight: 600 }}>{locale.officer || 'Officer'}</div>
          <div>{b.senderName}</div>
          <div style={{ opacity: 0.7 }}>{formatCid(b.senderCid)}</div>
        </div>
      </div>
      <div style={{ borderTop: '1px dashed #000', margin: '12px 0' }} />
        <div style={{ fontSize: 13, marginBottom: 8 }}>
          <div style={{ fontWeight: 600 }}>{locale.reason || 'Reason'}</div>
        <div>{b.reason}</div>
      </div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginTop: 12 }}>
        <div style={{ fontSize: 12 }}>
          <div>
            Status: <span style={{ textTransform: 'capitalize' }}>{b.status}</span>
          </div>
        </div>
        <div style={{ fontSize: 18, fontWeight: 800 }}>
          {new Intl.NumberFormat(intlLocale, { style: 'currency', currency, maximumFractionDigits: 0 }).format(b.amount)}
        </div>
      </div>
      <div style={{ borderTop: '1px solid #000', margin: '12px 0' }} />
      <div style={{ textAlign: 'center', fontSize: 11, opacity: 0.7 }}>{locale.thank_you || 'Thank you'}</div>
    </div>
    </>
  )
}

export default BillDetailsModal


