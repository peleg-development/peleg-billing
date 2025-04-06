import React, { useEffect } from 'react';
import { NuiProvider, useNui } from './context/NuiContext';
import Dashboard from './components/layout/Dashboard';
import PlayerBills from './components/views/PlayerBills';
import QuickBill from './components/views/QuickBill';
import styled, { keyframes } from 'styled-components';

const App: React.FC = () => {
  return (
    <NuiProvider>
      <AppContent />
    </NuiProvider>
  );
};

const AppContent: React.FC = () => {
  const { showMenu, showQuickBill, isClosing } = useNui();
  
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && (showMenu || showQuickBill)) {  
      }
    };
    
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [showMenu, showQuickBill]);

  if (!showMenu && !showQuickBill && !isClosing) return null;

  return (
    <>
      {showMenu && (
        <Container $visible={showMenu} $isClosing={isClosing}>
          <BackgroundBlur />
          <ContentWrapper $isClosing={isClosing}>
            <GlowEffect />
            <Dashboard />
            <CornerAccent position="top-left" />
            <CornerAccent position="bottom-right" />
          </ContentWrapper>
        </Container>
      )}
      
      <PlayerBills />
      <QuickBill />
    </>
  );
};

const fadeIn = keyframes`
  from { opacity: 0; }
  to { opacity: 1; }
`;

const fadeOut = keyframes`
  from { opacity: 1; }
  to { opacity: 0; }
`;

const scaleIn = keyframes`
  from { opacity: 0; transform: scale(0.97); }
  to { opacity: 1; transform: scale(1); }
`;

const scaleOut = keyframes`
  from { opacity: 1; transform: scale(1); }
  to { opacity: 0; transform: scale(0.97); }
`;

const Container = styled.div<{ $visible: boolean; $isClosing: boolean }>`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: ${({ $visible }) => ($visible ? 'flex' : 'none')};
  align-items: center;
  justify-content: center;
  z-index: 1000;
  animation: ${({ $isClosing }) => ($isClosing ? fadeOut : fadeIn)} 0.3s ease forwards;
  user-select: none;
  opacity: ${({ $visible }) => ($visible ? 1 : 0)};
  pointer-events: ${({ $visible }) => ($visible ? 'auto' : 'none')};
  visibility: ${({ $visible }) => ($visible ? 'visible' : 'hidden')};
`;

const BackgroundBlur = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: -1;
`;

const ContentWrapper = styled.div<{ $isClosing: boolean }>`
  width: 80%;
  height: 80%;
  max-width: 1200px;
  max-height: 800px;
  position: relative;
  border-radius: 10px;
  overflow: hidden;
  box-shadow: 0 0 40px rgba(0, 0, 0, 0.5);
  border: 1px solid rgba(255, 255, 255, 0.08);
  animation: ${({ $isClosing }) => ($isClosing ? scaleOut : scaleIn)} 0.3s ease forwards;
  background-color: rgba(17, 24, 39, 0.95);
`;

const GlowEffect = styled.div`
  position: absolute;
  width: 500px;
  height: 500px;
  top: -250px;
  right: -250px;
  background: radial-gradient(
    circle,
    rgba(75, 85, 99, 0.1) 0%,
    rgba(75, 85, 99, 0.03) 30%,
    transparent 70%
  );
  opacity: 0.4;
  z-index: 0;
  pointer-events: none;
`;

const pulseAnimation = keyframes`
  0% { opacity: 0.3; }
  50% { opacity: 0.6; }
  100% { opacity: 0.3; }
`;

interface CornerAccentProps {
  position: 'top-left' | 'bottom-right';
}

const CornerAccent = styled.div<CornerAccentProps>`
  position: absolute;
  width: 80px;
  height: 80px;
  ${({ position }) => position === 'top-left' ? 'top: 0; left: 0;' : 'bottom: 0; right: 0;'}
  pointer-events: none;
  z-index: 1;
  
  &::before, &::after {
    content: '';
    position: absolute;
    background-color: rgba(156, 163, 175, 0.3);
    opacity: 0.3;
    animation: ${pulseAnimation} 4s infinite ease-in-out;
  }
  
  &::before {
    ${({ position }) => position === 'top-left' 
      ? 'top: 0; left: 0; width: 3px; height: 40px;' 
      : 'bottom: 0; right: 0; width: 3px; height: 40px;'
    }
  }
  
  &::after {
    ${({ position }) => position === 'top-left' 
      ? 'top: 0; left: 0; height: 3px; width: 40px;' 
      : 'bottom: 0; right: 0; height: 3px; width: 40px;'
    }
  }
`;

export default App; 