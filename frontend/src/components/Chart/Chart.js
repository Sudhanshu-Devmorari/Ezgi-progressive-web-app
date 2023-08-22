import React from "react";
import "./Chart.css";

const Chart = () => {
  return (
    <>
      {/* <div className="dl">
        <div className="dt">Freshman</div>      
        <div className="dd">70%</div>  
      </div> */}

      <dl className="container">
        <dt>Freshman</dt>
        <dd>70%</dd>
      </dl>

      <div className="rowcol d-flex flex-column justify-content-center container">
        <dt className="span-tag">Ize</dt>
        <div
          className="chart-bar"
          style={{
            height: " 12rem",
            width: "1rem",
            backgroundColor: "red",
          }}
        ></div>
      </div>
    </>
  );
};

export default Chart;
