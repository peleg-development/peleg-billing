import React from 'react';
import styled from 'styled-components';

interface EmptyStateProps {
  icon: React.ReactElement;
  title: string;
  description?: string;
  className?: string;
  actionButton?: React.ReactNode;
  transparent?: boolean;
}

const EmptyState: React.FC<EmptyStateProps> = ({ 
  icon, 
  title, 
  description, 
  className,
  actionButton,
  transparent = false
}) => {
  return (
    <Container className={className}>
      <Content>
        <IconWrapper>{icon}</IconWrapper>
        <Title>{title}</Title>
        {description && <Description>{description}</Description>}
        {actionButton && <ActionWrapper>{actionButton}</ActionWrapper>}
      </Content>
      {!transparent && <Background />}
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 3rem;
  text-align: center;
  position: relative;
  min-height: 300px;
  width: 100%;
  margin: 1rem auto;
  border-radius: 12px;
  overflow: hidden;
`;

const Content = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
  z-index: 2;
  max-width: 500px;
`;

const Background = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(26, 32, 44, 0.7);
  backdrop-filter: blur(5px);
  border: 1px solid var(--border-color);
  border-radius: 12px;
  box-shadow: var(--shadow);
  z-index: 1;
  
  &::before {
    content: '';
    position: absolute;
    top: -50%;
    left: -50%;
    width: 200%;
    height: 200%;
    background: radial-gradient(
      circle at center,
      rgba(75, 85, 99, 0.15) 0%,
      transparent 70%
    );
    z-index: -1;
  }
`;

const IconWrapper = styled.div`
  font-size: 3rem;
  color: var(--text-primary);
  margin-bottom: 1.5rem;
  height: 5rem;
  width: 5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  background: var(--primary-color);
  border-radius: 50%;
  position: relative;
  box-shadow: 0 0 30px rgba(0, 0, 0, 0.4);
  
  &::after {
    content: '';
    position: absolute;
    top: -5px;
    left: -5px;
    right: -5px;
    bottom: -5px;
    border-radius: 50%;
    border: 2px solid var(--accent-color);
    animation: pulse 3s infinite ease-in-out;
  }
  
  @keyframes pulse {
    0% { transform: scale(1); opacity: 0.8; }
    50% { transform: scale(1.15); opacity: 0.5; }
    100% { transform: scale(1); opacity: 0.8; }
  }
  
  svg {
    height: 2.5rem;
    width: 2.5rem;
    color: var(--text-secondary);
    filter: drop-shadow(0 0 8px rgba(0, 0, 0, 0.4));
  }
`;

const Title = styled.h3`
  font-size: 1.5rem;
  font-weight: 600;
  color: var(--text-primary);
  margin-bottom: 1rem;
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
`;

const Description = styled.p`
  font-size: 1rem;
  color: var(--text-secondary);
  max-width: 30rem;
  line-height: 1.7;
  opacity: 0.9;
`;

const ActionWrapper = styled.div`
  margin-top: 2rem;
`;

export default EmptyState; 