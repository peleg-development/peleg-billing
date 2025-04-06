import React from 'react';
import styled from 'styled-components';
import { FaInfoCircle, FaCheckCircle, FaUser, FaBriefcase, FaCalendarAlt, FaTimesCircle, FaUndoAlt } from 'react-icons/fa';
import { Bill } from '../../context/NuiContext';
import { useNui } from '../../context/NuiContext';

interface BillCardProps {
  bill: Bill;
  onClick?: () => void;
  type?: 'default' | 'history' | 'society';
}

const StyledCard = styled.div<{ $type: string; $status: string }>`
  background-color: var(--card-bg);
  border-radius: 0.5rem;
  box-shadow: var(--shadow-sm);
  overflow: hidden;
  transition: all 0.2s ease;
  position: relative;
  border: 1px solid var(--border-color);
  cursor: pointer;
  
  ${({ $status }) => $status === 'paid' && `
    border-left: 3px solid var(--success-color);
  `}
  
  ${({ $status }) => $status === 'pending' && `
    border-left: 3px solid var(--warning-color);
  `}
  
  ${({ $status }) => $status === 'canceled' && `
    border-left: 3px solid var(--danger-color);
  `}
  
  ${({ $status }) => $status === 'refunded' && `
    border-left: 3px solid var(--info-color);
  `}
  
  ${({ $type }) => $type === 'history' && `
    border-left: 3px solid var(--accent-color);
  `}
  
  ${({ $type }) => $type === 'society' && `
    border-left: 3px solid var(--warning-color);
  `}
  
  &:hover {
    transform: translateY(-3px);
    box-shadow: var(--shadow);
  }
`;

const CardHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem;
  background-color: rgba(0, 0, 0, 0.2);
  border-bottom: 1px solid var(--border-color);
`;

const Amount = styled.div`
  font-size: 1.25rem;
  font-weight: 700;
  color: var(--text-primary);
`;

const Status = styled.div<{ $status: string }>`
  font-size: 0.75rem;
  font-weight: 600;
  padding: 0.25rem 0.75rem;
  border-radius: 3rem;
  display: flex;
  align-items: center;
  gap: 0.25rem;
  
  ${({ $status }) => {
    switch($status) {
      case 'paid':
        return `
          background-color: rgba(5, 150, 105, 0.15);
          color: var(--success-color);
        `;
      case 'pending':
        return `
          background-color: rgba(217, 119, 6, 0.15);
          color: var(--warning-color);
        `;
      case 'canceled':
        return `
          background-color: rgba(220, 38, 38, 0.15);
          color: var(--danger-color);
        `;
      case 'refunded':
        return `
          background-color: rgba(59, 130, 246, 0.15);
          color: var(--info-color);
        `;
      default:
        return `
          background-color: rgba(217, 119, 6, 0.15);
          color: var(--warning-color);
        `;
    }
  }}
  
  &::before {
    content: '';
    display: inline-block;
    width: 0.5rem;
    height: 0.5rem;
    border-radius: 50%;
    background-color: ${({ $status }) => {
      switch($status) {
        case 'paid': return 'var(--success-color)';
        case 'pending': return 'var(--warning-color)';
        case 'canceled': return 'var(--danger-color)';
        case 'refunded': return 'var(--info-color)';
        default: return 'var(--warning-color)';
      }
    }};
  }
`;

const DateBadge = styled.div`
  font-size: 0.75rem;
  font-weight: 600;
  padding: 0.25rem 0.75rem;
  border-radius: 3rem;
  background-color: rgba(100, 116, 139, 0.15);
  color: var(--text-secondary);
`;

const CardBody = styled.div`
  padding: 1rem;
  background-color: var(--card-bg);
`;

const Reason = styled.p`
  font-size: 0.95rem;
  font-weight: 600;
  color: var(--text-primary);
  margin-bottom: 0.75rem;
  line-height: 1.4;
`;

const DetailRow = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-bottom: 0.5rem;
  color: var(--text-secondary);
  font-size: 0.85rem;
  
  svg {
    color: var(--text-light);
    min-width: 1rem;
  }
`;

const CardFooter = styled.div`
  padding: 0.75rem 1rem;
  border-top: 1px solid var(--border-color);
  display: flex;
  justify-content: flex-end;
  background-color: rgba(0, 0, 0, 0.1);
`;

const ViewButton = styled.button<{ $status: string }>`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  background: none;
  border: none;
  color: ${({ $status }) => {
    switch($status) {
      case 'paid': return 'var(--success-color)';
      case 'pending': return 'var(--accent-color)';
      case 'canceled': return 'var(--danger-color)';
      case 'refunded': return 'var(--info-color)';
      default: return 'var(--accent-color)';
    }
  }};
  font-weight: 500;
  font-size: 0.85rem;
  cursor: pointer;
  padding: 0.5rem 0.75rem;
  border-radius: 0.375rem;
  transition: background-color 0.2s ease;
  
  &:hover {
    background-color: rgba(255, 255, 255, 0.05);
  }
  
  svg {
    font-size: 1rem;
  }
`;

const BillCard: React.FC<BillCardProps> = ({ bill, onClick, type = 'default' }) => {
  const { getLocale } = useNui();
  
  const getBillStatus = (bill: Bill): string => {
    if (bill.status) return bill.status;
    if (bill.refunded) return 'refunded';
    if (bill.canceled) return 'canceled';
    if (bill.paid) return 'paid';
    return 'pending';
  };
  
  const status = getBillStatus(bill);
  
  return (
    <StyledCard 
      $type={type} 
      $status={status}
      onClick={onClick}
    >
      <CardHeader>
        <Amount>
          {getLocale('currencySymbol', '$')}
          {typeof bill.amount === 'string' 
            ? parseFloat(bill.amount).toFixed(2) 
            : typeof bill.amount === 'number' 
              ? bill.amount.toFixed(2) 
              : '0.00'
          }
        </Amount>
        {type === 'default' && (
          <Status $status={status}>
            {status === 'paid' && getLocale('paidStatus', 'Paid')}
            {status === 'pending' && getLocale('pendingStatus', 'Pending')}
            {status === 'canceled' && getLocale('canceledStatus', 'Canceled')}
            {status === 'refunded' && getLocale('refundedStatus', 'Refunded')}
          </Status>
        )}
        {type !== 'default' && (
          <DateBadge>
            {bill.date}
          </DateBadge>
        )}
      </CardHeader>
      
      <CardBody>
        <Reason>{bill.reason}</Reason>
        <DetailRow>
          <FaBriefcase />
          <span>{getLocale('fromLabel', 'From:')} {bill.billedBy.job}</span>
        </DetailRow>
        <DetailRow>
          <FaUser />
          <span>{getLocale('byLabel', 'By:')} {bill.billedBy.name}</span>
        </DetailRow>
        <DetailRow>
          <FaCalendarAlt />
          <span>{bill.date} | {bill.time}</span>
        </DetailRow>
      </CardBody>
      
      <CardFooter>
        <ViewButton $status={status}>
          {status === 'paid' && <FaCheckCircle />}
          {status === 'pending' && <FaInfoCircle />}
          {status === 'canceled' && <FaTimesCircle />}
          {status === 'refunded' && <FaUndoAlt />}
          
          {status === 'paid' 
            ? getLocale('viewReceipt', 'View Receipt') 
            : status === 'canceled'
            ? getLocale('viewCanceledBill', 'View Canceled Bill')
            : status === 'refunded'
            ? getLocale('viewRefundedBill', 'View Refunded Bill')
            : getLocale('viewDetails', 'View Details')
          }
        </ViewButton>
      </CardFooter>
    </StyledCard>
  );
};

export default BillCard; 