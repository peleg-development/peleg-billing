import React, { useState } from 'react';
import styled from 'styled-components';
import { FaClock } from 'react-icons/fa';
import BillCard from '../shared/BillCard';
import SearchBar from '../shared/SearchBar';
import EmptyState from '../shared/EmptyState';
import { useNui } from '../../context/NuiContext';

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

const BillingHistory: React.FC = () => {
  const { billingHistory, getLocale } = useNui();
  const [searchTerm, setSearchTerm] = useState('');

  const filteredBills = billingHistory.filter(bill => {
    const search = searchTerm.toLowerCase();
    return (
      bill.reason.toLowerCase().includes(search) ||
      bill.billedBy.name.toLowerCase().includes(search) ||
      bill.billedBy.job.toLowerCase().includes(search) ||
      bill.amount.toString().includes(search) ||
      bill.date.toLowerCase().includes(search)
    );
  });

  return (
    <Container>
      <Header>
        <Title>{getLocale('billingHistoryHeading', 'Billing History')}</Title>
        <SearchBar
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          onClear={() => setSearchTerm('')}
          placeholder={getLocale('searchHistory', 'Search history...')}
        />
      </Header>

      {billingHistory.length === 0 ? (
        <EmptyState
          icon={<FaClock />}
          title={getLocale('noBillingHistory', 'No Billing History')}
          description={getLocale(
            'emptyHistoryDescription',
            'Your billing history is currently empty. Complete some transactions to see your history here.'
          )}
        />
      ) : (
        <BillsGrid>
          {filteredBills.map((bill) => (
            <BillCard
              key={bill.id}
              bill={bill}
              type="history"
            />
          ))}
        </BillsGrid>
      )}
    </Container>
  );
};

export default BillingHistory; 