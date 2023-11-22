import React, { useContext, useEffect } from "react";
import { RxCross2 } from "react-icons/rx";
import Modal from "react-bootstrap/Modal";
import CurrentTheme from "../../context/CurrentTheme";
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import config from "../../config";
import { UserId } from "../GetUser";
import Swal from "sweetalert2";
import AxiosInstance from "../AxiosInstance";

const BankUpdateModal = (props) => {
  const { currentTheme, setCurrentTheme } = useContext(CurrentTheme);
  const userId = UserId()
  const validationSchema = Yup.object({
    iban: Yup.string()
      .matches(/^\d{24}$/, "IBAN must be exactly 24 numeric characters")
      .required("IBAN is required"),
  });

  useEffect(() => {
    if (props?.bank_iban) {
      formik.setValues({ iban: props?.bank_iban });
    }
  }, [props?.bank_iban]);

  const formik = useFormik({
    initialValues: {
      iban: "",
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      try {
        const res = await AxiosInstance.post(
          `${config.apiUrl}/bank-details/${userId}`,
          { bank_iban: values.iban }
        );
        // console.log(res);
        if (res?.status === 200) {
          formik.resetForm();
          if (props?.getBankIban) {
            props?.getBankIban();
          }
          props?.onHide();
          Swal.fire({
            title: "Success",
            text: res?.data?.data,
            icon: "success",
            backdrop: false,
            customClass:
              currentTheme === "dark" ? "dark-mode-alert" : "light-mode-alert",
          }).then((result) => {
            if (result.isConfirmed) {
              if (!props?.getBankIban) {
                window.location.reload();
              }
            }
          });
        }
        if (res?.status === 201) {
          formik.resetForm();
          props?.onHide();
          Swal.fire({
            title: "Success",
            text: res?.data?.data,
            icon: "success",
            backdrop: false,
            customClass:
              currentTheme === "dark" ? "dark-mode-alert" : "light-mode-alert",
          }).then((result) => {
            if (result.isConfirmed) {
              window.location.reload();
            }
          });
        }
      } catch (error) {
        console.log(error);
        if (error?.response?.status === 404) {
          formik.resetForm();
          Swal.fire({
            title: "Error",
            text: error?.response?.data?.error,
            icon: "error",
            backdrop: false,
            customClass:
              currentTheme === "dark" ? "dark-mode-alert" : "light-mode-alert",
          });
        }
      }
    },
  });
  return (
    <>
      <Modal
        {...props}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
        scrollable
        backdrop="static"
        keyboard={false}
      >
        <Modal.Body
          className={`${currentTheme === "dark" ? "darkMode" : "lightMode"}`}
          style={{ fontSize: "14px" }}
        >
          <div className="m-3 mt-4">
            <div className="d-flex justify-content-center">
              <span>
                <RxCross2
                  onClick={() => {
                    // formik.resetForm();
                    props.onHide();
                  }}
                  fontSize={"1.8rem"}
                  className={`${
                    currentTheme === "dark" ? "closeBtn-dark" : "closeBtn-light"
                  }`}
                />
              </span>
            </div>
            <form onSubmit={formik.handleSubmit}>
              <div className="d-flex flex-column my-4">
                <span>Bank Iban Details</span>
                <div className="input-group">
                  <span
                    className={`input-group-text ${
                      currentTheme === "dark"
                        ? "darkMode-input"
                        : "lightMode-input"
                    }`}
                    id="basic-addon1"
                  >
                    TR
                  </span>
                  <input
                    type="text"
                    name="iban"
                    className={`${
                      currentTheme === "dark"
                        ? "darkMode-input"
                        : "lightMode-input"
                    } form-control`}
                    aria-describedby="basic-addon1"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.iban}
                  />
                </div>
                {formik.touched.iban && formik.errors.iban ? (
                  <div className="text-danger">{formik.errors.iban}</div>
                ) : null}
              </div>
              <div className="d-flex justify-content-center my-4">
                <button
                  type="submit"
                  className={`${
                    currentTheme === "dark" ? "darkMode-btn" : "lightMode-btn"
                  } px-3 py-1`}
                >
                  Update
                </button>
              </div>
            </form>
            <div className="mb-4 text-center">
              <div
                className=""
                style={{
                  color: currentTheme === "dark" ? "#37FF80" : "#00659D",
                  fontSize: "12px",
                }}
              >
                If the registered bank information and the personal information
                of the user do not match the transaction is suspended.
              </div>
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default BankUpdateModal;
