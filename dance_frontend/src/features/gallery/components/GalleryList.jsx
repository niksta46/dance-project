import React from 'react';
import { Link } from 'react-router-dom';
import { useEventGalleriesList } from '../../../api/endpoints/eventGalleries';
import { Loading, ErrorMessage, EmptyStatePresets } from '../../../components/common';
import { textVariants, cardVariants } from '../../../styles/designSystem';

const GalleryList = () => {
  const { data: galleries, isLoading, error } = useEventGalleriesList();

  if (isLoading) {
    return <Loading size="medium" text="Loading galleries..." />;
  }

  if (error) {
    return (
      <ErrorMessage 
        error={error}
        title="Failed to load galleries"
        onRetry={() => window.location.reload()}
      />
    );
  }

  if (!galleries || galleries.length === 0) {
    return <EmptyStatePresets.NoData />;
  }

  return (
    <div className="px-6 sm:px-8 lg:px-12 py-8">
      <h1 className={`${textVariants.heading.h1} mb-8`}>Gallery</h1>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {galleries.map((gallery) => (
          <Link 
            key={gallery.id} 
            to={`/gallery/${gallery.slug}`}
            className={`block ${cardVariants.default.base} ${cardVariants.default.padding.none} hover:shadow-md transition-shadow overflow-hidden`}
          >
            <div className="h-48 bg-gray-200 flex items-center justify-center">
              <span className="text-gray-500">Gallery Image</span>
            </div>
            <div className="p-4">
              <h2 className={textVariants.heading.h4}>{gallery.title}</h2>
              {gallery.excerpt && (
                <p className={`${textVariants.body.small} text-gray-600 mt-2`}>
                  {gallery.excerpt}
                </p>
              )}
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default GalleryList;
