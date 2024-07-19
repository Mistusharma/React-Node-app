import React, { useState } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import SignUp from './Pages/signUp';
import Login from './Pages/login';
import { Provider } from 'react-redux'; // Import Provider from react-redux
import Home from './Pages/home';
import Product from './Pages/product';
import About from './Pages/about';
import Splash from './Pages/splash';
import Contact from './Pages/contact';
import ProductDetail from './Pages/productDetail';
import Cart from './Pages/cart';
import CollectionProducts from './Pages/collectionProducts';
import Profile from './Pages/profile';
import Forget from './Pages/forget';
import Reset from './Pages/reset';
import store from './Redux/store';
import Checkout from './Pages/checkout';
// Mock authentication function to check if the user is authenticated
const isAuthenticated = () => {
  return localStorage.getItem('token') !== null;
};

// ProtectedRoute HOC
const ProtectedRoute = ({ element: Element, ...rest }) => {
  return isAuthenticated() ? <Element {...rest} /> : <Navigate to="/signUp" replace />;
};

// PublicRoute HOC
const PublicRoute = ({ element: Element, ...rest }) => {
  return isAuthenticated() ? <Navigate to="/home" replace /> : <Element {...rest} />;
};

export default function App() {
  return (
    <Provider store={store}> {/* Wrap App with Provider and pass store */}
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Splash />} />
          <Route path="/signUp" element={<PublicRoute element={SignUp} />} />
          <Route path="/login" element={<PublicRoute element={Login} />} />
          <Route path="/forget" element={<PublicRoute element={Forget} />} />
          <Route path="/reset" element={<PublicRoute element={Reset} />} />
          <Route path="/home" element={<ProtectedRoute element={Home} />} />
          <Route path="/collectionProduct/:collection_id" element={<ProtectedRoute element={CollectionProducts} />} />
          <Route path="/about" element={<ProtectedRoute element={About} />} />
          <Route path="/product" element={<ProtectedRoute element={Product} />} />
          <Route path="/contact" element={<ProtectedRoute element={Contact} />} />
          <Route path="/productDetail/:id" element={<ProtectedRoute element={ProductDetail} />} />
          <Route path="/cart" element={<ProtectedRoute element={Cart} />} />
          <Route path="/checkout/:productId" element={<ProtectedRoute element={Checkout} />} />
          <Route path="/profile" element={<ProtectedRoute element={Profile} />} />
        </Routes>
      </BrowserRouter>
    </Provider>
  );
}

