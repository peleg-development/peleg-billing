import React, { ButtonHTMLAttributes } from 'react';
import styled, { css } from 'styled-components';

export type ButtonVariant = 'primary' | 'secondary' | 'success' | 'warning' | 'danger' | 'ghost';
export type ButtonSize = 'small' | 'medium' | 'large';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  icon?: React.ReactNode;
  iconPosition?: 'left' | 'right';
  fullWidth?: boolean;
}

const getVariantStyles = (variant: ButtonVariant) => {
  switch (variant) {
    case 'primary':
      return css`
        background-color: var(--primary-color);
        color: white;
        &:hover:not(:disabled) {
          background-color: var(--primary-hover);
        }
      `;
    case 'secondary':
      return css`
        background-color: var(--secondary-color);
        color: white;
        &:hover:not(:disabled) {
          background-color: var(--secondary-hover);
        }
      `;
    case 'success':
      return css`
        background-color: var(--success-color);
        color: white;
        &:hover:not(:disabled) {
          filter: brightness(90%);
        }
      `;
    case 'warning':
      return css`
        background-color: var(--warning-color);
        color: white;
        &:hover:not(:disabled) {
          filter: brightness(90%);
        }
      `;
    case 'danger':
      return css`
        background-color: var(--danger-color);
        color: white;
        &:hover:not(:disabled) {
          filter: brightness(90%);
        }
      `;
    case 'ghost':
      return css`
        background-color: transparent;
        color: var(--text-primary);
        &:hover:not(:disabled) {
          background-color: rgba(0, 0, 0, 0.05);
        }
      `;
    default:
      return '';
  }
};

const getSizeStyles = (size: ButtonSize) => {
  switch (size) {
    case 'small':
      return css`
        padding: 0.4rem 0.8rem;
        font-size: 0.8rem;
      `;
    case 'medium':
      return css`
        padding: 0.6rem 1.2rem;
        font-size: 0.95rem;
      `;
    case 'large':
      return css`
        padding: 0.8rem 1.6rem;
        font-size: 1.1rem;
      `;
    default:
      return '';
  }
};

const StyledButton = styled.button<{
  $variant: ButtonVariant;
  $size: ButtonSize;
  $fullWidth: boolean;
  $hasIcon: boolean;
  $iconPosition: 'left' | 'right';
}>`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  border-radius: 0.375rem;
  font-weight: 500;
  border: none;
  cursor: pointer;
  transition: all 0.2s ease;
  width: ${(props) => (props.$fullWidth ? '100%' : 'auto')};

  ${(props) => getVariantStyles(props.$variant)}
  ${(props) => getSizeStyles(props.$size)}

  ${(props) =>
    props.$iconPosition === 'right' &&
    css`
      flex-direction: row-reverse;
    `}

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }

  &:focus {
    outline: none;
    box-shadow: 0 0 0 2px var(--primary-color);
  }
`;

export const Button: React.FC<ButtonProps> = ({
  variant = 'primary',
  size = 'medium',
  icon,
  iconPosition = 'left',
  fullWidth = false,
  children,
  ...props
}) => {
  return (
    <StyledButton
      $variant={variant}
      $size={size}
      $fullWidth={fullWidth}
      $hasIcon={!!icon}
      $iconPosition={iconPosition}
      {...props}
    >
      {icon && icon}
      {children}
    </StyledButton>
  );
};

export default Button; 