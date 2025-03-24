import React from 'react';
import styled, { css } from 'styled-components';

export type CardVariant = 'default' | 'outlined' | 'elevated';

interface CardProps {
  variant?: CardVariant;
  title?: string;
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
  hoverable?: boolean;
  padding?: string;
}

const getVariantStyles = (variant: CardVariant) => {
  switch (variant) {
    case 'default':
      return css`
        background-color: var(--card-bg);
        border: none;
        box-shadow: var(--shadow-sm);
      `;
    case 'outlined':
      return css`
        background-color: var(--card-bg);
        border: 1px solid var(--border-color);
        box-shadow: none;
      `;
    case 'elevated':
      return css`
        background-color: var(--card-bg);
        border: none;
        box-shadow: var(--shadow);
      `;
    default:
      return '';
  }
};

const StyledCard = styled.div<{
  $variant: CardVariant;
  $hoverable: boolean;
  $padding: string;
  $isClickable: boolean;
}>`
  border-radius: 0.5rem;
  overflow: hidden;
  transition: transform 0.2s ease, box-shadow 0.2s ease;
  ${(props) => getVariantStyles(props.$variant)}
  padding: ${(props) => props.$padding};
  
  ${(props) =>
    props.$hoverable &&
    css`
      &:hover {
        transform: translateY(-2px);
        box-shadow: var(--shadow);
      }
    `}

  ${(props) =>
    props.$isClickable &&
    css`
      cursor: pointer;
    `}
`;

const CardTitle = styled.h3`
  font-size: 1.1rem;
  font-weight: 600;
  margin-bottom: 1rem;
  color: var(--text-primary);
`;

export const Card: React.FC<CardProps> = ({
  variant = 'default',
  title,
  children,
  className,
  onClick,
  hoverable = false,
  padding = '1rem',
  ...props
}) => {
  return (
    <StyledCard
      $variant={variant}
      $hoverable={hoverable}
      $padding={padding}
      $isClickable={!!onClick}
      className={className}
      onClick={onClick}
      {...props}
    >
      {title && <CardTitle>{title}</CardTitle>}
      {children}
    </StyledCard>
  );
};

export default Card; 