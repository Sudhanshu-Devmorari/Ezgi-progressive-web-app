import React from "react";

const EditorWithdrawalSettings = () => {
  return (
    <>
      <div className="p-2 m-2 fonts-block">
        <div className="m-3" style={{ fontSize: "1.1rem" }}>
          Withdrawal Settings
        </div>
        <div className="m-3">
          <div className="my-2 mt-3">
            <span className="p-2 ps-0" style={{ color: "#4DD5FF" }}>
              Journeyman
            </span>
            <span className="p-2">Expert</span>
            <span className="p-2">Grandmaster</span>
          </div>
          <div className="my-2 mt-3 d-flex gap-3">
            <div className="col-2">
              <div className="col d-flex flex-column">
                <span className="p-1 ps-0">Minimum Amount</span>
                <input type="text" className="darkMode-input form-control" />
              </div>
            </div>
            <div className="col-2">
              <div className="col d-flex flex-column">
                <span className="p-1 ps-0">Income Blocked Days</span>
                <input type="text" className="darkMode-input form-control" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default EditorWithdrawalSettings;
