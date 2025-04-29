import React, { useState } from 'react';
import styled from 'styled-components';
import Sidebar from './Sidebar';
import MyBills from '../views/MyBills';
import BillHistory from '../views/BillHistory';
import SocietyBills from '../views/SocietyBills';
import BillPlayer from '../views/BillPlayer';
import InspectCitizen from '../views/InspectCitizen';
import BillingStats from '../views/BillingStats';
import { useNui } from '../../context/NuiContext';
import { FaSignOutAlt, FaExclamationCircle } from 'react-icons/fa';

const DashboardContainer = styled.div`
  display: flex;
  width: 100%;
  height: 100%;
  background-color: var(--background-color);
  overflow: hidden;
  position: relative;
`;

const Content = styled.div`
  flex: 1;
  padding: 1.5rem 2rem;
  background: linear-gradient(135deg, rgba(26, 32, 44, 0.95) 0%, rgba(17, 24, 39, 0.95) 100%);
  position: relative;
  height: 100%;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  
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

const ViewHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1.5rem;
  padding-bottom: 0.75rem;
  border-bottom: 1px solid rgba(255, 255, 255, 0.05);
`;

const ViewTitle = styled.h1`
  font-size: 1.5rem;
  font-weight: 600;
  color: var(--text-primary);
  display: flex;
  align-items: center;
  
  &::after {
    content: '';
    display: inline-block;
    width: 6px;
    height: 6px;
    background-color: rgba(255, 255, 255, 0.5);
    border-radius: 50%;
    margin-left: 0.75rem;
  }
`;

const ActionsBar = styled.div`
  display: flex;
  gap: 0.75rem;
`;

const ActionButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(0, 0, 0, 0.3);
  border: 1px solid rgba(255, 255, 255, 0.1);
  color: var(--text-secondary);
  padding: 0.5rem;
  border-radius: 4px;
  cursor: pointer;
  transition: all 0.2s ease;
  
  &:hover {
    background: rgba(255, 255, 255, 0.1);
    color: var(--text-primary);
  }
  
  svg {
    font-size: 1rem;
  }
`;

const ContentWrapper = styled.div`
  position: relative;
  flex: 1;
  height: calc(100% - 4rem);
  display: flex;
  flex-direction: column;
  overflow: hidden;
`;

const SystemNotification = styled.div`
  position: absolute;
  top: 1rem;
  right: 1rem;
  padding: 0.75rem 1rem;
  background: rgba(0, 0, 0, 0.5);
  border-left: 3px solid rgba(255, 255, 255, 0.2);
  color: var(--text-secondary);
  font-size: 0.8rem;
  border-radius: 4px;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  backdrop-filter: blur(3px);
  animation: slideIn 0.3s ease forwards;
  
  @keyframes slideIn {
    from { transform: translateX(100%); opacity: 0; }
    to { transform: translateX(0); opacity: 1; }
  }
  
  svg {
    color: var(--text-primary);
  }
`;

const Dashboard: React.FC = () => {
  const [view, setView] = useState('myBills');
  const { fetchNearbyPlayers, fetchOnlinePlayers, closeUI, developmentMode } = useNui();
  const [showNotification, setShowNotification] = useState(true);

  React.useEffect(() => {
    setTimeout(() => {
      setShowNotification(false);
    }, 5000);
  }, []);

  const handleViewChange = (newView: string) => {
    setView(newView);

    if (newView === 'billPlayer') {
      fetchNearbyPlayers();
    } else if (newView === 'inspectCitizen') {
      fetchOnlinePlayers('');
    }
  };

  const getViewTitle = () => {
    switch (view) {
      case 'myBills': return 'My Bills';
      case 'billingHistory': return 'Bill History';
      case 'billingStats': return 'Billing Statistics';
      case 'societyBills': return 'Society Bills';
      case 'billPlayer': return 'Bill Player';
      case 'inspectCitizen': return 'Inspect Citizen';
      default: return 'Bills';
    }
  };

  return (
    <DashboardContainer>
      <Sidebar currentView={view} setView={handleViewChange} />
      <Content>
        <ViewHeader>
          <ViewTitle>{getViewTitle()}</ViewTitle>
          <ActionsBar>
            <ActionButton onClick={closeUI} title="Close">
              <FaSignOutAlt />
            </ActionButton>
          </ActionsBar>
        </ViewHeader>
        
        <ContentWrapper>
          {developmentMode && showNotification && (
            <SystemNotification>
              <FaExclamationCircle />
              <span>Using dummy data for demonstration</span>
            </SystemNotification>
          )}
          
          <div style={{ height: '100%', width: '100%', position: 'relative' }}>
            {view === 'myBills' && <MyBills hideHeader={true} />}
            {view === 'billingHistory' && <BillHistory hideHeader={true} />}
            {view === 'billingStats' && <BillingStats hideHeader={true} />}
            {view === 'societyBills' && <SocietyBills hideHeader={true} />}
            {view === 'billPlayer' && <BillPlayer hideHeader={true} />}
            {view === 'inspectCitizen' && <InspectCitizen />}
          </div>
        </ContentWrapper>
      </Content>
    </DashboardContainer>
  );
};

export default Dashboard; 