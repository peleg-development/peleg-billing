import React, { useState } from 'react';
import styled from 'styled-components';
import { FaFolderOpen } from 'react-icons/fa';
import BillCard from '../shared/BillCard';
import SearchBar from '../shared/SearchBar';
import EmptyState from '../shared/EmptyState';
import { useNui } from '../../context/NuiContext';
import BillDetailsModal from '../modals/BillDetailsModal';

interface MyBillsProps {
  hideHeader?: boolean;
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1.5rem;
  flex-wrap: wrap;
  gap: 1rem;
`;

const Title = styled.h2`
  font-size: 1.75rem;
  font-weight: 600;
  color: var(--text-primary);
`;

const BillsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
  gap: 1.5rem;
`;

const MyBills: React.FC<MyBillsProps> = ({ hideHeader = false }) => {
  const { myBills, getLocale, selectBill } = useNui();
  const [searchTerm, setSearchTerm] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [selectedBill, setSelectedBill] = useState<null | string>(null);

  const filteredBills = myBills.filter(bill => {
    const search = searchTerm.toLowerCase();
    return (
      bill.reason.toLowerCase().includes(search) ||
      bill.billedBy.name.toLowerCase().includes(search) ||
      bill.billedBy.job.toLowerCase().includes(search) ||
      bill.amount.toString().includes(search) ||
      bill.date.toLowerCase().includes(search)
    );
  });

  const handleBillClick = (billId: string) => {
    const bill = myBills.find(bill => bill.id === billId);
    if (bill) {
      selectBill(bill);
      setSelectedBill(billId);
      setShowModal(true);
    }
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedBill(null);
  };

  return (
    <Container>
      {!hideHeader && (
        <Header>
          <Title>{getLocale('myBillsHeading', 'My Bills')}</Title>
          <SearchBar
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            onClear={() => setSearchTerm('')}
            placeholder={getLocale('searchBills', 'Search bills...')}
          />
        </Header>
      )}

      {myBills.length === 0 ? (
        <EmptyState
          icon={<FaFolderOpen />}
          title={getLocale('noBillsAvailable', 'No Bills Available')}
          description={getLocale(
            'noBillsAvailableDescription',
            "You currently don't have any bills. Check back later!"
          )}
        />
      ) : (
        <BillsGrid>
          {filteredBills.map((bill) => (
            <BillCard
              key={bill.id}
              bill={bill}
              onClick={() => handleBillClick(bill.id)}
            />
          ))}
        </BillsGrid>
      )}

      {showModal && selectedBill && (
        <BillDetailsModal
          billId={selectedBill}
          onClose={handleCloseModal}
        />
      )}
    </Container>
  );
};

export default MyBills; 