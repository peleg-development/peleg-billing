import React, { useState, useEffect, useCallback, useMemo, useRef } from 'react';
import styled, { keyframes } from 'styled-components';
import { FaTimes, FaFileInvoiceDollar, FaBuilding, FaEye, FaSearch, FaChevronDown } from 'react-icons/fa';
import { useNui, Bill } from '../../context/NuiContext';
import BillReceipt from '../shared/BillReceipt';

const fadeIn = keyframes`
  from { opacity: 0; }
  to { opacity: 1; }
`;

const fadeOut = keyframes`
  from { opacity: 1; }
  to { opacity: 0; }
`;

const Overlay = styled.div`
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
  user-select: none;
  animation: ${fadeIn} 0.2s ease-out;

  &.closing {
    animation: ${fadeOut} 0.2s ease-out forwards;
  }
`;

const Container = styled.div`
  width: 1200px;
  height: 700px;
  max-width: 95vw;
  max-height: 85vh;
  display: flex;
  flex-direction: column;
  color: var(--text-primary);
  padding: 1.25rem;
  box-sizing: border-box;
  position: relative;
  overflow: hidden;
  background-color: var(--card-bg, #1a202c);
  border: 1px solid var(--border-color, #374151);
  border-radius: 6px;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.5);
`;

const Header = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 1rem;
  position: relative;
`;

const Title = styled.h1`
  font-size: 1.5rem;
  font-weight: 600;
  margin: 0;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  
  svg {
    color: var(--primary-color);
    font-size: 1.2rem;
  }
`;

const PlayerInfo = styled.div`
  background-color: var(--secondary-color, #4a5568);
  border-radius: 4px;
  padding: 0.5rem 0.75rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  border: 1px solid var(--border-color, #374151);
  max-width: fit-content;
`;

const PlayerAvatar = styled.div`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: var(--primary-color, #2d3748);
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-weight: 600;
  font-size: 1.25rem;
`;

const PlayerName = styled.div`
  font-size: 1rem;
  font-weight: 600;
`;

const FilterSection = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 1rem;
  padding-bottom: 0.5rem;
`;

const SearchInput = styled.div`
  position: relative;
  width: 300px;
  
  input {
    width: 100%;
    padding: 0.55rem 1rem 0.55rem 2.25rem;
    background-color: var(--card-bg, #1a202c);
    border: 1px solid var(--border-color, #374151);
    border-radius: 4px;
    color: var(--text-primary);
    font-size: 0.85rem;
    transition: all 0.2s ease;
    line-height: 1.2;
    margin-bottom: 0;
    
    &:focus {
      outline: none;
      border-color: var(--primary-color);
      background-color: var(--card-hover, #2d3748);
    }
    
    &::placeholder {
      color: var(--text-secondary);
    }
  }
  
  svg {
    position: absolute;
    left: 0.75rem;
    top: 50%;
    transform: translateY(-50%);
    color: var(--text-secondary);
    font-size: 0.85rem;
  }
`;

const FilterTabs = styled.div`
  display: flex;
  background-color: var(--card-bg, #1a202c);
  border-radius: 4px;
  padding: 0.2rem;
  border: 1px solid var(--border-color, #374151);
`;

const FilterTab = styled.button<{ $active: boolean }>`
  padding: 0.4rem 0.75rem;
  border: none;
  background-color: ${props => props.$active ? 'var(--primary-color)' : 'transparent'};
  color: ${props => props.$active ? 'white' : 'var(--text-secondary)'};
  border-radius: 3px;
  font-size: 0.8rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;
  
  &:hover {
    background-color: ${props => props.$active ? 'var(--primary-color)' : 'rgba(255, 255, 255, 0.1)'};
  }
  
  & + & {
    margin-left: 0.2rem;
  }
`;

const CustomDropdown = styled.div`
  position: relative;
  width: 180px;
`;

const DropdownButton = styled.button`
  width: 100%;
  padding: 0.5rem 0.75rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  background-color: var(--card-bg, #1a202c);
  border: 1px solid var(--border-color, #374151);
  border-radius: 4px;
  color: var(--text-primary);
  font-size: 0.85rem;
  cursor: pointer;
  transition: all 0.2s ease;
  
  &:hover {
    border-color: var(--primary-color);
  }
  
  svg {
    color: var(--text-secondary);
    font-size: 0.8rem;
    margin-left: 0.5rem;
    transition: transform 0.2s ease;
  }
  
  &[aria-expanded="true"] svg {
    transform: rotate(180deg);
  }
`;

const DropdownMenu = styled.div<{ $isOpen: boolean }>`
  position: absolute;
  top: calc(100% + 5px);
  left: 0;
  width: 100%;
  background-color: var(--card-bg, #1a202c);
  border: 1px solid var(--border-color, #374151);
  border-radius: 4px;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.3);
  z-index: 10;
  overflow: hidden;
  transition: all 0.2s ease;
  opacity: ${props => props.$isOpen ? 1 : 0};
  transform: ${props => props.$isOpen ? 'translateY(0)' : 'translateY(-10px)'};
  pointer-events: ${props => props.$isOpen ? 'all' : 'none'};
`;

const DropdownItem = styled.button<{ $isSelected: boolean }>`
  width: 100%;
  padding: 0.6rem 0.75rem;
  text-align: left;
  background-color: ${props => props.$isSelected ? 'var(--secondary-color, #4a5568)' : 'transparent'};
    border: none;
  color: ${props => props.$isSelected ? 'var(--text-primary)' : 'var(--text-primary)'};
  font-size: 0.85rem;
  cursor: pointer;
  transition: all 0.15s ease;
  
  &:hover {
    background-color: var(--card-hover, #2d3748);
  }
  
  &:not(:last-child) {
    border-bottom: 1px solid var(--border-color, #374151);
  }
`;

const NoResultsContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 200px;
  margin-top: 2rem;
  color: var(--text-secondary);
  
  svg {
    font-size: 3rem;
    margin-bottom: 1rem;
    opacity: 0.5;
  }
  
  p {
    font-size: 1rem;
    text-align: center;
  }
`;

const TableContainer = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  border-radius: 6px;
  background-color: var(--card-bg, #1a202c);
  border: 1px solid var(--border-color, #374151);
  overflow: hidden;
  min-height: 0;
  position: relative;
`;

const TableHeader = styled.div`
  display: grid;
  grid-template-columns: 1fr 1.2fr 1fr 0.8fr 1fr 0.5fr;
  padding: 0.75rem 1.5rem;
  font-weight: 600;
  font-size: 0.85rem;
  color: var(--text-secondary);
  text-transform: uppercase;
  letter-spacing: 0.5px;
  background-color: var(--secondary-color, #4a5568);
  border-bottom: 1px solid var(--border-color, #374151);
  z-index: 1;
`;

const TableBody = styled.div`
  overflow-y: auto;
  overflow-x: hidden;
  flex: 1;
  padding: 0.25rem 0;
  
  &::-webkit-scrollbar {
    width: 8px;
  }
  
  &::-webkit-scrollbar-track {
    background: var(--card-bg, #1a202c);
    border-radius: 0 0 6px 0;
  }
  
  &::-webkit-scrollbar-thumb {
    background: var(--secondary-color, #4a5568);
    border-radius: 4px;
  }
  
  &::-webkit-scrollbar-thumb:hover {
    background: var(--secondary-hover, #2d3748);
  }
`;

const TableCell = styled.div`
  display: flex;
  align-items: center;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  padding: 0 2px;
`;

const BillRow = styled.div`
  display: grid;
  grid-template-columns: 1fr 1.2fr 1fr 0.8fr 1fr 0.5fr;
  padding: 1rem 1.5rem;
  transition: background-color 0.2s ease;
  border-bottom: 1px solid var(--border-color, #374151);
  position: relative;
  z-index: 1;
  
  &:hover {
    background-color: var(--card-hover, #2d3748);
    cursor: pointer;
    box-shadow: none;
    transform: none;
  }
  
  &:last-child {
    border-bottom: none;
  }
`;

const StatusIndicator = styled.span<{ $status: string }>`
  display: inline-flex;
  align-items: center;
  gap: 4px;
  padding: 3px 8px;
  border-radius: 3px;
  font-size: 0.7rem;
  font-weight: 600;
  text-transform: uppercase;
  
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

const JobLabel = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  font-weight: 500;
  
  svg {
    color: var(--text-secondary);
  }
`;

const Amount = styled.div<{ $status?: string }>`
  font-weight: 600;
  color: ${props => props.$status === 'canceled' ? 'var(--danger-color)' : 'var(--primary-color)'};
  ${props => props.$status === 'canceled' && 'text-decoration: line-through;'}
`;

const DateInfo = styled.div`
  display: flex;
  flex-direction: column;
  
  span:first-child {
    font-weight: 500;
  }
  
  span:last-child {
    font-size: 0.8rem;
    color: var(--text-secondary);
    margin-top: 2px;
  }
`;

const ActionButton = styled.button`
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

type SortKey = 'date' | 'amount' | 'status';
type FilterType = 'all' | 'unpaid' | 'paid' | 'canceled';

interface ExtendedBill extends Bill {
  canceled?: boolean;
  refunded?: boolean;
  status?: 'paid' | 'pending' | 'canceled' | 'refunded';
  canceled_by?: string;
}

const PlayerBills: React.FC = () => {
  const { 
    selectedPlayer, 
    selectedPlayerBills, 
    showSelectedPlayerMenu,
    getLocale,
    closePlayerBills,
  } = useNui();
  
  const [searchTerm, setSearchTerm] = useState('');
  const [isClosing, setIsClosing] = useState(false);
  const [localBills, setLocalBills] = useState<ExtendedBill[]>([]);
  const [sortKey, setSortKey] = useState<SortKey>('date');
  const [filter, setFilter] = useState<FilterType>('all');
  
  const [selectedBill, setSelectedBill] = useState<Bill | null>(null);
  
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    if (!showSelectedPlayerMenu) {
      setSearchTerm('');
      setIsClosing(false);
      setLocalBills([]);
      setSortKey('date');
      setFilter('all');
    }
  }, [showSelectedPlayerMenu]);
  
  useEffect(() => {
    if (selectedPlayerBills) {
      setLocalBills(selectedPlayerBills.map(bill => ({
        ...bill,
        canceled: bill.canceled || bill.status === "canceled",
        refunded: bill.refunded || bill.status === "refunded",
        status: bill.status || (bill.paid ? "paid" : bill.canceled ? "canceled" : bill.refunded ? "refunded" : "pending")
      })));
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
        const playerName = selectedPlayer ? selectedPlayer.name : 'You';
        
        setLocalBills(prevBills => 
          prevBills.map(bill => 
            bill.id === billId 
              ? { 
                  ...bill, 
                  refunded: true, 
                  paid: false,
                  status: "refunded",
                  canceled_by: playerName 
                } 
              : bill
          )
        );
        
        setTimeout(() => {
          if (selectedPlayer && selectedPlayer.cid) {
            fetch(`https://${resourceName}/peleg-billing:callback:fetchPlayerBills`, {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({ cid: selectedPlayer.cid })
            });
          }
        }, 500);
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
        const playerName = selectedPlayer ? selectedPlayer.name : 'You';
        
        setLocalBills(prevBills => 
          prevBills.map(bill => 
            bill.id === billId 
              ? { 
                  ...bill, 
                  canceled: true, 
                  status: "canceled",
                  canceled_by: playerName 
                } 
              : bill
          )
        );
        
        setTimeout(() => {
          if (selectedPlayer && selectedPlayer.cid) {
            fetch(`https://${resourceName}/peleg-billing:callback:fetchPlayerBills`, {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({ cid: selectedPlayer.cid })
            });
          }
        }, 500);
      }
    });
  };
  
  const handleViewBill = (bill: Bill) => {
    setSelectedBill(bill);
  };
  
  const handleCloseBill = (e?: React.MouseEvent) => {
    if (e) {
      e.preventDefault();
      e.stopPropagation();
    }
    
    setSelectedBill(null);
  };
  
  const getBillStatus = (bill: Bill): string => {
    if (bill.status) return bill.status;
    if (bill.refunded) return 'refunded';
    if (bill.canceled) return 'canceled';
    if (bill.paid) return 'paid';
    return 'pending';
  };
  
  const formatCurrency = (amount: number | string) => {
    const numAmount = typeof amount === 'string' ? parseFloat(amount) : amount;
    if (isNaN(numAmount)) return `${getLocale('currencySymbol', '$')}0.00`;
    return `${getLocale('currencySymbol', '$')}${numAmount.toFixed(2)}`;
  };
  
  const filteredBills = useMemo(() => {
    if (!localBills) return [];
    
    let filtered = [...localBills];
    
    if (filter !== 'all') {
      filtered = filtered.filter(bill => {
        const status = getBillStatus(bill);
        if (filter === 'unpaid') return status === 'pending';
        if (filter === 'paid') return status === 'paid';
        if (filter === 'canceled') return status === 'canceled' || status === 'refunded';
        return true;
      });
    }
    
    if (searchTerm) {
      const query = searchTerm.toLowerCase();
      filtered = filtered.filter(
        bill => 
          bill.reason.toLowerCase().includes(query) ||
          bill.billedBy.job.toLowerCase().includes(query) ||
          bill.billedBy.name.toLowerCase().includes(query)
      );
    }
    
    filtered.sort((a, b) => {
      if (sortKey === 'amount') {
        const amountA = typeof a.amount === 'string' ? parseFloat(a.amount) : a.amount;
        const amountB = typeof b.amount === 'string' ? parseFloat(b.amount) : b.amount;
        return amountB - amountA;
      } else if (sortKey === 'status') {
        const statusA = getBillStatus(a);
        const statusB = getBillStatus(b);
        return statusA.localeCompare(statusB);
      } else {
        return new Date(b.date).getTime() - new Date(a.date).getTime();
      }
    });
    
    return filtered;
  }, [localBills, filter, searchTerm, sortKey]);
  
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setDropdownOpen(false);
      }
    };
    
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);
  
  const sortOptions = [
    { value: 'date', label: getLocale('sortByDate', 'Sort by Date') },
    { value: 'amount', label: getLocale('sortByAmount', 'Sort by Amount') },
    { value: 'status', label: getLocale('sortByStatus', 'Sort by Status') }
  ];
  
  const selectedSortOption = sortOptions.find(option => option.value === sortKey) || sortOptions[0];
  
  if (!showSelectedPlayerMenu || !selectedPlayer) return null;
  
  return (
    <Overlay onClick={e => {
      e.stopPropagation();
      handleClose();
    }} className={isClosing ? 'closing' : ''}>
      <Container onClick={e => e.stopPropagation()} className={isClosing ? 'closing' : ''}>
        <Header>
          <Title>
            <FaFileInvoiceDollar />
            {getLocale('playerBillsTitle', 'Player Bills')}
          </Title>
          
          {selectedPlayer && (
            <PlayerInfo>
              <PlayerAvatar>
                {selectedPlayer.name.charAt(0).toUpperCase()}
              </PlayerAvatar>
              <PlayerName>{selectedPlayer.name}</PlayerName>
            </PlayerInfo>
          )}
          
          <ActionButton onClick={handleClose}>
            <FaTimes />
          </ActionButton>
        </Header>
        
        <FilterSection>
          <SearchInput>
            <FaSearch />
            <input
              type="text"
              placeholder={getLocale('searchBillsPlaceholder', 'Search bills...')}
            value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </SearchInput>
          
          <FilterTabs>
            <FilterTab 
              $active={filter === 'all'} 
              onClick={() => setFilter('all')}
            >
              {getLocale('allFilter', 'All')}
            </FilterTab>
            <FilterTab 
              $active={filter === 'unpaid'} 
              onClick={() => setFilter('unpaid')}
            >
              {getLocale('unpaidFilter', 'Unpaid')}
            </FilterTab>
            <FilterTab 
              $active={filter === 'paid'} 
              onClick={() => setFilter('paid')}
            >
              {getLocale('paidFilter', 'Paid')}
            </FilterTab>
            <FilterTab 
              $active={filter === 'canceled'} 
              onClick={() => setFilter('canceled')}
            >
              {getLocale('canceledFilter', 'Canceled')}
            </FilterTab>
          </FilterTabs>
          
          <CustomDropdown ref={dropdownRef}>
            <DropdownButton 
              onClick={() => setDropdownOpen(!dropdownOpen)}
              aria-expanded={dropdownOpen}
            >
              {selectedSortOption.label}
              <FaChevronDown />
            </DropdownButton>
            
            <DropdownMenu $isOpen={dropdownOpen}>
              {sortOptions.map(option => (
                <DropdownItem
                  key={option.value}
                  $isSelected={option.value === sortKey}
                  onClick={() => {
                    setSortKey(option.value as SortKey);
                    setDropdownOpen(false);
                  }}
                >
                  {option.label}
                </DropdownItem>
              ))}
            </DropdownMenu>
          </CustomDropdown>
        </FilterSection>
        
        {filteredBills.length > 0 ? (
          <TableContainer>
            <TableHeader>
              <TableCell>{getLocale('dateLabel', 'Date')}</TableCell>
              <TableCell>{getLocale('fromLabel', 'From')}</TableCell>
              <TableCell>{getLocale('billedByLabel', 'Billed By')}</TableCell>
              <TableCell>{getLocale('amountLabel', 'Amount')}</TableCell>
              <TableCell>{getLocale('statusLabel', 'Status')}</TableCell>
              <TableCell></TableCell>
            </TableHeader>
            
            <TableBody>
              {filteredBills.map((bill) => {
                const billStatus = getBillStatus(bill);
                return (
                  <BillRow key={bill.id} onClick={() => handleViewBill(bill)}>
                    <TableCell>
                      <DateInfo>
                        <span>{bill.date}</span>
                        <span>{bill.time}</span>
                      </DateInfo>
                    </TableCell>
                    <TableCell>
                      <JobLabel>
                        <FaBuilding />
                        {bill.billedBy.job}
                      </JobLabel>
                    </TableCell>
                    <TableCell>
                      {bill.billedBy.name}
                    </TableCell>
                    <TableCell>
                      <Amount $status={billStatus}>
                        {formatCurrency(bill.amount)}
                      </Amount>
                    </TableCell>
                    <TableCell>
                      <StatusIndicator $status={billStatus}>
                        {billStatus === 'paid' && getLocale('paidStatus', 'Paid')}
                        {billStatus === 'pending' && getLocale('pendingStatus', 'Pending')}
                        {billStatus === 'canceled' && getLocale('canceledStatus', 'Canceled')}
                        {billStatus === 'refunded' && getLocale('refundedStatus', 'Refunded')}
                      </StatusIndicator>
                    </TableCell>
                    <TableCell>
                      <FaEye color="var(--primary-color)" />
                    </TableCell>
                  </BillRow>
                );
              })}
            </TableBody>
          </TableContainer>
        ) : (
          <NoResultsContainer>
            <FaFileInvoiceDollar />
            <p>{getLocale('noBillsFound', 'No bills found')}</p>
          </NoResultsContainer>
        )}
        
        {selectedBill && (
          <div 
            style={{
              position: 'absolute', 
              top: '50%', 
              left: '50%', 
              transform: 'translate(-50%, -50%)', 
              zIndex: 100, 
              width: '100%', 
              height: '100%', 
              display: 'flex', 
              alignItems: 'center', 
              justifyContent: 'center', 
              backgroundColor: 'rgba(0, 0, 0, 0.5)'
            }}
            onClick={(e) => {
              e.stopPropagation();
              handleCloseBill();
            }}
          >
            <div onClick={e => e.stopPropagation()} style={{ width: 'auto', height: 'auto' }}>
              <BillReceipt
                bill={selectedBill}
                isClosing={false}
                onClose={handleCloseBill}
                onRefund={handleRefundBill}
                onCancel={handleCancelBill}
              />
                    </div>
                    </div>
          )}
      </Container>
    </Overlay>
  );
};

export default PlayerBills; 