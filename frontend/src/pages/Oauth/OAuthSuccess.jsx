import React, { useEffect, useContext } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { StoreContext } from "../../Context/StoreContext";
import cookies from "js-cookie";
import { toast } from "react-toastify";

const OAuthSuccess = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { setToken, setName, loadCartData } = useContext(StoreContext);

  useEffect(() => {
    const token=cookies.get("oauthToken");
    const email = cookies.get("oauthEmail");

    if (token && email) {
      setToken(token);
      setName(email);
      localStorage.setItem("token", token);
      loadCartData({ token });
      navigate("/"); // Redirect to homepage or dashboard
    } else {
      navigate("/login");
      toast.error("Something went wrong..Please try again")// In case token/email are missing
    }

    cookies.remove("oauthToken");
    cookies.remove("oauthEmail");

  }, []);

  return (
    <div style={{ padding: "2rem", textAlign: "center" }}>
      <h2>Logging you in...</h2>
      <p>Please wait while we complete the authentication process...</p>
    </div>
  );
};

export default OAuthSuccess;
