import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import SearchBar from './pages/Search';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import Card from './pages/card';
import PageNotFound from './pages/PageNotFound';
import FormRoute from './pages/Form'

const router = createBrowserRouter([
  {
    path: '/',
    element: <SearchBar />,
  },
  {
    path: '/card',
    element: <Card />,
  },
  {
    path: '*',
    element: <PageNotFound />,
  },
  {
    path: '/form',
    element: <FormRoute/>,
  },
]);

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
