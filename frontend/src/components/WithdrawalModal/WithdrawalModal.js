import React, { useContext, useState } from "react";
import { RxCross2 } from "react-icons/rx";
import Modal from "react-bootstrap/Modal";
import BankUpdateModal from "../BankUpdateModal/BankUpdateModal";
import CurrentTheme from "../../context/CurrentTheme";
import { useFormik } from "formik";
import * as Yup from "yup";

const WithdrawalModal = (props) => {
  const [showBankDetail, setShowBankDetail] = useState(false);
  const { currentTheme, setCurrentTheme } = useContext(CurrentTheme);

  const validationSchema = Yup.object({
    iban: Yup.string()
      .matches(/^\d{13}$/, "IBAN must be exactly 13 numeric characters")
      .required("IBAN is required"),
  });

  const formik = useFormik({
    initialValues: {
      iban: "",
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      // Handle form submission here
      console.log("Form submitted with values:", values);
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
                    formik.resetForm();
                    props.onHide();
                  }}
                  fontSize={"1.8rem"}
                  className={`${
                    currentTheme === "dark" ? "closeBtn-dark" : "closeBtn-light"
                  }`}
                />
              </span>
            </div>
            {!props?.showBankUpdate ? (
              <>
                <div className="row">
                  <div className="col d-flex flex-column">
                    <span>Total Balance</span>
                    <span
                      className="p-2 my-1 text-center"
                      style={{
                        backgroundColor:
                          currentTheme === "dark" ? "#0B2447" : "#F6F6F6",
                      }}
                    >
                      12.650
                    </span>
                  </div>
                  <div className="col d-flex flex-column">
                    <span>Pending Balance</span>
                    <span
                      className="p-2 my-1 text-center"
                      style={{
                        backgroundColor:
                          currentTheme === "dark" ? "#0B2447" : "#F6F6F6",
                      }}
                    >
                      12.650
                    </span>
                  </div>
                </div>
                <div className="d-flex flex-column my-4">
                  <span>Bank Iban Details</span>
                  <span
                    className="p-2 my-1 text-center"
                    style={{
                      backgroundColor:
                        currentTheme === "dark" ? "#0B2447" : "#F6F6F6",
                    }}
                  >
                    TR 0987 6544 12650
                  </span>
                </div>
                <div className="text-center">
                  <div className="h5">Withdrawable Balance</div>
                  <div className="h5">8.000₺</div>
                </div>
                <div className="d-flex justify-content-center my-4">
                  <button
                    className={`${
                      currentTheme === "dark" ? "darkMode-btn" : "lightMode-btn"
                    } px-3 py-1`}
                    onClick={() => {
                      props?.setShowBankUpdate(true);
                    }}
                  >
                    Withdrawal
                  </button>
                </div>
                <div className="mb-4 text-center">
                  <div className="" style={{ fontSize: "13px" }}>
                    Withdrawal requests are processed within 1 business dat
                  </div>
                  <div
                    className=""
                    style={{
                      color: currentTheme === "dark" ? "#4DD5FF" : "#00659D",
                      fontSize: "12px",
                    }}
                  >
                    If the registered bank information and the personal
                    information of the user do not match the transaction is
                    suspended.
                  </div>
                </div>
              </>
            ) : (
              <>
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
                        currentTheme === "dark"
                          ? "darkMode-btn"
                          : "lightMode-btn"
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
                    If the registered bank information and the personal
                    information of the user do not match the transaction is
                    suspended.
                  </div>
                </div>
              </>
            )}
          </div>
        </Modal.Body>
      </Modal>

      {/* <BankUpdateModal
        show={showBankDetail}
        onHide={() => {
          setShowBankDetail(false);
        }}
      /> */}
    </>
  );
};

export default WithdrawalModal;
