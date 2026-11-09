import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";


import Product from "./pages/products/products";
import ProductDetail from "./pages/products/productdetail";
import Login from "./pages/user/login";
import Register from "./pages/user/register";
import Cart from "./pages/cart/cart";


function App() {

const isloggedIn = sessionStorage.getItem('loginData');


  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route  path="/" element={<product/>} />
        

          
           <Route  path="/product" element={isloggedIn ? <Product/> : <Navigate  to={'/log'}/>} />
           <Route  path="/product/detail/:id" element={< ProductDetail/>} />
           <Route path="/log" element={<Login/>} />
             <Route path="/reg" element={<Register/>}/>
              <Route path="/cart" element={<Cart/>}/>

             
           
           
          

        </Routes>

      </BrowserRouter>
    </div>
  );
}











export default App
