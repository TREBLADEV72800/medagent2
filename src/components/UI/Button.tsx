import React from 'react';
import { UrgencyLevel } from '../../types';
import { AlertTriangle, CheckCircle, Info, XCircle } from 'lucide-react';

interface BadgeProps {
  children: React.ReactNode;
  variant?: 'default' | 'success' | 'warning' | 'danger' | UrgencyLevel;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
  withIcon?: boolean;
}

const Badge: React.FC<BadgeProps> = ({
  children,
  variant = 'default',
  size = 'md',
  className = '',
  withIcon = false
}) => {
  const baseClasses = 'inline-flex items-center font-medium rounded-full';

  const sizeClasses = {
    sm: 'px-2 py-1 text-xs gap-1',
    md: 'px-3 py-1 text-sm gap-2',
    lg: 'px-4 py-2 text-base gap-2.5'
  };

  const variantClasses = {
    default: 'bg-gray-100 text-gray-800',
    success: 'bg-green-100 text-green-800',
    warning: 'bg-yellow-100 text-yellow-800',
    danger: 'bg-red-100 text-red-800',
    low: 'bg-green-100 text-green-800',
    medium: 'bg-yellow-100 text-yellow-800',
    high: 'bg-red-100 text-red-800'
  };

  const variantIcons = {
    success: <CheckCircle className="w-4 h-4" />,
    warning: <AlertTriangle className="w-4 h-4" />,
    danger: <XCircle className="w-4 h-4" />,
    default: <Info className="w-4 h-4" />,
    low: <CheckCircle className="w-4 h-4" />,
    medium: <AlertTriangle className="w-4 h-4" />,
    high: <XCircle className="w-4 h-4" />
  };

  const safeVariant = variant in variantClasses ? variant : 'default';
  const safeSize = size in sizeClasses ? size : 'md';

  return (
    <span
      className={`${baseClasses} ${sizeClasses[safeSize]} ${variantClasses[safeVariant]} ${className}`}
      role="status"
      aria-label={`Badge ${safeVariant}`}
    >
      {withIcon && variantIcons[safeVariant]}
      {children}
    </span>
  );
};

export default Badge;
