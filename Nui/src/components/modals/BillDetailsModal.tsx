import React from 'react';
import styled from 'styled-components';
import { FaTimes, FaCheck } from 'react-icons/fa';
import { useNui } from '../../context/NuiContext';
import Button from '../common/Button';

interface BillDetailsModalProps {
  billId: string;
  onClose: () => void;
}

const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 100;
  animation: fadeIn 0.2s ease;
  
  @keyframes fadeIn {
    from { opacity: 0; }
    to { opacity: 1; }
  }
`;

const ModalContainer = styled.div`
  background-color: var(--card-bg);
  border-radius: 0.5rem;
  width: 100%;
  max-width: 500px;
  box-shadow: var(--shadow-lg);
  overflow: hidden;
  animation: slideIn 0.3s ease;
  
  @keyframes slideIn {
    from {
      transform: translateY(20px);
      opacity: 0;
    }
    to {
      transform: translateY(0);
      opacity: 1;
    }
  }
`;

const ModalHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1.25rem 1.5rem;
  border-bottom: 1px solid var(--border-color);
`;

const ModalTitle = styled.h2`
  font-size: 1.25rem;
  font-weight: 600;
  color: var(--text-primary);
`;

const CloseButton = styled.button`
  background: none;
  border: none;
  color: var(--text-secondary);
  cursor: pointer;
  font-size: 1.25rem;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0.25rem;
  border-radius: 50%;
  transition: all 0.2s ease;
  
  &:hover {
    background-color: rgba(0, 0, 0, 0.05);
    color: var(--text-primary);
  }
`;

const ModalBody = styled.div`
  padding: 1.5rem;
`;

const DetailItem = styled.div`
  display: flex;
  margin-bottom: 1rem;
  align-items: flex-start;
  
  &:last-child {
    margin-bottom: 0;
  }
`;

const DetailLabel = styled.span`
  font-weight: 500;
  color: var(--text-secondary);
  width: 120px;
  flex-shrink: 0;
`;

const DetailValue = styled.span<{ $isPaid?: boolean }>`
  color: var(--text-primary);
  flex: 1;
  
  ${({ $isPaid }) => $isPaid !== undefined && `
    color: ${$isPaid ? 'var(--success-color)' : 'var(--warning-color)'};
    font-weight: 600;
  `}
`;

const ModalFooter = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 1rem;
  padding: 1.25rem 1.5rem;
  border-top: 1px solid var(--border-color);
  background-color: rgba(0, 0, 0, 0.02);
`;

const BillDetailsModal: React.FC<BillDetailsModalProps> = ({ billId, onClose }) => {
  const { myBills, payBill, getLocale } = useNui();
  
  const bill = myBills.find(bill => bill.id === billId);
  
  if (!bill) return null;
  
  const handlePayBill = () => {
    payBill(billId);
    onClose();
  };
  
  return (
    <ModalOverlay onClick={onClose}>
      <ModalContainer onClick={e => e.stopPropagation()}>
        <ModalHeader>
          <ModalTitle>{getLocale('billDetailsHeading', 'Bill Details')}</ModalTitle>
          <CloseButton onClick={onClose}>
            <FaTimes />
          </CloseButton>
        </ModalHeader>
        
        <ModalBody>
          <DetailItem>
            <DetailLabel>{getLocale('amountLabel', 'Amount:')}</DetailLabel>
            <DetailValue>
              {getLocale('currencySymbol', '$')}
              {typeof bill.amount === 'string' 
                ? parseFloat(bill.amount).toFixed(2) 
                : typeof bill.amount === 'number' 
                  ? bill.amount.toFixed(2) 
                  : '0.00'
              }
            </DetailValue>
          </DetailItem>
          
          <DetailItem>
            <DetailLabel>{getLocale('reasonLabel', 'Reason:')}</DetailLabel>
            <DetailValue>{bill.reason}</DetailValue>
          </DetailItem>
          
          <DetailItem>
            <DetailLabel>{getLocale('sentByLabel', 'Sent by:')}</DetailLabel>
            <DetailValue>{bill.billedBy.job}</DetailValue>
          </DetailItem>
          
          <DetailItem>
            <DetailLabel>{getLocale('billedByLabel', 'Billed by:')}</DetailLabel>
            <DetailValue>{bill.billedBy.name}</DetailValue>
          </DetailItem>
          
          <DetailItem>
            <DetailLabel>{getLocale('dateLabel', 'Date:')}</DetailLabel>
            <DetailValue>{bill.date} | {bill.time}</DetailValue>
          </DetailItem>
          
          <DetailItem>
            <DetailLabel>{getLocale('statusLabel', 'Status:')}</DetailLabel>
            <DetailValue $isPaid={bill.paid}>
              {bill.paid 
                ? getLocale('paidStatus', 'Paid') 
                : getLocale('pendingStatus', 'Pending')
              }
            </DetailValue>
          </DetailItem>
        </ModalBody>
        
        <ModalFooter>
          {!bill.paid && (
            <Button 
              variant="success" 
              icon={<FaCheck />} 
              onClick={handlePayBill}
            >
              {getLocale('markAsPaidButton', 'Mark as Paid')}
            </Button>
          )}
          
          <Button 
            variant="ghost" 
            icon={<FaTimes />} 
            onClick={onClose}
          >
            {getLocale('closeButton', 'Close')}
          </Button>
        </ModalFooter>
      </ModalContainer>
    </ModalOverlay>
  );
};

export default BillDetailsModal; 