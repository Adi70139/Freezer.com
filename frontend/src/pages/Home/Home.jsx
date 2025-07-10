import React, { useState,useContext,useEffect } from 'react'
import Header from '../../components/Header/Header'
import ExploreMenu from '../../components/ExploreMenu/ExploreMenu'
import FoodDisplay from '../../components/FoodDisplay/FoodDisplay'
import AppDownload from '../../components/AppDownload/AppDownload'
import { StoreContext } from "../../Context/StoreContext";
import cookies from "js-cookie";
import { toast } from "react-toastify";
import { useLocation, useNavigate } from "react-router-dom";

const Home = () => {

  const { setToken, setName, loadCartData } = useContext(StoreContext);
  const [category, setCategory] = useState("All");

  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const token = params.get("token");
    const email = params.get("email");

    if (token && email) {
      setToken(token);
      setName(email);
      localStorage.setItem("token", token);
      loadCartData({ token });
      toast.success("Logged in successfully");

      // clear the query params from URL
      navigate("/", { replace: true });
    }
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
