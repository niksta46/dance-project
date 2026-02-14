import { createBrowserRouter } from 'react-router-dom';
import Layout from '../components/layout/Layout.jsx';
import ComponentDemo from '../features/demo/ComponentDemo.jsx';
import PagesList from '../features/pages/components/PagesList.jsx';
import PageDetail from '../features/pages/components/PageDetail.jsx';
import {
  NewsList,
  NewsDetail,
  ClassList,
  ClassDetail
} from '../features/placeholders';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      { index: true, element: <PagesList /> },
      { path: 'pages/:id', element: <PageDetail /> },
      { path: 'news', element: <NewsList /> },
      { path: 'news/:id', element: <NewsDetail /> },
      { path: 'classes', element: <ClassList /> },
      { path: 'classes/:id', element: <ClassDetail /> },
      { path: 'demo', element: <ComponentDemo /> },
    ],
  },
]);