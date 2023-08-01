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
        <img src={withdrawal} alt="" height={45} width={45} />
        <span style={{ fontSize: "1.2rem" }}>New Withdrawal Request</span>
        <span style={{ fontSize: "1.6rem" }}>127</span>
      </div>
    </>
  );
};

export default NewWithdrawalRqst;
