import React, { useState, useEffect, useRef } from 'react';
import { useNui } from '../../context/NuiContext';
import styled from 'styled-components';

const QuickBill: React.FC = () => {
  const isMounted = useRef(true);
  
  const { 
    showQuickBill, 
    closeQuickBill, 
    fetchNearbyPlayers, 
    nearbyPlayers, 
    quickBillPlayer,
    getLocale,
    isLoading
  } = useNui();
  
  const [amount, setAmount] = useState('');
  const [reason, setReason] = useState('');
  const [selectedPlayer, setSelectedPlayer] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  useEffect(() => {
    return () => {
      isMounted.current = false;
    };
  }, []);
  
  useEffect(() => {
    if (showQuickBill) {
      setAmount('');
      setReason('');
      setSelectedPlayer(null);
      setSubmitting(false);
      setError(null);
      
      try {
        fetchNearbyPlayers();
      } catch (err) {
        console.error('Error fetching nearby players:', err);
      }
    }
  }, [showQuickBill, fetchNearbyPlayers]);
  
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && showQuickBill) {
        e.preventDefault();
        closeQuickBill();
      }
    };
    
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, [showQuickBill, closeQuickBill]);
  
  useEffect(() => {
    const handleMessage = (e: MessageEvent) => {
      if (e.data && e.data.type === 'forceCloseQuickBill' && isMounted.current) {
        setSubmitting(false);
      }
    };
    
    window.addEventListener('message', handleMessage);
    return () => window.removeEventListener('message', handleMessage);
  }, []);
  
  if (!showQuickBill) return null;
  
  const handleReasonChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setReason(value);
    if (error) setError(null);
  };
  
  const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (/^(\d*\.?\d{0,2})?$/.test(value)) {
      setAmount(value);
      if (error) setError(null);
    }
  };
  
  const handleClickPlayer = (playerId: string) => {
    if (!submitting) {
      setSelectedPlayer(playerId);
      if (error) setError(null);
    }
  };
  
  const handleSubmit = async () => {
    if (!selectedPlayer) {
      setError('Please select a player');
      setSubmitting(false);
      return;
    }
    
    if (!reason.trim()) {
      setError('Please enter a reason');
      setSubmitting(false);
      return;
    }
    
    if (!amount || parseFloat(amount) <= 0) {
      setError('Please enter a valid amount');
      setSubmitting(false);
      return;
    }
    
    if (submitting || isLoading) return;
    
    setSubmitting(true);
    setError(null);
    
    try {
      const player = nearbyPlayers.find(p => p.id === selectedPlayer);
      
      if (!player || !player.cid) {
        setError('Selected player not found or has invalid ID');
        setSubmitting(false);
        return;
      }
      
      quickBillPlayer(player.cid, reason.trim(), parseFloat(amount));
      
    } catch (err) {
      console.error('Error submitting bill:', err);
      if (isMounted.current) {
        setError('An error occurred');
        setSubmitting(false);
      }
    }
  };
  
  const currencySymbol = getLocale('currencySymbol', '$');
  
  return (
    <Container onClick={(e) => e.stopPropagation()}>
      <Card>
        <Header>
          <Title>{getLocale('quickBillTitle', 'Quick Bill')}</Title>
          <CloseBtn onClick={() => !submitting && closeQuickBill()}>×</CloseBtn>
        </Header>
        
        <Content>
          {error && <ErrorMessage>{error}</ErrorMessage>}
          
          <Section>
            <Label>{getLocale('selectPlayer', 'Select Player')}</Label>
            <PlayerList>
              {isLoading ? (
                <LoadingText>Loading players...</LoadingText>
              ) : nearbyPlayers.length === 0 ? (
                <NoPlayers>{getLocale('noNearbyPlayers', 'No players nearby')}</NoPlayers>
              ) : (
                nearbyPlayers.map(player => (
                  <Player 
                    key={player.id}
                    $selected={selectedPlayer === player.id}
                    $disabled={submitting}
                    onClick={() => handleClickPlayer(player.id)}
                  >
                    {player.name}
                  </Player>
                ))
              )}
            </PlayerList>
          </Section>
          
          <FormField>
            <Label>{getLocale('reason', 'Reason')}</Label>
            <Input 
              type="text" 
              value={reason} 
              onChange={handleReasonChange}
              placeholder={getLocale('reasonPlaceholder', 'Enter reason')}
              disabled={submitting}
              maxLength={50}
            />
          </FormField>
          
          <FormField>
            <Label>{getLocale('amount', 'Amount')}</Label>
            <Input 
              type="text" 
              value={amount} 
              onChange={handleAmountChange}
              placeholder={`${currencySymbol}0.00`}
              disabled={submitting}
              maxLength={10}
            />
          </FormField>
        </Content>
        
        <Footer>
          <Button 
            onClick={handleSubmit}
            disabled={!selectedPlayer || !reason || !amount || submitting || isLoading}
          >
            {submitting || isLoading 
              ? getLocale('processing', 'Processing...') 
              : getLocale('sendBill', 'Send Bill')}
          </Button>
        </Footer>
      </Card>
    </Container>
  );
};

const Container = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 10;
`;

const Card = styled.div`
  width: 400px;
  max-width: 90%;
  background-color: #1f2937;
  border-radius: 8px;
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
  overflow: hidden;
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 16px;
  background-color: #111827;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
`;

const Title = styled.h2`
  margin: 0;
  color: white;
  font-size: 18px;
  font-weight: 600;
`;

const CloseBtn = styled.button`
  background: none;
  border: none;
  color: #9ca3af;
  font-size: 24px;
  cursor: pointer;
`;

const Content = styled.div`
  padding: 16px;
`;

const Section = styled.div`
  margin-bottom: 16px;
`;

const Label = styled.label`
  display: block;
  margin-bottom: 8px;
  color: #d1d5db;
  font-size: 14px;
`;

const PlayerList = styled.div`
  max-height: 150px;
  overflow-y: auto;
  background-color: #111827;
  border-radius: 4px;
  border: 1px solid rgba(255, 255, 255, 0.1);
`;

const Player = styled.div<{ $selected: boolean; $disabled: boolean }>`
  padding: 8px 12px;
  cursor: ${props => props.$disabled ? 'not-allowed' : 'pointer'};
  color: ${props => props.$selected ? 'white' : '#9ca3af'};
  background-color: ${props => props.$selected ? '#374151' : 'transparent'};
  opacity: ${props => props.$disabled ? 0.6 : 1};
  
  &:hover {
    background-color: ${props => props.$disabled ? (props.$selected ? '#374151' : 'transparent') : (props.$selected ? '#374151' : '#1e293b')};
  }
  
  &:not(:last-child) {
    border-bottom: 1px solid rgba(255, 255, 255, 0.05);
  }
`;

const NoPlayers = styled.div`
  padding: 12px;
  text-align: center;
  color: #9ca3af;
`;

const LoadingText = styled.div`
  padding: 12px;
  text-align: center;
  color: #9ca3af;
`;

const FormField = styled.div`
  margin-bottom: 16px;
`;

const Input = styled.input`
  width: 100%;
  padding: 10px;
  background-color: #111827;
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 4px;
  color: white;
  
  &:focus {
    outline: none;
    border-color: #3b82f6;
  }
`;

const Footer = styled.div`
  padding: 16px;
  display: flex;
  justify-content: flex-end;
  border-top: 1px solid rgba(255, 255, 255, 0.1);
`;

const Button = styled.button`
  padding: 8px 16px;
  background-color: #3b82f6;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  
  &:hover:not(:disabled) {
    background-color: #2563eb;
  }
  
  &:disabled {
    background-color: #4b5563;
    cursor: not-allowed;
    opacity: 0.6;
  }
`;

const ErrorMessage = styled.div`
  margin-bottom: 16px;
  padding: 8px 12px;
  background-color: rgba(239, 68, 68, 0.2);
  border: 1px solid rgba(239, 68, 68, 0.5);
  border-radius: 4px;
  color: #ef4444;
  font-size: 14px;
`;

export default QuickBill; 