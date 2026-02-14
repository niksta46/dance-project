import { createBrowserRouter } from 'react-router-dom';
import Layout from '../components/layout/Layout.jsx';
import ComponentDemo from '../features/demo/ComponentDemo.jsx';
import PagesList from '../features/pages/components/PagesList.jsx';
import AboutPage from '../features/about/AboutPage.jsx';
import { NewsList, NewsDetail } from '../features/news';
import { ClassList, ClassDetail } from '../features/classes';
import GalleryList from '../features/gallery/components/GalleryList.jsx';
import GalleryDetail from '../features/gallery/components/GalleryDetail.jsx';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      { index: true, element: <PagesList /> },
      { path: 'classes', element: <ClassList /> },
      { path: 'classes/:slug', element: <ClassDetail /> },
      { path: 'news', element: <NewsList /> },
      { path: 'news/:slug', element: <NewsDetail /> },
      { path: 'gallery', element: <GalleryList /> },
      { path: 'gallery/:slug', element: <GalleryDetail /> },
      { path: 'aboutus', element: <AboutPage /> },
      { path: 'demo', element: <ComponentDemo /> },
    ],
  },
]);
