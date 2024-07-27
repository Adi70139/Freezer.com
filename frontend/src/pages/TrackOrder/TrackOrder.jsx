import React from "react";
import { useNavigate } from "react-router-dom";
import './TrackOrder.css'

const TrackOrder=()=>{
    const navigate=useNavigate()

    function handleClick(){
        navigate("/")
    }
     
    return(
        <div className="my-orders">
            <h2>Your order is getting ready</h2>
            <button className="btn" onClick={handleClick}>Home</button>
        </div>
        
    )
}


export default TrackOrder;