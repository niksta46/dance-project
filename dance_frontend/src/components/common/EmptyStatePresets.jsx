import React from 'react';
import EmptyState from './EmptyState';

/**
 * Pre-configured empty state for common scenarios
 */
 const EmptyStatePresets = {
  NoData: (props) => (
    <EmptyState
      title="No data yet"
      message="When data becomes available, it will appear here."
      icon="📊"
      {...props}
    />
  ),
  
  NoSearchResults: (props) => (
    <EmptyState
      title="No results found"
      message="Try adjusting your search or filter criteria."
      variant="search"
      {...props}
    />
  ),
  
  ComingSoon: (props) => (
    <EmptyState
      title="Coming Soon"
      message="This feature is under development and will be available soon."
      icon="🚧"
      {...props}
    />
  ),
  
  NoPermission: (props) => (
    <EmptyState
      title="Access Restricted"
      message="You don't have permission to view this content."
      icon="🔒"
      variant="error"
      {...props}
    />
  ),
  
  Success: (props) => (
    <EmptyState
      title="All done!"
      message="You've completed all tasks."
      variant="success"
      {...props}
    />
  )
};

export default EmptyStatePresets;