import React from 'react';
import { Alert } from 'flowbite-react';
import { Button } from 'flowbite-react';

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

  const alertColor = {
    danger: 'failure',
    warning: 'warning', 
    info: 'info'
  }[variant] || 'failure';

  return (
    <div className={`space-y-4 ${className}`}>
      <Alert 
        color={alertColor}
        onDismiss={!onRetry}
        role="alert"
        aria-live="assertive"
      >
        <div className="flex items-start">
          <div className="flex-1">
            <h3 className="text-sm font-semibold text-gray-900 dark:text-white">
              {title}
            </h3>
            <p className="text-sm text-gray-700 dark:text-gray-300 mt-1">
              {message}
            </p>
            {details && (
              <details className="mt-3">
                <summary className="text-xs text-label cursor-pointer hover:text-primary-600">
                  Show details
                </summary>
                <pre className="mt-2 p-2 bg-neutral-50 rounded text-xs text-text overflow-auto">
                  {details}
                </pre>
              </details>
            )}
          </div>
        </div>
      </Alert>
      {onRetry && (
        <Button 
          color="primary"
          size="sm"
          onClick={onRetry}
          className="w-full sm:w-auto"
        >
          Try Again
        </Button>
      )}
    </div>
  );
};

export default ErrorMessage;