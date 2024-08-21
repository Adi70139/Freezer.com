import React, { useState, Suspense } from 'react';
import { Route, Routes } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './App.css';
import ProtectedRoute from './ProtectedRoute/ProtectedRoute';
import Navbar from './components/Navbar/Navbar';
import LoginPopup from './components/LoginPopup/LoginPopup';

const Home = React.lazy(() => import('./pages/Home/Home'));
const Footer = React.lazy(() => import('./components/Footer/Footer'));
const Cart = React.lazy(() => import('./pages/Cart/Cart'));
const PlaceOrder = React.lazy(() => import('./pages/PlaceOrder/PlaceOrder'));
const MyOrders = React.lazy(() => import('./pages/MyOrders/MyOrders'));
const Verify = React.lazy(() => import('./pages/Verify/Verify'));
const TrackOrder = React.lazy(() => import('./pages/TrackOrder/TrackOrder'));



const App = () => {
  const [showLogin, setShowLogin] = useState(false);

  return (
    <>
      <ToastContainer />
      {showLogin && <LoginPopup setShowLogin={setShowLogin} />}
      <div className='app'>
        <Navbar setShowLogin={setShowLogin} />
        <Suspense fallback={
          <div className='verify'>
            <div className="spinner"></div>
          </div>
        }>
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/cart' element={<Cart />} />
            <Route path='/order' element={<PlaceOrder />} />
            <Route path='/myorders' element={<MyOrders />} />
            <Route path='/verify' element={<Verify />} />
            <Route path='/TrackOrder' element={
              <ProtectedRoute>
                   <TrackOrder />
              </ProtectedRoute> 
              } />
          </Routes>
          <Footer />
        </Suspense>
      </div>
    </>
  );
};

export default App;
