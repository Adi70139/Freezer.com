import React, { useContext, useEffect, useState } from "react";
import "./Cart.css";
import { StoreContext } from "../../Context/StoreContext";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const Cart = () => {
  const {
    cartItems,
    food_list,
    removeFromCart,
    getTotalCartAmount,
    url,
    isfree,
    setisfree,
  } = useContext(StoreContext);
  const navigate = useNavigate();
  const [isCartEmpty, setIsCartEmpty] = useState(true);
  const [promo, setPromo] = useState("");

  useEffect(() => {
    const checkIfCartIsEmpty = () => {
      const empty = food_list.every((item) => !cartItems[item._id]);
      setIsCartEmpty(empty);
    };
    checkIfCartIsEmpty();
  }, [cartItems, food_list]);

  const subtotal = getTotalCartAmount();
  const deliveryFee = subtotal > 0 ? (isfree ? 0 : 5) : 0;
  const total = subtotal + deliveryFee;
  subtotal>0?isfree:setisfree(false);

  function handleSubmit(e) {
    e.preventDefault();
    if (subtotal === 0) {
      toast.error("Please add items to continue..");
    } else {
      navigate("/order");
    }
  }

  function handlePromo(e) {
    setPromo(e.target.value);
  }

  function handlePromoClick(e) {
    e.preventDefault();
    if(promo!=="randomcode")toast.error("Promocode expired or not Active")
    else{
        if (promo === "randomcode" && subtotal > 0 && !isfree) {
          toast.info("You have unlocked free delivery!");
          setisfree(true);
        } else if(subtotal<=0){
          toast.error("Please add items to the cart");
        }else{
          toast.info("You have already unlocked free delivery!");
        }
    }
   
    setPromo("");
  }

  return (
    <div className="cart">
      <div className="cart-items">
        <div className="cart-items-title">
          <p>Items</p>
          <p>Title</p>
          <p>Price</p>
          <p>Quantity</p>
          <p>Total</p>
          <p>Remove</p>
        </div>
        <br />
        <hr />

        {isCartEmpty ? (
          <h2 style={{ textAlign: "center", marginTop: "10px" }}>
            Your cart is empty
          </h2>
        ) : (
          food_list.map((item, index) => {
            if (cartItems[item._id] > 0) {
              return (
                <div key={index}>
                  <div className="cart-items-title cart-items-item">
                    <img
                      src={`${url}/images/${item.image}`}
                      alt={item.name}
                    />
                    <p>{item.name}</p>
                    <p>${item.price}</p>
                    <div>{cartItems[item._id]}</div>
                    <p>${item.price * cartItems[item._id]}</p>
                    <p
                      className="cart-items-remove-icon"
                      onClick={() => removeFromCart(item._id)}
                    >
                      x
                    </p>
                  </div>
                  <hr />
                </div>
              );
            }
            return null;
          })
        )}
      </div>
      <div className="cart-bottom">
        <div className="cart-total">
          <h2>Cart Totals</h2>
          <div>
            <div className="cart-total-details">
              <p>Subtotal</p>
              <p>${subtotal}</p>
            </div>
            <hr />
            <div className="cart-total-details">
              <p>Delivery Fee</p>
              <p>${deliveryFee}</p>
            </div>
            <hr />
            {isfree && (
              <>
                <div className="cart-total-details">
                  <p>Free Delivery</p>
                  <p style={{ color: "red" }}>✅</p>
                </div>
                <hr />
              </>
            )}
            <div className="cart-total-details">
              <b>Total</b>
              <b>${total}</b>
            </div>
          </div>
          <button onClick={handleSubmit}>PROCEED TO CHECKOUT</button>
        </div>
        <div className="cart-promocode">
          <div>
            <p>Have any vouchers?</p>
            <div className="cart-promocode-input">
              <input
                type="text"
                placeholder="Enter promo code"
                value={promo}
                onChange={handlePromo}
              />
              <button
                style={{ cursor: "pointer" }}
                onClick={handlePromoClick}
              >
                Submit
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
