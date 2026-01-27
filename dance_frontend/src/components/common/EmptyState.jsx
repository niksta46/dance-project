import React from 'react';
import './EmptyState.css';

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

  return (
    <div 
      className={`empty-state empty-state--${variant} ${className}`}
      role="status"
      aria-live="polite"
    >
      {displayIcon && (
        <div className="empty-state__icon" aria-hidden="true">
          {displayIcon}
        </div>
      )}
      
      <h2 className="empty-state__title">{title}</h2>
      
      {message && (
        <p className="empty-state__message">{message}</p>
      )}
      
      {children && (
        <div className="empty-state__content">
          {children}
        </div>
      )}
      
      {action && (
        <button 
          className="empty-state__action-btn"
          onClick={action}
          type="button"
        >
          {actionText}
        </button>
      )}
    </div>
  );
};

export default EmptyState;