import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import Home from './pages/Home';
import Settings from './pages/Settings';
import Detail from './pages/Detail';
import Login from './pages/Login';
import ProtectedRoute from './routes/ProtectedRoute';

const router = createBrowserRouter([
  {
    path: '/',
    element: <ProtectedRoute component={Home} />,
  },
  {
    path: '/settings',
    element: <ProtectedRoute component={Settings} />,
  },
  {
    path: '/login',
    element: <Login />,
  },
  {
    path: '/detail',
    element: <Detail />,
  },
]);

const root: ReactDOM.Root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
