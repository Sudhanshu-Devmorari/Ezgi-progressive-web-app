import axios from "axios";
import React from "react";

const SalesSubscriptionSettings = (props) => {
  const subscriptionSettingsData = props?.subscriptionSettingsData || {};

  const handleChange = (e) => {
    props?.setSubscriptionSettingsData({
      ...subscriptionSettingsData,
      [e.target.name]: e.target.value,
    });
  };

  //  Update Subscription Setting
  const UpdateSubscriptionSettings = async () => {
    const res = await axios.post(
      `http://127.0.0.1:8000/subscription-setting/?commentator_level=${props?.selectLevel.toLowerCase()}`,
      subscriptionSettingsData
    );
    console.log("res========>>>", res);
  };
  return (
    <>
      <div className="my-2 mt-3 d-flex gap-3">
        <div className="col-2">
          <div className="col d-flex flex-column">
            <span className="p-1 ps-0">Duration</span>
            <input
              type="text"
              className="darkMode-input form-control text-center"
              value={subscriptionSettingsData.duration}
              name="duration"
              onChange={handleChange}
            />
          </div>
        </div>
        <div className="col-2">
          <div className="col d-flex flex-column">
            <span className="p-1 ps-0">1 Month</span>
            <input
              type="text"
              className="darkMode-input form-control text-center"
              value={subscriptionSettingsData.month_1}
              name="month_1"
              onChange={handleChange}
            />
          </div>
        </div>
        <div className="col-2">
          <div className="col d-flex flex-column">
            <span className="p-1 ps-0">3 Month</span>
            <input
              type="text"
              className="darkMode-input form-control text-center"
              value={subscriptionSettingsData.month_3}
              name="month_3"
              onChange={handleChange}
            />
          </div>
        </div>
      </div>
      <div className="my-2 mt-3 d-flex gap-3">
        <div className="col-2">
          <div className="col d-flex flex-column">
            <span className="p-1 ps-0">6 Months</span>
            <input
              type="text"
              className="darkMode-input form-control text-center"
              value={subscriptionSettingsData.month_6}
              name="month_6"
              onChange={handleChange}
            />
          </div>
        </div>
        <div className="col-2">
          <div className="col d-flex flex-column">
            <span className="p-1 ps-0">1 Year</span>
            <input
              type="text"
              className="darkMode-input form-control text-center"
              value={subscriptionSettingsData.year_1}
              name="year_1"
              onChange={handleChange}
            />
          </div>
        </div>
      </div>
      <div lassName="my-3 d-flex justify-content-center">
        <div
          class="fixed-bottom  d-flex justify-content-center"
          style={{ marginBottom: "200px" }}
        >
          <button
            onClick={UpdateSubscriptionSettings}
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

export default SalesSubscriptionSettings;
