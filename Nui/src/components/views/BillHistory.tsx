import React, { useState } from 'react';
import styled, { keyframes, css } from 'styled-components';
import { FaHistory, FaTimes } from 'react-icons/fa';
import { useNui } from '../../context/NuiContext';
import BillCard from '../shared/BillCard';
import SearchBar from '../shared/SearchBar';
import EmptyState from '../shared/EmptyState';
import { Bill } from '../../context/NuiContext';

const fadeIn = keyframes`
  from {
    opacity: 0;
    transform: scale(0.9);
  }
  to {
    opacity: 1;
    transform: scale(1);
  }
`;

const fadeOut = keyframes`
  from {
    opacity: 1;
    transform: scale(1);
  }
  to {
    opacity: 0;
    transform: scale(0.9);
  }
`;

interface BillHistoryProps {
  hideHeader?: boolean;
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  position: relative;
`;

const Header = styled.div`
  margin-bottom: 1.5rem;
`;

const Title = styled.h2`
  font-size: 1.75rem;
  font-weight: 600;
  color: var(--text-primary);
  margin-bottom: 0.5rem;
`;

const SearchContainer = styled.div`
  margin-bottom: 1.5rem;
  
  input, input:focus, input:focus-visible {
    border: none;
    outline: none;
    box-shadow: none;
  }
  
  & > div {
    border: none;
  }
`;

const BillsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
  gap: 1.5rem;
`;

const StyledEmptyState = styled(EmptyState)`
  margin-top: -20px;
`;

const BillDetailsOverlay = styled.div<{ $isClosing: boolean }>`
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
  animation: ${props => props.$isClosing ? css`${fadeOut} 0.3s ease forwards` : css`${fadeIn} 0.3s ease`};
  backdrop-filter: blur(3px);
`;

const BillDetailsContent = styled.div`
  background-color: #1a1f2a;
  border-radius: 8px;
  padding: 1.75rem;
  max-width: 380px;
  width: 90%;
  position: relative;
  border: 1px solid rgba(255, 255, 255, 0.1);
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.5);
`;

const CloseButton = styled.button`
  position: absolute;
  top: 1rem;
  right: 1rem;
  background: none;
  border: none;
  color: var(--text-secondary);
  font-size: 1.25rem;
  cursor: pointer;
  transition: color 0.2s ease;
  
  &:hover {
    color: var(--text-primary);
  }
`;

const ReceiptHeader = styled.div`
  text-align: center;
  margin-bottom: 1.5rem;
  padding-bottom: 0.75rem;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
`;

const ReceiptTitle = styled.h2`
  font-size: 1.4rem;
  margin-bottom: 0.3rem;
  color: var(--text-primary);
  letter-spacing: 0.5px;
`;

const ReceiptDate = styled.div`
  font-size: 0.85rem;
  color: var(--text-secondary);
  font-family: 'Courier New', monospace;
`;

const ReceiptDivider = styled.div`
  height: 1px;
  background-color: rgba(255, 255, 255, 0.1);
  margin: 1.25rem 0;
`;

const BillDetailRow = styled.div`
  display: flex;
  margin-bottom: 0.75rem;
  font-size: 0.9rem;
  
  &:last-child {
    margin-bottom: 0;
  }
`;

const BillDetailLabel = styled.div`
  width: 100px;
  font-weight: 500;
  color: var(--text-secondary);
`;

const BillDetailValue = styled.div`
  flex: 1;
  color: var(--text-primary);
`;

const ReceiptTotal = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.75rem 0;
  margin-top: 1.5rem;
  border-top: 1px solid rgba(255, 255, 255, 0.1);
`;

const TotalLabel = styled.div`
  font-weight: bold;
  font-size: 1.1rem;
  color: var(--text-primary);
`;

const TotalValue = styled.div`
  font-weight: bold;
  font-size: 1.3rem;
  color: var(--primary-color);
`;

const ReceiptFooter = styled.div`
  text-align: center;
  margin-top: 1.5rem;
  font-size: 0.8rem;
  color: var(--text-secondary);
  opacity: 0.8;
`;

const BillHistory: React.FC<BillHistoryProps> = ({ hideHeader = false }) => {
  const { billingHistory, isLoading, getLocale } = useNui();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedBill, setSelectedBill] = useState<Bill | null>(null);
  const [isClosing, setIsClosing] = useState(false);

  const filteredBills = billingHistory.filter((bill: Bill) => {
    const search = searchTerm.toLowerCase();
    return (
      bill.reason.toLowerCase().includes(search) ||
      bill.billedBy.name.toLowerCase().includes(search) ||
      bill.amount.toString().includes(search)
    );
  });
  
  const handleShowDetails = (bill: Bill) => {
    setSelectedBill(bill);
  };
  
  const handleCloseDetails = () => {
    setIsClosing(true);
    setTimeout(() => {
      setSelectedBill(null);
      setIsClosing(false);
    }, 300);
  };

  return (
    <Container>
      {!hideHeader && (
        <Header>
          <Title>{getLocale('billHistoryHeading', 'Payment History')}</Title>
        </Header>
      )}

      <SearchContainer>
        <SearchBar
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          onClear={() => setSearchTerm('')}
          placeholder={getLocale('searchBills', 'Search bill history...')}
        />
      </SearchContainer>

      {isLoading ? (
        <StyledEmptyState
          icon={<FaHistory />}
          title={getLocale('loading', 'Loading...')}
        />
      ) : filteredBills.length === 0 ? (
        <StyledEmptyState
          icon={<FaHistory />}
          title={getLocale('noBillHistoryFound', 'No bill history found')}
          description={getLocale(
            'noBillHistoryFoundDesc',
            'You don\'t have any bill history yet'
          )}
        />
      ) : (
        <BillsGrid>
          {filteredBills.map((bill: Bill) => (
            <BillCard 
              key={bill.id} 
              bill={bill} 
              type="history"
              onClick={() => handleShowDetails(bill)}
            />
          ))}
        </BillsGrid>
      )}
      
      {selectedBill && (
        <BillDetailsOverlay $isClosing={isClosing}>
          <BillDetailsContent>
            <CloseButton onClick={handleCloseDetails}>
              <FaTimes />
            </CloseButton>
            
            <ReceiptHeader>
              <ReceiptTitle>{getLocale('receiptTitle', 'Payment Record')}</ReceiptTitle>
              <ReceiptDate>{selectedBill.date} • {selectedBill.time}</ReceiptDate>
            </ReceiptHeader>
            
            <BillDetailRow>
              <BillDetailLabel>{getLocale('fromLabel', 'From')}:</BillDetailLabel>
              <BillDetailValue>{selectedBill.billedBy.job}</BillDetailValue>
            </BillDetailRow>
            
            <BillDetailRow>
              <BillDetailLabel>{getLocale('byLabel', 'By')}:</BillDetailLabel>
              <BillDetailValue>{selectedBill.billedBy.name}</BillDetailValue>
            </BillDetailRow>
            
            <ReceiptDivider />
            
            <BillDetailRow>
              <BillDetailLabel>{getLocale('reason', 'Reason')}:</BillDetailLabel>
              <BillDetailValue>{selectedBill.reason}</BillDetailValue>
            </BillDetailRow>
            
            <ReceiptTotal>
              <TotalLabel>{getLocale('totalAmount', 'TOTAL')}</TotalLabel>
              <TotalValue>
                {getLocale('currencySymbol', '$')}
                {typeof selectedBill.amount === 'string' 
                  ? parseFloat(selectedBill.amount).toFixed(2) 
                  : typeof selectedBill.amount === 'number' 
                    ? selectedBill.amount.toFixed(2) 
                    : '0.00'
                }
              </TotalValue>
            </ReceiptTotal>
            
            <ReceiptFooter>
              {getLocale('receiptFooter', 'Thank you for your business')}
            </ReceiptFooter>
          </BillDetailsContent>
        </BillDetailsOverlay>
      )}
    </Container>
  );
};

export default BillHistory; 