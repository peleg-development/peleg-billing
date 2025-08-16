export interface Bill {
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
}

export interface Player {
  id: string
  name: string
  cid: string
  source?: number
}

export interface JobGrade {
  id: string
  name: string
  level: number
  permissions: {
    sendBill: boolean
    refundBill: boolean
  }
}


