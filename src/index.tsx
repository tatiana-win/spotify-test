import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import "./core/coreStyles.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Auth } from "./pages/Auth/Auth";
import { SearchPage } from "./pages/Search/Search";
import ErrorPage from "./pages/ErrorPage/ErrorPage";
import { parseCodeAndGetToken } from "./actions/parseCodeAndGetToken";
import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import { searchSlice } from "./reducers/searchSlice";
import { Provider } from "react-redux";
import thunk from "redux-thunk";
import { AuthService } from "./api/AuthService";
import { LoaderPage } from "./pages/LoaderPage/LoaderPage";
import { SearchService } from "./api/SearchService";
import { searchLoader } from "./actions/searchLoader";
import { ArtistsPage } from "./pages/Artists/Artists";

const store = configureStore({
  reducer: {
    search: searchSlice.reducer,
    [AuthService.reducerPath]: AuthService.reducer,
    [SearchService.reducerPath]: SearchService.reducer,
  },
  middleware: [
    thunk,
    AuthService.middleware,
    SearchService.middleware,
    ...getDefaultMiddleware({
      serializableCheck: false,
    }),
  ],
});

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "search",
        element: <SearchPage />,
        loader: searchLoader,
      },
      {
        path: "artists",
        element: <ArtistsPage />,
      },
    ],
  },
  {
    path: "auth",
    element: <Auth />,
  },
  {
    path: "authorize",
    element: <LoaderPage />,
    loader: parseCodeAndGetToken,
  },
]);

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
