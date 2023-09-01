import React, { useContext, useState } from "react";
import CurrentTheme from "../../context/CurrentTheme";
import axios from "axios";
import { RxCross2 } from "react-icons/rx";
import GoogleLogin from "../GoogleLogin";
import FacebookLogin from "../FacebookLogin";
import "./SignInModal.css";
import Swal from "sweetalert2";
import { useFormik } from "formik";
import * as Yup from "yup";
import config from "../../config";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";

const SignInModal = (props) => {
  const { currentTheme, setCurrentTheme, ShowModal, setShowModal } =
    useContext(CurrentTheme);

  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
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
      const res = await axios.post(`${config.apiUrl}/login/`, {
        password: password,
        phone: phone,
      });
      console.log("response login: ", res.data);
      if (res.data.status === 200) {
        localStorage.setItem("user-role", res.data.userRole);
        localStorage.setItem("user-id", res.data.userId);
        window.location.reload();
      } else if (res.data.status === 400) {
        // setpasswordError(res.data.data);
        Swal.fire({
          title: "Error",
          text: res.data.data,
          icon: "error",
          backdrop: false,
          customClass:
            currentTheme === "dark" ? "dark-mode-alert" : "light-mode-alert",
        });
      } else if (res.data.status === 404) {
        Swal.fire({
          title: "Error",
          text: res.data.data,
          icon: "error",
          backdrop: false,
          customClass:
            currentTheme === "dark" ? "dark-mode-alert" : "light-mode-alert",
        });
      }
    }
  };

  const validationSchema = Yup.object({
    phone: Yup.string()
      .required("Phone is required")
      .matches(/^\d{10}$/, "Phone must be 10 digits"),
    password: Yup.string()
      .required("Password is required")
      .min(8, "Password must be at least 8 characters"),
    // .matches(
    //   /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+$/,
    //   "Password must contain at least 1 uppercase letter, 1 digit, and 1 special character"
    // ),
  });
  const formik = useFormik({
    initialValues: {
      phone: "",
      password: "",
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      // console.log(values);
      const res = await axios.post(`${config.apiUrl}/login/`, {
        password: values.password,
        phone: values.phone,
      });
      console.log("response login: ", res);
      if (res.data.status === 200) {
        localStorage.setItem("user-role", res.data.userRole);
        localStorage.setItem("user-id", res.data.userId);
        localStorage.setItem("username", res.data.username);
        window.location.reload();
      } else if (res.data.status === 400) {
        // setpasswordError(res.data.data);
        Swal.fire({
          title: "Error",
          text: res.data.data,
          icon: "error",
          backdrop: false,
          customClass:
            currentTheme === "dark" ? "dark-mode-alert" : "light-mode-alert",
        });
      } else if (res.data.status === 404) {
        Swal.fire({
          title: "Error",
          text: res.data.data,
          icon: "error",
          backdrop: false,
          customClass:
            currentTheme === "dark" ? "dark-mode-alert" : "light-mode-alert",
        });
      }
    },
  });

  return (
    <>
      <div className="">
        <form onSubmit={formik.handleSubmit}>
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
                    // onChange={(e) => setPhone(e.target.value)}
                    id="phone"
                    type="text"
                    className={`${
                      currentTheme === "dark"
                        ? "darkMode-input"
                        : "lightMode-input"
                    } form-control`}
                    aria-label="Username"
                    aria-describedby="basic-addon1"
                    {...formik.getFieldProps("phone")}
                  />
                </div>
                {formik.touched.phone && formik.errors.phone ? (
                  <small className="error text-danger">
                    {formik.errors.phone}
                  </small>
                ) : null}
              </div>
              <div className="d-flex flex-column m-2 mb-0 position-relative">
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
                    currentTheme === "dark"
                      ? "darkMode-input"
                      : "lightMode-input"
                  } form-control`}
                  type={`${showPassword ? "text" : "password"}`}
                  name=""
                  id="password"
                  {...formik.getFieldProps("password")}
                />
                {showPassword ? (
                  <AiOutlineEyeInvisible
                    fontSize={"1.5rem"}
                    style={{
                      position: "absolute",
                      right: ".5rem",
                      top: "1.56rem",
                    }}
                    onClick={() => setShowPassword(!showPassword)}
                  />
                ) : (
                  <AiOutlineEye
                    fontSize={"1.5rem"}
                    style={{
                      position: "absolute",
                      right: ".5rem",
                      top: "1.56rem",
                    }}
                    onClick={() => setShowPassword(!showPassword)}
                  />
                )}
                {formik.touched.password && formik.errors.password ? (
                  <small className="error text-danger">
                    {formik.errors.password}
                  </small>
                ) : null}
              </div>
              {/* <small className="text-danger m-2" style={{ fontSize: "0.71rem" }}>
              {passwordError}
            </small> */}
              {/* {showErrorAlert && (
              <SweetAlert
                error
                title="Error"
                onConfirm={() => {
                  setShowErrorAlert(false); // Hide the SweetAlert
                }}
              >
                {passwordError}{" "}
              </SweetAlert>
            )} */}
            </div>
            <div className="d-flex flex-column align-items-center my-3">
              <button
                type="submit"
                // onClick={() => {
                //   handleLogin();
                // }}
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
            </div>
          </div>
        </form>
      </div>
    </>
  );
};

export default SignInModal;
