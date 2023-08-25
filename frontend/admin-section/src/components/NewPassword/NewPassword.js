import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import axios from "axios";
import Swal from "sweetalert2";
import config from "../../../../src/config";

const NewPassword = (props) => {
  const formik = useFormik({
    initialValues: {
      password: "",
      showPassword: false,
    },
    validationSchema: Yup.object({
      password: Yup.string()
        .min(6, "Password must be at least 6 characters")
        .required("Password is required"),
    }),
    onSubmit: (values) => {
      axios
        .post(`${config?.apiUrl}/password-reset/`, {
          new_ps: values.password,
          phone: props?.phone,
        })
        .then((res) => {
          //   console.log(res);
          if (res.data.status === 200) {
            Swal.fire({
              title: "Success",
              text: "Password changed successfully",
              icon: "success",
              backdrop: false,
              customClass: "dark-mode-alert",
            });
          }
        })
        .catch((error) => {
          console.log(error);
        });
    },
  });

  const togglePasswordVisibility = () => {
    formik.setFieldValue("showPassword", !formik.values.showPassword);
  };

  return (
    <div className="m-3 mt-4">
      <div className="">
        <form onSubmit={formik.handleSubmit}>
          <div className="d-flex flex-column my-2">
            <label htmlFor="password">New Password</label>
            <input
              className="darkMode-input form-control"
              type={formik.values.showPassword ? "text" : "password"}
              id="password"
              {...formik.getFieldProps("password")}
            />
            <span className="text-danger">
              {formik.touched.password && formik.errors.password
                ? formik.errors.password
                : ""}
            </span>
            <button
              type="button"
              onClick={togglePasswordVisibility}
              style={{
                position: "absolute",
                right: "3.5rem",
                top: "5.2rem",
                border: "none",
                backgroundColor: "transparent",
                cursor: "pointer",
              }}
            >
              {formik.values.showPassword ? (
                <AiOutlineEyeInvisible
                  fontSize={"1.4rem"}
                  style={{ color: "#E6E6E6" }}
                />
              ) : (
                <AiOutlineEye
                  fontSize={"1.4rem"}
                  style={{ color: "#E6E6E6" }}
                />
              )}
            </button>
          </div>
          <div className="d-flex flex-column align-items-center my-4">
            <button
              data-bs-dismiss="modal"
              type="submit"
              style={{
                color: "#D2DB08",
                border: "1px solid #D2DB08",
                borderRadius: "4px",
                backgroundColor: "transparent",
                padding: "0.2rem .8rem",
              }}
            >
              Continue
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default NewPassword;
