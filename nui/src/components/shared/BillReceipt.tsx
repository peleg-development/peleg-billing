import React from 'react';
import styled, { keyframes } from 'styled-components';
import { 
  FaTimes, 
  FaUser, 
  FaBuilding,
  FaClock,
  FaCalendarAlt,
  FaMoneyBillWave,
  FaTag,
  FaFileInvoiceDollar,
  FaUndo,
  FaBan 
} from 'react-icons/fa';
import { Bill, useNui } from '../../context/NuiContext';

const fadeIn = keyframes`
  from { opacity: 0; transform: scale(0.95); }
  to { opacity: 1; transform: scale(1); }
`;

const fadeOut = keyframes`
  from { opacity: 1; transform: scale(1); }
  to { opacity: 0; transform: scale(0.95); }
`;

const ReceiptOverlay = styled.div<{ $isClosing: boolean }>`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  animation: ${props => props.$isClosing ? fadeOut : fadeIn} 0.3s ease;
  pointer-events: ${props => props.$isClosing ? 'none' : 'all'};
`;

const Receipt = styled.div`
  background-color: var(--card-bg, #1a202c);
  border-radius: 6px;
  width: 450px;
  max-width: 95%;
  overflow: hidden;
  position: relative;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.5);
  border: 1px solid var(--border-color, #374151);
`;

const ReceiptHeader = styled.div`
  background-color: var(--primary-color, #2d3748);
  padding: 0.85rem;
  text-align: center;
  position: relative;
  border-bottom: 1px solid var(--border-color, #374151);
`;

const ReceiptTitle = styled.h2`
  color: var(--text-primary);
  margin: 0 0 0.25rem;
  font-weight: 600;
  font-size: 1.25rem;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  
  svg {
    font-size: 1rem;
    color: var(--primary-color);
  }
`;

const CloseButton = styled.button`
  position: absolute;
  top: 0.75rem;
  right: 0.75rem;
  width: 24px;
  height: 24px;
  border-radius: 4px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: var(--secondary-color, #4a5568);
  border: none;
  color: var(--text-secondary);
  cursor: pointer;
  transition: all 0.2s ease;
  
  &:hover {
    background-color: var(--secondary-hover, #2d3748);
  }
  
  svg {
    font-size: 0.8rem;
  }
`;

const ReceiptSubtitle = styled.div`
  opacity: 0.7;
  color: var(--text-secondary);
  font-size: 0.8rem;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  
  svg {
    font-size: 0.75rem;
  }
`;

const ReceiptBody = styled.div`
  padding: 1rem;
`;

const StatusContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-bottom: 1rem;
`;

const StatusBadge = styled.span<{ $status: string }>`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 4px;
  padding: 4px 10px;
  border-radius: 3px;
  font-size: 0.75rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  
  background-color: ${props => {
    switch (props.$status) {
      case 'paid': return 'rgba(46, 204, 113, 0.15)';
      case 'pending': return 'rgba(241, 196, 15, 0.15)';
      case 'canceled': return 'rgba(231, 76, 60, 0.15)';
      case 'refunded': return 'rgba(52, 152, 219, 0.15)';
      default: return 'rgba(255, 255, 255, 0.1)';
    }
  }};
  
  color: ${props => {
    switch (props.$status) {
      case 'paid': return 'var(--success-color)';
      case 'pending': return 'var(--warning-color)';
      case 'canceled': return 'var(--danger-color)';
      case 'refunded': return 'var(--info-color)';
      default: return 'var(--text-primary)';
    }
  }};
  
  border: 1px solid ${props => {
    switch (props.$status) {
      case 'paid': return 'rgba(46, 204, 113, 0.3)';
      case 'pending': return 'rgba(241, 196, 15, 0.3)';
      case 'canceled': return 'rgba(231, 76, 60, 0.3)';
      case 'refunded': return 'rgba(52, 152, 219, 0.3)';
      default: return 'rgba(255, 255, 255, 0.1)';
    }
  }};
`;

const InfoSection = styled.div`
  background-color: var(--card-bg, #1a202c);
  border-radius: 4px;
  padding: 0.75rem;
  margin-bottom: 0.75rem;
  border: 1px solid var(--border-color, #374151);
`;

const InfoRow = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 0.5rem;
  
  &:last-child {
    margin-bottom: 0;
  }
`;

const InfoIcon = styled.div`
  width: 28px;
  height: 28px;
  border-radius: 4px;
  background-color: var(--secondary-color, #4a5568);
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 8px;
  color: var(--text-secondary);
  flex-shrink: 0;
  
  svg {
    font-size: 0.8rem;
  }
`;

const InfoContent = styled.div`
  flex: 1;
`;

const InfoLabel = styled.div`
  font-size: 0.7rem;
  color: var(--text-secondary);
  margin-bottom: 1px;
`;

const InfoValue = styled.div`
  color: var(--text-primary);
  font-size: 0.85rem;
  font-weight: 500;
`;

const ReasonSection = styled.div`
  margin-bottom: 0.75rem;
`;

const ReasonLabel = styled.div`
  font-size: 0.8rem;
  color: var(--text-secondary);
  margin-bottom: 0.25rem;
  display: flex;
  align-items: center;
  gap: 0.25rem;
  
  svg {
    font-size: 0.75rem;
  }
`;

const ReasonValue = styled.div`
  background-color: var(--card-bg, #1a202c);
  border-radius: 4px;
  padding: 0.75rem;
  color: var(--text-primary);
  font-size: 0.85rem;
  border: 1px solid var(--border-color, #374151);
`;

const TotalSection = styled.div`
  background-color: var(--secondary-color, #4a5568);
  border-radius: 4px;
  padding: 0.75rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 0.75rem;
  border: 1px solid var(--border-color, #374151);
`;

const TotalLabel = styled.div`
  font-size: 0.9rem;
  font-weight: 600;
  color: var(--text-primary);
  display: flex;
  align-items: center;
  gap: 0.5rem;
  
  svg {
    color: var(--text-secondary);
    font-size: 0.8rem;
  }
`;

const TotalAmount = styled.div<{ $status: string }>`
  font-size: 1.1rem;
  font-weight: 700;
  color: ${props => props.$status === 'canceled' ? 'var(--danger-color)' : 'var(--primary-color)'};
  ${props => props.$status === 'canceled' && 'text-decoration: line-through;'}
`;

const ActionsContainer = styled.div`
  display: flex;
  gap: 0.5rem;
  margin-top: 0.5rem;
`;

const ActionButton = styled.button<{$variant: 'primary' | 'warning' | 'danger'}>`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 6px;
  padding: 0.6rem;
  border: none;
  border-radius: 4px;
  font-size: 0.8rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;
  
  background-color: ${props => {
    switch (props.$variant) {
      case 'primary': return 'var(--primary-color)';
      case 'warning': return '#e67e22';
      case 'danger': return '#e74c3c';
      default: return 'var(--primary-color)';
    }
  }};
  
  color: white;
  
  &:hover {
    filter: brightness(1.15);
  }
  
  svg {
    font-size: 0.85rem;
  }
`;

const CanceledByText = styled.div`
  text-align: center;
  margin-top: 0.25rem;
  font-size: 0.7rem;
  color: var(--text-secondary);
  font-style: italic;
`;

interface BillReceiptProps {
  bill: Bill;
  isClosing: boolean;
  onClose: () => void;
  onRefund?: (billId: string) => void;
  onCancel?: (billId: string) => void;
  onViewPlayer?: (bill: Bill) => void;
  showActions?: boolean;
}

const BillReceipt: React.FC<BillReceiptProps> = ({ 
  bill, 
  isClosing, 
  onClose, 
  onRefund, 
  onCancel,
  onViewPlayer,
  showActions = true
}) => {
  const { getLocale } = useNui();
  
  const getBillStatus = (bill: Bill): string => {
    if (bill.status) return bill.status;
    if (bill.refunded) return 'refunded';
    if (bill.canceled) return 'canceled';
    if (bill.paid) return 'paid';
    return 'pending';
  };
  
  const status = getBillStatus(bill);
  
  const formatCurrency = (amount: number | string) => {
    const numAmount = typeof amount === 'string' ? parseFloat(amount) : amount;
    if (isNaN(numAmount)) return `${getLocale('currencySymbol', '$')}0.00`;
    return `${getLocale('currencySymbol', '$')}${numAmount.toFixed(2)}`;
  };
  
  const renderContent = () => (
    <Receipt onClick={e => e.stopPropagation()}>
      <ReceiptHeader>
        <ReceiptTitle>
          <FaFileInvoiceDollar />
          {getLocale('receiptTitle', 'Bill Details')}
        </ReceiptTitle>
        <ReceiptSubtitle>
          <FaCalendarAlt /> {bill.date} <FaClock /> {bill.time}
        </ReceiptSubtitle>
        <CloseButton onClick={(e: React.MouseEvent) => {
          e.stopPropagation();
          onClose();
        }}>
          <FaTimes />
        </CloseButton>
      </ReceiptHeader>
      
      <ReceiptBody>
        <StatusContainer>
          <StatusBadge $status={status}>
            {status === 'paid' && getLocale('paidStatus', 'Paid')}
            {status === 'pending' && getLocale('pendingStatus', 'Pending')}
            {status === 'canceled' && getLocale('canceledStatus', 'Canceled')}
            {status === 'refunded' && getLocale('refundedStatus', 'Refunded')}
          </StatusBadge>
        </StatusContainer>
        
        {bill.canceled_by && status === 'canceled' && (
          <CanceledByText>
            {getLocale('canceledByLabel', 'Canceled by')}: {bill.canceled_by}
          </CanceledByText>
        )}
        
        <InfoSection>
          <InfoRow>
            <InfoIcon>
              <FaBuilding />
            </InfoIcon>
            <InfoContent>
              <InfoLabel>{getLocale('fromLabel', 'From')}</InfoLabel>
              <InfoValue>{bill.billedBy.job}</InfoValue>
            </InfoContent>
          </InfoRow>
          
          <InfoRow>
            <InfoIcon>
              <FaUser />
            </InfoIcon>
            <InfoContent>
              <InfoLabel>{getLocale('byLabel', 'By')}</InfoLabel>
              <InfoValue>{bill.billedBy.name}</InfoValue>
            </InfoContent>
          </InfoRow>
          
          {bill.receiver && (
            <InfoRow>
              <InfoIcon>
                <FaUser />
              </InfoIcon>
              <InfoContent>
                <InfoLabel>{getLocale('toLabel', 'To')}</InfoLabel>
                <InfoValue>{bill.receiver}</InfoValue>
              </InfoContent>
            </InfoRow>
          )}
        </InfoSection>
        
        <ReasonSection>
          <ReasonLabel>
            <FaTag /> {getLocale('reason', 'Reason')}
          </ReasonLabel>
          <ReasonValue>{bill.reason}</ReasonValue>
        </ReasonSection>
        
        <TotalSection>
          <TotalLabel>
            <FaMoneyBillWave />
            {getLocale('totalAmount', 'Total')}
          </TotalLabel>
          <TotalAmount $status={status}>
            {formatCurrency(bill.amount)}
          </TotalAmount>
        </TotalSection>
        
        {showActions && (
          <ActionsContainer>
            {status === 'paid' && onRefund && (
              <ActionButton 
                $variant="warning" 
                onClick={(e) => {
                  e.stopPropagation();
                  onRefund(bill.id);
                }}
              >
                <FaUndo />
                {getLocale('refundLabel', 'Refund')}
              </ActionButton>
            )}
            
            {status === 'pending' && onCancel && (
              <ActionButton 
                $variant="danger" 
                onClick={(e) => {
                  e.stopPropagation();
                  onCancel(bill.id);
                }}
              >
                <FaBan />
                {getLocale('cancelLabel', 'Cancel')}
              </ActionButton>
            )}
            
            {bill.receiver_cid && onViewPlayer && (
              <ActionButton 
                $variant="primary" 
                onClick={(e) => {
                  e.stopPropagation();
                  onViewPlayer(bill);
                }}
              >
                <FaUser />
                {getLocale('viewPlayerButton', 'View Player')}
              </ActionButton>
            )}
          </ActionsContainer>
        )}
      </ReceiptBody>
    </Receipt>
  );

  return (
    <ReceiptOverlay $isClosing={isClosing} onClick={(e) => {
      e.preventDefault();
      e.stopPropagation();
      onClose();
    }}>
      {renderContent()}
    </ReceiptOverlay>
  );
};

export default BillReceipt; 