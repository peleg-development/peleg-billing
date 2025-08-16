import { useEffect, useMemo, useState } from 'react'
import { isNuiEnv, nuiFetch } from '../utils/nui'
import type { Bill } from '../types/billing'

interface ServerBill {
  id: number
  issuer_name: string
  issuer_cid: string
  cid: string
  receiver_name?: string
  amount: number
  description: string
  status: 'unpaid'|'paid'|'refunded'|'cancelled'
  created_at: unknown
  refunded_by_cid?: string
  refunded_by_name?: string
  refunded_at?: unknown
}

function toDate(value: unknown): string {
  try {
    if (typeof value === 'string') return value.slice(0, 10)
    if (typeof value === 'number') return new Date(value).toISOString().slice(0, 10)
    return String(value ?? '').slice(0, 10)
  } catch {
    return ''
  }
}

const Bills = () => {
  const [bills, setBills] = useState<Bill[]>([])
  const [locale, setLocale] = useState<Record<string, string>>((window as any).__locale || {})
  const [loading, setLoading] = useState(true)
  const [payingId, setPayingId] = useState<string | null>(null)
  const [filter, setFilter] = useState<'all' | 'pending' | 'paid' | 'refunded'>('pending')

  const load = async () => {
    if (!isNuiEnv()) { setLoading(false); return }
    const s = await nuiFetch<any>('peleg-billing:getSelf')
    if (!s?.cid) { setLoading(false); return }
    const rows = await nuiFetch<ServerBill[]>('peleg-billing:getBillsByCid', { cid: s.cid })
    const mapped: Bill[] = (rows || []).map(r => ({
      id: String(r.id),
      senderName: r.issuer_name || 'Unknown',
      senderCid: r.issuer_cid || '',
      receiverName: r.receiver_name || r.cid,
      receiverCid: r.cid,
      amount: Number(r.amount || 0),
      reason: r.description || '',
      date: toDate(r.created_at),
      status: r.status === 'paid' ? 'paid' : r.status === 'refunded' ? 'refunded' : r.status === 'cancelled' ? 'cancelled' : 'pending',
      refundedByName: r.refunded_by_name || undefined,
      refundedByCid: r.refunded_by_cid || undefined,
      refundedAt: toDate(r.refunded_at)
    }))
    setBills(mapped)
    setLoading(false)
  }

  useEffect(() => { load() }, [])
  useEffect(() => {
    const onMsg = (e: MessageEvent) => {
      if (!e.data || typeof e.data !== 'object') return
      if (e.data.type === 'tablet:locale' && e.data.data) {
        setLocale(e.data.data)
      }
    }
    window.addEventListener('message', onMsg)
    return () => window.removeEventListener('message', onMsg)
  }, [])
  useEffect(() => {
    const onMsg = (e: MessageEvent) => {
      if (!e.data || typeof e.data !== 'object') return
      if (e.data.type === 'billing:refresh') {
        ;(async () => {
          try {
            const s = await nuiFetch<any>('peleg-billing:getSelf')
            if (!s?.cid) return
            const rows = await nuiFetch<ServerBill[]>('peleg-billing:getBillsByCid', { cid: s.cid })
            const mapped: Bill[] = (rows || []).map(r => ({
              id: String(r.id),
              senderName: r.issuer_name || 'Unknown',
              senderCid: r.issuer_cid || '',
              receiverName: r.receiver_name || r.cid,
              receiverCid: r.cid,
              amount: Number(r.amount || 0),
              reason: r.description || '',
              date: toDate(r.created_at),
              status: r.status === 'paid' ? 'paid' : r.status === 'refunded' ? 'refunded' : r.status === 'cancelled' ? 'cancelled' : 'pending',
              refundedByName: r.refunded_by_name || undefined,
              refundedByCid: r.refunded_by_cid || undefined,
              refundedAt: toDate(r.refunded_at)
            }))
            setBills(mapped)
          } catch {}
        })()
      }
    }
    window.addEventListener('message', onMsg)
    return () => window.removeEventListener('message', onMsg)
  }, [])

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        handleClose().catch(() => {})
      }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [])

  const handlePay = async (id: string) => {
    if (!isNuiEnv()) return
    if (payingId) return
    setPayingId(id)
    setBills(prev => prev.map(b => (b.id === id ? { ...b, status: 'paid' } : b)))
    try {
      await nuiFetch('peleg-billing:payBill', { id })
      await load()
    } finally {
      setPayingId(null)
    }
  }

  const handleClose = async () => {
    if (isNuiEnv()) await nuiFetch('peleg-billing:closeBills')
  }

  const counts = useMemo(() => {
    const pending = bills.filter(b => b.status === 'pending').length
    const paid = bills.filter(b => b.status === 'paid').length
    const refunded = bills.filter(b => b.status === 'refunded').length
    return { pending, paid, refunded, all: bills.length }
  }, [bills])

  const filtered = useMemo(() => {
    if (filter === 'all') return bills
    if (filter === 'pending') return bills.filter(b => b.status === 'pending')
    if (filter === 'paid') return bills.filter(b => b.status === 'paid')
    return bills.filter(b => b.status === 'refunded')
  }, [bills, filter])

  const intlLocale = locale.intl_locale || 'en-US'
  const currency = locale.currency || 'USD'
  const formatCurrency = (amount: number) => new Intl.NumberFormat(intlLocale, { style: 'currency', currency, minimumFractionDigits: 0, maximumFractionDigits: 0 }).format(amount)

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-[9999] p-4">
      <div className="w-[980px] max-w-[98vw] max-h-[82vh] h-auto bg-gray-900 text-white rounded-2xl border border-white/10 shadow-2xl overflow-hidden">
        <div className="flex items-center justify-between px-5 py-4 border-b border-white/10">
          <div className="text-lg font-semibold">{locale?.my_bills || 'My Bills'}</div>
          <button onClick={handleClose} className="px-3 py-1.5 rounded-md bg-white/10 hover:bg-white/20 transition">{locale?.close || 'Close'}</button>
        </div>

        <div className="px-5 pt-4 pb-2 border-b border-white/10 bg-black/20">
          <div className="flex gap-2 flex-wrap">
            {(['all','pending','paid','refunded'] as const).map(key => (
              <button
                key={key}
                onClick={() => setFilter(key)}
                className={`px-3 py-1.5 rounded-full text-sm border transition ${filter === key ? 'bg-blue-600 border-blue-500' : 'bg-white/5 border-white/10 hover:bg-white/10'}`}
              >
                {(key === 'all' ? (locale?.all || 'All') : key === 'pending' ? (locale?.pending || 'Pending') : key === 'paid' ? (locale?.paid || 'Paid') : (locale?.refunded || 'Refunded'))}
                <span className="ml-2 px-1.5 py-0.5 rounded bg-black/30 text-xs">{counts[key]}</span>
              </button>
            ))}
          </div>
        </div>

        <div className="p-5 overflow-y-auto app-scrollbar" style={{ maxHeight: 'calc(82vh - 116px)' }}>
          {loading ? (
            <div className="flex items-center justify-center py-14">
              <div className="w-6 h-6 rounded-full border-2 border-white/40 border-t-transparent animate-spin"></div>
            </div>
          ) : filtered.length === 0 ? (
            <div className="text-center text-white/70 py-12">{locale?.no_bills_category || 'No bills in this category'}</div>
          ) : (
            <div className="space-y-2">
              {filtered.map(b => (
                <div key={b.id} className="flex items-center justify-between bg-gradient-to-br from-white/5 to-white/[0.03] border border-white/10 rounded-xl px-4 py-3">
                  <div className="min-w-0 pr-3">
                    <div className="text-white/90 truncate">{b.reason}</div>
                    <div className="text-white/50 text-[12px] truncate">{formatCurrency(b.amount)} • {b.date || 'N/A'}</div>
                  </div>
                  <div className="flex items-center gap-2">
                    {b.status === 'pending' ? (
                      <button
                        onClick={() => handlePay(b.id)}
                        disabled={payingId === b.id}
                        className={`px-3 py-1.5 rounded-md text-sm transition ${payingId === b.id ? 'bg-blue-800 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700'}`}
                      >
                        {payingId === b.id ? (locale?.paying || 'Paying…') : (locale?.pay || 'Pay')}
                      </button>
                    ) : (
                      <span className={`px-2 py-1 rounded-md text-xs border ${b.status === 'paid' ? 'bg-green-500/15 border-green-500/40 text-green-400' : 'bg-red-500/15 border-red-500/40 text-red-400'}`}>{b.status === 'paid' ? (locale?.paid || 'paid') : (locale?.refunded || 'refunded')}</span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default Bills


