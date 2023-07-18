import React, { useContext } from "react";
import CurrentTheme from "../../context/CurrentTheme";
import currency from "../../assets/₺.svg";
import currency_1 from "../../assets/₺ (1).svg";
import "./Transactions.css";
import TransactionArray from "../TransactionArray/TransactionArray";
import bankLogo from "../../assets/Akbank-Logo-PNG.png"

const Transactions = () => {
  const { currentTheme, setCurrentTheme } = useContext(CurrentTheme);
  const chart = [
    {name: "Tem", color: "#0CC6FF", height: "4rem"},
    {name: "Ağu", color: "#37FF80", height: "5rem"},
    {name: "Eyl", color: "#37FF80", height: "7rem"},
    {name: "Eki", color: "#FF5757", height: "6rem"},
    {name: "Las", color: "#0CC6FF", height: "6rem"},
    {name: "Ara", color: "#FFFFFF", height: "6rem"},
  ]
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
              className="me-2 p-1 fonts-res"
              style={{
                backgroundColor:
                  currentTheme === "dark" ? "#0B2447" : "#F6F6F6",
              }}
            >
              <div>Total Balance</div>
              <div className="text-center">
                <span className="total-balance" style={{ fontSize: "15px" }}>
                  12.650₺
                </span>
              </div>
              <div className="d-flex justify-content-between">
                <span>Withdrawable</span>
                <span
                  className="balance-font"
                  style={{ fontSize: "14px", color: "#37FF80" }}
                >
                  8.750₺
                </span>
              </div>
              <div className="d-flex justify-content-between">
                <span>Pending</span>
                <span className="balance-font" style={{ fontSize: "14px" }}>
                  3.900₺
                </span>
              </div>
            </div>
          </div>
          <div className="col-7">
            <div
              className="p-2 d-flex ps-3 gap-3 chardivs"
              style={{
                backgroundColor:
                  currentTheme === "dark" ? "#0B2447" : "#F6F6F6",
                  fontSize:"12px"
              }}
            >
              {chart.map((res,index)=>(

              <div className="">
                <div
                  className=""
                  style={{
                    height: res.height,
                    width: "12px",
                    backgroundColor: res.color,
                  }}
                ></div>
                <span>{res.name}</span>
              </div>
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
          <span><img src={bankLogo} alt="" height={15} width={50}/></span>
          <span>TR00 2151 2532 0000 3315 1200 58</span>
          <button
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
        <div className="my-2">
            Transaction History
        </div>
        <TransactionArray/>

      </div>
    </>
  );
};

export default Transactions;
