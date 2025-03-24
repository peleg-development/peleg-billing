import React, { useState, useEffect } from 'react';
import styled, { keyframes } from 'styled-components';
import { FaSpinner, FaUserSlash, FaPaperPlane, FaUser, FaMoneyCheckAlt, FaReceipt, FaCheckCircle } from 'react-icons/fa';
import { useNui } from '../../context/NuiContext';
import Input from '../common/Input';
import Button from '../common/Button';
import SearchBar from '../shared/SearchBar';
import EmptyState from '../shared/EmptyState';

interface BillPlayerProps {
  hideHeader?: boolean;
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  overflow: hidden;
  max-width: 100%;
  position: relative;
  
  .min-h-auto {
    min-height: 585px;
    display: flex;
    flex-direction: column;
    justify-content: center;
  }
  
  .billing-empty-state {
    min-height: 585px;
  }
`;

const BillingWorkspace = styled.div`
  display: grid;
  grid-template-columns: 280px 1fr;
  height: 100%; 
  max-height: 775px;
  gap: 0.75rem;
  overflow: hidden;
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    grid-template-rows: auto 1fr;
  }
`;

const PlayersPanel = styled.div`
  background: var(--card-bg);
  border-radius: 8px;
  overflow: hidden;
  box-shadow: var(--shadow);
  border: 1px solid var(--border-color);
  display: flex;
  flex-direction: column;
  height: 100%;
  max-height: 775px;
`;

const SectionHeader = styled.div`
  background-color: rgba(0, 0, 0, 0.15);
  padding: 0.65rem 0.75rem;
  border-bottom: 1px solid var(--border-color);
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const SectionTitle = styled.h3`
  font-size: 0.9rem;
  font-weight: 600;
  color: var(--text-primary);
  margin: 0;
  display: flex;
  align-items: center;
  gap: 0.4rem;
  
  svg {
    color: var(--primary-color);
  }
`;

const SearchWrapper = styled.div`
  padding: 0.6rem;
  background-color: rgba(0, 0, 0, 0.05);
  border-bottom: 1px solid var(--border-color);
  
  & > div {
    margin-bottom: 0;
    border: none;
  }
  
  input, input:focus, input:focus-visible {
    border: none;
    outline: none;
    box-shadow: none;
  }
`;

const PlayersList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.35rem;
  overflow-y: auto;
  padding: 0.75rem 0.5rem;
  flex: 1;
  
  &::-webkit-scrollbar {
    width: 3px;
  }
  
  &::-webkit-scrollbar-track {
    background: transparent;
  }
  
  &::-webkit-scrollbar-thumb {
    background: rgba(255, 255, 255, 0.1);
    border-radius: 10px;
  }
  
  &:hover::-webkit-scrollbar-thumb {
    background: rgba(255, 255, 255, 0.2);
  }
`;

const PlayerCard = styled.div<{ $isSelected: boolean }>`
  background: ${({ $isSelected }) => 
    $isSelected 
      ? 'linear-gradient(135deg, var(--primary-color), var(--primary-hover))' 
      : 'rgba(255, 255, 255, 0.02)'};
  border-radius: 6px;
  cursor: pointer;
  transition: all 0.2s ease;
  box-shadow: ${({ $isSelected }) =>
    $isSelected
      ? '0 2px 4px rgba(0, 0, 0, 0.2)'
      : 'none'};
  display: flex;
  align-items: center;
  padding: 0.5rem 0.75rem;
  border: 1px solid ${({ $isSelected }) =>
    $isSelected
      ? 'var(--accent-color)'
      : 'transparent'};
  
  &:hover {
    transform: translateY(-1px);
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.15);
    background: ${({ $isSelected }) =>
      $isSelected
        ? 'linear-gradient(135deg, var(--primary-color), var(--primary-hover))'
        : 'rgba(255, 255, 255, 0.04)'};
    border-color: ${({ $isSelected }) =>
      $isSelected
        ? 'var(--accent-color)'
        : 'rgba(255, 255, 255, 0.1)'};
  }
`;

const PlayerAvatar = styled.div`
  width: 32px;
  height: 32px;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.1);
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  margin-right: 0.5rem;
  flex-shrink: 0;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.2);
  
  svg {
    width: 16px;
    height: 16px;
  }
`;

const PlayerInfo = styled.div`
  flex: 1;
  min-width: 0;
`;

const PlayerName = styled.span<{ $isSelected: boolean }>`
  font-size: 1rem;
  font-weight: 600;
  color: ${({ $isSelected }) => 
    $isSelected ? 'white' : 'var(--text-primary)'};
  display: block;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const PlayerCID = styled.div<{ $isSelected: boolean }>`
  font-size: 0.85rem;
  color: ${({ $isSelected }) => 
    $isSelected ? 'rgba(255, 255, 255, 0.8)' : 'var(--text-secondary)'};
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  max-width: 200px;
`;

const BillingFormPanel = styled.div`
  background: var(--card-bg);
  border-radius: 8px;
  box-shadow: var(--shadow);
  border: 1px solid var(--border-color);
  display: flex;
  flex-direction: column;
  height: 100%;
  position: relative;
  max-height: 775px;
`;

const FormLayout = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  overflow: hidden;
`;

const BillingForm = styled.div`
  padding: 0.8rem 1rem;
  display: flex;
  flex-direction: column;
  height: 100%;
  overflow-y: auto;
  
  &::-webkit-scrollbar {
    width: 3px;
  }
  
  &::-webkit-scrollbar-track {
    background: transparent;
  }
  
  &::-webkit-scrollbar-thumb {
    background: rgba(255, 255, 255, 0.1);
    border-radius: 10px;
  }
`;

const ReceiptPanel = styled.div`
  background-color: rgba(0, 0, 0, 0.1);
  padding: 1rem;
  margin-top: -5px;
  border-top: 1px solid var(--border-color);
  border-radius: 0 0 8px 8px;
`;

const ReceiptHeader = styled.div`
  text-align: center;
  margin-bottom: 0.75rem;
`;

const ReceiptTitle = styled.h4`
  font-size: 0.95rem;
  color: var(--text-primary);
  margin: 0 0 0.25rem 0;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.4rem;
  
  svg {
    color: var(--primary-color);
  }
`;

const ReceiptSubtitle = styled.div`
  font-size: 0.75rem;
  color: var(--text-secondary);
`;

const ReceiptBody = styled.div`
  background: repeating-linear-gradient(
    0deg,
    transparent,
    transparent 18px,
    rgba(255, 255, 255, 0.02) 18px,
    rgba(255, 255, 255, 0.02) 19px
  );
  flex: 1;
  border-top: 1px dashed var(--border-color);
  border-bottom: 1px dashed var(--border-color);
  padding: 0.75rem 0;
  margin-bottom: 0.75rem;
`;

const ReceiptRow = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 0.65rem;
  
  &:last-child {
    margin-bottom: 0;
  }
`;

const ReceiptLabel = styled.div`
  font-size: 0.8rem;
  color: var(--text-secondary);
`;

const ReceiptValue = styled.div`
  font-size: 0.8rem;
  font-weight: 500;
  color: var(--text-primary);
  text-align: right;
  white-space: normal;
  word-break: break-all;
`;

const ReceiptTotal = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-top: 0.75rem;
  border-top: 1px solid rgba(255, 255, 255, 0.05);
`;

const TotalLabel = styled.div`
  font-size: 0.9rem;
  font-weight: 500;
  color: var(--text-primary);
`;

const TotalValue = styled.div`
  font-size: 1.2rem;
  font-weight: 600;
  color: var(--primary-color);
  text-shadow: 0 1px 2px rgba(0, 0, 0, 0.2);
`;

const FormGroup = styled.div`
  margin-bottom: 1.25rem;
`;

const FormLabel = styled.label`
  display: block;
  font-size: 0.9rem;
  font-weight: 500;
  color: var(--text-primary);
  margin-bottom: 0.5rem;
`;

const InputWrapper = styled.div`
  position: relative;
`;

const AmountPrefix = styled.div`
  position: absolute;
  left: 1rem;
  top: 50%;
  transform: translateY(-50%);
  color: var(--text-secondary);
  font-weight: 500;
  user-select: none;
  pointer-events: none;
`;

const FormActions = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-top: -14px;
  margin-bottom: 0.75rem;
`;

const SpinnerIcon = styled(FaSpinner)`
  font-size: 2rem;
  color: var(--primary-color);
  margin-bottom: 1rem;
  animation: spin 1s linear infinite;
  
  @keyframes spin {
    from { transform: rotate(0deg); }
    to { transform: rotate(360deg); }
  }
`;

const SelectedPlayerHeader = styled.div`
  display: flex;
  align-items: center;
  padding-bottom: 1.25rem;
  margin-bottom: 1.25rem;
  border-bottom: 1px solid var(--border-color);
`;

const SelectedPlayerAvatar = styled.div`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: var(--primary-color);
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 0.75rem;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.25);
  
  svg {
    width: 20px;
    height: 20px;
    color: white;
  }
`;

const SelectedPlayerInfo = styled.div`
  flex: 1;
`;

const SelectedPlayerName = styled.div`
  font-size: 1.1rem;
  font-weight: 600;
  color: var(--text-primary);
  margin-bottom: 0.15rem;
`;

const SelectedPlayerCID = styled.div`
  font-size: 0.85rem;
  color: var(--text-secondary);
  white-space: normal;
  word-break: break-all;
`;

const fadeIn = keyframes`
  from {
    opacity: 0;
    transform: scale(0.9);
  }
  to {
    opacity: 1;
    transform: scale(1);
  }
`;

const checkmarkAnimation = keyframes`
  0% {
    transform: scale(0);
    opacity: 0;
  }
  50% {
    transform: scale(1.2);
  }
  100% {
    transform: scale(1);
    opacity: 1;
  }
`;

const ConfirmationOverlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.2);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 100;
  animation: ${fadeIn} 0.3s ease-out;
  border-radius: 12px;
  backdrop-filter: none;
`;

const ConfirmationContent = styled.div`
  background: var(--card-bg);
  padding: 1.5rem;
  border-radius: 8px;
  text-align: center;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.3);
  border: 1px solid var(--accent-color);
  max-width: 80%;
`;

const ConfirmationIcon = styled(FaCheckCircle)`
  font-size: 2.5rem;
  color: var(--success-color, #4CAF50);
  margin-bottom: 0.75rem;
  animation: ${checkmarkAnimation} 0.5s ease-out;
`;

const ConfirmationTitle = styled.h3`
  font-size: 1.1rem;
  color: var(--text-primary);
  margin-bottom: 0.25rem;
`;

const ConfirmationText = styled.p`
  font-size: 0.85rem;
  color: var(--text-secondary);
  margin-bottom: 0;
`;

const BillPlayer: React.FC<BillPlayerProps> = () => {
  const { nearbyPlayers, isLoading, getLocale, billPlayer } = useNui();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedPlayer, setSelectedPlayer] = useState<null | typeof nearbyPlayers[0]>(null);
  const [billReason, setBillReason] = useState('');
  const [billAmount, setBillAmount] = useState<string>('');
  const [showConfirmation, setShowConfirmation] = useState(false);
  const currentDate = new Date().toLocaleDateString();

  useEffect(() => {
    if (showConfirmation) {
      const timer = setTimeout(() => {
        setShowConfirmation(false);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [showConfirmation]);

  const filteredPlayers = nearbyPlayers.filter(player => {
    const search = searchTerm.toLowerCase();
    return (
      player.name.toLowerCase().includes(search) ||
      player.cid.toLowerCase().includes(search)
    );
  });

  const handleSelectPlayer = (player: typeof nearbyPlayers[0]) => {
    setSelectedPlayer(player);
  };

  const handleSubmitBill = () => {
    if (selectedPlayer && billReason && billAmount) {
      billPlayer(selectedPlayer.cid, billReason, parseFloat(billAmount));
      setShowConfirmation(true);
      setBillReason('');
      setBillAmount('');
      setSelectedPlayer(null);
    }
  };

  const renderPlayerSelection = () => {
    if (isLoading) {
      return (
        <EmptyState
          icon={<SpinnerIcon />}
          title={getLocale('loadingNearbyPlayers', 'Loading nearby players...')}
          className="min-h-auto"
          transparent={true}
        />
      );
    }

    if (nearbyPlayers.length === 0) {
      return (
        <EmptyState
          icon={<FaUserSlash />}
          title={getLocale('noNearbyPlayersFound', 'No nearby players')}
          description={getLocale('noPlayersDescription', 'No players were found nearby. Get closer to players to bill them.')}
          className="min-h-auto"
          transparent={true}
        />
      );
    }
    
    return (
      <>
        <SearchWrapper>
          <SearchBar
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            onClear={() => setSearchTerm('')}
            placeholder={getLocale('searchPlayersPlaceholder', 'Search players...')}
          />
        </SearchWrapper>
        <PlayersList>
          {filteredPlayers.length === 0 && searchTerm.length > 0 ? (
            <div style={{ padding: '2rem', textAlign: 'center', color: 'var(--text-secondary)' }}>
              <FaUserSlash style={{ fontSize: '2rem', marginBottom: '1rem', opacity: 0.7 }} />
              <h3 style={{ marginBottom: '0.5rem', color: 'var(--text-primary)' }}>
                {getLocale('noMatchingPlayersFound', 'No matching players')}
              </h3>
              <p>
                {getLocale('noMatchingPlayersDescription', 'No players match your search criteria. Try a different search term.')}
              </p>
            </div>
          ) : (
            filteredPlayers.map((player) => (
              <PlayerCard
                key={player.cid}
                $isSelected={selectedPlayer?.cid === player.cid}
                onClick={() => handleSelectPlayer(player)}
              >
                <PlayerAvatar>
                  <FaUser />
                </PlayerAvatar>
                <PlayerInfo>
                  <PlayerName $isSelected={selectedPlayer?.cid === player.cid}>
                    {player.name}
                  </PlayerName>
                  <PlayerCID $isSelected={selectedPlayer?.cid === player.cid}>
                    #{player.cid.slice(0, 10)}
                  </PlayerCID>
                </PlayerInfo>
              </PlayerCard>
            ))
          )}
        </PlayersList>
      </>
    );
  };

  const renderBillingForm = () => {
    if (!selectedPlayer) {
      return (
        <EmptyState
          icon={<FaMoneyCheckAlt />}
          title={getLocale('noBillingForm', 'Select a player')}
          description={getLocale('selectPlayerPrompt', 'Select a player from the left panel to create a bill.')}
          className="min-h-auto billing-empty-state"
          transparent={true}
        />
      );
    }

    const formattedAmount = billAmount ? parseFloat(billAmount).toFixed(2) : '0.00';

    return (
      <FormLayout>
        <BillingForm>
          <SelectedPlayerHeader>
            <SelectedPlayerAvatar>
              <FaUser />
            </SelectedPlayerAvatar>
            <SelectedPlayerInfo>
              <SelectedPlayerName>{selectedPlayer.name}</SelectedPlayerName>
              <SelectedPlayerCID>#{selectedPlayer.cid.slice(0, 10)}</SelectedPlayerCID>
            </SelectedPlayerInfo>
          </SelectedPlayerHeader>

          <FormGroup>
            <FormLabel>{getLocale('reasonForBill', 'Reason for Bill')}</FormLabel>
            <Input
              type="text"
              value={billReason}
              onChange={(e) => setBillReason(e.target.value)}
              placeholder={getLocale('enterReasonPlaceholder', 'Enter reason for the bill...')}
            />
          </FormGroup>
          
          <FormGroup>
            <FormLabel>{getLocale('amountLabel', 'Amount')}</FormLabel>
            <InputWrapper>
              <AmountPrefix>{getLocale('currencySymbol', '$')}</AmountPrefix>
              <Input
                type="text"
                value={billAmount}
                onChange={(e) => {
                  const regex = /^[0-9]*\.?[0-9]*$/;
                  if (e.target.value === '' || regex.test(e.target.value)) {
                    setBillAmount(e.target.value);
                  }
                }}
                placeholder={getLocale('enterAmountPlaceholder', '0.00')}
                style={{ paddingLeft: '2rem' }}
              />
            </InputWrapper>
          </FormGroup>
          
          <FormActions>
            <Button
              onClick={handleSubmitBill}
              disabled={!billReason || !billAmount}
              icon={<FaPaperPlane />}
              variant="primary"
            >
              {getLocale('sendBill', 'Send Bill')}
            </Button>
          </FormActions>
        
          <ReceiptPanel>
            <ReceiptHeader>
              <ReceiptTitle>
                <FaReceipt />
                {getLocale('receiptTitle', 'Receipt')}
              </ReceiptTitle>
              <ReceiptSubtitle>{currentDate}</ReceiptSubtitle>
            </ReceiptHeader>
            
            <ReceiptBody>
              <ReceiptRow>
                <ReceiptLabel>{getLocale('recipient', 'Recipient:')}</ReceiptLabel>
                <ReceiptValue>{selectedPlayer.name}</ReceiptValue>
              </ReceiptRow>
              <ReceiptRow>
                <ReceiptLabel>{getLocale('citizenId', 'Citizen ID:')}</ReceiptLabel>
                <ReceiptValue>#{selectedPlayer.cid.slice(0, 10)}</ReceiptValue>
              </ReceiptRow>
              <ReceiptRow>
                <ReceiptLabel>{getLocale('reason', 'Reason:')}</ReceiptLabel>
                <ReceiptValue>{billReason || '-'}</ReceiptValue>
              </ReceiptRow>
            </ReceiptBody>
            
            <ReceiptTotal>
              <TotalLabel>{getLocale('totalDue', 'Total Due:')}</TotalLabel>
              <TotalValue>{getLocale('currencySymbol', '$')}{formattedAmount}</TotalValue>
            </ReceiptTotal>
          </ReceiptPanel>
        </BillingForm>
      </FormLayout>
    );
  };

  return (
    <Container>
      <BillingWorkspace>
        <PlayersPanel>
          <SectionHeader>
            <SectionTitle>
              <FaUser />
              {getLocale('selectRecipient', 'Select Recipient')}
            </SectionTitle>
          </SectionHeader>
          {renderPlayerSelection()}
        </PlayersPanel>
        
        <BillingFormPanel>
          <SectionHeader>
            <SectionTitle>
              <FaMoneyCheckAlt />
              {getLocale('createBill', 'Create Bill')}
            </SectionTitle>
          </SectionHeader>
          {renderBillingForm()}
          {showConfirmation && (
            <ConfirmationOverlay>
              <ConfirmationContent>
                <ConfirmationIcon />
                <ConfirmationTitle>{getLocale('billSentSuccessTitle', 'Bill Sent Successfully')}</ConfirmationTitle>
                <ConfirmationText>
                  {getLocale('billSentSuccessDescription', 'The bill has been sent to the player successfully.')}
                </ConfirmationText>
              </ConfirmationContent>
            </ConfirmationOverlay>
          )}
        </BillingFormPanel>
      </BillingWorkspace>
    </Container>
  );
};

export default BillPlayer;