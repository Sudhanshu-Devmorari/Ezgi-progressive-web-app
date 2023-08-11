import React from "react";
import active from "../../assets/Group -1.svg";
import pending from "../../assets/Group 67.svg";
import deactive from "../../assets/Group 68.svg";
import "./EditorAccountStatus.css";

const EditorAccountStatus = (props) => {
  const levelArray = [
    {
      name: "Active",
      img: active,
      count: `${props?.active_editor}`,
    },
    {
      name: "Pending",
      img: pending,
      count: `${props?.pending_editor}`,
    },
    {
      name: "Deactive",
      img: deactive,
      count: `${props?.deactivate_editor}`,
    },
  ];
  return (
    <>
      <div className={`${"dark-mode my-2"}`} style={{height:"31vh"}}>
        <div className="p-2" style={{ fontSize: "1.1rem" }}>
          Editor Account Status
        </div>
        <div className="mt-2 d-flex justify-content-center gap-ceown">
        {levelArray.map((res, index) => (
            <div className="d-flex flex-column align-items-center mt-4">
              <img
                className="user-icon"
                src={res.img}
                alt=""
                height={45}
                width={45}
              />
              <span style={{ fontSize: "1.2rem" }}>
                {res.name}
              </span>
              <span style={{ fontSize: "1.6rem" }}>
                {res.count}
              </span>
            </div>
        ))}
        </div>
      </div>
    </>
  );
};

export default EditorAccountStatus;
