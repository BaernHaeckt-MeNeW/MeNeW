import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import {createBrowserRouter, RouterProvider} from "react-router-dom";
import NotFound from './pages/NotFound.tsx';
import Home from "./pages/Home.tsx";
import Household from "./pages/Household.tsx";
import {NewPerson} from "./pages/NewPerson.tsx";
import Dialog from "./pages/Dialog.tsx";

const router = createBrowserRouter([
    {
        path: "/",
        element: <App />,
        errorElement: <NotFound />,
        children: [
            { index: true, element: <Home /> },
            { path: "household", element: <Household /> },
            { path: "new-person", element: <NewPerson/> },
            {
                path: "dialog",
                element: <Dialog/>
            }
        ],
    },
]);

createRoot(document.getElementById('root')!).render(
  <StrictMode>
      <RouterProvider router={router} />
  </StrictMode>,
)
