import React from 'react';
import { Link } from 'react-router-dom';
import { usePageBySlug } from '../../api/endpoints/pages';
import { Loading, ErrorMessage } from '../../components/common';
import { textVariants, buttonVariants } from '../../styles/designSystem';

const AboutPage = () => {
  const { data: page, isLoading, error } = usePageBySlug('aboutus');

  if (isLoading) {
    return <Loading size="medium" text="Loading..." />;
  }

  if (error || !page) {
    return (
      <ErrorMessage 
        error={error}
        title="Failed to load page"
        onRetry={() => window.location.reload()}
      />
    );
  }

  return (
    <div className="px-6 sm:px-8 lg:px-12 py-8">
      <h1 className={`${textVariants.heading.h1} mb-8`}>{page.title}</h1>
      
      {page.content && (
        <div 
          className={`${textVariants.body.large} prose max-w-none`}
          dangerouslySetInnerHTML={{ __html: page.content }}
        />
      )}

      <Link 
        to="/" 
        className={`${buttonVariants.outline.base} ${buttonVariants.outline.size.small} mt-8 inline-block`}
      >
        ← Back to Home
      </Link>
    </div>
  );
};

export default AboutPage;
