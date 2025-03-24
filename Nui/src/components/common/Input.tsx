import React, { InputHTMLAttributes } from 'react';
import styled, { css } from 'styled-components';

export type InputSize = 'small' | 'medium' | 'large';

interface InputProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'size'> {
  label?: string;
  error?: string;
  icon?: React.ReactNode;
  iconPosition?: 'left' | 'right';
  size?: InputSize;
  fullWidth?: boolean;
}

const getSizeStyles = (size: InputSize) => {
  switch (size) {
    case 'small':
      return css`
        padding: 0.4rem 0.8rem;
        font-size: 0.8rem;
      `;
    case 'medium':
      return css`
        padding: 0.6rem 1rem;
        font-size: 0.95rem;
      `;
    case 'large':
      return css`
        padding: 0.8rem 1.2rem;
        font-size: 1.1rem;
      `;
    default:
      return '';
  }
};

const InputContainer = styled.div<{ $fullWidth: boolean }>`
  display: flex;
  flex-direction: column;
  width: ${(props) => (props.$fullWidth ? '100%' : 'auto')};
  margin-bottom: 1rem;
`;

const InputLabel = styled.label`
  margin-bottom: 0.5rem;
  font-size: 0.9rem;
  font-weight: 500;
  color: var(--text-primary);
`;

const InputWrapper = styled.div`
  position: relative;
  display: flex;
  align-items: center;
`;

const StyledInput = styled.input<{
  $size: InputSize;
  $hasError: boolean;
  $hasIcon: boolean;
  $iconPosition: 'left' | 'right';
}>`
  width: 100%;
  border-radius: 0.375rem;
  border: 1px solid ${(props) => (props.$hasError ? 'var(--danger-color)' : 'var(--border-color)')};
  background-color: var(--card-bg);
  color: var(--text-primary);
  ${(props) => getSizeStyles(props.$size)}
  padding-left: ${(props) => (props.$hasIcon && props.$iconPosition === 'left' ? '2.5rem' : '')};
  padding-right: ${(props) => (props.$hasIcon && props.$iconPosition === 'right' ? '2.5rem' : '')};
  transition: border-color 0.2s ease, box-shadow 0.2s ease;

  &:focus {
    outline: none;
    border-color: var(--primary-color);
    box-shadow: 0 0 0 2px rgba(37, 99, 235, 0.2);
  }

  &:disabled {
    background-color: var(--background-color);
    cursor: not-allowed;
    opacity: 0.7;
  }

  &::placeholder {
    color: var(--text-secondary);
    opacity: 0.7;
  }
`;

const IconWrapper = styled.div<{ $position: 'left' | 'right' }>`
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  ${(props) => (props.$position === 'left' ? 'left: 0.8rem;' : 'right: 0.8rem;')}
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--text-secondary);
`;

const ErrorMessage = styled.p`
  margin-top: 0.4rem;
  color: var(--danger-color);
  font-size: 0.8rem;
`;

export const Input: React.FC<InputProps> = ({
  label,
  error,
  icon,
  iconPosition = 'left',
  size = 'medium',
  fullWidth = false,
  ...props
}) => {
  return (
    <InputContainer $fullWidth={fullWidth}>
      {label && <InputLabel>{label}</InputLabel>}
      <InputWrapper>
        {icon && <IconWrapper $position={iconPosition}>{icon}</IconWrapper>}
        <StyledInput
          $size={size}
          $hasError={!!error}
          $hasIcon={!!icon}
          $iconPosition={iconPosition}
          {...props}
        />
      </InputWrapper>
      {error && <ErrorMessage>{error}</ErrorMessage>}
    </InputContainer>
  );
};

export default Input; 