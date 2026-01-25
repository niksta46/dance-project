import { createBrowserRouter } from 'react-router-dom';
import Layout from '../components/layout/Layout.jsx';

// Placeholder components - will be implemented later
const PagesList = () => <div>Pages List</div>;
const PageDetail = () => <div>Page Detail</div>;
const NewsList = () => <div>News List</div>;
const NewsDetail = () => <div>News Detail</div>;
const ClassList = () => <div>Class List</div>;
const ClassDetail = () => <div>Class Detail</div>;

// Layout wrapper for routes
const withLayout = (Component) => (
  <Layout>
    <Component />
  </Layout>
);

export const router = createBrowserRouter([
  {
    path: '/',
    element: withLayout(PagesList),
  },
  {
    path: '/pages',
    element: withLayout(PagesList),
  },
  {
    path: '/pages/:id',
    element: withLayout(PageDetail),
  },
  {
    path: '/news',
    element: withLayout(NewsList),
  },
  {
    path: '/news/:id',
    element: withLayout(NewsDetail),
  },
  {
    path: '/classes',
    element: withLayout(ClassList),
  },
  {
    path: '/classes/:id',
    element: withLayout(ClassDetail),
  },
]);