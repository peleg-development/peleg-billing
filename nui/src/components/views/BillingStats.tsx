import React, { useState, useMemo, useEffect, useCallback } from 'react';
import styled from 'styled-components';
import { 
  FaChartBar, 
  FaChartPie, 
  FaMoneyBillWave, 
  FaExchangeAlt, 
  FaCalendarAlt, 
  FaBuilding, 
  FaClock,
  FaChartLine,
  FaSortAmountDown,
  FaSortAmountUp,
  FaTable,
  FaChartArea,
  FaTags
} from 'react-icons/fa';
import { useNui, Bill } from '../../context/NuiContext';

interface BillingStatsProps {
  hideHeader?: boolean;
}

interface JobStat {
  job: string;
  count: number;
  amount: number;
}

interface StatsByMonth {
  [key: string]: number;
}

const StatsContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  height: 100%;
  overflow: hidden;
  max-width: 100%;
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 0.5rem;
`;

const Title = styled.h2`
  font-size: 1.25rem;
  font-weight: 600;
  color: var(--text-primary);
  display: flex;
  align-items: center;
  gap: 0.5rem;
  
  svg {
    color: var(--primary-color);
  }
`;

const ToggleButtons = styled.div`
  display: flex;
  background-color: var(--card-bg, #1a202c);
  border-radius: 6px;
  padding: 0.25rem;
  border: 1px solid var(--border-color, #374151);
`;

const ToggleButton = styled.button<{ $active: boolean }>`
  padding: 0.5rem 1rem;
  background-color: ${props => props.$active ? 'var(--primary-color)' : 'transparent'};
  color: ${props => props.$active ? 'white' : 'var(--text-secondary)'};
  border: none;
  border-radius: 4px;
  font-size: 0.85rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;
  
  &:hover {
    background-color: ${props => props.$active ? 'var(--primary-color)' : 'rgba(255, 255, 255, 0.05)'};
  }
  
  & + & {
    margin-left: 0.25rem;
  }
`;

const TabsContainer = styled.div`
  display: flex;
  border-bottom: 1px solid var(--border-color, #374151);
  margin-bottom: 1rem;
`;

const Tab = styled.button<{ $active: boolean }>`
  padding: 0.75rem 1.25rem;
  background-color: transparent;
  color: ${props => props.$active ? 'var(--primary-color)' : 'var(--text-secondary)'};
  border: none;
  border-bottom: 2px solid ${props => props.$active ? 'var(--primary-color)' : 'transparent'};
  font-size: 0.85rem;
  font-weight: ${props => props.$active ? '600' : '500'};
  cursor: pointer;
  transition: all 0.2s ease;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  
  &:hover {
    color: ${props => props.$active ? 'var(--primary-color)' : 'var(--text-primary)'};
  }
  
  svg {
    font-size: 0.9rem;
  }
`;

const ContentContainer = styled.div`
  position: relative;
  flex: 1;
  overflow: hidden;
  max-width: 100%;
`;

const TabContent = styled.div<{ $active: boolean }>`
  display: ${props => props.$active ? 'flex' : 'none'};
  flex-direction: column;
  gap: 1rem;
  height: 100%;
  overflow-y: auto;
  overflow-x: hidden;
  max-width: 100%;
`;

const StatsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 0.75rem;
  margin-bottom: 1rem;
`;

const StatCard = styled.div`
  background-color: var(--card-bg, #1a202c);
  border-radius: 8px;
  padding: 1rem;
  border: 1px solid var(--border-color, #374151);
  display: flex;
  flex-direction: column;
  
  &:hover {
    border-color: var(--primary-color);
  }
`;

const StatLabel = styled.div`
  color: var(--text-secondary);
  font-size: 0.75rem;
  margin-bottom: 0.3rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  
  svg {
    font-size: 0.75rem;
    color: var(--text-primary);
  }
`;

const StatValue = styled.div`
  color: var(--text-primary);
  font-size: 1.5rem;
  font-weight: 600;
  margin-bottom: 0.3rem;
`;

const StatComparison = styled.div<{ $positive: boolean }>`
  display: flex;
  align-items: center;
  font-size: 0.7rem;
  color: ${props => props.$positive ? 'var(--success-color)' : 'var(--danger-color)'};
  
  svg {
    margin-right: 0.25rem;
    font-size: 0.65rem;
  }
`;

const ChartsRow = styled.div`
  display: grid;
  grid-template-columns: 3fr 2fr;
  gap: 1rem;
  margin-bottom: 1rem;
  flex: 1;
`;

const ChartCard = styled.div`
  background-color: var(--card-bg, #1a202c);
  border-radius: 8px;
  padding: 1rem;
  border: 1px solid var(--border-color, #374151);
  position: relative;
  display: flex;
  flex-direction: column;
  height: 100%;
`;

const ChartHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 0.75rem;
`;

const ChartTitle = styled.h3`
  font-size: 0.95rem;
  color: var(--text-primary);
  font-weight: 500;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  
  svg {
    color: var(--primary-color);
    font-size: 0.85rem;
  }
`;

const ChartContent = styled.div`
  flex: 1;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  overflow: hidden;
`;

const TableCard = styled.div`
  background-color: var(--card-bg, #1a202c);
  border-radius: 8px;
  border: 1px solid var(--border-color, #374151);
  overflow: hidden;
  position: relative;
  display: flex;
  flex-direction: column;
  height: 100%;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  
  &:hover {
    border-color: var(--primary-color);
  }
`;

const TableHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.85rem 1rem;
  background-color: rgba(0, 0, 0, 0.2);
  border-bottom: 1px solid var(--border-color, #374151);
`;

const BarChart = styled.div`
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  height: 100%;
  width: 100%;
  padding: 0 1rem;
  position: relative;
  
  &::before {
    content: '';
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    height: 1px;
    background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.1), transparent);
  }
`;

const ChartBar = styled.div<{ $height: number; $color: string }>`
  width: 10%;
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-end;
  padding-bottom: 25px;
  
  &::before {
    content: '';
    width: 70%;
    height: ${props => props.$height}%;
    min-height: 4px;
    background: ${props => `linear-gradient(180deg, ${props.$color}, ${props.$color}60)`};
    border-radius: 4px 4px 0 0;
    transition: height 0.5s cubic-bezier(0.4, 0, 0.2, 1);
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
    position: relative;
    z-index: 2;
  }
  
  &::after {
    content: attr(data-month);
    position: absolute;
    bottom: 5px;
    font-size: 0.65rem;
    color: var(--text-secondary);
    transform: translateX(-50%);
    white-space: nowrap;
  }
  
  &:hover::before {
    background: ${props => `linear-gradient(180deg, ${props.$color}, ${props.$color}80)`};
    box-shadow: 0 0 15px ${props => `${props.$color}40`};
  }
  
  &:hover::after {
    color: var(--text-primary);
  }
  
  &:hover .tooltip {
    opacity: 1;
    transform: translateY(-5px);
  }
`;

const BarTooltip = styled.div`
  position: absolute;
  top: -40px;
  opacity: 0;
  background: rgba(0, 0, 0, 0.8);
  color: white;
  padding: 4px 8px;
  border-radius: 4px;
  font-size: 0.75rem;
  pointer-events: none;
  white-space: nowrap;
  transition: all 0.2s ease;
  transform: translateY(0);
  z-index: 10;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.3);
  border: 1px solid rgba(255, 255, 255, 0.1);
  
  &::after {
    content: '';
    position: absolute;
    top: 100%;
    left: 50%;
    transform: translateX(-50%);
    border-width: 4px;
    border-style: solid;
    border-color: rgba(0, 0, 0, 0.8) transparent transparent transparent;
  }
`;

const DonutChart = styled.div<{ $data: string }>`
  width: 180px;
  height: 180px;
  margin: 0 auto;
  border-radius: 50%;
  background: ${props => props.$data};
  position: relative;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.15);
  
  /* Donut hole */
  &::after {
    content: '';
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 60%;
    height: 60%;
    background-color: var(--card-bg, #1a202c);
    border-radius: 50%;
    box-shadow: inset 0 4px 8px rgba(0, 0, 0, 0.2);
  }
`;

const DonutCenter = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 5;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  
  .total {
    font-size: 1.1rem;
    font-weight: 600;
    color: var(--text-primary);
  }
  
  .label {
    font-size: 0.65rem;
    color: var(--text-secondary);
    margin-top: 2px;
  }
`;

const ChartLegend = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.75rem;
  margin-top: 1rem;
  padding: 0 0.5rem;
  justify-content: center;
`;

const LegendItem = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.75rem;
  color: var(--text-secondary);
  background: rgba(0, 0, 0, 0.1);
  padding: 4px 8px;
  border-radius: 4px;
  border: 1px solid rgba(255, 255, 255, 0.05);
  line-height: 1;
  
  &:hover {
    background: rgba(0, 0, 0, 0.2);
    color: var(--text-primary);
  }
`;

const LegendColor = styled.div<{ $color: string }>`
  width: 10px;
  height: 10px;
  border-radius: 2px;
  background-color: ${props => props.$color};
  box-shadow: 0 0 5px rgba(0, 0, 0, 0.2);
`;

const NoDataOverlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: rgba(0, 0, 0, 0.1);
  backdrop-filter: blur(2px);
  border-radius: 6px;
  z-index: 5;
  
  svg {
    color: var(--text-secondary);
    font-size: 1.5rem;
    margin-bottom: 8px;
    opacity: 0.5;
  }
  
  span {
    color: var(--text-secondary);
    font-size: 0.9rem;
    font-weight: 500;
    background-color: rgba(0, 0, 0, 0.2);
    padding: 6px 14px;
    border-radius: 6px;
    border: 1px solid rgba(255, 255, 255, 0.05);
  }
`;

const TopBusinessesTable = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  padding: 1rem;
`;

const BusinessRow = styled.div<{ $rank: number }>`
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 0.75rem 1rem;
  background: rgba(0, 0, 0, 0.15);
  border-radius: 6px;
  border: 1px solid rgba(255, 255, 255, 0.05);
  transition: all 0.2s ease;
  
  &:hover {
    background: rgba(0, 0, 0, 0.25);
    border-color: var(--primary-color);
    transform: translateX(4px);
  }
  
  .rank {
    width: 28px;
    height: 28px;
    display: flex;
    align-items: center;
    justify-content: center;
    background: ${props => {
      const colors = ['var(--primary-color)', '#3b82f6', '#ec4899', '#8b5cf6', '#f97316'];
      return colors[props.$rank - 1] || colors[0];
    }};
    color: white;
    font-weight: 600;
    font-size: 0.8rem;
    border-radius: 6px;
    flex-shrink: 0;
  }
  
  .info {
    flex: 1;
    display: flex;
    flex-direction: column;
    gap: 0.25rem;
    
    .name {
      font-weight: 500;
      color: var(--text-primary);
      display: flex;
      align-items: center;
      gap: 0.5rem;
      
      svg {
        color: var(--primary-color);
        opacity: 0.7;
      }
    }
    
    .stats {
      font-size: 0.75rem;
      color: var(--text-secondary);
      display: flex;
      align-items: center;
      gap: 1rem;
      
      span {
        display: flex;
        align-items: center;
        gap: 0.25rem;
        
        svg {
          font-size: 0.7rem;
        }
      }
    }
  }
  
  .amount {
    font-weight: 600;
    color: var(--text-primary);
    font-size: 0.9rem;
    display: flex;
    align-items: center;
    gap: 0.5rem;
    
    svg {
      color: var(--primary-color);
      opacity: 0.7;
    }
  }
`;

const RecentTransactionsTable = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  padding: 1rem;
`;

const TransactionRow = styled.div<{ $status: string }>`
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 0.75rem 1rem;
  background: rgba(0, 0, 0, 0.15);
  border-radius: 6px;
  border: 1px solid rgba(255, 255, 255, 0.05);
  transition: all 0.2s ease;
  
  &:hover {
    background: rgba(0, 0, 0, 0.25);
    border-color: var(--primary-color);
    transform: translateX(4px);
  }
  
  .business {
    flex: 1;
    display: flex;
    align-items: center;
    gap: 0.75rem;
    
    .icon {
      width: 32px;
      height: 32px;
      display: flex;
      align-items: center;
      justify-content: center;
      background: rgba(0, 0, 0, 0.2);
      border-radius: 6px;
      color: var(--primary-color);
      font-size: 0.9rem;
    }
    
    .name {
      font-weight: 500;
      color: var(--text-primary);
    }
  }
  
  .date {
    font-size: 0.8rem;
    color: var(--text-secondary);
    display: flex;
    align-items: center;
    gap: 0.5rem;
    
    svg {
      color: var(--primary-color);
      opacity: 0.7;
    }
  }
  
  .status {
    padding: 0.25rem 0.75rem;
    border-radius: 4px;
    font-size: 0.75rem;
    font-weight: 500;
    background: ${props => {
      switch (props.$status) {
        case 'paid': return 'rgba(16, 185, 129, 0.1)';
        case 'pending': return 'rgba(245, 158, 11, 0.1)';
        case 'canceled': return 'rgba(239, 68, 68, 0.1)';
        case 'refunded': return 'rgba(99, 102, 241, 0.1)';
        default: return 'rgba(255, 255, 255, 0.1)';
      }
    }};
    color: ${props => {
      switch (props.$status) {
        case 'paid': return 'var(--success-color)';
        case 'pending': return 'var(--warning-color)';
        case 'canceled': return 'var(--danger-color)';
        case 'refunded': return '#6366f1';
        default: return 'var(--text-secondary)';
      }
    }};
  }
  
  .amount {
    font-weight: 600;
    color: var(--text-primary);
    font-size: 0.9rem;
    display: flex;
    align-items: center;
    gap: 0.5rem;
    
    svg {
      color: var(--primary-color);
      opacity: 0.7;
    }
  }
`;

const TablesRow = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1rem;
  height: calc(100% - 1rem);
`;

const fetchNui = async <T,>(eventName: string, data?: any): Promise<T> => {
  const options = {
    method: 'post',
    headers: {
      'Content-Type': 'application/json; charset=UTF-8',
    },
    body: JSON.stringify(data),
  };

  const resourceName = 'peleg-billing';

  try {
    const resp = await fetch(`https://${resourceName}/${eventName}`, options);
    return await resp.json();
  } catch (error) {
    throw Error(`Failed to fetch NUI callback ${eventName}! (${error})`);
  }
};

const BillingStats: React.FC<BillingStatsProps> = ({ hideHeader = false }) => {
  const { myBills, societyBills, billingHistory, getLocale, showSocietyMenu, billingStats = {} } = useNui();
  const [viewMode, setViewMode] = useState<'personal' | 'society'>('personal');
  const [activeTab, setActiveTab] = useState<'overview' | 'charts' | 'tables'>('overview');
  
  const handleViewModeChange = useCallback((mode: 'personal' | 'society') => {
    setViewMode(mode);
    fetchNui('peleg-billing:callback:getBillingStats', { 
      societyMode: mode === 'society' 
    }).catch(err => {
      console.error("Error fetching billing stats:", err);
    });
  }, []);
  
  useEffect(() => {
    const fetchInitialStats = async () => {
      try {
        await fetchNui('peleg-billing:callback:getBillingStats', { 
          societyMode: viewMode === 'society' 
        });
      } catch (error) {
        console.error("Error fetching initial billing stats:", error);
      }
    };
    
    fetchInitialStats();
  }, [viewMode]);
  
  const stats = useMemo(() => {
    const hasServerStats = billingStats && 
      (typeof billingStats.totalPaid === 'number' || 
       typeof billingStats.totalPending === 'number');
    
    if (hasServerStats) {
      
      const typedTopJobs: Array<[string, { count: number; amount: number }]> = 
        Array.isArray(billingStats.topJobs) 
          ? billingStats.topJobs.map((job: JobStat) => [
              job.job, { count: job.count, amount: job.amount }
            ]) 
          : [];
      
      const typedByMonth: StatsByMonth = {};
      
      const now = new Date();
      for (let i = 0; i < 6; i++) {
        const d = new Date(now.getFullYear(), now.getMonth() - i, 1);
        const monthKey = `${d.getFullYear()}-${(d.getMonth() + 1).toString().padStart(2, '0')}`;
        typedByMonth[monthKey] = 0;
      }
      
      if (billingStats.monthlyData) {
        Object.entries(billingStats.monthlyData).forEach(([month, amount]) => {
          if (typedByMonth[month] !== undefined) {
            typedByMonth[month] = Number(amount) || 0;
          }
        });
      }
      
      return {
        totalPaid: billingStats.totalPaid || 0,
        totalPending: billingStats.totalPending || 0,
        totalCanceled: billingStats.totalCanceled || 0,
        totalRefunded: billingStats.totalRefunded || 0,
        paidCount: billingStats.paidCount || 0,
        pendingCount: billingStats.pendingCount || 0,
        canceledCount: billingStats.canceledCount || 0,
        refundedCount: billingStats.refundedCount || 0,
        topJobs: typedTopJobs,
        byMonth: typedByMonth,
        recentTransactions: billingStats.recentTransactions || []
      };
    }
    
    const billsData = viewMode === 'personal' ? [...myBills, ...billingHistory] : societyBills;
    
    const totalPaid = billsData
      .filter(bill => bill.paid)
      .reduce((sum, bill) => sum + Number(bill.amount), 0);
      
    const totalPending = billsData
      .filter(bill => !bill.paid && !bill.canceled && !bill.refunded)
      .reduce((sum, bill) => sum + Number(bill.amount), 0);
      
    const totalCanceled = billsData
      .filter(bill => bill.canceled)
      .reduce((sum, bill) => sum + Number(bill.amount), 0);
      
    const totalRefunded = billsData
      .filter(bill => bill.refunded)
      .reduce((sum, bill) => sum + Number(bill.amount), 0);
    
    const paidCount = billsData.filter(bill => bill.paid).length;
    const pendingCount = billsData.filter(bill => !bill.paid && !bill.canceled && !bill.refunded).length;
    const canceledCount = billsData.filter(bill => bill.canceled).length;
    const refundedCount = billsData.filter(bill => bill.refunded).length;
    
    const byJob = billsData.reduce((acc, bill) => {
      const job = bill.billedBy.job;
      if (!acc[job]) {
        acc[job] = { count: 0, amount: 0 };
      }
      acc[job].count += 1;
      acc[job].amount += Number(bill.amount);
      return acc;
    }, {} as Record<string, { count: number; amount: number }>);
    
    const topJobs = Object.entries(byJob)
      .sort((a, b) => b[1].amount - a[1].amount)
      .slice(0, 5);
    
    const byMonth: StatsByMonth = {};
    const now = new Date();
    for (let i = 0; i < 6; i++) {
      const d = new Date(now.getFullYear(), now.getMonth() - i, 1);
      const monthKey = `${d.getFullYear()}-${(d.getMonth() + 1).toString().padStart(2, '0')}`;
      byMonth[monthKey] = 0;
    }
    
    billsData.forEach(bill => {
      if (bill.paid) {
        const dateParts = bill.date.split('-');
        if (dateParts.length === 3) {
          const monthKey = `${dateParts[0]}-${dateParts[1]}`;
          if (byMonth[monthKey] !== undefined) {
            byMonth[monthKey] += Number(bill.amount);
          }
        }
      }
    });
    
    const recentTransactions = [...billsData]
      .sort((a, b) => {
        const dateA = new Date(`${a.date} ${a.time}`);
        const dateB = new Date(`${b.date} ${b.time}`);
        return dateB.getTime() - dateA.getTime();
      })
      .slice(0, 5);
    
    return {
      totalPaid,
      totalPending,
      totalCanceled,
      totalRefunded,
      paidCount,
      pendingCount,
      canceledCount,
      refundedCount,
      topJobs,
      byMonth,
      recentTransactions
    };
  }, [myBills, billingHistory, societyBills, viewMode, billingStats]);
  
  const formatCurrency = (amount: number): string => {
    return `${getLocale('currencySymbol', '$')}${amount.toFixed(2)}`;
  };
  
  const getBillStatusLabel = (bill: Bill): string => {
    if (bill.refunded) return getLocale('refundedStatus', 'Refunded');
    if (bill.canceled) return getLocale('canceledStatus', 'Canceled');
    if (bill.paid) return getLocale('paidStatus', 'Paid');
    return getLocale('pendingStatus', 'Pending');
  };
  
  const calculatePieChartGradient = () => {
    const total = stats.paidCount + stats.pendingCount + stats.canceledCount + stats.refundedCount;
    
    if (total === 0) {
      return "conic-gradient(#333 0% 100%)";
    }
    
    let startPaid = 0;
    let endPaid = (stats.paidCount / total) * 100;
    
    let startPending = endPaid;
    let endPending = startPending + (stats.pendingCount / total) * 100;
    
    let startCanceled = endPending;
    let endCanceled = startCanceled + (stats.canceledCount / total) * 100;
    
    let startRefunded = endCanceled;
    let endRefunded = 100;
    
    return `conic-gradient(
      var(--primary-color) ${startPaid}% ${endPaid}%,
      var(--success-color) ${startPending}% ${endPending}%,
      var(--danger-color) ${startCanceled}% ${endCanceled}%,
      var(--warning-color) ${startRefunded}% ${endRefunded}%
    )`;
  };
  
  return (
    <StatsContainer>
      {!hideHeader && (
        <Header>
          <Title>
            <FaChartBar /> 
            {viewMode === 'personal' ? 
              getLocale('personalStatsTitle', 'My Billing Statistics') : 
              getLocale('societyStatsTitle', 'Society Billing Statistics')}
          </Title>
          
          {showSocietyMenu && (
            <ToggleButtons>
              <ToggleButton 
                $active={viewMode === 'personal'}
                onClick={() => handleViewModeChange('personal')}
              >
                {getLocale('personalStats', 'Personal')}
              </ToggleButton>
              <ToggleButton 
                $active={viewMode === 'society'}
                onClick={() => handleViewModeChange('society')}
              >
                {getLocale('societyStats', 'Society')}
              </ToggleButton>
            </ToggleButtons>
          )}
        </Header>
      )}
      
      <TabsContainer>
        <Tab 
          $active={activeTab === 'overview'} 
          onClick={() => setActiveTab('overview')}
        >
          <FaChartBar /> {getLocale('overviewTabLabel', 'Overview')}
        </Tab>
        <Tab 
          $active={activeTab === 'charts'} 
          onClick={() => setActiveTab('charts')}
        >
          <FaChartArea /> {getLocale('chartsTabLabel', 'Charts')}
        </Tab>
        <Tab 
          $active={activeTab === 'tables'} 
          onClick={() => setActiveTab('tables')}
        >
          <FaTable /> {getLocale('tablesTabLabel', 'Top Items')}
        </Tab>
      </TabsContainer>
      
      <ContentContainer>
        <TabContent $active={activeTab === 'overview'}>
          <StatsGrid>
            <StatCard>
              <StatLabel>
                <FaMoneyBillWave />
                {viewMode === 'personal' ? 
                  getLocale('totalPaidLabel', 'Total Paid') : 
                  getLocale('totalRevenueLabel', 'Total Revenue')}
              </StatLabel>
              <StatValue>{formatCurrency(stats.totalPaid)}</StatValue>
              <StatComparison $positive={true}>
                <FaSortAmountUp /> {`${stats.paidCount} ${getLocale('billsPaidLabel', 'bills paid')}`}
              </StatComparison>
            </StatCard>
            
            <StatCard>
              <StatLabel>
                <FaExchangeAlt />
                {getLocale('pendingLabel', 'Pending')}
              </StatLabel>
              <StatValue>{formatCurrency(stats.totalPending)}</StatValue>
              <StatComparison $positive={stats.pendingCount === 0}>
                {stats.pendingCount === 0 ? <FaSortAmountDown /> : <FaSortAmountUp />} 
                {`${stats.pendingCount} ${getLocale('billsPendingLabel', 'bills pending')}`}
              </StatComparison>
            </StatCard>
            
            <StatCard>
              <StatLabel>
                <FaCalendarAlt />
                {getLocale('canceledLabel', 'Canceled')}
              </StatLabel>
              <StatValue>{formatCurrency(stats.totalCanceled)}</StatValue>
              <StatComparison $positive={stats.canceledCount === 0}>
                {stats.canceledCount === 0 ? <FaSortAmountDown /> : <FaSortAmountUp />} 
                {`${stats.canceledCount} ${getLocale('billsCanceledLabel', 'bills canceled')}`}
              </StatComparison>
            </StatCard>
            
            <StatCard>
              <StatLabel>
                <FaBuilding />
                {viewMode === 'personal' ? 
                  getLocale('mostBilledByLabel', 'Most Billed By') : 
                  getLocale('topCustomerLabel', 'Top Customer')}
              </StatLabel>
              <StatValue>
                {stats.topJobs.length > 0 ? stats.topJobs[0][0] : getLocale('noneLabel', 'None')}
              </StatValue>
              <StatComparison $positive={true}>
                {stats.topJobs.length > 0 ? (
                  <>
                    <FaSortAmountUp /> {formatCurrency(stats.topJobs[0][1].amount)}
                  </>
                ) : (
                  <>
                    <FaSortAmountDown /> {getLocale('noTransactionsLabel', 'No transactions')}
                  </>
                )}
              </StatComparison>
            </StatCard>
          </StatsGrid>
          
          <ChartsRow>
            <ChartCard>
              <ChartHeader>
                <ChartTitle>
                  <FaChartLine /> {getLocale('monthlySummaryLabel', 'Monthly Summary')}
                </ChartTitle>
              </ChartHeader>
              <ChartContent>
                {Object.entries(stats.byMonth || {}).length > 0 && 
                 Object.values(stats.byMonth || {}).some(val => Number(val) > 0) ? (
                  <BarChart>
                    {Object.entries(stats.byMonth || {}).reverse().map(([month, amount]: [string, number], index: number) => {
                      const values = Object.values(stats.byMonth || {}).map(val => Number(val));
                      const validValues = values.filter(val => val > 0);
                      const maxAmount = validValues.length > 0 ? Math.max(...validValues) : 1;
                      
                      const rawAmount = Number(amount) || 0;
                      const heightPercent = maxAmount <= 0 ? 0 : (rawAmount / maxAmount) * 90;
                      const displayHeight = rawAmount > 0 ? Math.max(5, heightPercent) : 0;
                      
                      const monthYear = month.split('-');
                      const monthNum = parseInt(monthYear[1]) - 1;
                      const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
                      const monthName = monthNames[monthNum] || '';
                      
                      const colors = ['var(--primary-color)', '#3b82f6', '#ec4899', '#8b5cf6', '#f97316', '#10b981'];
                      const color = colors[index % colors.length];
                      
                      return (
                        <ChartBar 
                          key={month} 
                          $height={displayHeight} 
                          $color={rawAmount > 0 ? color : "transparent"}
                          data-month={monthName}
                        >
                          <BarTooltip className="tooltip">
                            {monthName}: {formatCurrency(rawAmount)}
                          </BarTooltip>
                        </ChartBar>
                      );
                    })}
                  </BarChart>
                ) : (
                  <NoDataOverlay>
                    <FaChartLine />
                    <span>{getLocale('noChartDataLabel', 'No data available')}</span>
                  </NoDataOverlay>
                )}
              </ChartContent>
              <ChartLegend>
                {Object.entries(stats.byMonth || {}).reverse().map(([month]) => {
                  const monthNum = month.split('-')[1];
                  const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
                  const monthName = monthNames[parseInt(monthNum) - 1];
                  return (
                    <LegendItem key={month}>
                      <LegendColor $color="var(--primary-color)" />
                      {monthName}
                    </LegendItem>
                  );
                })}
              </ChartLegend>
            </ChartCard>
            
            <ChartCard>
              <ChartHeader>
                <ChartTitle>
                  <FaChartPie /> {getLocale('statusDistributionLabel', 'Status Distribution')}
                </ChartTitle>
              </ChartHeader>
              <ChartContent>
                <DonutChart $data={calculatePieChartGradient()}>
                  <DonutCenter>
                    <span className="total">{stats.paidCount + stats.pendingCount + stats.canceledCount + stats.refundedCount}</span>
                    <span className="label">{getLocale('totalBillsLabel', 'Total Bills')}</span>
                  </DonutCenter>
                </DonutChart>
              </ChartContent>
              <ChartLegend>
                <LegendItem>
                  <LegendColor $color="var(--primary-color)" />
                  {getLocale('paidLabel', 'Paid')} ({stats.paidCount})
                </LegendItem>
                <LegendItem>
                  <LegendColor $color="var(--danger-color)" />
                  {getLocale('canceledLabel', 'Canceled')} ({stats.canceledCount})
                </LegendItem>
                <LegendItem>
                  <LegendColor $color="var(--success-color)" />
                  {getLocale('pendingLabel', 'Pending')} ({stats.pendingCount})
                </LegendItem>
                <LegendItem>
                  <LegendColor $color="var(--warning-color)" />
                  {getLocale('refundedLabel', 'Refunded')} ({stats.refundedCount})
                </LegendItem>
              </ChartLegend>
            </ChartCard>
          </ChartsRow>
        </TabContent>
        
        <TabContent $active={activeTab === 'charts'}>
          <ChartsRow style={{ height: 'calc(100% - 1rem)' }}>
            <ChartCard>
              <ChartHeader>
                <ChartTitle>
                  <FaChartLine /> {getLocale('monthlySummaryLabel', 'Monthly Summary')}
                </ChartTitle>
              </ChartHeader>
              <ChartContent>
                {Object.entries(stats.byMonth || {}).length > 0 && 
                 Object.values(stats.byMonth || {}).some(val => Number(val) > 0) ? (
                  <BarChart>
                    {Object.entries(stats.byMonth || {}).reverse().map(([month, amount]: [string, number], index: number) => {
                      const values = Object.values(stats.byMonth || {}).map(val => Number(val));
                      const validValues = values.filter(val => val > 0);
                      const maxAmount = validValues.length > 0 ? Math.max(...validValues) : 1;
                      
                      const rawAmount = Number(amount) || 0;
                      const heightPercent = maxAmount <= 0 ? 0 : (rawAmount / maxAmount) * 90;
                      const displayHeight = rawAmount > 0 ? Math.max(5, heightPercent) : 0;
                      
                      const monthYear = month.split('-');
                      const monthNum = parseInt(monthYear[1]) - 1;
                      const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
                      const monthName = monthNames[monthNum] || '';
                      
                      const colors = ['var(--primary-color)', '#3b82f6', '#ec4899', '#8b5cf6', '#f97316', '#10b981'];
                      const color = colors[index % colors.length];
                      
                      return (
                        <ChartBar 
                          key={month} 
                          $height={displayHeight} 
                          $color={rawAmount > 0 ? color : "transparent"}
                          data-month={monthName}
                        >
                          <BarTooltip className="tooltip">
                            {monthName}: {formatCurrency(rawAmount)}
                          </BarTooltip>
                        </ChartBar>
                      );
                    })}
                  </BarChart>
                ) : (
                  <NoDataOverlay>
                    <FaChartLine />
                    <span>{getLocale('noChartDataLabel', 'No data available')}</span>
                  </NoDataOverlay>
                )}
              </ChartContent>
              <ChartLegend>
                {Object.entries(stats.byMonth || {}).reverse().map(([month]) => {
                  const monthNum = month.split('-')[1];
                  const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
                  const monthName = monthNames[parseInt(monthNum) - 1];
                  return (
                    <LegendItem key={month}>
                      <LegendColor $color="var(--primary-color)" />
                      {monthName}
                    </LegendItem>
                  );
                })}
              </ChartLegend>
            </ChartCard>
            
            <ChartCard>
              <ChartHeader>
                <ChartTitle>
                  <FaChartPie /> {getLocale('statusDistributionLabel', 'Status Distribution')}
                </ChartTitle>
              </ChartHeader>
              <ChartContent>
                <DonutChart $data={calculatePieChartGradient()}>
                  <DonutCenter>
                    <span className="total">{stats.paidCount + stats.pendingCount + stats.canceledCount + stats.refundedCount}</span>
                    <span className="label">{getLocale('totalBillsLabel', 'Total Bills')}</span>
                  </DonutCenter>
                </DonutChart>
              </ChartContent>
              <ChartLegend>
                <LegendItem>
                  <LegendColor $color="var(--primary-color)" />
                  {getLocale('paidLabel', 'Paid')} ({stats.paidCount})
                </LegendItem>
                <LegendItem>
                  <LegendColor $color="var(--danger-color)" />
                  {getLocale('canceledLabel', 'Canceled')} ({stats.canceledCount})
                </LegendItem>
                <LegendItem>
                  <LegendColor $color="var(--success-color)" />
                  {getLocale('pendingLabel', 'Pending')} ({stats.pendingCount})
                </LegendItem>
                <LegendItem>
                  <LegendColor $color="var(--warning-color)" />
                  {getLocale('refundedLabel', 'Refunded')} ({stats.refundedCount})
                </LegendItem>
              </ChartLegend>
            </ChartCard>
          </ChartsRow>
        </TabContent>
        
        <TabContent $active={activeTab === 'tables'}>
          <TablesRow>
            <TableCard>
              <TableHeader>
                <ChartTitle>
                  <FaSortAmountDown /> {getLocale('topBusinessesTitle', 'Top Businesses')}
                </ChartTitle>
              </TableHeader>
              <TopBusinessesTable>
                {stats.topJobs.length > 0 ? (
                  stats.topJobs.map(([job, data]: [string, { count: number; amount: number }], index: number) => (
                    <BusinessRow key={job} $rank={index + 1}>
                      <div className="rank">{index + 1}</div>
                      <div className="info">
                        <div className="name">
                          <FaBuilding /> {job}
                        </div>
                        <div className="stats">
                          <span>
                            <FaTags /> {data.count} {data.count === 1 ? 'bill' : 'bills'}
                          </span>
                          <span>
                            <FaChartLine /> {Math.round((data.amount / stats.topJobs[0][1].amount) * 100)}% of total
                          </span>
                        </div>
                      </div>
                      <div className="amount">
                        <FaMoneyBillWave />
                        {formatCurrency(data.amount)}
                      </div>
                    </BusinessRow>
                  ))
                ) : (
                  <div style={{ 
                    display: 'flex', 
                    flexDirection: 'column', 
                    alignItems: 'center', 
                    justifyContent: 'center',
                    padding: '40px 0',
                    color: 'var(--text-secondary)'
                  }}>
                    <FaBuilding style={{ fontSize: '1.5rem', opacity: 0.3, marginBottom: '10px' }} />
                    <span>{getLocale('noDataAvailableLabel', 'No data available')}</span>
                  </div>
                )}
              </TopBusinessesTable>
            </TableCard>
            
            <TableCard>
              <TableHeader>
                <ChartTitle>
                  <FaExchangeAlt /> {getLocale('recentTransactionsTitle', 'Recent Transactions')}
                </ChartTitle>
              </TableHeader>
              <RecentTransactionsTable>
                {Array.isArray(stats.recentTransactions) && stats.recentTransactions.length > 0 ? (
                  stats.recentTransactions.map((bill: {
                    id: string;
                    amount: number | string;
                    billedBy: { job: string };
                    date: string;
                    paid: boolean;
                    refunded?: boolean;
                    canceled?: boolean;
                  }) => (
                    <TransactionRow 
                      key={bill.id} 
                      $status={bill.refunded ? 'refunded' : bill.canceled ? 'canceled' : bill.paid ? 'paid' : 'pending'}
                    >
                      <div className="business">
                        <div className="icon">
                          <FaBuilding />
                        </div>
                        <div className="name">{bill.billedBy.job}</div>
                      </div>
                      <div className="date">
                        <FaCalendarAlt />
                        {bill.date}
                      </div>
                      <div className="status">
                        {getBillStatusLabel(bill as Bill)}
                      </div>
                      <div className="amount">
                        <FaMoneyBillWave />
                        {bill.refunded || bill.canceled ? '-' : ''}{formatCurrency(Number(bill.amount))}
                      </div>
                    </TransactionRow>
                  ))
                ) : (
                  <div style={{ 
                    display: 'flex', 
                    flexDirection: 'column', 
                    alignItems: 'center', 
                    justifyContent: 'center',
                    padding: '40px 0',
                    color: 'var(--text-secondary)'
                  }}>
                    <FaClock style={{ fontSize: '1.5rem', opacity: 0.3, marginBottom: '10px' }} />
                    <span>{getLocale('noRecentTransactionsLabel', 'No recent transactions')}</span>
                  </div>
                )}
              </RecentTransactionsTable>
            </TableCard>
          </TablesRow>
        </TabContent>
      </ContentContainer>
    </StatsContainer>
  );
};

export default BillingStats; 