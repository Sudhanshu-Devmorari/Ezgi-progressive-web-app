import React, { useContext, useState } from "react";
import { RxCross2 } from "react-icons/rx";
import CurrentTheme from "../../context/CurrentTheme";
import axios from "axios";
import config from "../../config";

const ForgotPassword = (props) => {
  const { currentTheme, setCurrentTheme, setShowModal, ShowModal } =
    useContext(CurrentTheme);

  const [phone, setPhone] = useState("");
  const [phoneError, setPhoneError] = useState("");

  const phoneReg = /^\d{10}$/;

  // FORGOT PASSWORD API
  const [alert, setAlert] = useState(null);
  const handleForgotPS = async () => {
    if (!phoneReg.test(phone)) {
      setPhoneError("Invalid phone number");
    } else {
      const res = await axios.post(`${config?.apiUrl}/otp-resend/`, {
        phone: phone,
      });
      // console.log("response: FP : ", res.data);
      if (res.data.status === 200) {
        setShowModal(6);
        props.setForgotPsPhone(phone);
      } else if (res.data.status === 404) {
        setPhoneError(res.data.data);
      }
    }
  };
  return (
    <>
      <div>
        <div className="m-3 mt-4">
          <div className="d-flex justify-content-center">
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
            We will send an SMS verification code to your phone.
          </div>
          <div className="">
            <div className="d-flex flex-column my-2">
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
          </div>
          <div className="d-flex flex-column align-items-center my-4">
            <button
              onClick={() => {
                handleForgotPS();
              }}
              className={`${
                currentTheme === "dark" ? "darkMode-btn" : "lightMode-btn"
              } px-4 py-1`}
            >
              Send
            </button>
          </div>
        </div>
        {alert}
      </div>
    </>
  );
};

export default ForgotPassword;
