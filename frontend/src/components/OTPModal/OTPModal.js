import React, { useContext, useEffect, useState } from "react";
import { RxCross2 } from "react-icons/rx";
import CurrentTheme from "../../context/CurrentTheme";
// import OTPInput from "react-otp-input";
import axios from "axios";
import config from "../../config";
import Swal from "sweetalert2";
import OtpInput from "react18-input-otp";
import { useCookies } from "react-cookie";

const OTPModal = (props) => {
  const [cookies, setCookie, removeCookie] = useCookies();

  const { currentTheme, setCurrentTheme, ShowModal, setShowModal } =
    useContext(CurrentTheme);

  // console.log("props.otp::::::::::::::", props.otp);

  const [otp, setOtp] = useState("");
  const [otpError, setOtpError] = useState("");

  const [timer, setTimer] = useState(30);
  const [isTimerVisible, setIsTimerVisible] = useState(true);
  const [otpLoading, setOtpLoading] = useState(false);

  useEffect(() => {
    let interval;

    // if (props.otp) {
    //   setShowModal(5);
    // }

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

  // OTP verify API
  const handleOTPVerification = async () => {
    const phone = props?.signUpData.phone;
    if (phone) {
      const res = await axios.post(`${config.apiUrl}/otp-verify/`, {
        otp: otp,
        phone: phone,
        name: props?.signUpData?.name,
        username: (props?.signUpData?.username).toLowerCase(),
        password: props?.signUpData?.password,
        city: props?.signUpData?.city,
        gender: props?.signUpData?.gender,
        age: props?.signUpData?.age,
        country: "Turkey",
        signup: "signup",
      });
      if (res.data.status === 200) {
        setOtpLoading(false);
        props?.setSelectedCity("Select");
        props?.setSelectedGender("Select");
        props?.setSelectedAge("Select");
        // localStorage.setItem("username", res?.data?.user?.username);
        // localStorage.setItem("user-role", res?.data?.user?.user_role);
        // localStorage.setItem("user-id", res?.data?.user?.id);
        localStorage.setItem("priviouspage", "home");
        localStorage.setItem("currentpage", "home");
        localStorage.setItem("dashboardShow", false);
        localStorage.setItem(
          "subcurrentpage",
          res.data.userRole == "standard" ? "subscribers" : "home"
        );

        setCookie("username", res?.data?.user?.username, {
          expires: new Date(new Date().getTime() + 7 * 24 * 60 * 60 * 1000),
        });
        setCookie("user-role", res?.data?.user?.user_role, {
          expires: new Date(new Date().getTime() + 7 * 24 * 60 * 60 * 1000),
        });
        setCookie("user-id", res?.data?.user?.id, {
          expires: new Date(new Date().getTime() + 7 * 24 * 60 * 60 * 1000),
        });

        props.hide();
        await Swal.fire({
          title: "Success",
          text: "User Created Successfully!",
          icon: "success",
          backdrop: false,
          customClass:
            currentTheme === "dark" ? "dark-mode-alert" : "light-mode-alert",
          timer: 2000,
        });
        window.location.reload();
      }
      if (res.data.status === 400) {
        setOtpLoading(false);
        setOtpError(res.data.error);
      }
    } else {
      // console.log("inside else condition:::::::::::")
      const res = await axios.post(`${config.apiUrl}/otp-verify/`, {
        otp: otp,
        phone: props?.forgotPsPhone,
      });
      // console.log("res:::::::::::::", res);

      if (res.data.status === 200) {
        setOtpLoading(false);
        setShowModal(7);
      }
      if (res.data.status === 400) {
        setOtpLoading(false);
        setOtpError(res.data.error);
      }
    }
  };

  // RESEND OTP API
  const handleResendOtp = async () => {
    setOtpError("");
    setOtp("");
    setTimer(30);
    setIsTimerVisible(true);
    const phone = props?.signUpData.phone;

    try {
      const res = await axios.post(`${config.apiUrl}/otp-resend/`, {
        phone: phone ? phone : props.forgotPsPhone,
        signup: "signup",
      });
      // console.log(res.data, "======>>otp resend");
      if (res.data.status === 500) {
        setOtpError(res.data.error);
      }
    } catch (error) {
      console.log("error:::::::::::::", error);
    }
  };

  return (
    <>
      <div className="m-3 mt-4 otpMargin">
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
        <div className="my-1 w-100">
          <div className="d-flex justify-content-between">
            <span>Enter 6 digit code</span>
            <span
              style={{
                color: currentTheme === "dark" ? "#D2DB08" : "#00659D",
              }}
            >
              {isTimerVisible &&
                `${String(Math.floor(timer / 60)).padStart(2, "0")}:${String(
                  timer % 60
                ).padStart(2, "0")}`}
            </span>
          </div>
          <div className="w-100">
            <OtpInput
              value={otp}
              onChange={setOtp}
              numInputs={6}
              separator={<span> </span>}
              inputStyle={`${
                currentTheme === "dark"
                  ? "otpinputdesign-dark-mode"
                  : "otpinputdesign-light-mode"
              } `}
              containerStyle={"otpbox flex-wrap my-2"}
              isInputNum={true}
            />
          </div>
          <div className="d-flex justify-content-between align-items-center">
            <small
              className="text-danger w-100"
              style={{ fontSize: "0.71rem" }}
            >
              {otpError}
            </small>
            <p className="mb-0 w-100 text-end" style={{ fontSize: "0.71rem" }}>
              <small>Didn't get the code? </small>
              <span
                onClick={() => {
                  !isTimerVisible && handleResendOtp();
                }}
                style={{
                  color: currentTheme === "dark" ? "#D2DB08" : "#00659D",
                }}
              >
                Send Again
              </span>
            </p>
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
            {otpLoading ? "Loading..." : "Continue"}
          </button>
        </div>
      </div>
    </>
  );
};

export default OTPModal;