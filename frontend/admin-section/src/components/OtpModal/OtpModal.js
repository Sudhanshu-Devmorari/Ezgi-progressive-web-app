import React, { useEffect, useState } from "react";
import OTPInput from "react-otp-input";
import "./OtpModal.css";

const OtpModal = (props) => {
  const [otp, setOtp] = useState("");
  const [timer, setTimer] = useState(30);
  const [isTimerVisible, setIsTimerVisible] = useState(true);

  useEffect(() => {
    let interval;

    if (isTimerVisible) {
      interval = setInterval(() => {
        if (timer > 0) {
          setTimer(timer - 1);
        } else {
          setIsTimerVisible(false);
          clearInterval(interval);
        }
      }, 1000);
    }

    return () => {
      clearInterval(interval);
    };
  }, [timer, isTimerVisible]);

  const handleResendClick = () => {
    setTimer(30);
    setIsTimerVisible(true);
  };

  return (
    <>
      <div className="my-1 font">
        <div className="d-flex justify-content-between">
          <span>6 digit code</span>
          <span
            style={{
              color: "#D2DB08",
            }}
          >
            {/* 1:45 */}
            {isTimerVisible &&
              `${String(Math.floor(timer / 60)).padStart(2, "0")}:${String(
                timer % 60
              ).padStart(2, "0")}`}
          </span>
        </div>
        <div className="w-100 d-flex justify-content-center">
          <OTPInput
            inputStyle="otpinputdesign-dark-mode"
            value={otp}
            onChange={setOtp}
            numInputs={6}
            renderSeparator={<span> </span>}
            renderInput={(props) => <input {...props} />}
            containerStyle={"gap-1 my-2"}
          />
        </div>
        <div className="d-flex justify-content-between">
          <span>Didn't get the code? </span>
          <span
            className="cursor"
            onClick={handleResendClick}
            style={{
              color: "#D2DB08",
            }}
          >
            Again Send
          </span>
        </div>
      </div>
      <div className="d-flex flex-column align-items-center mt-3 font">
        <button
          onClick={() => props?.setShowModal(3)}
          style={{
            color: "#D2DB08",
            border: "1px solid #D2DB08",
            borderRadius: "4px",
            backgroundColor: "transparent",
            padding: "0.2rem .8rem",
          }}
        >
          Verify
        </button>
      </div>
    </>
  );
};

export default OtpModal;
