import React from 'react';
import { Link } from 'react-router-dom';
import { usePagesList } from '../../../api/endpoints/pages';
import { Loading, ErrorMessage, EmptyState, EmptyStatePresets } from '../../../components/common';
import { textVariants, cardVariants } from '../../../styles/designSystem';

const PagesList = () => {
  const { data: pages, isLoading, error } = usePagesList();

  if (isLoading) {
    return <Loading size="medium" text="Loading pages..." />;
  }

  if (error) {
    return (
      <ErrorMessage 
        error={error}
        title="Failed to load pages"
        onRetry={() => window.location.reload()}
      />
    );
  }

  if (!pages || pages.length === 0) {
    return <EmptyStatePresets.NoData />;
  }

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className={textVariants.heading.h1}>Pages</h1>
      
      <div className="grid gap-4 mt-8">
        {pages.map((page) => (
          <Link 
            key={page.id} 
            to={`/pages/${page.id}`}
            className={`block ${cardVariants.default.base} ${cardVariants.default.padding.medium} hover:shadow-md transition-shadow`}
          >
            <h2 className={textVariants.heading.h3}>{page.title}</h2>
            {page.excerpt && (
              <p className={`${textVariants.body.small} text-gray-600 mt-2`}>
                {page.excerpt}
              </p>
            )}
          </Link>
        ))}
      </div>
    </div>
  );
};

export default PagesList;