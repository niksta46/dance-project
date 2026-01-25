import { createBrowserRouter } from 'react-router-dom';

// Placeholder components - will be implemented later
const PagesList = () => <div>Pages List</div>;
const PageDetail = () => <div>Page Detail</div>;
const NewsList = () => <div>News List</div>;
const NewsDetail = () => <div>News Detail</div>;
const ClassList = () => <div>Class List</div>;
const ClassDetail = () => <div>Class Detail</div>;

export const router = createBrowserRouter([
  {
    path: '/',
    element: <PagesList />,
  },
  {
    path: '/pages',
    element: <PagesList />,
  },
  {
    path: '/pages/:id',
    element: <PageDetail />,
  },
  {
    path: '/news',
    element: <NewsList />,
  },
  {
    path: '/news/:id',
    element: <NewsDetail />,
  },
  {
    path: '/classes',
    element: <ClassList />,
  },
  {
    path: '/classes/:id',
    element: <ClassDetail />,
  },
]);