import React, { useContext, useState } from "react";
import { RxCross2 } from "react-icons/rx";
import Modal from "react-bootstrap/Modal";
import BankUpdateModal from "../BankUpdateModal/BankUpdateModal";
import CurrentTheme from "../../context/CurrentTheme";
import axios from "axios";
import { userId } from "../GetUser";
import Swal from "sweetalert2";
import config from "../../config";

const WithdrawalModal = (props) => {
  const { currentTheme, setCurrentTheme } = useContext(CurrentTheme);

  const { bankDetails } = props;

  const [withdrawalLoading, setWithdrawalLoading] = useState(false);
  const handleWithdraw = async () => {
    // try {
    //   setWithdrawalLoading(true);
    //   const res = await axios.patch(`${config.apiUrl}/bank-details/${userId}`, {
    //     bank_iban: bankDetails?.bank_iban,
    //     withdrawable_amount: bankDetails?.withdrawable_balance,
    //   });
    //   // console.log(res);
    //   if (res?.status === 200) {
    //     setWithdrawalLoading(false);
    //     Swal.fire({
    //       title: "Success",
    //       text: res?.data?.data,
    //       icon: "error",
    //       backdrop: false,
    //       customClass:
    //         currentTheme === "dark" ? "dark-mode-alert" : "light-mode-alert",
    //     }).then((res) => {
    //       if (res?.isConfirmed) {
    //         window.location.reload();
    //       }
    //     });
    //   }
    // } catch (error) {
    //   console.log(error);
    //   if (error?.response?.status === 404) {
    //     setWithdrawalLoading(false);
    //     Swal.fire({
    //       title: "Error",
    //       text: error?.response?.data?.error,
    //       icon: "error",
    //       backdrop: false,
    //       customClass:
    //         currentTheme === "dark" ? "dark-mode-alert" : "light-mode-alert",
    //     });
    //   }
    // }
  };

  const handleWithdrawRequest = async () => {
    console.log(bankDetails?.withdrawable_balance,"============>>bankDetails?.withdrawable_balance", typeof(bankDetails?.withdrawable_balance))
    console.log(bankDetails?.withdrawable_balance === null || bankDetails?.withdrawable_balance === 0,'LLLLL')
    if (bankDetails?.withdrawable_balance === null || bankDetails?.withdrawable_balance === 0) {
      props?.onHide();
      Swal.fire({
        title: "Error",
        text: "There is no withdrawable balance, Please check 'Pending Balance' transactions.",
        icon: "error",
        backdrop: false,
        customClass:
          currentTheme === "dark" ? "dark-mode-alert" : "light-mode-alert",
      });
    } else {
      try {
        setWithdrawalLoading(true);
        const res = await axios.post(
          `${config.apiUrl}/create-withdrawable-request/${userId}/`,
          {
            bank_iban: bankDetails?.bank_iban,
            amount: bankDetails?.withdrawable_balance,
          }
        );
        // console.log(res);
        if (res?.status === 200) {
          setWithdrawalLoading(false);
          Swal.fire({
            title: "Success",
            // text: res?.data?.data,
            text: "Withdrawal request sucessfully sent.",
            icon: "success",
            backdrop: false,
            customClass:
              currentTheme === "dark" ? "dark-mode-alert" : "light-mode-alert",
          }).then((res) => {
            if (res?.isConfirmed) {
              window.location.reload();
            }
          });
        }
      } catch (error) {
        console.log(error);
        if (error?.response?.status === 404) {
          props?.onHide();
          setWithdrawalLoading(false);
          Swal.fire({
            title: "Error",
            text: error?.response?.data?.message,
            icon: "error",
            backdrop: false,
            customClass:
              currentTheme === "dark" ? "dark-mode-alert" : "light-mode-alert",
          });
        }
      }
    }
  };

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
                    props.onHide();
                  }}
                  fontSize={"1.8rem"}
                  className={`${
                    currentTheme === "dark" ? "closeBtn-dark" : "closeBtn-light"
                  }`}
                />
              </span>
            </div>
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
                    {bankDetails?.total_balance}
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
                    {bankDetails?.pending_balance}
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
                  {/* TR 0987 6544 12650 */}
                  TR {bankDetails.bank_iban}
                </span>
              </div>
              <div className="text-center">
                <div className="h5">Withdrawable Balance</div>
                <div className="h5">{bankDetails?.withdrawable_balance || 0}₺</div>
              </div>
              <div className="d-flex justify-content-center my-4">
                <button
                  onClick={() => {
                    handleWithdraw();
                    handleWithdrawRequest();
                  }}
                  className={`${
                    currentTheme === "dark" ? "darkMode-btn" : "lightMode-btn"
                  } px-3 py-1`}
                >
                  {withdrawalLoading ? "Loading..." : "Withdrawal"}
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
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default WithdrawalModal;
