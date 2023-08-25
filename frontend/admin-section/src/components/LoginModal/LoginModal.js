import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import "./LoginModal.css";
import ForgotPassowrd from "../ForgotPassowrd/ForgotPassowrd";
import axios from "axios";
import Swal from "sweetalert2";
import config from "../../../../src/config";

const LoginModal = () => {
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
    onSubmit: (values) => {
      console.log(values);
      axios
        .post(`${config?.apiUrl}/login/`, {
          phone: values.phone,
          password: values.password,
          is_admin: true,
        })
        .then((res) => {
          // console.log(res);
          if ((res.data.status === 400) || res.data.status === 404) {
            Swal.fire({
              title: "Error",
              text: res.data.data,
              icon: "error",
              backdrop: false,
              customClass: "dark-mode-alert",
            });
          } else if (res.data.status === 200) {
            const userId = res.data.userId
            localStorage.setItem("admin-user-id", userId);
            window.location.reload();
          }
        })
        .catch((error) => {
          console.log(error);
        });
    },
  });

  return (
    <>
      <div
        className="d-flex justify-content-center align-items-center flex-column"
        style={{ height: "100vh" }}
      >
        <div className="my-2" style={{ color: "#E6E6E6", fontSize: "1.3rem" }}>
          LOGO
        </div>
        <div
          className="dark-mode font"
          style={{ padding: "2rem", width: "380px" }}
        >
          <form onSubmit={formik.handleSubmit}>
            <label htmlFor="phone">Phone</label>
            <div className="input-group">
              <span
                className="input-group-text darkMode-input"
                id="basic-addon1"
              >
                +90
              </span>
              <input
                id="phone"
                type="text"
                className="darkMode-input form-control"
                aria-describedby="basic-addon1"
                {...formik.getFieldProps("phone")}
              />
            </div>
            {formik.touched.phone && formik.errors.phone ? (
              <div className="error text-danger">{formik.errors.phone}</div>
            ) : null}

            <div className="col-auto">
              <label htmlFor="inputPassword6" className="col-form-label">
                Password
              </label>
            </div>
            <div className="col-auto">
              <input
                type="password"
                id="inputPassword6"
                className="darkMode-input form-control"
                aria-describedby="passwordHelpInline"
                {...formik.getFieldProps("password")}
              />
            </div>
            {formik.touched.password && formik.errors.password ? (
              <div className="error text-danger mt-1 mb-2 justify-content-between d-flex">
                {formik.errors.password}
                <span
                  className="cursor text-end ml-1"
                  style={{ color: "#E6E6E6", fontSize: "0.79rem" }}
                  data-bs-toggle="modal"
                  data-bs-target="#forgotPS"
                >
                  Forgot Password
                </span>
              </div>
            ) : (
              <div
                className="cursor justify-content-end d-flex my-1"
                data-bs-toggle="modal"
                data-bs-target="#forgotPS"
              >
                Forgot Password
              </div>
            )}
            <div className="d-flex justify-content-center">
              <input
                type="submit"
                value="Login"
                style={{
                  color: "#D2DB08",
                  border: "1px solid #D2DB08",
                  borderRadius: "4px",
                  backgroundColor: "transparent",
                  padding: "0.2rem .8rem",
                }}
              />
            </div>
          </form>
        </div>
      </div>

      <ForgotPassowrd />
    </>
  );
};

export default LoginModal;
