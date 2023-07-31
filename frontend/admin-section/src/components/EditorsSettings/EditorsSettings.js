import React from "react";
import "./EditorsSettings.css";

const EditorsSettings = () => {
  return (
    <>
      <div className="p-2 m-2 fonts-block">
        <div className="m-3" style={{ fontSize: "1.1rem" }}>
          Level Rules Settings
        </div>
        <div className="m-3">
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
                <span className="p-1 ps-0">Daily Match Limit</span>
                <input type="text" className="darkMode-input form-control" />
              </div>
            </div>
            <div className="col-2">
              <div className="col d-flex flex-column">
                <span className="p-1 ps-0">Monthly Min.Content</span>
                <input type="text" className="darkMode-input form-control" />
              </div>
            </div>
            <div className="col-2">
              <div className="col d-flex flex-column">
                <span className="p-1 ps-0">Odds Limit</span>
                <input type="text" className="darkMode-input form-control" />
              </div>
            </div>
          </div>
          <div className="my-2 mt-3 d-flex gap-3">
            <div className="col-2">
              <div className="col d-flex flex-column">
                <span className="p-1 ps-0">Winning Limit</span>
                <input type="text" className="darkMode-input form-control" />
              </div>
            </div>
            <div className="col-2">
              <div className="col d-flex flex-column">
                <span className="p-1 ps-0">Success Rate</span>
                <input type="text" className="darkMode-input form-control" />
              </div>
            </div>
            <div className="col-2">
              <div className="col d-flex flex-column">
                <span className="p-1 ps-0">Subscriber Limit</span>
                <input type="text" className="darkMode-input form-control" />
              </div>
            </div>
            <div className="col-2">
              <div className="col d-flex flex-column">
                <span className="p-1 ps-0">Level Icon & Color</span>
                <input type="text" className="darkMode-input form-control" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default EditorsSettings;
