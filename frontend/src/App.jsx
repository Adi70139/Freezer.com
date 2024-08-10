import React, { useState, lazy, Suspense } from 'react';
import { Route, Routes } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './App.css';

const Home = lazy(() => import('./pages/Home/Home'));
const Footer = lazy(() => import('./components/Footer/Footer'));
const Navbar = lazy(() => import('./components/Navbar/Navbar'));
const Cart = lazy(() => import('./pages/Cart/Cart'));
const LoginPopup = lazy(() => import('./components/LoginPopup/LoginPopup'));
const PlaceOrder = lazy(() => import('./pages/PlaceOrder/PlaceOrder'));
const MyOrders = lazy(() => import('./pages/MyOrders/MyOrders'));
const Verify = lazy(() => import('./pages/Verify/Verify'));
const TrackOrder = lazy(() => import('./pages/TrackOrder/TrackOrder'));

const App = () => {
  const [showLogin, setShowLogin] = useState(false);

  return (
    <>
      <ToastContainer />
      {showLogin ? <LoginPopup setShowLogin={setShowLogin} /> : <></>}
      <Suspense fallback={<div className='verify'>
      <div className="spinner"></div>
    </div>}>
        <div className='app'>
          <Navbar setShowLogin={setShowLogin} />
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/cart' element={<Cart />} />
            <Route path='/order' element={<PlaceOrder />} />
            <Route path='/myorders' element={<MyOrders />} />
            <Route path='/verify' element={<Verify />} />
            <Route path='/TrackOrder' element={<TrackOrder />} />
          </Routes>
        </div>
        <Footer />
      </Suspense>
    </>
  );
};

export default App;
