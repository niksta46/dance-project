import React from 'react';
import './ErrorMessage.css';

/**
 * ErrorMessage component - Displays error messages with contextual styling
 * @param {Object} props - Component props
 * @param {string|Error|Object} props.error - Error to display (string, Error object, or DRF error object)
 * @param {string} props.title - Optional title for the error message
 * @param {Function} props.onRetry - Optional retry callback function
 * @param {boolean} props.showDetails - Whether to show detailed error info
 * @param {string} props.variant - Visual variant ('danger', 'warning', 'info')
 * @param {string} props.className - Additional CSS classes
 * @returns {JSX.Element|null} Error message display or null if no error
 */
const ErrorMessage = ({ 
  error, 
  title = 'Error',
  onRetry = null,
  showDetails = false,
  variant = 'danger',
  className = ''
}) => {
  if (!error) {
    return null;
  }

  // Extract error message based on error type
  const getErrorMessage = () => {
    // String error
    if (typeof error === 'string') {
      return error;
    }

    // Error object
    if (error instanceof Error) {
      return error.message;
    }

    // DRF validation errors (object with field errors)
    if (typeof error === 'object' && !error.message) {
      const errors = [];
      Object.entries(error).forEach(([field, messages]) => {
        if (Array.isArray(messages)) {
          errors.push(`${field}: ${messages.join(', ')}`);
        } else {
          errors.push(`${field}: ${messages}`);
        }
      });
      return errors.length > 0 ? errors.join('; ') : 'An error occurred';
    }

    // Object with message property
    if (error.message) {
      return error.message;
    }

    // Object with detail property (DRF standard error)
    if (error.detail) {
      return error.detail;
    }

    return 'An unexpected error occurred';
  };

  const getErrorDetails = () => {
    if (!showDetails || typeof error !== 'object') {
      return null;
    }

    // For Error objects, show stack trace
    if (error instanceof Error && error.stack) {
      return error.stack;
    }

    // For objects, show JSON representation
    try {
      return JSON.stringify(error, null, 2);
    } catch {
      return null;
    }
  };

  const message = getErrorMessage();
  const details = getErrorDetails();

  return (
    <div 
      className={`error-message error-message--${variant} ${className}`}
      role="alert"
      aria-live="assertive"
    >
      <div className="error-message__content">
        <div className="error-message__icon" aria-hidden="true">
          {variant === 'danger' && '⚠️'}
          {variant === 'warning' && '⚡'}
          {variant === 'info' && 'ℹ️'}
        </div>
        <div className="error-message__text">
          <h3 className="error-message__title">{title}</h3>
          <p className="error-message__description">{message}</p>
          {details && (
            <details className="error-message__details">
              <summary>Show details</summary>
              <pre className="error-message__details-content">{details}</pre>
            </details>
          )}
        </div>
      </div>
      {onRetry && (
        <button 
          className="error-message__retry-btn"
          onClick={onRetry}
          type="button"
        >
          Try Again
        </button>
      )}
    </div>
  );
};

export default ErrorMessage;