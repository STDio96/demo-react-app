import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

import { AuthProvider } from './AuthContext';

import Home from './pages/Home';
import Settings from './pages/Settings';
import Detail from './pages/Detail';
import Login from './pages/Login';
import AllUsersPosts from './pages/AllUsersPosts';
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
        path: '/detail/:id',
        element: <Detail />,
      },
      {
        path: '/all-posts',
        element: <ProtectedRoute component={AllUsersPosts} />,
      },
    ],
  },
]);

const root: ReactDOM.Root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
    },
  },
});

root.render(
  <React.StrictMode>
    <AuthProvider>
      <QueryClientProvider client={queryClient}>
        <RouterProvider router={router} />
        <ReactQueryDevtools initialIsOpen={false} />
      </QueryClientProvider>
    </AuthProvider>
  </React.StrictMode>
);
