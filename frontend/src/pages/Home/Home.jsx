import React, { useState,useContext,useEffect } from 'react'
import Header from '../../components/Header/Header'
import ExploreMenu from '../../components/ExploreMenu/ExploreMenu'
import FoodDisplay from '../../components/FoodDisplay/FoodDisplay'
import AppDownload from '../../components/AppDownload/AppDownload'
import { StoreContext } from "../../Context/StoreContext";
import cookies from "js-cookie";
import { toast } from "react-toastify";

const Home = () => {

  const [category,setCategory] = useState("All")

    const { setToken, setName, loadCartData } = useContext(StoreContext);
  
    useEffect(() => {

      setTimeout((()=>{
           const token=cookies.get("oauthToken");
           const email = cookies.get("oauthEmail");
      
            console.log("Token:", token);
            if (token && email) {
              setToken(token);
              setName(email);
              localStorage.setItem("token", token);
              loadCartData({ token });
              toast.success("Logged in successfully");
            }
        
            cookies.remove("oauthToken");
            cookies.remove("oauthEmail");
      }),200)
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
