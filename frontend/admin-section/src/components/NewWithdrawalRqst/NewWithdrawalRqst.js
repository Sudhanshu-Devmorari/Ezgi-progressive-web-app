import React from "react";
import withdrawal from "../../assets/cash-banknote.svg";
import './NewWithdrawalRqst.css'

const NewWithdrawalRqst = () => {
  return (
    <>
      <div
        className="mt-2 dark-mode d-flex flex-column align-items-center justify-content-center block-height"
        style={{ height: "32vh" }}
      >
        <img className="icon" src={withdrawal} alt="" />
        <span className="heading">New Withdrawal Request</span>
        <span className="number">127</span>
      </div>
    </>
  );
};

export default NewWithdrawalRqst;
