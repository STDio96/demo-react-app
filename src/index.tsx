import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import { AuthProvider } from './AuthContext';

import Home from './pages/Home';
import Settings from './pages/Settings';
import Detail from './pages/Detail';
import Login from './pages/Login';
import ProtectedRoute from './routes/ProtectedRoute';
import PostsList from './components/PostsList';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Home />,
    children: [
      {
        index: true,
        path: '/',
        element: <ProtectedRoute component={PostsList} />,
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
    ],
  },
  /* {
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
      }, */
]);

const root: ReactDOM.Root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <React.StrictMode>
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  </React.StrictMode>
);
