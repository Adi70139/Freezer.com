import React, { useState } from 'react'
import Header from '../../components/Header/Header'
import ExploreMenu from '../../components/ExploreMenu/ExploreMenu'
import FoodDisplay from '../../components/FoodDisplay/FoodDisplay'
import AppDownload from '../../components/AppDownload/AppDownload'
import { useEffect } from 'react';
import cookies from 'js-cookie';
import { useNavigate } from 'react-router-dom';

const Home = () => {

  const [category,setCategory] = useState("All")
  const navigate = useNavigate();

   useEffect(() => {
      const token=cookies.get("oauthToken");
      const email = cookies.get("oauthEmail");
  
      if (token && email) {
        setToken(token);
        setName(email);
        localStorage.setItem("token", token);
        loadCartData({ token });
      } else {
        navigate("/login");
        toast.error("Something went wrong..Please try again")// In case token/email are missing
      }
  
      cookies.remove("oauthToken");
      cookies.remove("oauthEmail");
  
    }, []);

  return (
    <>
      <Header/>
      <ExploreMenu setCategory={setCategory} category={category}/>
      <FoodDisplay category={category}/>
      <AppDownload/>
    </>
  )
}

export default Home
