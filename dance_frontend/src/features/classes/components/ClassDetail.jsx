import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { useClassBySlug } from '../../../api/endpoints/classSections';
import { Loading, ErrorMessage } from '../../../components/common';
import { textVariants, buttonVariants } from '../../../styles/designSystem';

const ClassDetail = () => {
  const { slug } = useParams();
  const { data: classSection, isLoading, error } = useClassBySlug(slug);

  if (isLoading) {
    return <Loading size="medium" text="Loading class..." />;
  }

  if (error) {
    return (
      <ErrorMessage 
        error={error}
        title="Failed to load class"
        onRetry={() => window.location.reload()}
      />
    );
  }

  if (!classSection) {
    return (
      <div className="max-w-4xl mx-auto p-6 text-center">
        <h1 className={textVariants.heading.h2}>Class not found</h1>
        <p className={textVariants.body.base}>The class you're looking for doesn't exist.</p>
        <Link to="/classes" className={`${buttonVariants.primary.base} ${buttonVariants.primary.size.medium} mt-4 inline-block`}>
          Back to Classes
        </Link>
      </div>
    );
  }

  return (
    <div className="px-6 sm:px-8 lg:px-12 py-8">
      <Link 
        to="/classes" 
        className={`${buttonVariants.outline.base} ${buttonVariants.outline.size.small} mb-6 inline-block`}
      >
        ← Back to Classes
      </Link>

      <h1 className={`${textVariants.heading.h1} mb-4`}>{classSection.name}</h1>
      
      <div className="space-y-4 mb-8">
        {classSection.age_group && (
          <p className={textVariants.body.large}>
            <span className="font-semibold">Age Group:</span> {classSection.age_group}
          </p>
        )}
        {classSection.level && (
          <p className={textVariants.body.large}>
            <span className="font-semibold">Level:</span> {classSection.level}
          </p>
        )}
        {classSection.schedule && (
          <p className={textVariants.body.large}>
            <span className="font-semibold">Schedule:</span> {classSection.schedule}
          </p>
        )}
      </div>

      {classSection.description && (
        <div 
          className={`${textVariants.body.large} prose max-w-none`}
          dangerouslySetInnerHTML={{ __html: classSection.description }}
        />
      )}
    </div>
  );
};

export default ClassDetail;
