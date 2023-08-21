import axios from "axios";
import React from "react";

const WithdrawalSettings = (props) => {
    const WithdrawalSettingData = props?.WithdrawalSettingData || {};

    // const handleChange = (e) => {
    //   props?.setWithdrawalSettingData({
    //     ...WithdrawalSettingData,
    //     [e.target.name]: e.target.value,
    //   });
    // };
  
    //  Update Withdrawal Setting
    const UpdateWithdrawalSettings = async () => {
    //   const res = await axios.post(
    //     `http://127.0.0.1:8000/highlight-setting/?commentator_level=${props?.selectLevel.toLowerCase()}`,
    //     WithdrawalSettingData
    //   );
    //   console.log("res========>>>", res);
    };
  return (
    <>
      <div className="my-2 mt-3 d-flex gap-3">
        <div className="col-2">
          <div className="col d-flex flex-column">
            <span className="p-1 ps-0">Minimum Amount</span>
            <input type="text" className="darkMode-input form-control text-center" />
          </div>
        </div>
        <div className="col-2">
          <div className="col d-flex flex-column">
            <span className="p-1 ps-0">Income Blocked Days</span>
            <input type="text" className="darkMode-input form-control text-center" />
          </div>
        </div>
      </div>
      <div lassName="my-3 d-flex justify-content-center">
        <div
          class="fixed-bottom  d-flex justify-content-center save-btn"
        >
          <button
            onClick={UpdateWithdrawalSettings}
            className="py-1 px-3"
            style={{
              color: "#D2DB08",
              border: "1px solid #D2DB08",
              borderRadius: "3px",
              backgroundColor: "transparent",
            }}
          >
            Save
          </button>
        </div>
      </div>
    </>
  );
};

export default WithdrawalSettings;
