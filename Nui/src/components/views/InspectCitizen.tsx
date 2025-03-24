import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { FaSearch, FaUserAlt, FaSpinner, FaExclamationTriangle, FaArrowRight, FaNetworkWired } from 'react-icons/fa';
import SearchBar from '../shared/SearchBar';
import EmptyState from '../shared/EmptyState';
import Card from '../common/Card';
import { useNui } from '../../context/NuiContext';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  position: relative;
`;

const SearchSection = styled.div`
  margin-bottom: 1.5rem;
  max-width: 600px;
  
  input, input:focus, input:focus-visible {
    border: none;
    outline: none;
    box-shadow: none;
  }
  
  & > div {
    border: none;
  }
`;

const PlayersGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 1.25rem;
  max-height: 600px;
  overflow-y: auto;
  padding: 0.2rem;
  padding-right: 0.5rem;
  
  &::-webkit-scrollbar {
    width: 3px;
  }
`;

const PlayerCard = styled(Card)`
  display: flex;
  align-items: center;
  padding: 1.25rem;
  cursor: pointer;
  transition: all 0.15s ease;
  position: relative;
  overflow: hidden;
  border: 1px solid rgba(255, 255, 255, 0.05);
  
  &:hover {
    transform: translateY(-1px);
    box-shadow: 0 2px 6px rgba(0, 0, 0, 0.12);
    border-color: var(--primary-color);
  }
  
  &:active {
    transform: translateY(0);
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  }
`;

const PlayerAvatar = styled.div`
  width: 42px;
  height: 42px;
  border-radius: 50%;
  background-color: var(--primary-color);
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.25rem;
  margin-right: 1rem;
  flex-shrink: 0;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.12);
  transition: all 0.15s ease;
  
  ${PlayerCard}:hover & {
    transform: scale(1.03);
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
  }
  
  ${PlayerCard}:active & {
    transform: scale(0.97);
  }
`;

const PlayerInfo = styled.div`
  flex: 1;
`;

const PlayerName = styled.h3`
  font-size: 1.1rem;
  font-weight: 600;
  margin-bottom: 0.25rem;
  color: var(--text-primary);
`;

const PlayerCID = styled.p`
  font-size: 0.9rem;
  color: var(--text-secondary);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  max-width: 200px;
`;

const ArrowIcon = styled.div`
  color: var(--text-secondary);
  margin-left: 1rem;
  background: rgba(255, 255, 255, 0.05);
  width: 36px;
  height: 36px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.15s ease;
  
  svg {
    font-size: 1rem;
  }
  
  ${PlayerCard}:hover & {
    background: var(--primary-color);
    color: white;
    transform: translateX(2px);
  }
  
  ${PlayerCard}:active & {
    transform: translateX(1px) scale(0.97);
  }
`;

const SpinnerContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 3rem 0;
  color: var(--text-secondary);
`;

const Spinner = styled(FaSpinner)`
  font-size: 2.5rem;
  animation: spin 1s linear infinite;
  margin-bottom: 1rem;
  color: var(--primary-color);
  
  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }
`;

const StyledEmptyState = styled(EmptyState)`
  margin-top: -20px;
`;

const ErrorMessage = styled.div`
  padding: 1rem;
  background-color: rgba(220, 38, 38, 0.1);
  border: 1px solid rgba(220, 38, 38, 0.2);
  border-radius: 8px;
  color: var(--text-primary);
  margin-bottom: 1.5rem;
  display: flex;
  align-items: center;
  
  svg {
    margin-right: 0.75rem;
    color: rgb(220, 38, 38);
    font-size: 1.25rem;
  }
`;

const InspectCitizen: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [hasError, setHasError] = useState(false);
  
  const { players = [], fetchOnlinePlayers, fetchPlayerBills, getLocale } = useNui();
  
  useEffect(() => {
    if (searchTerm.length >= 2 && players && players.length > 0) {
      setIsLoading(false);
    }
    
    return () => {
      setIsLoading(false);
      setHasError(false);
    };
  }, [players, searchTerm]);
  
  const getFilteredPlayers = () => {
    if (!searchTerm || searchTerm.length < 2) return [];
    
    const search = searchTerm.toLowerCase().trim();
    
    return players.filter(player => {
      if (!player) return false;
      
      const name = ((player.name || '') + '').toLowerCase();
      const cid = ((player.cid || player.id || '') + '').toLowerCase();
      
      return name.indexOf(search) !== -1 || cid.indexOf(search) !== -1;
    });
  };
  
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value || '';
    setSearchTerm(value);
    
    if (value.length < 2) {
      setIsLoading(false);
      return;
    }
    
    if (value.length >= 2) {
      setIsLoading(true);
      setHasError(false);
      
      try {
        fetchOnlinePlayers(value);
        
        setTimeout(() => {
          setIsLoading(false);
        }, 1000); 
      } catch (err) {
        console.error('Error fetching players:', err);
        setHasError(true);
        setIsLoading(false);
      }
    }
  };
  
  const handleClearSearch = () => {
    setSearchTerm('');
    setIsLoading(false);
    setHasError(false);
  };
  
  const handlePlayerClick = (cid: string) => {
    if (!cid) return;
    
    try {
      
      setTimeout(() => {
        fetchPlayerBills(cid);
      }, 100);
    } catch (err) {
      console.error('Error handling player click:', err);
      setHasError(true);
      setIsLoading(false);
    }
  };
  
  const filteredPlayers = getFilteredPlayers();
  
  return (
    <Container>
      <SearchSection>
        <SearchBar
          value={searchTerm}
          onChange={handleSearchChange}
          onClear={handleClearSearch}
          placeholder={getLocale('searchByNameOrCid', 'Search by name or CID...')}
        />
      </SearchSection>
      
      {hasError && (
        <ErrorMessage>
          <FaNetworkWired />
          <span>
            {getLocale('networkError', 'Network error. Showing limited results instead.')}
          </span>
        </ErrorMessage>
      )}
      
      {isLoading ? (
        <SpinnerContainer>
          <Spinner />
          <p>{getLocale('loadingPlayers', 'Loading players...')}</p>
        </SpinnerContainer>
      ) : searchTerm.length < 2 ? (
        <StyledEmptyState
          icon={<FaSearch />}
          title={getLocale('searchToInspect', 'Search to Inspect Citizens')}
          description={getLocale(
            'startSearchingDesc',
            'Enter a name or CID to search for citizens to inspect their bills.'
          )}
        />
      ) : filteredPlayers.length === 0 ? (
        <StyledEmptyState
          icon={<FaExclamationTriangle />}
          title={getLocale('noResultsFound', 'No Results Found')}
          description={getLocale(
            'trySearchingDifferentName',
            'Try searching for a different name or CID.'
          )}
        />
      ) : (
        <PlayersGrid>
          {filteredPlayers.map((player) => (
            <PlayerCard
              key={player.cid || player.id || Math.random().toString()}
              onClick={() => handlePlayerClick(player.cid || player.id || '')}
              hoverable
            >
              <PlayerAvatar>
                <FaUserAlt />
              </PlayerAvatar>
              <PlayerInfo>
                <PlayerName>{player.name || 'Unknown'}</PlayerName>
                <PlayerCID>CID: {(player.cid || player.id || 'Unknown').slice(0, 10)}</PlayerCID>
              </PlayerInfo>
              <ArrowIcon>
                <FaArrowRight />
              </ArrowIcon>
            </PlayerCard>
          ))}
        </PlayersGrid>
      )}
    </Container>
  );
};

export default InspectCitizen; 