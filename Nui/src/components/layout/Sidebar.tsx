import React from 'react';
import styled from 'styled-components';
import { FaFileInvoiceDollar, FaFileInvoice, FaHistory, FaBuilding, FaUserPlus, FaSearch, FaServer, FaChartBar } from 'react-icons/fa';
import { useNui } from '../../context/NuiContext';

interface SidebarProps {
  currentView: string;
  setView: (view: string) => void;
}

const SidebarContainer = styled.div`
  width: 260px;
  height: 100%;
  background-color: rgba(17, 24, 39, 0.98);
  color: var(--text-primary);
  display: flex;
  flex-direction: column;
  transition: all 0.3s ease;
  overflow-y: auto;
  box-shadow: 2px 0 10px rgba(0, 0, 0, 0.2);
  border-right: 1px solid rgba(255, 255, 255, 0.05);
`;

const Logo = styled.div`
  padding: 1.5rem;
  display: flex;
  align-items: center;
  gap: 1rem;
  border-bottom: 1px solid rgba(255, 255, 255, 0.05);
  background: linear-gradient(to right, rgba(75, 85, 99, 0.1), transparent);

  svg {
    font-size: 1.8rem;
    color: var(--text-primary);
    opacity: 0.9;
  }

  span {
    font-size: 1.4rem;
    font-weight: 600;
    letter-spacing: 0.5px;
    color: var(--text-primary);
  }
`;

const NavMenu = styled.nav`
  padding: 1rem 0;
  flex: 1;
`;

const NavItem = styled.button<{ active: boolean }>`
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 0.9rem 1.5rem;
  width: 100%;
  background: ${props => props.active ? 'rgba(31, 41, 55, 0.6)' : 'transparent'};
  border: none;
  border-left: 3px solid ${props => props.active ? 'rgba(255, 255, 255, 0.2)' : 'transparent'};
  color: ${props => props.active ? 'var(--text-primary)' : 'var(--text-secondary)'};
  text-align: left;
  cursor: pointer;
  transition: all 0.2s ease;
  font-size: 0.95rem;
  position: relative;
  overflow: hidden;

  &:hover {
    background: rgba(31, 41, 55, 0.4);
    color: var(--text-primary);

    svg {
      color: var(--text-primary);
      transform: translateY(-1px);
    }
  }

  svg {
    font-size: 1.1rem;
    min-width: 1.1rem;
    color: ${props => props.active ? 'var(--text-primary)' : 'var(--text-secondary)'};
    transition: all 0.2s ease;
  }

  span {
    font-weight: 500;
  }

  &::after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 0;
    width: ${props => props.active ? '100%' : '0'};
    height: 1px;
    background: linear-gradient(90deg, rgba(255, 255, 255, 0.1) 0%, transparent 100%);
    transition: width 0.3s ease;
  }

  &:hover::after {
    width: 100%;
  }
`;

const ServerInfo = styled.div`
  padding: 0.75rem 1.5rem;
  border-top: 1px solid rgba(255, 255, 255, 0.05);
  font-size: 0.75rem;
  color: var(--text-light);
  display: flex;
  align-items: center;
  gap: 0.5rem;
  background-color: rgba(0, 0, 0, 0.3);

  svg {
    color: var(--text-light);
    opacity: 0.7;
    font-size: 0.9rem;
  }
`;

const Sidebar: React.FC<SidebarProps> = ({ currentView, setView }) => {
  const { showSocietyMenu, showInspectCitizen, canBill, getLocale } = useNui();
  
  console.log("Sidebar current view:", currentView); // Debug

  return (
    <SidebarContainer>
      <Logo>
        <FaFileInvoiceDollar />
        <span>{getLocale('billHub', 'Bills')}</span>
      </Logo>
      
      <NavMenu>
        <NavItem 
          active={currentView === 'myBills'} 
          onClick={() => setView('myBills')}
        >
          <FaFileInvoice />
          <span>{getLocale('myBillsLabel', 'My Bills')}</span>
        </NavItem>
        
        <NavItem 
          active={currentView === 'billingHistory'} 
          onClick={() => setView('billingHistory')}
        >
          <FaHistory />
          <span>{getLocale('historyLabel', 'History')}</span>
        </NavItem>
        
        <NavItem 
          active={currentView === 'billingStats'} 
          onClick={() => setView('billingStats')}
        >
          <FaChartBar />
          <span>{getLocale('statsLabel', 'Stats')}</span>
        </NavItem>
        
        {showSocietyMenu && (
          <NavItem 
            active={currentView === 'societyBills'} 
            onClick={() => setView('societyBills')}
          >
            <FaBuilding />
            <span>{getLocale('societyLabel', 'Society')}</span>
          </NavItem>
        )}
        
        {canBill && (
          <NavItem 
            active={currentView === 'billPlayer'} 
            onClick={() => setView('billPlayer')}
          >
            <FaUserPlus />
            <span>{getLocale('billPlayerLabel', 'Bill Player')}</span>
          </NavItem>
        )}
        
        {showInspectCitizen && (
          <NavItem 
            active={currentView === 'inspectCitizen'} 
            onClick={() => setView('inspectCitizen')}
          >
            <FaSearch />
            <span>{getLocale('inspectLabel', 'Inspect')}</span>
          </NavItem>
        )}
      </NavMenu>
      
      <ServerInfo>
        <FaServer />
        <span>v1.0.3 • Connected to Server</span>
      </ServerInfo>
    </SidebarContainer>
  );
};

export default Sidebar; 