import React from "react";

const DeactivationRequestsBtns = () => {
  return (
    <>
      <div className="my-2">
        <button
          className="px-2"
          style={{
            border: "1px solid #4DD5FF",
            color: "#4DD5FF",
            backgroundColor: "transparent",
            borderRadius: "4px",
            fontSize: "0.9rem",
          }}
        >
          In Progress
        </button>
        <button
          className="px-2 mx-3"
          style={{
            border: "1px solid #FFDD00",
            color: "#FFDD00",
            backgroundColor: "transparent",
            borderRadius: "4px",
            fontSize: "0.9rem",
          }}
        >
          Deactive
        </button>
        <button
          className="px-2"
          style={{
            border: "1px solid #FF5757",
            color: "#FF5757",
            backgroundColor: "transparent",
            borderRadius: "4px",
            fontSize: "0.9rem",
          }}
        >
          Reject
        </button>
      </div>
    </>
  );
};

export default DeactivationRequestsBtns;
