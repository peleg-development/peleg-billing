import { useEffect, useMemo, useState } from 'react'
import { isNuiEnv, nuiFetch, formatCid } from '../utils/nui'
import type { Bill, Player, JobGrade } from '../types/billing'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import BillCard from './BillCard'
import ConfirmDialog from './ConfirmDialog'
import BillDetailsModal from './BillDetailsModal'
import ProgressOverlay from './ProgressOverlay'
import ReceiptModal from './ReceiptModal'
import PlayerSelect from './PlayerSelect'

interface BillingAppProps {
  onBackToHome: () => void
  initialSelf?: { cid: string, name: string, job: string, grade: number, boss?: boolean }
}

const BillingApp = ({ onBackToHome, initialSelf }: BillingAppProps) => {
  const [activeTab, setActiveTab] = useState<'history' | 'new-bill' | 'access'>('history')
  const [searchQuery, setSearchQuery] = useState('')
  const [debouncedSearchQuery, setDebouncedSearchQuery] = useState('')
  const [bills, setBills] = useState<Bill[]>([])
  const [players, setPlayers] = useState<Player[]>([])
  const [self, setSelf] = useState<{ cid: string, name: string, job: string, grade: number, boss?: boolean } | null>(initialSelf ?? null)
  
  const [jobGrades, setJobGrades] = useState<JobGrade[]>([])
  const [savedGrades, setSavedGrades] = useState<JobGrade[] | null>(null)
  
  const [newBill, setNewBill] = useState({
    receiverId: '',
    amount: '',
    reason: ''
  })

  const [confirmSendOpen, setConfirmSendOpen] = useState(false)
  const [savingAccess, setSavingAccess] = useState(false)

  const actuallyCreateBill = async () => {
    if (!newBill.receiverId || !newBill.amount || !newBill.reason || !self) return
    const target = players.find(p => p.id === newBill.receiverId)
    if (!target) return
    if (isNuiEnv()) {
      await nuiFetch('peleg-billing:createBill', {
        targetSrc: target.source,
        job: self.job,
        amount: parseFloat(newBill.amount),
        description: newBill.reason,
        account: 'bank'
      })
      await fetchBills()
    } else {
      const bill: Bill = {
        id: Date.now().toString(),
        senderName: 'You',
        senderCid: 'SELF',
        receiverName: target.name,
        receiverCid: target.cid,
        amount: parseFloat(newBill.amount),
        reason: newBill.reason,
        date: new Date().toISOString().split('T')[0],
        status: 'pending'
      }
      setBills([bill, ...bills])
    }
    setNewBill({ receiverId: '', amount: '', reason: '' })
    setActiveTab('history')
  }

  const handleCreateBill = () => {
    if (!newBill.receiverId || !newBill.amount || !newBill.reason) return
    setConfirmSendOpen(true)
  }

  const confirmSend = () => {
    setConfirmSendOpen(false)
    setOverlayContext('send')
    setShowProgress('loading')
    setTimeout(() => {
      actuallyCreateBill()
      setShowProgress('done')
      setTimeout(() => {
        setShowProgress(false)
        setOverlayContext(null)
      }, 900)
    }, 900)
  }

  const [confirmRefundId, setConfirmRefundId] = useState<string | null>(null)
  const [detailsBill, setDetailsBill] = useState<Bill | null>(null)
  const [showProgress, setShowProgress] = useState<false | 'loading' | 'done'>(false)
  const [receiptBill, setReceiptBill] = useState<Bill | null>(null)
  const [overlayContext, setOverlayContext] = useState<'refund' | 'send' | 'access' | null>(null)

  const handleRefundBill = (billId: string) => {
    setConfirmRefundId(billId)
  }

  const confirmRefund = async () => {
    if (!confirmRefundId) return
    setConfirmRefundId(null)
    setOverlayContext('refund')
    setShowProgress('loading')
    if (isNuiEnv()) {
      await nuiFetch('peleg-billing:refundBill', { id: confirmRefundId })
      await fetchBills()
    } else {
      const now = new Date().toISOString().split('T')[0]
      setBills(bills.map(bill => bill.id === confirmRefundId ? { ...bill, status: 'refunded' as const, refundedByName: 'You', refundedByCid: 'SELF', refundedAt: now } : bill))
    }
    setShowProgress('done')
    setTimeout(() => {
      setShowProgress(false)
      setOverlayContext(null)
    }, 900)
  }

  const cancelRefund = () => setConfirmRefundId(null)

  useEffect(() => {
    const handler = () => {
      if (detailsBill) setReceiptBill(detailsBill)
    }
    document.addEventListener('tablet:showReceipt', handler as any)
    return () => document.removeEventListener('tablet:showReceipt', handler as any)
  }, [detailsBill])

  const intlLocale: string = (window as any).__locale?.intl_locale || 'en-US'
  const currency: string = (window as any).__locale?.currency || 'USD'
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat(intlLocale, {
      style: 'currency',
      currency,
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(amount)
  }

  const cloneGrades = (grades: JobGrade[]): JobGrade[] =>
    grades.map(g => ({ ...g, permissions: { ...g.permissions } }))

  useEffect(() => {
    if (savedGrades === null) {
      setSavedGrades(cloneGrades(jobGrades))
    }
  }, [savedGrades, jobGrades])

  // Debounce search query
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearchQuery(searchQuery)
    }, 300)

    return () => clearTimeout(timer)
  }, [searchQuery])

  // Fetch bills with search and pagination
  const fetchBills = async (search?: string) => {
    if (!isNuiEnv() || !self?.job) return
    
    const limit = search && search.length >= 3 ? undefined : 30 // No limit when searching
    const rows = await nuiFetch<any[]>('peleg-billing:fetchBills', { 
      scope: 'job', 
      job: self.job,
      limit,
      search: search && search.length >= 3 ? search : undefined
    })
    setBills(mapServerBills(rows))
  }

  useEffect(() => {
    if (!isNuiEnv()) return
    ;(async () => {
      const fetchWithRetry = async <T,>(endpoint: string, payload?: any, attempts = 3, delayMs = 200): Promise<T | undefined> => {
        for (let i = 0; i < attempts; i++) {
          try {
            const res = await nuiFetch<T>(endpoint, payload)
            if (res !== undefined) return res
          } catch {}
          if (i < attempts - 1) await new Promise(r => setTimeout(r, delayMs))
        }
        return undefined
      }
      let s = self
      if (!s) {
        const fresh = await fetchWithRetry<any>('peleg-billing:getSelf')
        if (fresh) {
          s = { cid: fresh.cid, name: fresh.name, job: fresh.job, grade: fresh.grade, boss: !!fresh.boss }
          setSelf(s)
        }
      }
      const near = await fetchWithRetry<any[]>('peleg-billing:getNearbyPlayers')
      if (near) setPlayers(near.map(p => ({ id: String(p.source ?? p.cid), name: p.name, cid: p.cid, source: p.source })))
      if (s?.job) {
        await fetchBills()
      }
      if (s?.job) {
        const grades = await fetchWithRetry<any>('peleg-billing:getJobGrades', { job: s.job })
        const raw = mapFrameworkGrades(grades)
        const cfg = await fetchWithRetry<any>('peleg-billing:getAccessConfig', { job: s.job })
        const toggled = raw.map(g => {
          const entry = cfg && cfg.grades && cfg.grades[String(g.level)] || { sendBill: false, refundBill: false }
          return { ...g, permissions: { sendBill: !!entry.sendBill, refundBill: !!entry.refundBill } }
        })
        setJobGrades(toggled)
        setSavedGrades(cloneGrades(toggled))
      }
    })()
    const onMsg = (e: MessageEvent) => {
      if (!e.data || typeof e.data !== 'object') return
      if (e.data.type === 'billing:refresh') {
        ;(async () => {
          try {
            let jobToUse = self?.job
            if (!jobToUse) {
              const me = await nuiFetch<any>('peleg-billing:getSelf')
              jobToUse = me?.job
            }
            await fetchBills()
          } catch {}
        })()
      }
    }
    window.addEventListener('message', onMsg)
    return () => window.removeEventListener('message', onMsg)
  }, [])

  // Fetch bills when search query changes
  useEffect(() => {
    if (self?.job) {
      fetchBills(debouncedSearchQuery)
    }
  }, [debouncedSearchQuery, self?.job])

  const isAccessDirty = useMemo(() => {
    if (!savedGrades) return false
    return JSON.stringify(jobGrades) !== JSON.stringify(savedGrades)
  }, [jobGrades, savedGrades])

  const handleSaveAccess = async () => {
    if (savingAccess || !self) return
    setSavingAccess(true)
    try {
      const data: Record<string, { sendBill: boolean, refundBill: boolean }> = {}
      for (const g of jobGrades) data[String(g.level)] = { ...g.permissions }
      await nuiFetch('peleg-billing:setGradePerm', { job: self.job, data })
      setSavedGrades(cloneGrades(jobGrades))
    } finally {
      setSavingAccess(false)
    }
  }

  

  // Reserved for future status chips in history list
  // const getStatusMeta = (status: Bill['status']) => {
  //   if (status === 'paid') return { label: 'Paid', color: 'text-accent-secondary', icon: 'check-circle' }
  //   if (status === 'refunded') return { label: 'Refunded', color: 'text-accent-danger', icon: 'undo' }
  //   return { label: 'Pending', color: 'text-accent-warning', icon: 'clock' }
  // }

  const handleTogglePermission = (gradeId: string, permission: 'sendBill' | 'refundBill') => {
    setJobGrades(jobGrades.map(grade =>
      grade.id === gradeId 
        ? { ...grade, permissions: { ...grade.permissions, [permission]: !grade.permissions[permission] } }
        : grade
    ))
  }

  const filteredBills = bills

  function coerceDateToYYYYMMDD(value: unknown): string {
    try {
      if (value == null) return ''
      if (typeof value === 'string') return value.slice(0, 10)
      if (typeof value === 'number') return new Date(value).toISOString().slice(0, 10)
      const s = String(value)
      return s.slice(0, 10)
    } catch {
      return ''
    }
  }

  function mapServerBills(rows: any[] | undefined): Bill[] {
    if (!rows) return []
    return rows.map((r) => ({
      id: String((r as any).id),
      senderName: (r as any).issuer_name || 'Unknown',
      senderCid: (r as any).issuer_cid || '',
      receiverName: (r as any).receiver_name || (r as any).cid || '',
      receiverCid: (r as any).cid || '',
      amount: Number((r as any).amount || 0),
      reason: (r as any).description || '',
      date: coerceDateToYYYYMMDD((r as any).created_at),
      status: (r as any).status === 'paid' ? 'paid' : (r as any).status === 'refunded' ? 'refunded' : (r as any).status === 'cancelled' ? 'cancelled' : 'pending',
      refundedByName: (r as any).refunded_by_name || undefined,
      refundedByCid: (r as any).refunded_by_cid || undefined,
      refundedAt: coerceDateToYYYYMMDD((r as any).refunded_at)
    }))
  }

  function mapFrameworkGrades(raw: any): JobGrade[] {
    if (!raw) return []
    const list: JobGrade[] = []
    if (Array.isArray(raw)) {
      for (const g of raw) {
        const id = String(g.id ?? g.level ?? g.grade ?? g)
        const name = String(g.name ?? g.label ?? id)
        const level = Number(g.level ?? g.grade ?? g.id ?? 0)
        list.push({ id, name, level, permissions: { sendBill: false, refundBill: false } })
      }
    } else if (typeof raw === 'object') {
      for (const key of Object.keys(raw)) {
        const g = raw[key]
        const id = String(g.id ?? key)
        const name = String(g.name ?? g.label ?? key)
        const level = Number(g.level ?? g.grade ?? key)
        list.push({ id, name, level, permissions: { sendBill: false, refundBill: false } })
      }
    }
    return list.sort((a, b) => a.level - b.level)
  }

  return (
    <div className="relative h-full bg-gray-900 text-white">
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-gray-800">
        <div className="flex items-center gap-3">
          <button
            onClick={onBackToHome}
            className="w-8 h-8 rounded-full bg-gray-800 flex items-center justify-center hover:bg-gray-700 transition-colors"
          >
            <FontAwesomeIcon icon="chevron-left" className="text-sm" />
          </button>
          <div>
             <h1 className="text-lg font-semibold">{(window as any).__locale?.billing_title || 'Billing'}</h1>
             <p className="text-xs text-gray-400">{(window as any).__locale?.billing_subtitle || 'Manage company bills'}</p>
          </div>
        </div>
      </div>

      {/* Tab Navigation */}
      <div className="flex border-b border-gray-800">
        <button
          onClick={() => setActiveTab('history')}
          className={`flex-1 py-3 text-sm font-medium transition-colors ${
            activeTab === 'history' 
              ? 'text-blue-400 border-b-2 border-blue-400' 
              : 'text-gray-400 hover:text-gray-300'
          }`}
        >
           {(window as any).__locale?.tab_history || 'History'}
        </button>
        <button
          onClick={() => setActiveTab('new-bill')}
          className={`flex-1 py-3 text-sm font-medium transition-colors ${
            activeTab === 'new-bill' 
              ? 'text-blue-400 border-b-2 border-blue-400' 
              : 'text-gray-400 hover:text-gray-300'
          }`}
        >
           {(window as any).__locale?.tab_new_bill || 'New Bill'}
        </button>
        {self?.boss && (
          <button
            onClick={() => setActiveTab('access')}
            className={`flex-1 py-3 text-sm font-medium transition-colors ${
              activeTab === 'access' 
                ? 'text-blue-400 border-b-2 border-blue-400' 
                : 'text-gray-400 hover:text-gray-300'
            }`}
          >
             {(window as any).__locale?.tab_access || 'Access'}
          </button>
        )}
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto h-full app-scrollbar pb-24">
        {activeTab === 'history' ? (
          <div className="p-4 space-y-4">
            {/* Search */}
             <div className="flex items-center gap-3">
              <div className="relative flex-1">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FontAwesomeIcon icon="search" className="text-gray-400 text-sm" />
                </div>
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full bg-gray-800 border border-gray-700 pl-10 pr-4 py-3 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                   placeholder={(window as any).__locale?.search_placeholder || 'Search by name, CID, or reason... (min 3 chars)'}
                />
                {searchQuery !== debouncedSearchQuery && searchQuery.length >= 3 && (
                  <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                    <div className="w-4 h-4 border-2 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
                  </div>
                )}
              </div>
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="bg-gray-700 hover:bg-gray-600 text-white px-3 py-3 rounded-lg"
                >
                   {(window as any).__locale?.clear || 'Clear'}
                </button>
              )}
            </div>

            {/* Bills List */}
            {filteredBills.length === 0 ? (
              <div className="bg-gray-800 rounded-lg p-8 text-center">
                <FontAwesomeIcon icon="search" className="text-gray-500 text-3xl mb-3" />
                {searchQuery.length >= 3 ? (
                  <p className="text-gray-400">{(window as any).__locale?.no_results || 'No bills match your search.'}</p>
                ) : searchQuery.length > 0 ? (
                  <p className="text-gray-400">{(window as any).__locale?.search_min_chars || 'Type at least 3 characters to search.'}</p>
                ) : (
                  <p className="text-gray-400">{(window as any).__locale?.no_bills || 'No bills found.'}</p>
                )}
              </div>
            ) : (
              <>
                <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4 pb-8 pr-1">
                  {filteredBills.map((bill) => (
                    <BillCard key={bill.id} bill={bill} onRefund={handleRefundBill} onOpenDetails={setDetailsBill} />
                  ))}
                </div>
                <div className="h-18" />
              </>
            )}
          </div>
        ) : activeTab === 'new-bill' ? (
          <div className="p-4 h-full min-h-0">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 h-full min-h-0">
              <div className="lg:col-span-1 flex flex-col min-h-0">
                {/* Form */}
                <div className="bg-gradient-to-br from-gray-800/90 via-gray-800/80 to-gray-900/90 border border-white/10 rounded-2xl p-5 space-y-4">
                  <div>
                     <label className="block text-sm font-medium text-gray-300 mb-2">{(window as any).__locale?.select_player || 'Select Player'}</label>
                    <PlayerSelect
                      players={players}
                      value={newBill.receiverId}
                      onChange={(id) => setNewBill({ ...newBill, receiverId: id })}
                       placeholder={(window as any).__locale?.choose_player || 'Choose a player...'}
                    />
                  </div>

                  <div>
                     <label className="block text-sm font-medium text-gray-300 mb-2">{(window as any).__locale?.amount_label || 'Amount ($)'}</label>
                    <input
                      type="number"
                      value={newBill.amount}
                      onChange={(e) => setNewBill({ ...newBill, amount: e.target.value })}
                      className="w-full bg-gray-700/70 border border-gray-600 rounded-xl px-3 h-11 text-white placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                        placeholder={(window as any).__locale?.amount_placeholder || '0.00'}
                    />
                  </div>

                  <div>
                     <label className="block text-sm font-medium text-gray-300 mb-2">{(window as any).__locale?.reason_label || 'Reason'}</label>
                    <textarea
                      value={newBill.reason}
                      onChange={(e) => setNewBill({ ...newBill, reason: e.target.value })}
                      className="w-full bg-gray-700/70 border border-gray-600 rounded-xl px-3 py-3 text-white placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 resize-none"
                      rows={4}
                        placeholder={(window as any).__locale?.reason_placeholder || 'Enter bill reason'}
                    />
                  </div>

                  <button
                    onClick={handleCreateBill}
                    disabled={!newBill.receiverId || !newBill.amount || !newBill.reason}
                    className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-gray-700 disabled:cursor-not-allowed text-white font-semibold h-11 rounded-xl transition-colors"
                  >
                    {(window as any).__locale?.create_bill || 'Create Bill'}
                  </button>
                </div>
              </div>

              <div className="bg-gray-800/80 border border-white/10 rounded-2xl p-0 lg:col-span-2 flex flex-col min-h-0 max-h-[645px] overflow-hidden">
                <div className="px-6 pt-5 pb-4 border-b border-white/10">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="text-white/90 text-sm font-semibold">{(window as any).__locale?.transaction_history || 'Transaction History'}</div>
                    </div>
                    <div className="text-white/50 text-xs font-medium">{(window as any).__locale?.live_preview || 'Live preview'}</div>
                  </div>
                </div>
                <div className="p-6 flex-1 min-h-0">
                {(() => {
                  const player = players.find(p => p.id === newBill.receiverId)
                  if (!player) {
                      return (
                        <div className="h-full flex flex-col items-center justify-center text-gray-400">
                          <div className="w-16 h-16 bg-white/5 rounded-full flex items-center justify-center mb-4">
                            <svg className="w-8 h-8 text-white/20" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                            </svg>
                          </div>
                          <div className="text-sm font-medium">{(window as any).__locale?.select_player_prompt || 'Select a player'}</div>
                          <div className="text-xs text-white/50 mt-1">{(window as any).__locale?.select_player_sub || 'to view their billing history'}</div>
                        </div>
                      )
                  }
                  const history = bills
                    .filter(b => b.receiverCid === player.cid || b.senderCid === player.cid)
                    .slice()
                    .sort((a, b) => b.date.localeCompare(a.date))
                  const total = history.reduce((sum, b) => sum + b.amount, 0)
                  return (
                      <div className="flex flex-col gap-4 min-h-0 h-full">
                        <div className="flex items-center justify-between pb-2 flex-none border-b border-white/10">
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center text-white font-bold text-sm">
                              {player.name.charAt(0).toUpperCase()}
                            </div>
                            <div>
                              <div className="text-white font-semibold text-base">{player.name}</div>
                              <div className="text-white/50 text-xs font-mono">{formatCid(player.cid)}</div>
                            </div>
                          </div>
                          <div className="flex items-center gap-3">
                            <div className="text-center">
                              <div className="text-white font-bold text-lg">{history.length}</div>
                              <div className="text-white/50 text-xs">{(window as any).__locale?.total || 'Total'}</div>
                            </div>
                            <div className="w-px h-8 bg-white/20"></div>
                            <div className="text-center">
                              <div className="text-green-400 font-bold text-lg">{formatCurrency(total)}</div>
                              <div className="text-white/50 text-xs">{(window as any).__locale?.value || 'Value'}</div>
                            </div>
                          </div>
                        </div>

                        {history.length === 0 ? (
                          <div className="flex-1 flex flex-col items-center justify-center text-gray-400">
                            <div className="w-16 h-16 bg-white/5 rounded-full flex items-center justify-center mb-4">
                              <svg className="w-8 h-8 text-white/20" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                              </svg>
                            </div>
                            <div className="text-sm font-medium">{(window as any).__locale?.no_transactions || 'No transactions yet'}</div>
                            <div className="text-xs text-white/50 mt-1">{(window as any).__locale?.first_bill_hint || 'This will be their first bill'}</div>
                          </div>
                        ) : (
                          <div className="flex-1 overflow-y-auto pr-1 min-h-0">
                            <div className="flex flex-col gap-2.5 pr-1">
                              {history.map((b) => {
                                const L: any = (window as any).__locale || {}
                                const role = b.senderCid === player.cid ? (L.sent || 'Sent') : (L.received || 'Received')
                                const isOutgoing = b.senderCid === player.cid
                                const statusIcon = b.status === 'paid' ? '✓' : b.status === 'refunded' ? '↺' : b.status === 'cancelled' ? '✕' : '⏳'
                                const statusBg = b.status === 'paid' ? 'bg-green-500/10' : b.status === 'refunded' ? 'bg-red-500/10' : b.status === 'cancelled' ? 'bg-gray-500/10' : 'bg-yellow-500/10'
                                return (
                                  <button
                                    key={b.id}
                                    onClick={() => setDetailsBill(b)}
                                    className={`group w-full rounded-xl border border-white/10 bg-white/5 p-0 flex items-center hover:bg-white/10 transition-colors text-left`}
                                  >
                                    <div className="flex items-center w-full p-4 gap-4">
                                      <div className={`w-8 h-8 rounded-full ${statusBg} flex items-center justify-center text-xs font-bold text-white flex-shrink-0`}>
                                        {statusIcon}
                                      </div>
                                      <div className="flex-1 min-w-0">
                                        <div className="flex items-center justify-between mb-1">
                                          <div className="text-white font-medium text-sm truncate">{b.reason}</div>
                                          <div className="flex items-center gap-2">
                                            <div className="text-white font-bold text-sm">{formatCurrency(b.amount)}</div>
                                            <div className={`px-2 py-0.5 rounded-full text-xs font-medium border ${statusBg} ${b.status === 'paid' ? 'text-green-300 border-green-500/30' : b.status === 'refunded' ? 'text-red-300 border-red-500/30' : b.status === 'cancelled' ? 'text-gray-300 border-gray-500/30' : 'text-yellow-300 border-yellow-500/30'}`}>
                                              {b.status === 'paid' ? ((window as any).__locale?.paid || 'Paid') : b.status === 'refunded' ? ((window as any).__locale?.refunded || 'Refunded') : b.status === 'cancelled' ? ((window as any).__locale?.cancelled || 'Cancelled') : ((window as any).__locale?.pending || 'Pending')}
                                            </div>
                                          </div>
                                        </div>
                                        <div className="flex items-center gap-2 text-xs text-white/60">
                                          <span className={`px-2 py-0.5 rounded-full ${isOutgoing ? 'bg-blue-500/20 text-blue-300' : 'bg-purple-500/20 text-purple-300'}`}>
                                            {role}
                                          </span>
                                          <span className="text-white/40">•</span>
                                          <span>{b.date}</span>
                                          {b.refundedByName && (b.status === 'refunded' || b.status === 'cancelled') && (
                                            <>
                                              <span className="text-white/40">•</span>
                                              <span className="truncate">{(window as any).__locale?.refunded_by || 'by'} {b.refundedByName}</span>
                                            </>
                                          )}
                                        </div>
                                      </div>
                                    </div>
                                  </button>
                                )
                              })}
                            </div>
                          </div>
                        )}
                      </div>
                  )
                })()}
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="p-4 space-y-4">
            <div className="bg-gray-800/80 border border-white/10 rounded-2xl overflow-hidden">
              <div className="grid grid-cols-3 gap-0 bg-gray-800/60 text-xs text-gray-400">
                <div className="px-4 py-3">{(window as any).__locale?.grade || 'Grade'}</div>
                <div className="px-4 py-3 text-center">{(window as any).__locale?.send || 'Send'}</div>
                <div className="px-4 py-3 text-center">{(window as any).__locale?.refund || 'Refund'}</div>
              </div>
              <div>
                {jobGrades.map((grade, index) => (
                  <div
                    key={grade.id}
                    className={`grid grid-cols-3 items-center ${index !== 0 ? 'border-t border-white/10' : ''}`}
                  >
                    <div className="px-4 py-3 text-white">{grade.name}</div>
                    <div className="px-4 py-3 flex items-center justify-center">
                      <button
                        onClick={() => handleTogglePermission(grade.id, 'sendBill')}
                        className={`w-12 h-6 rounded-full transition-colors ${grade.permissions.sendBill ? 'bg-blue-600' : 'bg-gray-600'}`}
                      >
                        <div className={`w-4 h-4 bg-white rounded-full transition-transform ${grade.permissions.sendBill ? 'translate-x-6' : 'translate-x-1'}`} />
                      </button>
                    </div>
                    <div className="px-4 py-3 flex items-center justify-center">
                      <button
                        onClick={() => handleTogglePermission(grade.id, 'refundBill')}
                        className={`w-12 h-6 rounded-full transition-colors ${grade.permissions.refundBill ? 'bg-blue-600' : 'bg-gray-600'}`}
                      >
                        <div className={`w-4 h-4 bg-white rounded-full transition-transform ${grade.permissions.refundBill ? 'translate-x-6' : 'translate-x-1'}`} />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Refund confirm */}
        <ConfirmDialog
          open={!!confirmRefundId}
          title={(window as any).__locale?.refund_bill_title || 'Refund Bill'}
          message={(window as any).__locale?.refund_bill_message || 'Are you sure you want to refund this bill? This action cannot be undone.'}
          confirmText={(window as any).__locale?.refund || 'Refund'}
          cancelText={(window as any).__locale?.close || 'Cancel'}
          onConfirm={confirmRefund}
          onCancel={cancelRefund}
        />

        {/* Send confirm */}
        <ConfirmDialog
          open={confirmSendOpen}
          title={(window as any).__locale?.send_bill_title || 'Send Bill'}
          message={(window as any).__locale?.send_bill_message || 'Do you want to send this bill?'}
          confirmText={(window as any).__locale?.send || 'Send'}
          cancelText={(window as any).__locale?.close || 'Cancel'}
          onConfirm={confirmSend}
          onCancel={() => setConfirmSendOpen(false)}
        />

        <BillDetailsModal bill={detailsBill} onClose={() => setDetailsBill(null)} />

        <ProgressOverlay
          open={!!showProgress}
          phase={showProgress === 'done' ? 'done' : 'loading'}
          loadingText={overlayContext === 'refund' ? ((window as any).__locale?.processing_refund || 'Processing refund…') : overlayContext === 'access' ? ((window as any).__locale?.saving_changes || 'Saving changes…') : ((window as any).__locale?.sending_bill || 'Sending bill…')}
          doneText={overlayContext === 'refund' ? ((window as any).__locale?.refund_saved || 'Refund saved') : overlayContext === 'access' ? ((window as any).__locale?.permissions_saved || 'Permissions saved') : ((window as any).__locale?.bill_sent || 'Bill sent')}
        />

        <ReceiptModal bill={receiptBill} onClose={() => setReceiptBill(null)} />
      </div>
      {(activeTab === 'access') && (isAccessDirty || savingAccess) && (
        <div className="absolute bottom-4 right-4 z-30">
          <div className="inline-flex items-center gap-3 rounded-full bg-black/70  border border-white/10 px-3 py-2 shadow-lg">
            <span className="text-xs text-white/80">{(window as any).__locale?.unsaved_changes || 'Unsaved changes'}</span>
            <button
              onClick={handleSaveAccess}
              disabled={savingAccess}
              className={`px-3 py-1.5 rounded-full text-white text-xs font-medium transition-colors flex items-center gap-2 ${savingAccess ? 'bg-blue-800 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700'}`}
            >
              {savingAccess && (
                <span className="inline-block w-3 h-3 rounded-full border-2 border-white/60 border-t-transparent animate-spin"></span>
              )}
              <span>{savingAccess ? ((window as any).__locale?.saving || 'Saving…') : ((window as any).__locale?.save || 'Save')}</span>
            </button>
          </div>
        </div>
      )}
    </div>
  )
}

export default BillingApp