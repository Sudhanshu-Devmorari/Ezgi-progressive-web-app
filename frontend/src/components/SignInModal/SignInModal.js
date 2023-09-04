import React, { useContext } from "react";
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

  const validationSchema = Yup.object({
    phone: Yup.string()
    .required("Phone is required")
    .matches(/^5\d*$/, "Phone must start with '5' and contain only digits")
    .min(10, "Phone must be 10 digits")
    .max(10, "Phone must be 10 digits"),
    password: Yup.string()
      .required("Password is required")
      .min(8, "Password must be at least 8 characters"),
  });

  const formik = useFormik({
    initialValues: {
      phone: "",
      password: "",
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      try {
        const res = await axios.post(`${config.apiUrl}/login/`, {
          password: values.password,
          phone: values.phone,
        });

        if (res.data.status === 200) {
          localStorage.setItem("user-role", res.data.userRole);
          localStorage.setItem("user-id", res.data.userId);
          localStorage.setItem("username", res.data.username);
          Swal.fire({
            title: "Success",
            text: "You have Logged in Successfully!",
            icon: "success",
            backdrop: false,
            customClass:
              currentTheme === "dark" ? "dark-mode-alert" : "light-mode-alert",
          }).then((result) => {
            if (result.isConfirmed) {
              window.location.reload();
            }
          });
        } else if (res.data.status === 400 || res.data.status === 404) {
          Swal.fire({
            title: "Error",
            text: res.data.data,
            icon: "error",
            backdrop: false,
            customClass:
              currentTheme === "dark" ? "dark-mode-alert" : "light-mode-alert",
          });
        }
      } catch (error) {
        console.error("Login failed:", error);
      }
    },
  });

  return (
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
                className={`${
                  currentTheme === "dark"
                    ? "darkMode-input"
                    : "lightMode-input"
                } form-control`}
                type={`${formik.getFieldProps("showPassword")
                  ? "text"
                  : "password"
                }`}
                name=""
                id="password"
                {...formik.getFieldProps("password")}
              />
              {formik.getFieldProps("showPassword") ? (
                <AiOutlineEyeInvisible
                  fontSize={"1.5rem"}
                  style={{
                    position: "absolute",
                    right: ".5rem",
                    top: "1.56rem",
                  }}
                  onClick={() => formik.setFieldValue("showPassword", false)}
                />
              ) : (
                <AiOutlineEye
                  fontSize={"1.5rem"}
                  style={{
                    position: "absolute",
                    right: ".5rem",
                    top: "1.56rem",
                  }}
                  onClick={() => formik.setFieldValue("showPassword", true)}
                />
              )}
              {formik.touched.password && formik.errors.password ? (
                <small className="error text-danger">
                  {formik.errors.password}
                </small>
              ) : null}
            </div>
          </div>
          <div className="d-flex flex-column align-items-center my-3">
            <button
              type="submit"
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
              You don't have an Account?{" "}
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
  );
};

export default SignInModal;
