import React, { useState } from "react";
import { RxCross2 } from "react-icons/rx";
import Modal from "react-bootstrap/Modal";

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
        <Modal.Body closeButton>
          <div
            className=""
            style={{ fontFamily: "none", color: "#0D2A53", fontWeight: "500" }}
          >
            <div className="m-3 mt-4">
              <div className="d-flex justify-content-center">
                <span>
                  <RxCross2
                    onClick={props.onHide}
                    fontSize={"1.8rem"}
                    style={{
                      position: "absolute",
                      right: "17px",
                      top: "10px",
                      color: "#0D2A53",
                    }}
                  />
                </span>
              </div>
              <div className="d-flex flex-column my-4">
                <span>Bank Iban Details</span>
                <span
                  className="p-2 ps-3 my-1"
                  style={{ backgroundColor: "#F6F6F6", fontWeight:"600" }}
                >
                  TR 
                </span>
              </div>
              <div className="d-flex justify-content-center my-4">
                <button className="continuebtn px-3 py-1">Update</button>
              </div>
              <div className="mb-4 text-center">
                <div className="" style={{ color: "#00659D" }}>
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