import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { useEventGalleryBySlug } from '../../../api/endpoints/eventGalleries';
import { Loading, ErrorMessage } from '../../../components/common';
import { textVariants, buttonVariants } from '../../../styles/designSystem';

const GalleryDetail = () => {
  const { slug } = useParams();
  const { data: gallery, isLoading, error } = useEventGalleryBySlug(slug);

  if (isLoading) {
    return <Loading size="medium" text="Loading gallery..." />;
  }

  if (error) {
    return (
      <ErrorMessage 
        error={error}
        title="Failed to load gallery"
        onRetry={() => window.location.reload()}
      />
    );
  }

  if (!gallery) {
    return (
      <div className="max-w-4xl mx-auto p-6 text-center">
        <h1 className={textVariants.heading.h2}>Gallery not found</h1>
        <p className={textVariants.body.base}>The gallery you're looking for doesn't exist.</p>
        <Link to="/gallery" className={`${buttonVariants.primary.base} ${buttonVariants.primary.size.medium} mt-4 inline-block`}>
          Back to Galleries
        </Link>
      </div>
    );
  }

  return (
    <div className="px-6 sm:px-8 lg:px-12 py-8">
      <Link 
        to="/gallery" 
        className={`${buttonVariants.outline.base} ${buttonVariants.outline.size.small} mb-6 inline-block`}
      >
        ← Back to Galleries
      </Link>

      <h1 className={`${textVariants.heading.h1} mb-4`}>{gallery.title}</h1>
      
      {gallery.excerpt && (
        <p className={`${textVariants.body.large} text-gray-600 mb-8`}>
          {gallery.excerpt}
        </p>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {gallery.media_items && gallery.media_items.length > 0 ? (
          gallery.media_items.map((item) => (
            <div key={item.id} className="aspect-square bg-gray-200 rounded-lg overflow-hidden">
              {item.media_type === 'photo' && item.image && (
                <img 
                  src={item.image} 
                  alt={item.title || 'Gallery image'}
                  className="w-full h-full object-cover"
                />
              )}
              {item.media_type === 'video' && item.video_url && (
                <a 
                  href={item.video_url} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="w-full h-full flex items-center justify-center bg-gray-300 hover:bg-gray-400"
                >
                  <span>Watch Video</span>
                </a>
              )}
            </div>
          ))
        ) : (
          <p className={textVariants.body.base}>No media items in this gallery yet.</p>
        )}
      </div>
    </div>
  );
};

export default GalleryDetail;
