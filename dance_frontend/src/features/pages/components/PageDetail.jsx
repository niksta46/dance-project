import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { usePage } from '../../../api/endpoints/pages';
import { Loading, ErrorMessage } from '../../../components/common';
import { textVariants, buttonVariants } from '../../../styles/designSystem';

const PageDetail = () => {
  const { id } = useParams();
  const { data: page, isLoading, error } = usePage(id);

  if (isLoading) {
    return <Loading size="medium" text="Loading page..." />;
  }

  if (error) {
    return (
      <ErrorMessage 
        error={error}
        title="Failed to load page"
        onRetry={() => window.location.reload()}
      />
    );
  }

  if (!page) {
    return (
      <div className="max-w-4xl mx-auto p-6 text-center">
        <h1 className={textVariants.heading.h2}>Page not found</h1>
        <p className={textVariants.body.base}>The page you're looking for doesn't exist.</p>
        <Link to="/pages" className={`${buttonVariants.primary.base} ${buttonVariants.primary.size.medium} mt-4 inline-block`}>
          Back to Pages
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-6">
      <Link 
        to="/pages" 
        className={`${buttonVariants.outline.base} ${buttonVariants.outline.size.small} mb-6 inline-block`}
      >
        ← Back to Pages
      </Link>

      <h1 className={textVariants.heading.h1}>{page.title}</h1>
      
      {page.published_date && (
        <p className={`${textVariants.body.small} text-gray-600 mt-2`}>
          Published: {new Date(page.published_date).toLocaleDateString()}
        </p>
      )}

      {page.content && (
        <div className="prose prose-lg max-w-none mt-8">
          <div 
            className={`${textVariants.body.base} leading-relaxed`}
            dangerouslySetInnerHTML={{ __html: page.content }}
          />
        </div>
      )}

      {page.metadata && Object.keys(page.metadata).length > 0 && (
        <div className="mt-8 pt-6 border-t border-gray-200">
          <h2 className={textVariants.heading.h4}>Additional Information</h2>
          <div className="mt-4 space-y-2">
            {Object.entries(page.metadata).map(([key, value]) => (
              <div key={key} className="flex">
                <span className={`${textVariants.label.base} w-32`}>{key}:</span>
                <span className={textVariants.body.base}>{value}</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default PageDetail;