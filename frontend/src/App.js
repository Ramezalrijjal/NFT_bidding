import logo from './logo.svg';
import { BrowserRouter as Router, Routes, Route, Switch } from 'react-router-dom';
import './App.css';
import Header from './layouts/Header';
import Footer from './layouts/Footer';
import Home from './pages/home/Home';
import AddProduct from './pages/add-product/add';
import Contact from './pages/ContactUs/Contact';
import About from './pages/AboutUs/About';
import UserProfile from './pages/profile/UserProfile';
import EditProfile from './pages/profile/EditProfile';
import { useEffect } from 'react';
import ProductDetails from './pages/single-product/ProductDetails';
import { useLocation } from "react-router-dom";
import Login from './pages/Login-out/LogIn';
import SignUp from './pages/Login-out/SignUp';
import Activity_pages from './pages/Forum detailes/Activity_pages';
import Products from './pages/products/Products';
import Wallet from './pages/wallet/Wallet';

function App() {
  return (
    <div className="App">
     
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/UserProfile" element={<UserProfile />} />
        <Route path="/Contact" element={<Contact />} />
        <Route path="/About" element={<About />} />
        <Route path="/EditProfile" element={<EditProfile />} />
        <Route path='/Login' element={<Login />}></Route>
        <Route path='/Category/:id/Products' element={<Products />}></Route>
        <Route path='/SignUp' element={<SignUp />}></Route>
        <Route path='/Activity_pages' element={<Activity_pages />}></Route>
        <Route path='ProductDetails' element={<ProductDetails />}></Route>
        <Route path='/ProductDetails/:id' element={<ProductDetails />}></Route>
        <Route path='/AddProduct' element={<AddProduct />}></Route>
        <Route path='/Wallet' element={<Wallet/>}></Route>
      </Routes>
      <Footer />

    </div>
  );
}

export default App;
