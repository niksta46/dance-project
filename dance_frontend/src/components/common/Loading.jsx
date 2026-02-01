import React from 'react';
import { Spinner } from 'flowbite-react';

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
  const sizeMap = {
    small: 'sm',
    medium: 'md', 
    large: 'xl'
  };

  const spinnerSize = sizeMap[size] || 'md';
  const containerClasses = `
    flex flex-col items-center justify-center 
    ${fullScreen ? 'fixed inset-0 bg-white bg-opacity-90 z-50' : 'p-4'} 
    ${className}
  `;

  return (
    <div className={containerClasses} role="status" aria-live="polite">
      <Spinner 
        color="gray"
        className="fill-slate-700 dark:fill-slate-300"
        size={spinnerSize}
        aria-hidden="true"
      />
      {text && (
        <p className="mt-3 text-label text-sm font-medium animate-pulse">
          {text}
        </p>
      )}
      <span className="sr-only">{text || 'Loading content'}</span>
    </div>
  );
};

export default Loading;