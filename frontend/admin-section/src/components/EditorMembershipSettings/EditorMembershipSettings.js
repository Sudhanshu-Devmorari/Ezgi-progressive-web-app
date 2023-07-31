import React from "react";

const EditorMembershipSettings = () => {
  return (
    <>
      <div className="my-2 mt-3">
        <span className="p-2 ps-0" style={{ color: "#FFEE7D" }}>
          Apprentice
        </span>
        <span className="p-2">Journeyman</span>
        <span className="p-2">Expert</span>
        <span className="p-2">Grandmaster</span>
      </div>
      <div className="my-2 mt-3 d-flex gap-3">
        <div className="col-2">
          <div className="col d-flex flex-column">
            <span className="p-1 ps-0">Plan Price</span>
            <input type="text" className="darkMode-input form-control" />
          </div>
        </div>
        <div className="col-2">
          <div className="col d-flex flex-column">
            <span className="p-1 ps-0">Commision Rate</span>
            <input type="text" className="darkMode-input form-control" />
          </div>
        </div>
        <div className="col-2">
          <div className="col d-flex flex-column">
            <span className="p-1 ps-0">Promotion Rate</span>
            <input type="text" className="darkMode-input form-control" />
          </div>
        </div>
        <div className="col-2">
          <div className="col d-flex flex-column">
            <span className="p-1 ps-0">Promotion Duration</span>
            <input type="text" className="darkMode-input form-control" />
          </div>
        </div>
      </div>
    </>
  );
};

export default EditorMembershipSettings;
