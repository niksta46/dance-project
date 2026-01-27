import React from 'react';
import './Loading.css';

/**
 * Loading component - Displays a loading indicator
 * @param {Object} props - Component props
 * @param {string} props.size - Size of the loader ('small', 'medium', 'large')
 * @param {string} props.text - Optional loading text to display
 * @param {boolean} props.fullScreen - Whether to show fullscreen loader
 * @param {string} props.className - Additional CSS classes
 * @returns {JSX.Element} Loading indicator
 */
const Loading = ({ 
  size = 'medium', 
  text = 'Loading...', 
  fullScreen = false,
  className = '' 
}) => {
  const sizeClasses = {
    small: 'loading--small',
    medium: 'loading--medium',
    large: 'loading--large'
  };

  const containerClass = `loading ${sizeClasses[size]} ${fullScreen ? 'loading--fullscreen' : ''} ${className}`;

  return (
    <div className={containerClass} role="status" aria-live="polite">
      <div className="loading__spinner">
        <div className="loading__spinner-circle"></div>
      </div>
      {text && (
        <p className="loading__text">{text}</p>
      )}
      <span className="sr-only">{text || 'Loading content'}</span>
    </div>
  );
};

export default Loading;