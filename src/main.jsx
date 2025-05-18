import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import Landingpage from '../pages/Landingpage/Landingpage.jsx'
import Routes from '../Router/Routes.jsx'
import { BrowserRouter, Router } from 'react-router-dom'



createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter basename="/CCIS_CONNECT">
          <Routes/>
    </BrowserRouter>
  </StrictMode>
)
