import React from "react";
import active from "../../assets/Group 66.png";
import pending from "../../assets/Group 67.png";
import deactive from "../../assets/Group 68.png";
import './EditorAccountStatus.css'

const EditorAccountStatus = () => {
  const levelArray = [
    {
      name: "Active",
      img: active,
      count: "127",
    },
    {
      name: "Pending",
      img: pending,
      count: "127",
    },
    {
      name: "Deactive",
      img: deactive,
      count: "127",
    },
  ];
  return (
    <>
      <div
        className={`${"dark-mode d-flex justify-content-center gap-ceown my-3 py-4"} `}
      >
        {levelArray.map((res, index) => (
          <div className="d-flex flex-column align-items-center justify-content-center">
            <img
              className="user-icon"
              src={res.img}
              alt=""
              height={65}
              width={50}
            />
            <span className="level-font" style={{ fontSize: "1.5rem" }}>
              {res.name}
            </span>
            <span className="level-count-font" style={{ fontSize: "2.7rem" }}>
              {res.count}
            </span>
          </div>
        ))}
      </div>
    </>
  );
};

export default EditorAccountStatus;
