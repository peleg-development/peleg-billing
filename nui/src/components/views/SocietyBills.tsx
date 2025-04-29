import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { FaBuilding } from 'react-icons/fa';
import BillCard from '../shared/BillCard';
import SearchBar from '../shared/SearchBar';
import EmptyState from '../shared/EmptyState';
import { useNui, Bill } from '../../context/NuiContext';
import BillReceipt from '../shared/BillReceipt';

interface SocietyBillsProps {
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
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1.5rem;
  flex-wrap: wrap;
  gap: 1rem;
  
  input, input:focus, input:focus-visible {
    border: none;
    outline: none;
    box-shadow: none;
  }
  
  & > div > div {
    border: none;
  }
`;

const Title = styled.h2`
  font-size: 1.75rem;
  font-weight: 600;
  color: var(--text-primary);
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

const SocietyBills: React.FC<SocietyBillsProps> = ({ hideHeader = false }) => {
  const { societyBills, getLocale, fetchPlayerBills } = useNui();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedBill, setSelectedBill] = useState<Bill | null>(null);
  const [isClosingReceipt, setIsClosingReceipt] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    setError(false);
  }, []);

  if (!societyBills) {
    return (
      <Container>
        <EmptyState
          icon={<FaBuilding />}
          title="Error Loading Bills"
          description="Unable to load society bills. Please try again later."
        />
      </Container>
    );
  }

  let filteredBills: Bill[] = [];
  try {
    filteredBills = societyBills.filter(bill => {
      if (!bill) return false;
      
      try {
        const search = searchTerm.toLowerCase();
        const reasonMatch = bill.reason && typeof bill.reason === 'string' ? bill.reason.toLowerCase().includes(search) : false;
        const nameMatch = bill.billedBy && bill.billedBy.name && typeof bill.billedBy.name === 'string' ? bill.billedBy.name.toLowerCase().includes(search) : false;
        const amountMatch = bill.amount !== undefined ? bill.amount.toString().includes(search) : false;
        const dateMatch = bill.date && typeof bill.date === 'string' ? bill.date.toLowerCase().includes(search) : false;
        
        return reasonMatch || nameMatch || amountMatch || dateMatch;
      } catch (err) {
        console.error('Error filtering bill:', err);
        return false;
      }
    });
  } catch (err) {
    console.error('Error in SocietyBills component:', err);
    setError(true);
  }
  
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


  const handleViewPlayer = (bill: Bill) => {
    if (bill.receiver_cid) {
      fetchPlayerBills(bill.receiver_cid);
    }
    handleCloseReceipt();
  };
  
  const handleRefundBill = (billId: string) => {
    const resourceName = (window as any).GetParentResourceName
      ? (window as any).GetParentResourceName()
      : 'peleg-billing';
    
    fetch(`https://${resourceName}/peleg-billing:callback:refundBill`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ billId })
    }).then(resp => resp.json())
    .then(resp => {
      if (resp === 'ok') {
        handleCloseReceipt();
      }
    });
  };
  
  const handleCancelBill = (billId: string) => {
    const resourceName = (window as any).GetParentResourceName
      ? (window as any).GetParentResourceName()
      : 'peleg-billing';
    
    fetch(`https://${resourceName}/peleg-billing:callback:cancelBill`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ billId })
    }).then(resp => resp.json())
    .then(resp => {
      if (resp === 'ok') {
        handleCloseReceipt();
      }
    });
  };

  if (error) {
    return (
      <Container>
        <EmptyState
          icon={<FaBuilding />}
          title="Error Loading Bills"
          description="An error occurred while loading society bills. Please try again later."
        />
      </Container>
    );
  }

  return (
    <Container>
      {!hideHeader && (
        <Header>
          <Title>{getLocale('societyBillsHeading', 'Organization Finances')}</Title>
          <SearchBar
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            onClear={() => setSearchTerm('')}
            placeholder={getLocale('searchSocietyBills', 'Search society bills...')}
          />
        </Header>
      )}
      
      {hideHeader && (
        <SearchContainer>
          <SearchBar
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            onClear={() => setSearchTerm('')}
            placeholder={getLocale('searchSocietyBills', 'Search society bills...')}
          />
        </SearchContainer>
      )}

      <BillsContainer>
        {!societyBills || societyBills.length === 0 ? (
          <StyledEmptyState
            icon={<FaBuilding />}
            title={getLocale('noSocietyBills', 'No Society Bills')}
            description={getLocale(
              'noSocietyBillsDescription',
              'There are currently no society bills available. Check again later!'
            )}
          />
        ) : (
          <BillsGrid>
            {filteredBills.map((bill) => (
              <BillCard 
                key={bill.id} 
                bill={bill}
                type="society"
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
          onRefund={handleRefundBill}
          onCancel={handleCancelBill}
          onViewPlayer={handleViewPlayer}
        />
      )}
    </Container>
  );
};

export default SocietyBills; 