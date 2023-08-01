import React from "react";

const VerificationRequestsBtns = () => {
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
            border: "1px solid #58DEAA",
            color: "#58DEAA",
            backgroundColor: "transparent",
            borderRadius: "4px",
            fontSize: "0.9rem",
          }}
        >
          Approve
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

export default VerificationRequestsBtns;
