import React, { useEffect, useContext } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { StoreContext } from "../../Context/StoreContext";

const OAuthSuccess = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { setToken, setName, loadCartData } = useContext(StoreContext);

  useEffect(() => {
    const query = new URLSearchParams(location.search);
    const token = query.get("token");
    const email = query.get("email");

    if (token && email) {
      setToken(token);
      setName(email);
      localStorage.setItem("token", token);
      loadCartData({ token });
      navigate("/"); // Redirect to homepage or dashboard
    } else {
      navigate("/login"); // In case token/email are missing
    }
  }, []);

  return (
    <div style={{ padding: "2rem", textAlign: "center" }}>
      <h2>Logging you in...</h2>
      <p>Please wait while we complete the authentication process.</p>
    </div>
  );
};

export default OAuthSuccess;
