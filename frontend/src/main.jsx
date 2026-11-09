


import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.min.css';
import './index.css'
import App from './App.jsx'


import Product from './pages/products/products.jsx';
import Login from "./pages/user/login.jsx";
import Register from './pages/user/register.jsx';
import Cart from './pages/cart/cart.jsx';







createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App/>
  </StrictMode>,
)