import React from "react";
import routes from './routes'
import "./index.css";
import ReactDom from "react-dom/client";

import { createBrowserRouter, RouterProvider } from 'react-router-dom'


const router = createBrowserRouter(routes)
const root = ReactDom.createRoot(document.getElementById('root'))
root.render(<RouterProvider router={router} />)

// const container = document.getElementById("root");
// const root = createRoot(container);
// root.render(<App />);
