import React from 'react';

interface CardProps {
  children: React.ReactNode;
  className?: string;
  padding?: 'none' | 'sm' | 'md' | 'lg' | 'xl';
  hover?: boolean;
  glassmorphism?: boolean;
}

const Card: React.FC<CardProps> = ({
  children,
  className = '',
  padding = 'md',
  hover = false,
  glassmorphism = false
}) => {
  const baseClasses = 'rounded-2xl border transition-all duration-300';
  
  const paddingClasses = {
    none: '',
    sm: 'p-4',
    md: 'p-6',
    lg: 'p-8',
    xl: 'p-10'
  };

  const styleClasses = glassmorphism
    ? 'bg-white/70 backdrop-blur-xl border-white/20 shadow-xl'
    : 'bg-white border-gray-200 shadow-sm';

  const hoverClasses = hover ? 'hover:shadow-lg hover:scale-105' : '';

  return (
    <div className={`${baseClasses} ${styleClasses} ${paddingClasses[padding]} ${hoverClasses} ${className}`}>
      {children}
    </div>
  );
};

export default Card;