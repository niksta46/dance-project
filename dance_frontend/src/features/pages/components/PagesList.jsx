import React from 'react';
import { Link } from 'react-router-dom';
import { usePagesList } from '../../../api/endpoints/pages';
import { Loading, ErrorMessage, EmptyStatePresets } from '../../../components/common';
import { textVariants, cardVariants } from '../../../styles/designSystem';
import HeroSlider from '../../../components/common/HeroSlider';

const getLink = (slug) => {
  const slugToRoute = {
    'news': '/news',
    'sections': '/classes',
    'gallery': '/gallery',
    'aboutus': '/aboutus',
  };
  return slugToRoute[slug] || `/${slug}`;
};

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
    return (
      <div>
        <HeroSlider />
        <EmptyStatePresets.NoData />
      </div>
    );
  }

  return (
    <div>
      <HeroSlider />
      <div className="w-full px-6 sm:px-8 lg:px-12" />
      
      <div className="grid gap-4 mt-8 px-6 sm:px-8 lg:px-12">
        {pages.map((page) => (
          <Link 
            key={page.id} 
            to={getLink(page.slug)}
            className={`block w-full ${cardVariants.default.base} ${cardVariants.default.padding.none} hover:shadow-md transition-shadow overflow-hidden bg-neutral-100`}
          >
            <div className="flex h-[500px]">
              <div className="w-1/2 h-full">
                <img 
                  src={`/src/assets/images/${page.slug}.jpg`}
                  alt={page.title}
                  className="w-full h-full object-cover rounded-lg"
                />
              </div>
              <div className="w-1/2 p-6 flex flex-col justify-center">
                <h2 className={textVariants.heading.h3}>{page.title}</h2>
                {page.excerpt && (
                  <p className={`${textVariants.body.small} text-gray-600 mt-2`}>
                    {page.excerpt}
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

export default PagesList;
