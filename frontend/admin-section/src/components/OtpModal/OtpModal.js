import React, { useEffect, useState } from "react";
import OTPInput from "react-otp-input";
import "./OtpModal.css";
import axios from "axios";
import Swal from "sweetalert2";
import config from "../../config";

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

  const handleResendOtp = async () => {
    try {
      const res = await axios.post(`${config.apiUrl}/otp-resend/`, {
        phone: props?.phone,
        is_admin: true,
      });
      if (res.data.status === 500) {
        setErrorMessage(res.data.error);
      }
    } catch (error) {
      console.log("error", error);
    }
  };
  const handleResendClick = () => {
    setTimer(30);
    setIsTimerVisible(true);
    handleResendOtp()
  };
  // const handleResendClick = () => {
  //   setTimer(30);
  //   setIsTimerVisible(true);
  //   handleOtpVerify()
  // };
  const [errorMessage, setErrorMessage] = useState("");
  function handleOtpVerify() {
    axios
      .post(`${config?.apiUrl}/otp-verify/`, { otp: otp, phone: props?.phone })
      .then((res) => {
        // console.log(res);
        if (res.data.status === 200) {
          props?.setShowModal(3);
        } else if (res.data.status === 400 || res.data.status === 500) {
          // Swal.fire({
          //   title: "Error",
          //   text: res.data.error,
          //   icon: "error",
          //   backdrop: false,
          //   customClass: "dark-mode-alert",
          // });
          setErrorMessage(res.data.error);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }

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
        {errorMessage && (
          <div className="error text-danger mt-1">{errorMessage}</div>
        )}
      </div>
      <div className="d-flex flex-column align-items-center mt-3 font">
        <button
          // onClick={() => props?.setShowModal(3)}
          
          onClick={handleOtpVerify}
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