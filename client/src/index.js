import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import NotFound from './pages/NotFound';
import Home from './pages/Home';
import BookDetail from './pages/BookDetail';
import Search from './pages/Search';
import Login from './pages/Login';
import AdminPage from './pages/AdminPage';
import ProtectedRoute from './components/ProtectedRoute';
import Books from './pages/Books';
import TalkingRooms from './pages/TalkingRooms';
import Library from './pages/Library';
import CommentService from './service/CommentService';
import SearchService from './service/SearchService';
import RecommendService from './service/RecommendService';

const baseURL = process.env.REACT_APP_BASE_URL;
const commentService = new CommentService(baseURL);
const searchService = new SearchService(baseURL);
const recommendService = new RecommendService(baseURL);

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    errorElement: <NotFound />,
    children: [
      {
        index: true,
        path: '/',
        element: <Home />,
      },
      { paht: 'books', element: <Books /> },
      { path: 'login', element: <Login /> },
      {
        path: 'books/:bookId',
        element: (
          <BookDetail //
            commentService={commentService}
            recommendService={recommendService}
          />
        ),
      },
      {
        path: 'search/',
        element: (
          <Search //
            searchService={searchService}
          />
        ),
      },
      { path: 'rooms', element: <TalkingRooms /> },
      {
        path: 'admin',
        element: (
          <ProtectedRoute>
            <AdminPage />
          </ProtectedRoute>
        ),
      },
      { path: 'library', element: <Library /> },
    ],
  },
]);

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <>
    <RouterProvider router={router} />
  </>
);
