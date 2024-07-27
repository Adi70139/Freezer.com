import React, { useContext, useEffect, useState } from "react";
import "./Cart.css";
import { StoreContext } from "../../Context/StoreContext";
import { useNavigate } from "react-router-dom";

const Cart = () => {
  const { cartItems, food_list, removeFromCart, getTotalCartAmount, url } =
    useContext(StoreContext);
  const navigate = useNavigate();
  const [isCartEmpty, setIsCartEmpty] = useState(true);

  useEffect(() => {
    const checkIfCartIsEmpty = () => {
      if (food_list.length === 0) {
        setIsCartEmpty(true);
      } else {
        const empty = food_list.every((item) => cartItems[item._id] === 0);
        setIsCartEmpty(empty);
      }
    };
    checkIfCartIsEmpty();
  }, [cartItems, food_list]);

  return (
    <div className="cart">
      <div className="cart-items">
        <div className="cart-items-title">
          <p>Items</p> <p>Title</p> <p>Price</p> <p>Quantity</p> <p>Total</p> <p>Remove</p>
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
                    <img src={`${url}/images/${item.image}`} alt={item.name} />
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
              <p>${getTotalCartAmount()}</p>
            </div>
            <hr />
            <div className="cart-total-details">
              <p>Delivery Fee</p>
              <p>${getTotalCartAmount() === 0 ? 0 : 5}</p>
            </div>
            <hr />
            <div className="cart-total-details">
              <b>Total</b>
              <b>${getTotalCartAmount() === 0 ? 0 : getTotalCartAmount() + 5}</b>
            </div>
          </div>
          <button onClick={() => navigate("/order")}>PROCEED TO CHECKOUT</button>
        </div>
        <div className="cart-promocode">
          <div>
            <p>If you have a promo code, Enter it here</p>
            <div className="cart-promocode-input">
              <input type="text" placeholder="promo code" />
              <button style={{ cursor: "pointer" }}>Submit</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
