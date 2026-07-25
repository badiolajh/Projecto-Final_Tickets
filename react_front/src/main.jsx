import { createRoot } from 'react-dom/client'
import './Componentes/SlideBar/SlideBar.css'
import './Componentes/NavBar/NavBar.css'
import App from './App.jsx'

import { BrowserRouter } from 'react-router-dom';

createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <App/>
  </BrowserRouter>,
)
