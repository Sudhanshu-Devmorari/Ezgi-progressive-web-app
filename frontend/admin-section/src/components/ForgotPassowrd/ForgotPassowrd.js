import React, { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import cross from "../../assets/Group 81.svg";
import OtpModal from "../OtpModal/OtpModal";
import NewPassword from "../NewPassword/NewPassword";

const ForgotPassowrd = () => {
  const [showModal, setShowModal] = useState(1);
  const validationSchema = Yup.object({
    phone: Yup.string()
      .required("Phone is required")
      .matches(/^\d{10}$/, "Phone must be 10 digits"),
  });
  const formik = useFormik({
    initialValues: {
      phone: "",
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      console.log(values);
    },
  });
  return (
    <>
      <div
        className="modal fade"
        id="forgotPS"
        tabindex="-1"
        aria-labelledby="forgotPSLabel"
        aria-hidden="true"
        data-bs-backdrop="static"
      >
        <div
          className="modal-dialog modal-dialog-centered"
          style={{ maxWidth: "380px" }}
        >
          <div className="modal-content">
            <div
              className="modal-body dark-mode font"
              style={{ padding: "2rem" }}
            >
              {showModal === 1 && (
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
                    <div className="error text-danger">
                      {formik.errors.phone}
                    </div>
                  ) : null}
                  <div className="d-flex justify-content-center mt-4">
                    <input
                      onClick={() => setShowModal(2)}
                      type="submit"
                      value="Continue"
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
              )}
              {showModal === 2 && <OtpModal setShowModal={setShowModal} />}
              {showModal === 3 && <NewPassword />}
            </div>
            <img
              data-bs-dismiss="modal"
              src={cross}
              alt=""
              style={{
                position: "absolute",
                top: "-1rem",
                right: "-1.1rem",
                cursor: "pointer",
              }}
              height={40}
              width={40}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default ForgotPassowrd;
