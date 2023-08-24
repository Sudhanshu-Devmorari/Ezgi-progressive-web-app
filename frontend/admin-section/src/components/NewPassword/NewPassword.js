import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";

const NewPassword = () => {
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
      console.log(values);
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
                <AiOutlineEyeInvisible fontSize={"1.4rem"}  style={{color: "#E6E6E6"}}/>
              ) : (
                <AiOutlineEye fontSize={"1.4rem"}  style={{color: "#E6E6E6"}}/>
              )}
            </button>
          </div>
          <div className="d-flex flex-column align-items-center my-4">
            <button
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


