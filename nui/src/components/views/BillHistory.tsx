import React, { useState } from 'react';
import styled from 'styled-components';
import { FaHistory } from 'react-icons/fa';
import { useNui } from '../../context/NuiContext';
import BillCard from '../shared/BillCard';
import SearchBar from '../shared/SearchBar';
import EmptyState from '../shared/EmptyState';
import { Bill } from '../../context/NuiContext';
import BillReceipt from '../shared/BillReceipt';

interface BillHistoryProps {
  hideHeader?: boolean;
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  position: relative;
  height: 100%;
  width: 100%;
  
  /* Fix scrolling container */
  & > *:not(:last-child) {
    flex-shrink: 0;
  }
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
  margin-bottom: 0.75rem;
  
  input, input:focus, input:focus-visible {
    border: none;
    outline: none;
    box-shadow: none;
  }
  
  & > div {
    border: none;
  }
`;

const BillsContainer = styled.div`
  flex: 1;
  overflow-y: auto;
  overflow-x: hidden;
  padding: 0.5rem;
  /* Better scrollbar */
  &::-webkit-scrollbar {
    width: 5px;
  }
  
  &::-webkit-scrollbar-track {
    background: rgba(0, 0, 0, 0.2);
    border-radius: 3px;
  }
  
  &::-webkit-scrollbar-thumb {
    background: rgba(255, 255, 255, 0.1);
    border-radius: 3px;
  }
  
  &::-webkit-scrollbar-thumb:hover {
    background: rgba(255, 255, 255, 0.2);
  }
`;

const BillsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
  gap: 1.5rem;
  width: 100%;
  
  /* Ensure grid items don't exceed container width */
  & > * {
    width: 100%;
    max-width: 100%;
  }
`;

const StyledEmptyState = styled(EmptyState)`
  padding: 5px;
`;

const BillHistory: React.FC<BillHistoryProps> = ({ hideHeader = false }) => {
  const { billingHistory, isLoading, getLocale } = useNui();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedBill, setSelectedBill] = useState<Bill | null>(null);
  const [isClosingReceipt, setIsClosingReceipt] = useState(false);

  const filteredBills = billingHistory.filter((bill: Bill) => {
    const search = searchTerm.toLowerCase();
    return ( 
      bill.reason.toLowerCase().includes(search) ||
      bill.billedBy.name.toLowerCase().includes(search) ||
      bill.amount.toString().includes(search)
    );
  });
  
  const handleViewBill = (bill: Bill) => {
    setSelectedBill(bill);
  };
  
  const handleCloseReceipt = () => {
    setIsClosingReceipt(true);
    setTimeout(() => {
      setSelectedBill(null);
      setIsClosingReceipt(false);
    }, 300);
  };

  return (
    <Container>
      {!hideHeader && (
        <Header>
          <Title>
            <FaHistory />
            {getLocale('billHistoryTitle', 'Bill History')}
          </Title>
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

      <BillsContainer>
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
                onClick={() => handleViewBill(bill)}
              />
            ))}
          </BillsGrid>
        )}
      </BillsContainer>
      
      {selectedBill && (
        <BillReceipt
          bill={selectedBill}
          isClosing={isClosingReceipt}
          onClose={handleCloseReceipt}
          showActions={false}
        />
      )}
    </Container>
  );
};

export default BillHistory;