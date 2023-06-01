import React from 'react'
import App from './App.jsx'
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import Navbar from './compenents/Navbar.jsx';


const root = createRoot(document.getElementById("root"));

root.render(
  <BrowserRouter>
    <Navbar/>
  </BrowserRouter>
);
