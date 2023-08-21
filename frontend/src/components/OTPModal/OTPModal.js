import React, { useContext, useEffect, useState } from "react";
import { RxCross2 } from "react-icons/rx";
import CurrentTheme from "../../context/CurrentTheme";
import OTPInput from "react-otp-input";
import axios from "axios";

const OTPModal = (props) => {
  const { currentTheme, setCurrentTheme, ShowModal, setShowModal } =
    useContext(CurrentTheme);

  const [otp, setOtp] = useState("");
  const [otpError, setOtpError] = useState("");

  const [minutes, setMinutes] = useState(0);
  const [seconds, setSeconds] = useState(30);

  useEffect(() => {
    const interval = setInterval(() => {
      if (minutes > 0 && seconds > 0) {
        clearInterval(interval);
      } else if (seconds === 0) {
        setMinutes(minutes - 1);
        setSeconds(59);
      } else {
        setSeconds(seconds - 1);
      }
    }, 1000);

    return () => {
      clearInterval(interval);
    };
  }, [minutes, seconds]);

  // OTP verify API
  const handleOTPVerification = async () => {
    const res = await axios.post("http://127.0.0.1:8000/otp-verify/", {
      otp: otp,
    });
    // console.log(res.data, "======>>otp res");
    if (res.data.status === 200) {
      setShowModal(7);
      console.log("verified");
      console.log("object");
    }
    if (res.data.status === 400) {
      setOtpError(res.data.error);
    }
  };

  // RESEND OTP API
  const handleResendOtp = async () => {
    setOtp("");
    setOtpError("");
    setSeconds(30);
    const res = await axios.post("http://127.0.0.1:8000/otp-resend/", {
      phone: props.forgotPsPhone,
    });
    // console.log(res.data, "======>>otp resend");
    if (res.data.status === 500) {
      setOtpError(res.data.error);
    }
  };

  return (
    <>
      <div className="">
        <div className="m-3 mt-4">
          <div className="d-flex justify-content-center">
            <span>
              <RxCross2
                onClick={() => {
                  props.hide();
                }}
                fontSize={"1.8rem"}
                className={`${
                  currentTheme === "dark" ? "closeBtn-dark" : "closeBtn-light"
                }`}
              />
            </span>
          </div>
          <div className="">We sent a SMS verification code to your phone.</div>
          <div className="my-1">
            <div className="d-flex justify-content-between">
              <span>Enter 6 digit code</span>
              {seconds > 0 && (
                <span
                  style={{
                    color: currentTheme === "dark" ? "#D2DB08" : "#00659D",
                  }}
                >
                  {minutes < 10 ? `0${minutes}` : minutes}:
                  {seconds < 10 ? `0${seconds}` : seconds}
                </span>
              )}
            </div>
            <div className="w-100 d-flex justify-content-center">
              <OTPInput
                inputStyle={`${
                  currentTheme === "dark"
                    ? "otpinputdesign-dark-mode"
                    : "otpinputdesign-light-mode"
                } `}
                value={otp}
                onChange={setOtp}
                numInputs={6}
                renderSeparator={<span> </span>}
                renderInput={(props) => <input {...props} />}
                containerStyle={"otpbox my-2"}
              />
            </div>
            <div className="d-flex justify-content-between">
              <small className="text-danger" style={{ fontSize: "0.71rem" }}>
                {otpError}
              </small>
              <div className="">
                <small>Didn't get the code? </small>
                <span
                  onClick={() => {
                    handleResendOtp();
                  }}
                  style={{
                    color: currentTheme === "dark" ? "#D2DB08" : "#00659D",
                  }}
                >
                  Send Again
                </span>
              </div>
            </div>
          </div>
          <div className="d-flex flex-column align-items-center my-4">
            <button
              onClick={() => {
                handleOTPVerification();
              }}
              className={`${
                currentTheme === "dark" ? "darkMode-btn" : "lightMode-btn"
              } px-3 py-1`}
            >
              Continue
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default OTPModal;
