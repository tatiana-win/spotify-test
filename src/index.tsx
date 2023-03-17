import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import './common.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { Auth } from './pages/AuthPage/Auth';
import { SearchPage } from './pages/SearchPage/Search';
import ErrorPage from './pages/ErrorPage/ErrorPage';
import { parseCodeAndGetToken } from './actions/parseCodeAndGetToken';
import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';
import { searchSlice } from './reducers/searchSlice';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import { AuthService } from './api/AuthService';
import { LoaderPage } from './pages/LoaderPage/LoaderPage';
import { SearchService } from './api/SearchService';
import { searchLoader } from './actions/searchLoader';
import { ArtistsPage } from './pages/ArtistsPage/ArtistsPage';
import { ArtistPage } from './pages/ArtistPage/ArtistPage';
import { ArtistsService } from './api/ArtistsService';
import { artistsSlice } from './reducers/artistsSlice';
import { AlbumsService } from './api/AlbumsService';
import { albumsSlice } from './reducers/albumsSlice';
import { AlbumPage } from './pages/AlbumPage/AlbumPage';
import { AlbumsPage } from './pages/AlbumsPage/AlbumsPage';

const store = configureStore({
  reducer: {
    search: searchSlice.reducer,
    artists: artistsSlice.reducer,
    albums: albumsSlice.reducer,
    [AuthService.reducerPath]: AuthService.reducer,
    [SearchService.reducerPath]: SearchService.reducer,
    [ArtistsService.reducerPath]: ArtistsService.reducer,
    [AlbumsService.reducerPath]: AlbumsService.reducer,
  },
  middleware: [
    thunk,
    AuthService.middleware,
    SearchService.middleware,
    ArtistsService.middleware,
    AlbumsService.middleware,
    ...getDefaultMiddleware({
      serializableCheck: false,
    }),
  ],
});

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: 'search',
        element: <SearchPage />,
        loader: searchLoader,
      },
      {
        path: 'artists/:id',
        element: <ArtistPage />,
      },
      {
        path: 'albums',
        element: <AlbumsPage />,
      },
      {
        path: 'albums/:id',
        element: <AlbumPage />,
      },
      {
        path: 'artists',
        element: <ArtistsPage />,
      },
    ],
  },
  {
    path: 'auth',
    element: <Auth />,
  },
  {
    path: 'authorize',
    element: <LoaderPage />,
    loader: parseCodeAndGetToken,
  },
]);

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement,
);
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>,
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
