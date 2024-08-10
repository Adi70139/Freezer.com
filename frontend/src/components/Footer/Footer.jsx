import React from 'react'
import './Footer.css'
import { assets } from '../../assets/assets'

const Footer = () => {
  return (
    <div className='footer' id='footer'>
      <div className="footer-content">
        <div className="footer-content-left">
            <h1 style={{fontFamily:'serif'}}>Frezzer<span style={{fontFamily:'cursive',color:'red'}}>Burns</span></h1>
    
            <p>Your ultimate destination for delicious meals delivered straight to your door! Explore our extensive menu featuring gourmet dishes made from fresh, high-quality ingredients. Whether you're craving comfort food or healthy options, we've got something to satisfy every palate. Order now and experience the convenience of dining at home!</p>
            <div className="footer-social-icons">
                <img src={assets.facebook_icon} alt="" />
                <img src={assets.twitter_icon} alt="" />
                <img src={assets.linkedin_icon} alt="" />
            </div>
        </div>
        <div className="footer-content-center">
            <h2>COMPANY</h2>
            <ul>
                <li>Home</li>
                <li>About us</li>
                <li>Delivery</li>
                <li>Privacy policy</li>
            </ul>
        </div>
        <div className="footer-content-right">
            <h2>GET IN TOUCH</h2>
            <ul>
                <li>+1-212-456-7890</li>
                <li>freezerburns@gmail.com</li>
            </ul>
        </div>
      </div>
      <hr />
      <p className="footer-copyright">Copyright 2024 © FreezerBurns.com - All Right Reserved.</p>
    </div>
  )
}

export default Footer
