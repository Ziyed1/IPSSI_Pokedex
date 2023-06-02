import React from 'react'
import App from './App.jsx'
import PokemonDetails from './compenents/PokemonDetails.jsx';
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Root from "./routes/root";
import ErrorPage from "./error-pages"
import ReactDOM from 'react-dom/client';
import WishLists from './compenents/WishLists.jsx';



const router = createBrowserRouter([
  {
    path: "/",
    element: <Root></Root>,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/",
        element: <App></App>,
      },
      {
        path: "/:slug",
        element: <PokemonDetails></PokemonDetails>,
      },
      {
        path: "/wish",
        element: <WishLists></WishLists>,
      },

    ],
  },
]);
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
    <RouterProvider router={router} />
);
