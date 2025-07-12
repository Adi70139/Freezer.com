import React, { useContext, useState, useEffect} from "react";
import "./LoginPopup.css";
import { assets } from "../../assets/assets";
import { StoreContext } from "../../Context/StoreContext";
import axios from "axios";
import { toast } from "react-toastify";

const LoginPopup = ({ setShowLogin }) => {
  const { setToken, url, loadCartData, setName } = useContext(StoreContext);
  const [currState, setCurrState] = useState("Sign Up"); // "Sign Up" or "Login"
  const [step, setStep] = useState(currState === "Login" ? "DONE" : "ENTER_EMAIL");

  const [data, setData] = useState({
    name: "",
    email: "",
    password: "",
  });

  useEffect(() => {
  
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = "auto";
    };
    
}, []);

  const [otp, setOtp] = useState("");

  const onChangeHandler = (e) => {
    const { name, value } = e.target;
    setData((prev) => ({ ...prev, [name]: value }));
  };

  const verifyEmailHandler = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${url}/api/user/verify-email`, {
        name: data.name,
        email: data.email,
      });

      if (response.data.success) {
        toast.success("OTP sent to your email.");
        setStep("ENTER_OTP");
      } else {
        toast.error(response.data.message || "Email verification failed");
      }
    } catch (err) {
      toast.error("Server error while sending OTP.");
    }
  };

  const verifyOtpHandler = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${url}/api/user/verify-otp`, {
        email: data.email,
        otp,
      });

      if (response.data.success) {
        toast.success("Email verified! Set your password.");
        setStep("SET_PASSWORD");
      } else {
        toast.error(response.data.message || "Invalid OTP.");
      }
    } catch (err) {
      toast.error("OTP verification failed.");
    }
  };

  const onLoginOrRegister = async (e) => {
    e.preventDefault();
    const new_url =
      currState === "Login"
        ? `${url}/api/user/login`
        : `${url}/api/user/register`;

    try {
      const response = await axios.post(new_url, data);
      if (response.data.success) {
        setToken(response.data.token);
        setName(response.data.email);
        localStorage.setItem("token", response.data.token);
        loadCartData({ token: response.data.token });
        setShowLogin(false);
      } else {
        toast.error(response.data.message);
      }
    } catch (err) {
      toast.error("Something went wrong.");
    }
  };

  return (
    <div className="login-popup">
      <form
        onSubmit={
          step === "ENTER_EMAIL"
            ? verifyEmailHandler
            : step === "ENTER_OTP"
            ? verifyOtpHandler
            : onLoginOrRegister
        }
        className="login-popup-container"
      >
        <div className="login-popup-title">
          <h2>{currState}</h2>
          <img onClick={() => setShowLogin(false)} src={assets.cross_icon} alt="" />
        </div>

        <div className="login-popup-inputs">
          {currState === "Sign Up" && (
            <>
              {step === "ENTER_EMAIL" && (
                <>
                  <input
                    name="name"
                    onChange={onChangeHandler}
                    value={data.name}
                    type="text"
                    placeholder="Your name"
                    required
                  />
                  <input
                    name="email"
                    onChange={onChangeHandler}
                    value={data.email}
                    type="email"
                    placeholder="Your email"
                    required
                  />
                </>
              )}

              {step === "ENTER_OTP" && (
                <input
                  type="text"
                  placeholder="Enter OTP"
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)}
                  required
                />
              )}

              {step === "SET_PASSWORD" && (
                <input
                  name="password"
                  onChange={onChangeHandler}
                  value={data.password}
                  type="password"
                  placeholder="Set your password"
                  required
                />
              )}
            </>
          )}

          {currState === "Login" && step === "DONE" && (
            <>
              <input
                name="email"
                onChange={onChangeHandler}
                value={data.email}
                type="email"
                placeholder="Your email"
                required
              />
              <input
                name="password"
                onChange={onChangeHandler}
                value={data.password}
                type="password"
                placeholder="Password"
                required
              />
            </>
          )}
        </div>

        <button>
          {step === "ENTER_EMAIL"
            ? "Send OTP"
            : step === "ENTER_OTP"
            ? "Verify OTP"
            : currState === "Login"
            ? "Login"
            : "Create Account"}
        </button>

        {currState !== "Login" && step === "SET_PASSWORD" && (
          <div className="login-popup-condition">
            <input type="checkbox" required />
            <p>By continuing, I agree to the terms of use & privacy policy.</p>
          </div>
        )}

        {currState === "Login" ? (
          <p>
            Create a new account?{" "}
            <span
              onClick={() => {
                setCurrState("Sign Up");
                setStep("ENTER_EMAIL");
              }}
            >
              Click here
            </span>
          </p>
        ) : (
          <p>
            Already have an account?{" "}
            <span
              onClick={() => {
                setCurrState("Login");
                setStep("DONE");
              }}
            >
              Login here
            </span>
          </p>
        )}
      </form>
    </div>
  );
};

export default LoginPopup;
