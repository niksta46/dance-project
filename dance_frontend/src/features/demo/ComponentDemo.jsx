import React, { useState } from 'react';
import { Loading, ErrorMessage, EmptyState, EmptyStatePresets } from '../../components/common';
import './ComponentDemo.css';

/**
 * Demo page to showcase common components
 */
const ComponentDemo = () => {
  const [showError, setShowError] = useState(false);
  const [errorType, setErrorType] = useState('string');

  // Different error examples
  const errors = {
    string: 'This is a simple string error message',
    error: new Error('This is a JavaScript Error object'),
    drf: { detail: 'This is a Django REST Framework error response' },
    validation: {
      email: ['Email is required', 'Email must be valid'],
      password: 'Password must be at least 8 characters'
    }
  };

  return (
    <div className="component-demo">
      <h1>Common Components Demo</h1>

      {/* Loading Component Section */}
      <section className="demo-section">
        <h2>Loading Component</h2>
        <div className="demo-grid">
          <div className="demo-item">
            <h3>Small</h3>
            <Loading size="small" text="Loading..." />
          </div>
          <div className="demo-item">
            <h3>Medium (default)</h3>
            <Loading size="medium" text="Loading data..." />
          </div>
          <div className="demo-item">
            <h3>Large</h3>
            <Loading size="large" text="Processing..." />
          </div>
          <div className="demo-item">
            <h3>No text</h3>
            <Loading size="medium" text="" />
          </div>
        </div>
      </section>

      {/* ErrorMessage Component Section */}
      <section className="demo-section">
        <h2>ErrorMessage Component</h2>
        
        <div className="demo-controls">
          <label>
            Error Type:
            <select value={errorType} onChange={(e) => setErrorType(e.target.value)}>
              <option value="string">String Error</option>
              <option value="error">Error Object</option>
              <option value="drf">DRF Error</option>
              <option value="validation">Validation Errors</option>
            </select>
          </label>
          <button onClick={() => setShowError(!showError)}>
            {showError ? 'Hide Error' : 'Show Error'}
          </button>
        </div>

        {showError && (
          <div className="demo-grid">
            <div className="demo-item">
              <h3>Danger (default)</h3>
              <ErrorMessage 
                error={errors[errorType]}
                title="Something went wrong"
                onRetry={() => alert('Retry clicked!')}
                showDetails={errorType === 'error'}
                variant="danger"
              />
            </div>
            <div className="demo-item">
              <h3>Warning</h3>
              <ErrorMessage 
                error="This is a warning message"
                title="Warning"
                variant="warning"
              />
            </div>
            <div className="demo-item">
              <h3>Info</h3>
              <ErrorMessage 
                error="This is an informational message"
                title="Information"
                variant="info"
              />
            </div>
          </div>
        )}
      </section>

      {/* EmptyState Component Section */}
      <section className="demo-section">
        <h2>EmptyState Component</h2>
        <div className="demo-grid">
          <div className="demo-item">
            <h3>Default</h3>
            <EmptyState 
              title="No items found"
              message="Start by adding your first item to the collection."
              action={() => alert('Action clicked!')}
              actionText="Add Item"
            />
          </div>
          <div className="demo-item">
            <h3>Search variant</h3>
            <EmptyState 
              title="No search results"
              message="Try adjusting your filters"
              variant="search"
            />
          </div>
          <div className="demo-item">
            <h3>Error variant</h3>
            <EmptyState 
              title="Failed to load"
              message="Something went wrong"
              variant="error"
              action={() => alert('Retry clicked!')}
              actionText="Retry"
            />
          </div>
          <div className="demo-item">
            <h3>Success variant</h3>
            <EmptyState 
              title="All tasks complete!"
              message="Great job!"
              variant="success"
            />
          </div>
        </div>

        <h3>Preset Empty States</h3>
        <div className="demo-grid">
          <div className="demo-item">
            <h4>No Data</h4>
            <EmptyStatePresets.NoData />
          </div>
          <div className="demo-item">
            <h4>No Search Results</h4>
            <EmptyStatePresets.NoSearchResults />
          </div>
          <div className="demo-item">
            <h4>Coming Soon</h4>
            <EmptyStatePresets.ComingSoon />
          </div>
          <div className="demo-item">
            <h4>No Permission</h4>
            <EmptyStatePresets.NoPermission />
          </div>
        </div>
      </section>
    </div>
  );
};

export default ComponentDemo;