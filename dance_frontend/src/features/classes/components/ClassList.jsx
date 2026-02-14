import React from 'react';
import { Link } from 'react-router-dom';
import { useClassList } from '../../../api/endpoints/classSections';
import { Loading, ErrorMessage, EmptyStatePresets } from '../../../components/common';
import { textVariants, cardVariants } from '../../../styles/designSystem';

const ClassList = () => {
  const { data: classes, isLoading, error } = useClassList();

  if (isLoading) {
    return <Loading size="medium" text="Loading classes..." />;
  }

  if (error) {
    return (
      <ErrorMessage 
        error={error}
        title="Failed to load classes"
        onRetry={() => window.location.reload()}
      />
    );
  }

  if (!classes || classes.length === 0) {
    return <EmptyStatePresets.NoData />;
  }

  return (
    <div className="px-6 sm:px-8 lg:px-12 py-8">
      <h1 className={`${textVariants.heading.h1} mb-8`}>Classes</h1>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {classes.map((classItem) => (
          <Link 
            key={classItem.id} 
            to={`/classes/${classItem.slug}`}
            className={`block ${cardVariants.default.base} ${cardVariants.default.padding.medium} hover:shadow-md transition-shadow`}
          >
            <h2 className={textVariants.heading.h3}>{classItem.name}</h2>
            {classItem.excerpt && (
              <p className={`${textVariants.body.small} text-gray-600 mt-2`}>
                {classItem.excerpt}
              </p>
            )}
            <div className="mt-4 space-y-2">
              {classItem.age_group && (
                <p className={`${textVariants.body.small}`}>
                  <span className="font-semibold">Age:</span> {classItem.age_group}
                </p>
              )}
              {classItem.level && (
                <p className={`${textVariants.body.small}`}>
                  <span className="font-semibold">Level:</span> {classItem.level}
                </p>
              )}
              {classItem.schedule && (
                <p className={`${textVariants.body.small}`}>
                  <span className="font-semibold">Schedule:</span> {classItem.schedule}
                </p>
              )}
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default ClassList;
