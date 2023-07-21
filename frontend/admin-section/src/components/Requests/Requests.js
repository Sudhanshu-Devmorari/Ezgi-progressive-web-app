import React from "react";
import "./Requests.css";

const Requests = (props) => {
  return (
    <div
      className={`${"dark-mode d-flex justify-content-center gap-ceown p-4"} `}
    >
      {props.rqstArray.map((res, index) => (
        <div className="my-4 text-center d-flex flex-column align-items-center justify-content-center rqst-block">
          {res.img && <img className="user-icon" src={res.img} alt="" />}
          <span className="level-font" style={{ fontSize: "1.5rem" }}>
            {res.name}
          </span>
          <span className="level-count-font" style={{ fontSize: "2.7rem" }}>
            {res.count}
          </span>
        </div>
      ))}
    </div>
  );
};

export default Requests;
