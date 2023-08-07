import React, { useContext } from "react";
import CurrentTheme from "../../context/CurrentTheme";

const AnsweredTicketView = (props) => {
  const { currentTheme, setCurrentTheme } = useContext(CurrentTheme);

  return (
    <>
      <div className="p-2">
        <div className="d-flex">
          <span className="pe-2">Department</span>
          <span style={{ color: "#D2DB08" }}>Financial</span>
          <span className="ms-auto">Ticket #0125</span>
        </div>
        <div className="my-2">Subject My withdrawal request</div>
        <div className="my-2">Message</div>
        <div className="d-flex justify-content-between">
          <span
            className=""
            style={{
              color: currentTheme === "dark" ? "#4DD5FF" : "#007BF6",
            }}
          >
            johndoe
          </span>
          <span className="">23.05.2023 - 16:38</span>
        </div>
        <div
          className="p-1 mb-2 mt-1"
          style={{
            backgroundColor: currentTheme === "dark" ? "#0B2447" : "#F6F6F6",
            fontSize: "13px",
          }}
        >
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed eleifend
          vehicula tristique. Suspendisse vitae lectus sed massa interdum
          consectetur. Pellentesque habitant morbi tristique senectus et netus
          et malesuada fames ac turpis egestas. Integer auctor nisl in lacus
          fringilla, et tincidunt ex laoreet. Nulla ac posuere tellus, a
          scelerisque purus. Sed euismod eleifend vulputate.
        </div>
        <div className="d-flex justify-content-between">
          <span>
            Support - <span style={{ color: "#D2DB08" }}>Jenny Barden</span>
          </span>
          <span className="">23.05.2023 - 16:38</span>
        </div>
        <div
          className="p-1 mb-2 mt-1"
          style={{
            backgroundColor: currentTheme === "dark" ? "#0B2447" : "#F6F6F6",
            fontSize: "13px",
          }}
        >
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed eleifend
          vehicula tristique. Suspendisse vitae lectus sed massa interdum
          consectetur. Pellentesque habitant morbi tristique senectus et netus
          et malesuada fames ac turpis egestas. Integer auctor nisl in lacus
          fringilla, et tincidunt ex laoreet. Nulla ac posuere tellus, a
          scelerisque purus. Sed euismod eleifend vulputate.
        </div>
        <div className="my-3 d-flex justify-content-center gap-2">
          <button
            onClick={() => {
              props.setShowModal(4);
            }}
            className="px-3"
            style={{
              color: currentTheme === "dark" ? "#37FF80" : "#00DE51",
              backgroundColor: "transparent",
              border:
                currentTheme === "dark"
                  ? "1px solid #37FF80"
                  : "1px solid #00DE51",
              borderRadius: "3px",
            }}
          >
            Reply
          </button>
          <button
            onClick={() => {
              props.setShowModal(1);
            }}
            className="px-3"
            style={{
              color: currentTheme === "dark" ? "#D2DB0B" : "#00659D",
              backgroundColor: "transparent",
              border:
                currentTheme === "dark"
                  ? "1px solid #D2DB0B"
                  : "1px solid #00659D",
              borderRadius: "3px",
            }}
          >
            Resolved
          </button>
        </div>
      </div>
    </>
  );
};

export default AnsweredTicketView;
