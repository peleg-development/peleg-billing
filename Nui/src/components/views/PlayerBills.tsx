import React, { useState, useEffect, useCallback } from 'react';
import styled, { keyframes } from 'styled-components';
import { FaReceipt, FaTimes, FaInfoCircle, FaUser, FaSuitcase, FaCalendar } from 'react-icons/fa';
import { useNui, Bill } from '../../context/NuiContext';
import SearchBar from '../shared/SearchBar';
import EmptyState from '../shared/EmptyState';

const fadeIn = keyframes`
  from { opacity: 0; }
  to { opacity: 1; }
`;

const fadeOut = keyframes`
  from { opacity: 1; }
  to { opacity: 0; }
`;

const scaleIn = keyframes`
  from { opacity: 0; transform: scale(0.95); }
  to { opacity: 1; transform: scale(1); }
`;

const scaleOut = keyframes`
  from { opacity: 1; transform: scale(1); }
  to { opacity: 0; transform: scale(0.95); }
`;

const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: transparent;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  user-select: none;
  animation: ${fadeIn} 0.2s ease-out;
    background-color: rgba(0, 0, 0, 0.5);

  &.closing {
    animation: ${fadeOut} 0.2s ease-out forwards;
  }
`;

const Container = styled.div`
  width: 90%;
  max-width: 800px;
  height: 80vh;
  background-color: var(--card-bg);
  border-radius: 12px;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.4);
  display: flex;
  flex-direction: column;
  overflow: hidden;
  border: 1px solid var(--border-color);
  animation: ${scaleIn} 0.3s ease-out forwards;
  
  &.closing {
    animation: ${scaleOut} 0.3s ease-out forwards;
  }
`;

const Header = styled.header`
  padding: 1.25rem 1.5rem;
  border-bottom: 1px solid var(--border-color);
  background-color: var(--primary-color);
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-shrink: 0;
`;

const Title = styled.h2`
  font-size: 1.25rem;
  font-weight: 600;
  color: white;
  margin: 0;
  display: flex;
  align-items: center;
  gap: 0.75rem;
  text-shadow: 0 1px 2px rgba(0, 0, 0, 0.2);
  
  svg {
    font-size: 1.1rem;
  }
`;

const SearchWrapper = styled.div`
  padding: 1rem 1.5rem;
  background-color: rgba(0, 0, 0, 0.05);
  border-bottom: 1px solid var(--border-color);
  flex-shrink: 0;
  
  input, input:focus, input:focus-visible {
    border: none;
    outline: none;
    box-shadow: none;
  }
`;

const BillsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 0.75rem;
  padding: 0.75rem;
  overflow-y: auto;
  flex: 1;
  min-height: 0;
  
  &::-webkit-scrollbar {
    width: 6px;
  }
  
  &::-webkit-scrollbar-track {
    background: rgba(0, 0, 0, 0.1);
    border-radius: 3px;
  }
  
  &::-webkit-scrollbar-thumb {
    background: rgba(255, 255, 255, 0.2);
    border-radius: 3px;
  }
  
  &:hover::-webkit-scrollbar-thumb {
    background: rgba(255, 255, 255, 0.3);
  }
`;

const EmptyStateWrapper = styled.div`
  grid-column: 1 / -1;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 2rem;
`;

const BillCard = styled.div`
  background-color: rgba(255, 255, 255, 0.03);
  border-radius: 8px;
  border: 1px solid var(--border-color);
  height: 20vh;
  transition: all 0.2s ease;
  margin-bottom: 0.5vh;
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
    border-color: var(--primary-color);
  }
`;

const BillHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 12px;
  border-bottom: 1px solid var(--border-color);
  background: rgba(0, 0, 0, 0.1);
`;

const BillAmount = styled.div`
  font-size: 1.25rem;
  font-weight: 600;
  color: var(--primary-color);
  text-shadow: 0 1px 2px rgba(0, 0, 0, 0.2);
`;

interface StatusProps {
  $isPaid: boolean;
}

const BillStatus = styled.div<StatusProps>`
  display: flex;
  align-items: center;
  font-size: 0.9rem;
  color: ${({ $isPaid }) => ($isPaid ? 'var(--success-color, #4CAF50)' : 'var(--warning-color, #FFC107)')};
  
  .status-indicator {
    width: 8px;
    height: 8px;
    border-radius: 50%;
    background-color: ${({ $isPaid }) => ($isPaid ? 'var(--success-color, #4CAF50)' : 'var(--warning-color, #FFC107)')};
    margin-right: 0.5rem;
    display: inline-block;
    box-shadow: 0 0 8px ${({ $isPaid }) => ($isPaid ? 'var(--success-color, #4CAF50)' : 'var(--warning-color, #FFC107)')};
  }
`;

const BillBody = styled.div`
  padding: 12px;
`;

const BillDetail = styled.div`
  display: flex;
  margin-bottom: 0.75rem;
  
  svg {
    color: var(--text-secondary);
    margin-right: 0.75rem;
    font-size: 1rem;
    margin-top: 0.15rem;
  }
  
  strong {
    margin-right: 0.5rem;
    color: var(--text-primary);
  }
  
  span {
    color: var(--text-secondary);
  }
  
  &:last-child {
    margin-bottom: 0;
  }
`;

const CloseButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 32px;
  height: 32px;
  background-color: rgba(255, 255, 255, 0.1);
  border: none;
  border-radius: 6px;
  color: white;
  cursor: pointer;
  transition: all 0.2s ease;
  
  &:hover {
    background-color: rgba(255, 255, 255, 0.2);
    transform: translateY(-1px);
  }
  
  &:active {
    transform: translateY(0);
  }
  
  svg {
    font-size: 1rem;
  }
`;

const PlayerBills: React.FC = () => {
  const { 
    selectedPlayer, 
    selectedPlayerBills, 
    showSelectedPlayerMenu,
    getLocale,
    closePlayerBills
  } = useNui();
  
  const [searchTerm, setSearchTerm] = useState('');
  const [isClosing, setIsClosing] = useState(false);
  const [localBills, setLocalBills] = useState<Bill[]>([]);
  
  useEffect(() => {
    if (!showSelectedPlayerMenu) {
      setSearchTerm('');
      setIsClosing(false);
      setLocalBills([]);
    }
  }, [showSelectedPlayerMenu]);
  
  useEffect(() => {
    if (selectedPlayerBills) {
      setLocalBills(selectedPlayerBills);
    }
  }, [selectedPlayerBills]);
  
  const handleClose = useCallback(() => {
    try {
      setIsClosing(true);
      setTimeout(() => {
        closePlayerBills();
      }, 300);
    } catch (error) {
      console.error('Error closing player bills:', error);
    }
  }, [closePlayerBills]);
  
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && showSelectedPlayerMenu) {
        handleClose();
      }
    };
    
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [showSelectedPlayerMenu, handleClose]);
  
  if (!showSelectedPlayerMenu || !selectedPlayer) return null;
  
  const filteredBills = localBills.filter(bill => {
    const search = searchTerm.toLowerCase();
    return (
      bill.reason.toLowerCase().includes(search) ||
      bill.amount.toString().includes(search) ||
      bill.date.toLowerCase().includes(search) ||
      bill.billedBy.name.toLowerCase().includes(search)
    );
  });
  
  return (
    <Overlay onClick={handleClose} className={isClosing ? 'closing' : ''}>
      <Container onClick={e => e.stopPropagation()} className={isClosing ? 'closing' : ''}>
        <Header>
          <Title>
            <FaReceipt />
            {getLocale('playerBillsTitle', 'Player Bills')}
          </Title>
          <CloseButton onClick={handleClose} aria-label="Close">
            <FaTimes />
          </CloseButton>
        </Header>
        
        <SearchWrapper>
          <SearchBar
            value={searchTerm}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSearchTerm(e.target.value)}
            onClear={() => setSearchTerm('')}
            placeholder={getLocale('searchBillsPlaceholder', 'Search bills...')}
          />
        </SearchWrapper>
        
        <BillsGrid>
          {filteredBills.length === 0 ? (
            <EmptyStateWrapper>
              <EmptyState
                icon={<FaInfoCircle />}
                title={getLocale('noBillsFound', 'No bills found')}
                description={getLocale('noBillsDescription', 'No bills match your search criteria.')}
                transparent={true}
              />
            </EmptyStateWrapper>
          ) : (
            filteredBills.map((bill, index) => (
              <BillCard key={bill.id || index}>
                <BillHeader>
                  <BillAmount>
                    {getLocale('currencySymbol', '$')}
                    {typeof bill.amount === 'number' 
                      ? bill.amount.toFixed(2) 
                      : parseFloat(String(bill.amount || 0)).toFixed(2)}
                  </BillAmount>
                  <BillStatus $isPaid={bill.paid}>
                    <span className="status-indicator"></span>
                    {bill.paid ? getLocale('paidStatus', 'Paid') : getLocale('unpaidStatus', 'Unpaid')}
                  </BillStatus>
                </BillHeader>
                
                <BillBody>
                  <BillDetail>
                    <FaInfoCircle />
                    <div>
                      <strong>{getLocale('reasonLabel', 'Reason:')}</strong>
                      <span>{bill.reason}</span>
                    </div>
                  </BillDetail>
                  
                  <BillDetail>
                    <FaUser />
                    <div>
                      <strong>{getLocale('billedByLabel', 'Billed By:')}</strong>
                      <span>{bill.billedBy.name}</span>
                    </div>
                  </BillDetail>
                  
                  <BillDetail>
                    <FaSuitcase />
                    <div>
                      <strong>{getLocale('fromLabel', 'From:')}</strong>
                      <span>{bill.billedBy.job}</span>
                    </div>
                  </BillDetail>
                  
                  <BillDetail>
                    <FaCalendar />
                    <div>
                      <strong>{getLocale('dateLabel', 'Date:')}</strong>
                      <span>{bill.date}</span>
                    </div>
                  </BillDetail>
                </BillBody>
              </BillCard>
            ))
          )}
        </BillsGrid>
      </Container>
    </Overlay>
  );
};

export default PlayerBills; 