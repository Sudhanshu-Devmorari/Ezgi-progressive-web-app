import React, { useState } from "react";
import { RxCross2 } from "react-icons/rx";
import Modal from "react-bootstrap/Modal";
import BankUpdateModal from "../BankUpdateModal/BankUpdateModal";
import { currentTheme } from "../GetCurrentTheme";

const WithdrawalModal = (props) => {
  const [showBankDetail, setShowBankDetail] = useState(false);
  return (
    <>
      <Modal
        {...props}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
        scrollable
      >
        <Modal.Body
          className={`${currentTheme === "dark" ? "darkMode" : "lightMode"}`}
        >
          <div>
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
              <div className="row">
                <div className="col d-flex flex-column">
                  <span>Total Balance</span>
                  <span
                    className="p-2 my-1 text-center"
                    style={{ backgroundColor: currentTheme === "dark" ? "#0B2447" : "#F6F6F6" }}
                  >
                    12.650
                  </span>
                </div>
                <div className="col d-flex flex-column">
                  <span>Pending Balance</span>
                  <span
                    className="p-2 my-1 text-center"
                     style={{ backgroundColor: currentTheme === "dark" ? "#0B2447" : "#F6F6F6" }}
                  >
                    12.650
                  </span>
                </div>
              </div>
              <div className="d-flex flex-column my-4">
                <span>Bank Iban Details</span>
                <span
                  className="p-2 my-1 text-center"
                   style={{ backgroundColor: currentTheme === "dark" ? "#0B2447" : "#F6F6F6" }}
                >
                  TR 0987 6544 12650
                </span>
              </div>
              <div className="text-center">
                <div className="h3">Withdrawable Balance</div>
                <div className="h3">8.000</div>
              </div>
              <div className="d-flex justify-content-center my-4">
                <button
                  className={`${
                    currentTheme === "dark" ? "darkMode-btn" : "lightMode-btn"
                  } px-3 py-1`}
                  onClick={() => {
                    setShowBankDetail(true);
                  }}
                >
                  Withdrawal
                </button>
              </div>
              <div className="mb-4 text-center">
                <div className="">
                  Withdrawal requests are processed within 1 business dat
                </div>
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

      <BankUpdateModal
        show={showBankDetail}
        onHide={() => {
          setShowBankDetail(false);
        }}
      />
    </>
  );
};

export default WithdrawalModal;
