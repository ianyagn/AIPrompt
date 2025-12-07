import React from 'react';
import { createHashRouter, RouterProvider } from 'react-router-dom';
import App from '@/App';
import Login from '@/pages/Login';
import AdminLayout from '@/pages/admin/AdminLayout';
import Home from '@/pages/admin/Home';
import PromptManage from '@/pages/admin/PromptManage';

const router = createHashRouter(
  [
    { path: '/', element: <App /> },
    { path: '/login3721', element: <Login /> },
    {
      path: '/home',
      element: <AdminLayout />,
      children: [
        { index: true, element: <Home /> },
      ],
    },
    {
      path: '/prompt',
      element: <AdminLayout />,
      children: [
        { index: true, element: <PromptManage /> },
      ],
    },
  ],
  {
    future: {
      v7_relativeSplatPath: true,
    },
  }
);

const AppRouter: React.FC = () => {
  return <RouterProvider router={router} />;
};

export default AppRouter;
