import React, { InputHTMLAttributes } from 'react';
import styled from 'styled-components';
import { FaSearch, FaTimes } from 'react-icons/fa';

interface SearchBarProps extends InputHTMLAttributes<HTMLInputElement> {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onClear?: () => void;
  placeholder?: string;
  compact?: boolean;
}

const SearchContainer = styled.div<{ $compact?: boolean }>`
  display: flex;
  align-items: center;
  background-color: rgba(0, 0, 0, 0.1);
  border-radius: ${({ $compact }) => ($compact ? '4px' : '6px')};
  padding: ${({ $compact }) => ($compact ? '0.25rem 0.5rem' : '0.4rem 0.6rem')};
  margin-bottom: ${({ $compact }) => ($compact ? '0.5rem' : '1rem')};
  width: 100%;
  max-width: 500px;
  transition: all 0.15s ease;
`;

const SearchIcon = styled.div<{ $compact?: boolean }>`
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--text-secondary);
  margin-right: 0.4rem;
  font-size: ${({ $compact }) => ($compact ? '0.75rem' : '0.85rem')};
  opacity: 0.7;
`;

const StyledInput = styled.input<{ $compact?: boolean }>`
  flex: 1;
  border: none;
  background: none;
  font-size: ${({ $compact }) => ($compact ? '0.8rem' : '0.85rem')};
  padding: ${({ $compact }) => ($compact ? '0.15rem 0' : '0.2rem 0')};
  
`;

const ClearButton = styled.button<{ $compact?: boolean }>`
  display: flex;
  align-items: center;
  justify-content: center;
  background: none;
  border: none;
  color: var(--text-secondary);
  cursor: pointer;
  transition: all 0.15s ease;
  padding: ${({ $compact }) => ($compact ? '0.15rem' : '0.2rem')};
  margin-left: 0.3rem;
  font-size: ${({ $compact }) => ($compact ? '0.7rem' : '0.8rem')};
  opacity: 0.7;
  border-radius: 50%;
  
  &:hover {
    color: var(--text-primary);
    opacity: 1;
  }
`;

const SearchBar: React.FC<SearchBarProps> = ({
  value,
  onChange,
  onClear,
  placeholder = 'Search...',
  compact = false,
  ...props
}) => {
  return (
    <SearchContainer $compact={compact}>
      <SearchIcon $compact={compact}>
        <FaSearch />
      </SearchIcon>
      
      <StyledInput
        type="text"
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        $compact={compact}
        {...props}
      />
      
      {value && onClear && (
        <ClearButton onClick={onClear} type="button" $compact={compact}>
          <FaTimes />
        </ClearButton>
      )}
    </SearchContainer>
  );
};

export default SearchBar; 