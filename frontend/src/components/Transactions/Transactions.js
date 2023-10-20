import React, { useContext, useEffect, useState } from "react";
import CurrentTheme from "../../context/CurrentTheme";
import "./Transactions.css";
import TransactionArray from "../TransactionArray/TransactionArray";
import bankLogo from "../../assets/Akbank-Logo-PNG.png";
import BankUpdateModal from "../BankUpdateModal/BankUpdateModal";
import axios from "axios";
import config from "../../config";
import { userId } from "../GetUser";
import Swal from "sweetalert2";
import moment from "moment";

const Transactions = () => {
  const { currentTheme, setCurrentTheme } = useContext(CurrentTheme);
  const [modalShow, setModalShow] = React.useState(false);
  const chart = [
    { name: "Tem", color: "#0CC6FF", height: "2rem", darkcolor: "#0CC6FF" },
    { name: "Ağu", color: "#37FF80", height: "3rem", darkcolor: "#37FF80" },
    { name: "Eyl", color: "#37FF80", height: "4.5rem", darkcolor: "#37FF80" },
    { name: "Eki", color: "#FF5757", height: "4rem", darkcolor: "#FF5757" },
    { name: "Las", color: "#0CC6FF", height: "4rem", darkcolor: "#0CC6FF" },
    { name: "Ara", color: "#FFFFFF", height: "4rem", darkcolor: "#0D2A53" },
  ];
  const errorSwal = () => {
    // console.log(localStorage.getItem("user-active"))

    Swal.fire({
      title: "Error",
      text: `Your account has been deactivated. Contact support for assistance.`,
      icon: "error",
      backdrop: false,
      customClass:
        currentTheme === "dark" ? "dark-mode-alert" : "light-mode-alert",
    });
  };

  const [bankDetails, setBankDetails] = useState([]);
  const [transactionHistory, setTransactionHistory] = useState([]);
  async function getBankIban() {
    try {
      const res = await axios.get(`${config.apiUrl}/bank-details/${userId}`);
      // console.log("Data: ", res.data)
      if (res?.status === 200) {
        setBankDetails(res?.data?.data);

        const data = res?.data?.data?.Transection_history;
        data.sort((a, b) => moment(b.date, 'DD.MM.YYYY - HH:mm').unix() - moment(a.date, 'DD.MM.YYYY - HH:mm').unix());
        setTransactionHistory(data);
      }
    } catch (error) {
      console.log(error);
    }
  }
  useEffect(() => {
    getBankIban();
  }, []);

  return (
    <>
      <div
        className={`${
          currentTheme === "dark" ? "dark-mode" : "light-mode"
        } my-2 p-2`}
      >
        <div className="row g-0">
          <div className="col-5">
            <div
              className="me-2 p-1 py-2 pb-3 fonts-res"
              style={{
                backgroundColor:
                  currentTheme === "dark" ? "#0B2447" : "#F6F6F6",
              }}
            >
              <div>Total Balance</div>
              <div className="text-center">
                <span className="total-balance" style={{ fontSize: "15px" }}>
                  {bankDetails?.total_balance}₺
                </span>
              </div>
              <div className="d-flex justify-content-between">
                <span>Withdrawable</span>
                <span
                  className="balance-font"
                  style={{ fontSize: "14px", color: "#37FF80" }}
                >
                  {bankDetails?.withdrawable_balance}₺
                </span>
              </div>
              <div className="d-flex justify-content-between">
                <span>Pending</span>
                <span className="balance-font" style={{ fontSize: "14px" }}>
                  {bankDetails?.pending_balance}₺
                </span>
              </div>
            </div>
          </div>
          <div className="col-7">
            <div
              className="p-2 d-flex align-items-end row- g-0 ps-3"
              style={{
                backgroundColor:
                  currentTheme === "dark" ? "#0B2447" : "#F6F6F6",
              }}
            >
              {chart.map((item, index) => (
                // <div className="col d-flex flex-column justify-content-center">
                //   <div
                //     className="chart-bar"
                //     style={{
                //       height: item.height,
                //       width: "1rem",
                //       backgroundColor: item.color,
                //     }}
                //   ></div>
                //   <span
                //     className=""
                //     style={{ opacity: "1", fontSize: "0.6rem" }}
                //   >
                //     {item.name}
                //   </span>
                // </div>
                <dl className="col d-flex flex-column justify-content-center m-0">
                  <dt style={{ opacity: "1", fontSize: "0.6rem" }}>
                    {item.name}
                  </dt>
                  <dd
                    style={{
                      height: item.height,
                      width: "1rem",
                      backgroundColor: item.color,
                    }}
                  ></dd>
                </dl>
              ))}
            </div>
          </div>
        </div>
        <div
          className="d-flex justify-content-between my-2 p-2 align-items-center fonts-res"
          style={{
            backgroundColor: currentTheme === "dark" ? "#0B2447" : "#F6F6F6",
          }}
        >
          <span>
            <img
              onContextMenu={(e) => e.preventDefault()}
              src={bankLogo}
              alt=""
              height={15}
              width={50}
            />
          </span>
          <span>
            {bankDetails.bank_iban
              ? `TR ${bankDetails.bank_iban}`
              : "Add Bank Iban..."}
          </span>
          {/* <span>TR00 2151 2532 0000 3315 1200 58</span> */}
          <button
            onClick={() => {
              if (JSON.parse(localStorage.getItem("user-active")) == false) {
                errorSwal();
                return;
              }
              setModalShow(true);
            }}
            className="px-2"
            style={{
              backgroundColor: "transparent",
              border:
                currentTheme === "dark"
                  ? "1px solid #4DD5FF"
                  : "1px solid #007BF6",
              color: currentTheme === "dark" ? "#4DD5FF" : "#007BF6",
              borderRadius: "3px",
            }}
          >
            Update
          </button>
        </div>
        <div className="my-2">Transaction History</div>
        <TransactionArray transactionHistory={transactionHistory} />
      </div>

      <BankUpdateModal
        show={modalShow}
        onHide={() => setModalShow(false)}
        getBankIban={getBankIban}
        bank_iban={bankDetails?.bank_iban}
      />
    </>
  );
};

export default Transactions;
