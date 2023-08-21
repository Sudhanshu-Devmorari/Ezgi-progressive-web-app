import axios from "axios";
import React from "react";
import Swal from "sweetalert2";

const SalesMembershipSettings = (props) => {
  const getMembershipData = props.getMembershipData || {};
  const handleChange = (e) => {
    props?.setGetMembershipData({
      ...getMembershipData,
      [e.target.name]: e.target.value,
    });
  };

  //  Update Membership Setting
  const UpdateMembershipSettings = async () => {
    const res = await axios.post(
      `http://127.0.0.1:8000/membership-setting/?commentator_level=${props?.selectLevel.toLowerCase()}`,
      getMembershipData
    );
    console.log("res========>>>", res);
    if (res.status === 201) {
      Swal.fire({
        title: "Success",
        text: "Membership Setting Updated!",
        icon: "success",
        backdrop: false,
        customClass: "dark-mode-alert",
      });
    }
  };

  return (
    <>
      <div className="my-2 mt-3 d-flex gap-3">
        <div className="col-2">
          <div className="col d-flex flex-column">
            <span className="p-1 ps-0">Plan Price</span>
            <input
              onChange={handleChange}
              type="text"
              className="darkMode-input form-control text-center"
              value={getMembershipData.plan_price}
              name="plan_price"
            />
          </div>
        </div>
        <div className="col-2">
          <div className="col d-flex flex-column">
            <span className="p-1 ps-0">Commision Rate</span>
            <input
              onChange={handleChange}
              type="text"
              className="darkMode-input form-control text-center"
              value={getMembershipData.commission_rate}
              name="commission_rate"
            />
          </div>
        </div>
        <div className="col-2">
          <div className="col d-flex flex-column">
            <span className="p-1 ps-0">Promotion Rate</span>
            <input
              onChange={handleChange}
              type="text"
              className="darkMode-input form-control text-center"
              value={getMembershipData.promotion_rate}
              name="promotion_rate"
            />
          </div>
        </div>
        <div className="col-2">
          <div className="col d-flex flex-column">
            <span className="p-1 ps-0">Promotion Duration</span>
            <input
              onChange={handleChange}
              type="text"
              className="darkMode-input form-control text-center"
              value={getMembershipData.promotion_duration}
              name="promotion_duration"
            />
          </div>
        </div>
      </div>
      <div lassName="my-3 d-flex justify-content-center">
        <div
          class="fixed-bottom  d-flex justify-content-center save-btn"
        >
          <button
            onClick={UpdateMembershipSettings}
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

export default SalesMembershipSettings;
