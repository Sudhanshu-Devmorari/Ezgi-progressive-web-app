import React, { useContext, useState } from "react";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { RxCross2 } from "react-icons/rx";
import CurrentTheme from "../../context/CurrentTheme";
import axios from "axios";
import Swal from "sweetalert2";
import config from "../../config";
import { useFormik } from "formik";
import * as Yup from "yup";

const PasswordReset = (props) => {
  const { currentTheme, setCurrentTheme } = useContext(CurrentTheme);

  const [showPassword, setShowPassword] = useState(false);
  const [password, setPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const [isLoading, setIsLoading] = useState(false);

  const initialValues = {
    password: "",
  };

  const validationSchema = Yup.object({
    password: Yup.string()
      .required("Password is required")
      .min(8, "Password must be at least 8 characters"),
  });

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: async (values) => {
      try {
        setIsLoading(true);
        const res = await axios.post(`${config?.apiUrl}/password-reset/`, {
          new_ps: values.password,
          phone: props.forgotPsPhone,
        });
        if (res.data.status === 200) {
          setIsLoading(false);
          Swal.fire({
            title: "Success",
            text: res.data.data,
            icon: "success",
            backdrop: false,
            customClass: `${
              currentTheme === "dark" ? "dark-mode-alert" : "light-mode-alert"
            }`,
          }).then((result) => {
            if (result.isConfirmed) {
              props.hide();
            }
          });
        }
      } catch (error) {
        console.log(error);
      }
    },
  });

  // PASSWORD RESET API
  const handlePasswordReset = async () => {
    if (password !== "") {
      const res = await axios.post(`${config?.apiUrl}/password-reset/`, {
        new_ps: password,
        phone: props.forgotPsPhone,
      });
      // console.log("res password reset ", res.data);
      if (res.data.status === 200) {
        Swal.fire({
          title: "Success",
          text: res.data.data,
          icon: "success",
          backdrop: false,
          customClass: `${
            currentTheme === "dark" ? "dark-mode-alert" : "light-mode-alert"
          }`,
        }).then((result) => {
          if (result.isConfirmed) {
            props.hide();
          }
        });
      }
    } else {
      setPasswordError("Please enter a valid password.");
    }
  };

  return (
    <>
      <div className="">
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
          <div className="">You can create your new password</div>
          <div className="">
            <div className="d-flex flex-column my-2">
              <label htmlFor="password">New Password</label>
              <input
                className={`${
                  currentTheme === "dark" ? "darkMode-input" : "lightMode-input"
                } form-control`}
                type={showPassword ? "text" : "password"}
                id="password"
                {...formik.getFieldProps("password")}
              />
              {showPassword ? (
                <AiOutlineEyeInvisible
                  fontSize={"1.5rem"}
                  style={{
                    position: "absolute",
                    right: "2.5rem",
                    top: "6rem",
                  }}
                  onClick={() => setShowPassword(!showPassword)}
                />
              ) : (
                <AiOutlineEye
                  fontSize={"1.5rem"}
                  style={{
                    position: "absolute",
                    right: "2.5rem",
                    top: "6rem",
                  }}
                  onClick={() => setShowPassword(!showPassword)}
                />
              )}
            </div>
            <small className="text-danger" style={{ fontSize: "0.71rem" }}>
              {formik.errors.password}
            </small>
          </div>
          <div className="d-flex flex-column align-items-center my-4">
            <button
              type="submit"
              onClick={formik.handleSubmit}
              className={`${
                currentTheme === "dark" ? "darkMode-btn" : "lightMode-btn"
              } px-3 py-1`}
            >
              {isLoading ? "Loading..." : "Create"}
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default PasswordReset;
