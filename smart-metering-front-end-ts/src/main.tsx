import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import HomePage from './pages/HomePage';
import ProfilePage from './pages/ProfilePage';
import NotFoundPage from './pages/NotFoundPage';
import DevicesPage from './pages/DevicesPage';
import DevicePage from './pages/DevicePage';
import Layout from './components/shared/Layout';
import AssetsPage from './pages/AssetsPage';


const router = createBrowserRouter([
  {
    path:'/',
    element:<Layout />,
    children:
    [  
      {
        path:'/',
        element:<HomePage />,
        errorElement: <NotFoundPage />
      },

      {
        path:'/devices',
        element:<DevicesPage />,
        
      },
      {

        path:'/devices/:deviceId',
        element:<DevicePage />
        
      },
      
      {
        path:'/profile',
        element:<ProfilePage />
      },
      {
        path:'/assets',
        element:<AssetsPage  />
      }
    
    ]
    }
]);



ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
