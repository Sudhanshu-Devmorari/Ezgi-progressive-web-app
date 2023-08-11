import axios from "axios";
import React from "react";

const SalesHighlightSettings = (props) => {
  const highlightssettingData = props?.highlightssettingData || {};

  const handleChange = (e) => {
    props?.setHighlightssettingData({
      ...highlightssettingData,
      [e.target.name]: e.target.value,
    });
  };

  //  Update Subscription Setting
  const UpdateHighlightSettings = async () => {
    const res = await axios.post(
      `http://127.0.0.1:8000/highlight-setting/?commentator_level=${props?.selectLevel.toLowerCase()}`,
      highlightssettingData
    );
    console.log("res========>>>", res);
  };
  return (
    <>
      <div className="my-2 mt-3 d-flex gap-3">
        <div className="col-2">
          <div className="col d-flex flex-column">
            <span className="p-1 ps-0">1 Week</span>
            <input onChange={handleChange} type="text" className="darkMode-input form-control text-center" value={highlightssettingData.week_1} name="week_1"/>
          </div>
        </div>
        <div className="col-2">
          <div className="col d-flex flex-column">
            <span className="p-1 ps-0">2 Week</span>
            <input onChange={handleChange} type="text" className="darkMode-input form-control text-center" value={highlightssettingData.week_2} name="week_2"/>
          </div>
        </div>
        <div className="col-2">
          <div className="col d-flex flex-column">
            <span className="p-1 ps-0">1 Month</span>
            <input onChange={handleChange} type="text" className="darkMode-input form-control text-center" value={highlightssettingData.month_1} name="month_1"/>
          </div>
        </div>
      </div>
      <div className="my-2 mt-3 d-flex gap-3">
        <div className="col-2">
          <div className="col d-flex flex-column">
            <span className="p-1 ps-0">Highlight Icon & Color</span>
            <input onChange={handleChange} type="text" className="darkMode-input form-control text-center" value={''}/>
            {/* <input onChange={handleChange} type="text" className="darkMode-input form-control text-center" value={highlightssettingData.highlight_icon}/> */}
          </div>
        </div>
      </div>
      <div lassName="my-3 d-flex justify-content-center">
        <div
          class="fixed-bottom  d-flex justify-content-center"
          style={{ marginBottom: "200px" }}
        >
          <button
            onClick={UpdateHighlightSettings}
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

export default SalesHighlightSettings;
