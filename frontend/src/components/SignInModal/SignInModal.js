import React, { useContext, useState } from "react";
import CurrentTheme from "../../context/CurrentTheme";
import axios from "axios";
import { RxCross2 } from "react-icons/rx";
import GoogleLogin from "../GoogleLogin";
import FacebookLogin from "../FacebookLogin";
import "./SignInModal.css";

const SignInModal = (props) => {
  const { currentTheme, setCurrentTheme, ShowModal, setShowModal } =
    useContext(CurrentTheme);
  const [alert, setAlert] = useState(null);

  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [passwordError, setpasswordError] = useState("");
  const [phoneError, setPhoneError] = useState("");

  const phoneReg = /^\d{10}$/;

  // LOGIN API
  const handleLogin = async () => {
    if (phone === "" && password === "") {
      setPhoneError("Invalid phone number");
      setpasswordError("Please enter correct password");
    } else {
      if (!phoneReg.test(phone)) {
        setPhoneError("Invalid phone number");
      }
      const res = await axios.post("http://127.0.0.1:8000/login/", {
        password: password,
        phone: phone,
      });
      console.log("response login: ", res.data);
      if (res.data.status === 200) {
        localStorage.setItem("user-role", res.data.userRole);
        localStorage.setItem("user-id", res.data.userId);
        window.location.reload();
      } else if (res.data.status === 400) {
        setpasswordError(res.data.data);
      } else if (res.data.status === 404) {
        alert(res.data.data);
      }
    }
  };

  return (
    <>
      <div className="">
        <div className="m-2">
          <div className="d-flex justify-content-center">
            <span>LOGIN</span>
            <span>
              <RxCross2
                onClick={props.hide}
                fontSize={"1.8rem"}
                className={`${
                  currentTheme === "dark" ? "closeBtn-dark" : "closeBtn-light"
                }`}
              />
            </span>
          </div>
          <div className="">
            <div className="d-flex flex-column m-2">
              <label htmlFor="phone">Phone</label>
              <div className="input-group">
                <span
                  className={`input-group-text ${
                    currentTheme === "dark"
                      ? "darkMode-input"
                      : "lightMode-input"
                  }`}
                  id="basic-addon1"
                  style={{ padding: ".375rem 0 .375rem .5rem" }}
                >
                  +90
                </span>
                <input
                  onChange={(e) => setPhone(e.target.value)}
                  id="phone"
                  type="text"
                  className={`${
                    currentTheme === "dark"
                      ? "darkMode-input"
                      : "lightMode-input"
                  } form-control`}
                  aria-label="Username"
                  aria-describedby="basic-addon1"
                />
              </div>
              <small className="text-danger" style={{ fontSize: "0.71rem" }}>
                {phoneError}
              </small>
            </div>
            <div className="d-flex flex-column m-2 mb-0">
              <div className="d-flex justify-content-between">
                <label htmlFor="password">Password</label>
                <span
                  onClick={() => {
                    setShowModal(5);
                  }}
                >
                  Forgot Password?
                </span>
              </div>
              <input
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
                className={`${
                  currentTheme === "dark" ? "darkMode-input" : "lightMode-input"
                } form-control`}
                type="password"
                name=""
                id="password"
              />
            </div>
            <small className="text-danger m-2" style={{ fontSize: "0.71rem" }}>
              {passwordError}
            </small>
          </div>
          <div className="d-flex flex-column align-items-center my-3">
            <button
              onClick={() => {
                handleLogin();
              }}
              className={`${
                currentTheme === "dark" ? "darkMode-btn" : "lightMode-btn"
              } px-3 py-1`}
            >
              Continue
            </button>
            <div className="text-center my-3">
              --------------------- or ---------------------{" "}
            </div>
            <div className="d-flex">
              <GoogleLogin />
              <FacebookLogin />
            </div>
            <div className="mt-3">
              You don't have Account?{" "}
              <span
                style={{
                  color: currentTheme === "dark" ? "#D2DB08" : "#00659D",
                }}
                onClick={() => {
                  setShowModal(1);
                }}
              >
                Sign Up
              </span>
            </div>
            {alert}
          </div>
        </div>
      </div>
    </>
  );
};

export default SignInModal;
