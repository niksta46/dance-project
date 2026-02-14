import React from 'react';
import { Link } from 'react-router-dom';
import { useNewsList } from '../../../api/endpoints/newsPosts';
import { Loading, ErrorMessage, EmptyStatePresets } from '../../../components/common';
import { textVariants, cardVariants } from '../../../styles/designSystem';

const NewsList = () => {
  const { data: posts, isLoading, error } = useNewsList();

  if (isLoading) {
    return <Loading size="medium" text="Loading news..." />;
  }

  if (error) {
    return (
      <ErrorMessage 
        error={error}
        title="Failed to load news"
        onRetry={() => window.location.reload()}
      />
    );
  }

  if (!posts || posts.length === 0) {
    return <EmptyStatePresets.NoData />;
  }

  return (
    <div className="px-6 sm:px-8 lg:px-12 py-8">
      <h1 className={`${textVariants.heading.h1} mb-8`}>News</h1>
      <div className="grid gap-6">
        {posts.map((post) => (
          <Link 
            key={post.id} 
            to={`/news/${post.slug}`}
            className={`block ${cardVariants.default.base} ${cardVariants.default.padding.medium} hover:shadow-md transition-shadow`}
          >
            <div className="flex flex-col md:flex-row gap-6">
              {post.image && (
                <div className="md:w-1/3">
                  <img 
                    src={post.image} 
                    alt={post.title}
                    className="w-full h-48 md:h-full object-cover rounded-lg"
                  />
                </div>
              )}
              <div className="flex-1">
                <h2 className={textVariants.heading.h3}>{post.title}</h2>
                {post.published_at && (
                  <p className={`${textVariants.body.small} text-gray-600 mt-2`}>
                    {new Date(post.published_at).toLocaleDateString()}
                  </p>
                )}
                {post.body && (
                  <p className={`${textVariants.body.base} text-gray-700 mt-2`}>
                    {post.body.substring(0, 200)}...
                  </p>
                )}
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default NewsList;
