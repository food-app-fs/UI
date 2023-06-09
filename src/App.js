import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './page/Login';
import Home from './page/Home';
import 'bootstrap/dist/css/bootstrap.css';
import "bootstrap/dist/js/bootstrap.bundle.min";
import Detail from './page/Detailpage';
import Cart from './page/Cart';
const App =()=>{
  return (

    <Router>
      <Routes>
        <Route path="/">
          <Route index element={<Login />} />
          <Route path="home" element={<Home />} />
          <Route path="detail" element={<Detail/>} />
          <Route path="cart" element={<Cart/>} />
        </Route>
      </Routes>
    </Router>
  );
}
export default App