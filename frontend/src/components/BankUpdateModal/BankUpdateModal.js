import React, { useState } from "react";
import { RxCross2 } from "react-icons/rx";
import Modal from "react-bootstrap/Modal";
import { currentTheme } from "../GetCurrentTheme";

const BankUpdateModal = (props) => {
  return (
    <>
          <Modal
        {...props}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
        scrollable
      >
        <Modal.Body className={`${currentTheme === "dark" ? "darkMode" : "lightMode"}`}>
          <div
          >
            <div className="m-3 mt-4">
              <div className="d-flex justify-content-center">
                <span>
                <RxCross2
                      onClick={() => {
                        props.onHide();
                      }}
                      fontSize={"1.8rem"}
                      className={`${
                        currentTheme === "dark"
                          ? "closeBtn-dark"
                          : "closeBtn-light"
                      }`}
                    />
                </span>
              </div>
              <div className="d-flex flex-column my-4">
                <span>Bank Iban Details</span>
                <span
                  className="p-2 ps-3 my-1"
                  style={{  backgroundColor: currentTheme === "dark" ? "#0B2447" : "#F6F6F6", fontWeight:"600" }}
                >
                  TR 
                </span>
              </div>
              <div className="d-flex justify-content-center my-4">
                <button className="continuebtn px-3 py-1">Update</button>
              </div>
              <div className="mb-4 text-center">
                <div className="" style={{ color: currentTheme === "dark" ? "#37FF80" : "#00659D" }}>
                  If the registered bank information and the personal
                  information of the user do not match the transaction is
                  suspended.
                </div>
              </div>
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </>
  )
}

export default BankUpdateModal