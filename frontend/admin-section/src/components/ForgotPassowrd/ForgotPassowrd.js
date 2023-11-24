import React, { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import cross from "../../assets/Group 81.svg";
import OtpModal from "../OtpModal/OtpModal";
import NewPassword from "../NewPassword/NewPassword";
import axios from "axios";
import Swal from "sweetalert2";
import config from "../../config";

const ForgotPassowrd = () => {
  const [showModal, setShowModal] = useState(1);
  const [errorMessage, setErrorMessage] = useState('');
  const [phone, setPhone] = useState('');
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
      setPhone(values.phone)
      axios
        .post(`${config?.apiUrl}/otp-resend/`, {
          phone: values.phone,
          is_admin: true,
        })
        .then((res) => {
          // console.log(res.data);
          if ((res.data.status === 500) || res.data.status === 404) {
            // Swal.fire({
            //   title: "Error",
            //   text: res.data.error || res.data.data,
            //   icon: "error",
            //   backdrop: false,
            //   customClass: "dark-mode-alert",
            // });
            setErrorMessage(res.data.error || res.data.data)
          } else if (res.data.status === 200) {
            setShowModal(2)
          }
        })
        .catch((error) => {
          console.log(error);
          Swal.fire({
            title: "Error",
            text: error.message,
            icon: "error",
            backdrop: false,
            customClass: "dark-mode-alert",
          });
        });
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
                  {errorMessage && <div className="error text-danger mt-1">{errorMessage}</div>}
                  <div className="d-flex justify-content-center mt-4">
                    <input
                      // onClick={() => setShowModal(2)}
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
              {showModal === 2 && <OtpModal setShowModal={setShowModal} phone={phone} setPhone={setPhone} showModal={showModal} />}
              {showModal === 3 && <NewPassword setPhone={setPhone} phone={phone} setShowModal={setShowModal} showModal={showModal} />}
            </div>
            <img
              onClick={()=>setShowModal(1)}
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
