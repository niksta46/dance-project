import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { useNewsPostBySlug } from '../../../api/endpoints/newsPosts';
import { Loading, ErrorMessage } from '../../../components/common';
import { textVariants, buttonVariants } from '../../../styles/designSystem';

const NewsDetail = () => {
  const { slug } = useParams();
  const { data: post, isLoading, error } = useNewsPostBySlug(slug);

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

  if (!post) {
    return (
      <div className="max-w-4xl mx-auto p-6 text-center">
        <h1 className={textVariants.heading.h2}>News not found</h1>
        <p className={textVariants.body.base}>The news you're looking for doesn't exist.</p>
        <Link to="/news" className={`${buttonVariants.primary.base} ${buttonVariants.primary.size.medium} mt-4 inline-block`}>
          Back to News
        </Link>
      </div>
    );
  }

  return (
    <div className="px-6 sm:px-8 lg:px-12 py-8">
      <Link 
        to="/news" 
        className={`${buttonVariants.outline.base} ${buttonVariants.outline.size.small} mb-6 inline-block`}
      >
        ← Back to News
      </Link>

      <h1 className={`${textVariants.heading.h1} mb-4`}>{post.title}</h1>
      
      {post.published_at && (
        <p className={`${textVariants.body.small} text-gray-600 mb-4`}>
          Published: {new Date(post.published_at).toLocaleDateString()}
        </p>
      )}

      {post.image && (
        <img 
          src={post.image} 
          alt={post.title}
          className="w-full max-w-2xl h-auto rounded-lg mb-8"
        />
      )}

      {post.body && (
        <div 
          className={`${textVariants.body.large} prose max-w-none`}
          dangerouslySetInnerHTML={{ __html: post.body }}
        />
      )}
    </div>
  );
};

export default NewsDetail;
