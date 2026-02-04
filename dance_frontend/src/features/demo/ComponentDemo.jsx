import React, { useState } from 'react';
import { Loading, ErrorMessage, EmptyState, EmptyStatePresets } from '../../components/common';
import { colors, buttonVariants, cardVariants, textVariants, layout } from '../../styles/designSystem';
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
    <div className={`${layout.container} py-8`}>
      <h1 className={textVariants.heading.h1}>Design System & Components Demo</h1>

      {/* Design System Showcase */}
      <section className="demo-section">
        <h2 className={textVariants.heading.h2}>Design System Colors</h2>
        <div className="demo-grid">
          <div className={`${cardVariants.default.base} ${cardVariants.default.padding.medium}`}>
            <h3 className={textVariants.heading.h3}>Primary Colors</h3>
            <div className="color-palette">
              {Object.entries(colors.primary).map(([key, value]) => (
                <div key={key} className="color-item">
                  <div 
                    className="color-swatch" 
                    style={{ backgroundColor: value }}
                  />
                  <span className="color-label">primary-{key}</span>
                  <span className="color-hex">{value}</span>
                </div>
              ))}
            </div>
          </div>

          <div className={`${cardVariants.default.base} ${cardVariants.default.padding.medium}`}>
            <h3 className={textVariants.heading.h3}>Secondary Colors</h3>
            <div className="color-palette">
              {Object.entries(colors.secondary).map(([key, value]) => (
                <div key={key} className="color-item">
                  <div 
                    className="color-swatch" 
                    style={{ backgroundColor: value }}
                  />
                  <span className="color-label">secondary-{key}</span>
                  <span className="color-hex">{value}</span>
                </div>
              ))}
            </div>
          </div>

          <div className={`${cardVariants.default.base} ${cardVariants.default.padding.medium}`}>
            <h3 className={textVariants.heading.h3}>Neutral Colors</h3>
            <div className="color-palette">
              {Object.entries(colors.neutral).slice(0, 7).map(([key, value]) => (
                <div key={key} className="color-item">
                  <div 
                    className="color-swatch" 
                    style={{ backgroundColor: value }}
                  />
                  <span className="color-label">neutral-{key}</span>
                  <span className="color-hex">{value}</span>
                </div>
              ))}
            </div>
          </div>

          <div className={`${cardVariants.default.base} ${cardVariants.default.padding.medium}`}>
            <h3 className={textVariants.heading.h3}>Semantic Colors</h3>
            <div className="color-palette">
              <div className="color-item">
                <div 
                  className="color-swatch" 
                  style={{ backgroundColor: colors.text }}
                />
                <span className="color-label">text</span>
                <span className="color-hex">{colors.text}</span>
              </div>
              <div className="color-item">
                <div 
                  className="color-swatch" 
                  style={{ backgroundColor: colors.label }}
                />
                <span className="color-label">label</span>
                <span className="color-hex">{colors.label}</span>
              </div>
              <div className="color-item">
                <div 
                  className="color-swatch" 
                  style={{ backgroundColor: colors.disabled }}
                />
                <span className="color-label">disabled</span>
                <span className="color-hex">{colors.disabled}</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Typography Showcase */}
      <section className="demo-section">
        <h2 className={textVariants.heading.h2}>Typography</h2>
        <div className="demo-grid">
          <div className={`${cardVariants.default.base} ${cardVariants.default.padding.medium}`}>
            <h3 className={textVariants.heading.h3}>Headings</h3>
            <h1 className={textVariants.heading.h1}>Heading 1 - Main Title</h1>
            <h2 className={textVariants.heading.h2}>Heading 2 - Section Title</h2>
            <h3 className={textVariants.heading.h3}>Heading 3 - Subsection Title</h3>
            <h4 className={textVariants.heading.h4}>Heading 4 - Component Title</h4>
            <h5 className={textVariants.heading.h5}>Heading 5 - Small Title</h5>
            <h6 className={textVariants.heading.h6}>Heading 6 - Micro Title</h6>
          </div>

          <div className={`${cardVariants.default.base} ${cardVariants.default.padding.medium}`}>
            <h3 className={textVariants.heading.h3}>Body Text</h3>
            <p className={textVariants.body.large}>Large body text for important content that needs emphasis and better readability.</p>
            <p className={textVariants.body.base}>Regular body text for standard content and descriptions.</p>
            <p className={textVariants.body.small}>Small body text for metadata, captions, and secondary information.</p>
            <p className={textVariants.body.xs}>Extra small text for fine print and disclaimers.</p>
          </div>

          <div className={`${cardVariants.default.base} ${cardVariants.default.padding.medium}`}>
            <h3 className={textVariants.heading.h3}>Labels</h3>
            <p className={textVariants.label.base}>Regular label text for form fields and metadata.</p>
            <p className={textVariants.label.large}>Large label text for important form sections.</p>
          </div>
        </div>
      </section>

      {/* Button Variants */}
      <section className="demo-section">
        <h2 className={textVariants.heading.h2}>Button Variants</h2>
        <div className="demo-grid">
          <div className={`${cardVariants.default.base} ${cardVariants.default.padding.medium}`}>
            <h3 className={textVariants.heading.h3}>Primary Buttons</h3>
            <div className="button-group">
              <button className={`${buttonVariants.primary.base} ${buttonVariants.primary.size.small}`}>
                Small Primary
              </button>
              <button className={`${buttonVariants.primary.base} ${buttonVariants.primary.size.medium}`}>
                Medium Primary
              </button>
              <button className={`${buttonVariants.primary.base} ${buttonVariants.primary.size.large}`}>
                Large Primary
              </button>
              <button className={`${buttonVariants.primary.base} ${buttonVariants.primary.size.medium} ${buttonVariants.primary.disabled}`} disabled>
                Disabled Primary
              </button>
            </div>
          </div>

          <div className={`${cardVariants.default.base} ${cardVariants.default.padding.medium}`}>
            <h3 className={textVariants.heading.h3}>Secondary Buttons</h3>
            <div className="button-group">
              <button className={`${buttonVariants.secondary.base} ${buttonVariants.secondary.size.small}`}>
                Small Secondary
              </button>
              <button className={`${buttonVariants.secondary.base} ${buttonVariants.secondary.size.medium}`}>
                Medium Secondary
              </button>
              <button className={`${buttonVariants.secondary.base} ${buttonVariants.secondary.size.large}`}>
                Large Secondary
              </button>
            </div>
          </div>

          <div className={`${cardVariants.default.base} ${cardVariants.default.padding.medium}`}>
            <h3 className={textVariants.heading.h3}>Outline Buttons</h3>
            <div className="button-group">
              <button className={`${buttonVariants.outline.base} ${buttonVariants.outline.size.small}`}>
                Small Outline
              </button>
              <button className={`${buttonVariants.outline.base} ${buttonVariants.outline.size.medium}`}>
                Medium Outline
              </button>
              <button className={`${buttonVariants.outline.base} ${buttonVariants.outline.size.large}`}>
                Large Outline
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Card Variants */}
      <section className="demo-section">
        <h2 className={textVariants.heading.h2}>Card Variants</h2>
        <div className="demo-grid">
          <div className={`${cardVariants.default.base} ${cardVariants.default.padding.small}`}>
            <h3 className={textVariants.heading.h3}>Default Card (Small)</h3>
            <p className={textVariants.body.small}>Small padding for compact content.</p>
          </div>

          <div className={`${cardVariants.default.base} ${cardVariants.default.padding.medium}`}>
            <h3 className={textVariants.heading.h3}>Default Card (Medium)</h3>
            <p className={textVariants.body.base}>Medium padding for standard content.</p>
          </div>

          <div className={`${cardVariants.default.base} ${cardVariants.default.padding.large}`}>
            <h3 className={textVariants.heading.h3}>Default Card (Large)</h3>
            <p className={textVariants.body.base}>Large padding for spacious content.</p>
          </div>

          <div className={`${cardVariants.elevated.base} ${cardVariants.elevated.padding.medium}`}>
            <h3 className={textVariants.heading.h3}>Elevated Card</h3>
            <p className={textVariants.body.base}>Card with enhanced shadow for emphasis.</p>
          </div>

          <div className={`${cardVariants.outlined.base} ${cardVariants.outlined.padding.medium}`}>
            <h3 className={textVariants.heading.h3}>Outlined Card</h3>
            <p className={textVariants.body.base}>Card with prominent border for highlighting.</p>
          </div>
        </div>
      </section>

      {/* Original Components Demo */}
      <section className="demo-section">
        <h2 className={textVariants.heading.h2}>Common Components</h2>

      {/* Loading Component Section */}
      <section className="demo-section">
        <h3 className={textVariants.heading.h3}>Loading Component</h3>
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
        <h3 className={textVariants.heading.h3}>ErrorMessage Component</h3>
        
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
        <h3 className={textVariants.heading.h3}>EmptyState Component</h3>
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
    </section>
    </div>
  );
};

export default ComponentDemo;