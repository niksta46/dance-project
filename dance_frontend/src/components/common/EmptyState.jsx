import React from 'react';
import { Button } from 'flowbite-react';

/**
 * EmptyState component - Displays a message when content is empty or not found
 * @param {Object} props - Component props
 * @param {string} props.title - Main title text
 * @param {string} props.message - Descriptive message
 * @param {string} props.icon - Optional emoji or text icon
 * @param {Function} props.action - Optional action callback
 * @param {string} props.actionText - Text for action button
 * @param {React.ReactNode} props.children - Optional custom content
 * @param {string} props.variant - Visual variant ('default', 'search', 'error', 'success')
 * @param {string} props.className - Additional CSS classes
 * @returns {JSX.Element} Empty state display
 */
const EmptyState = ({ 
  title = 'No content available',
  message = '',
  icon = null,
  action = null,
  actionText = 'Take Action',
  children = null,
  variant = 'default',
  className = ''
}) => {
  // Default icons for different variants
  const getDefaultIcon = () => {
    if (icon) return icon;
    
    switch (variant) {
      case 'search':
        return '🔍';
      case 'error':
        return '❌';
      case 'success':
        return '✅';
      default:
        return '📭';
    }
  };

  const displayIcon = getDefaultIcon();

  const variantClasses = {
    default: 'text-neutral-500',
    search: 'text-secondary-600',
    error: 'text-red-500',
    success: 'text-primary-600'
  }[variant] || 'text-neutral-500';

  return (
    <div 
      className={`flex flex-col items-center justify-center text-center py-12 px-4 ${className}`}
      role="status"
      aria-live="polite"
    >
      {displayIcon && (
        <div 
          className={`text-4xl md:text-6xl mb-4 ${variantClasses}`}
          aria-hidden="true"
        >
          {displayIcon}
        </div>
      )}
      
      <h2 className="text-xl md:text-2xl font-semibold text-text mb-2">
        {title}
      </h2>
      
      {message && (
        <p className="text-label max-w-md mb-6">
          {message}
        </p>
      )}
      
      {children && (
        <div className="w-full max-w-md mb-6">
          {children}
        </div>
      )}
      
      {action && (
        <Button 
          color="primary"
          size="md"
          onClick={action}
          className="w-full sm:w-auto"
        >
          {actionText}
        </Button>
      )}
    </div>
  );
};

export default EmptyState;