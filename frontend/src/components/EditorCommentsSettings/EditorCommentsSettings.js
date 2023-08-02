import React, { useState } from "react";
import selectedRadio from "../../assets/Group 312.svg";
import Radio from "../../assets/Group 323.svg";

const EditorCommentsSettings = () => {
  const [isPublicSelected, setIsPublicSelected] = useState(false);
  const [isSubscriberSelected, setIsSubscriberSelected] = useState(false);
  return (
    <>
      <div className="p-2 m-2 fonts-block">
        <div className="m-3" style={{ fontSize: "1.1rem" }}>
          Comment Settings
        </div>
        <div className="m-3">
          <div className="my-2 mt-3">
            <span className="p-2 ps-0" style={{ color: "#D2DB08" }}>
              Create Comment
            </span>
          </div>
          <div className="row g-0 my-2 mt-3">
            <div className="col">
              <div className="row my-2 g-0 gap-3">
                <div className="col">
                  <div className="col d-flex flex-column">
                    <span className="p-1 ps-0">Editor</span>
                    <input
                      type="text"
                      className="darkMode-input form-control"
                    />
                  </div>
                </div>
                <div className="col">
                  <div className="col d-flex flex-column">
                    <span className="p-1 ps-0">Country</span>
                    <input
                      type="text"
                      className="darkMode-input form-control"
                    />
                  </div>
                </div>
                <div className="col me-3">
                  <div className="col d-flex flex-column">
                    <span className="p-1 ps-0">League</span>
                    <input
                      type="text"
                      className="darkMode-input form-control"
                    />
                  </div>
                </div>
              </div>
              <div className="row my-2 g-0 gap-3">
                <div className="col">
                  <div className="col d-flex flex-column">
                    <span className="p-1 ps-0">Match Details</span>
                    <input
                      type="text"
                      className="darkMode-input form-control"
                    />
                  </div>
                </div>
                <div className="col">
                  <div className="col d-flex flex-column">
                    <span className="p-1 ps-0">Prediction Type</span>
                    <input
                      type="text"
                      className="darkMode-input form-control"
                    />
                  </div>
                </div>
                <div className="col me-3">
                  <div className="col d-flex flex-column">
                    <span className="p-1 ps-0">Prediction</span>
                    <input
                      type="text"
                      className="darkMode-input form-control"
                    />
                  </div>
                </div>
              </div>
              <div className="my-2 d-flex gap-2">
                <div className="">
                  <span className="px-2">Public</span>
                  <img
                    onClick={() => setIsPublicSelected(!isPublicSelected)}
                    src={isPublicSelected ? selectedRadio : Radio}
                    alt=""
                    style={{ cursor: "pointer" }}
                    height={30}
                    width={30}
                  />
                </div>
                <div className="">
                  <span className="px-2">Only Subscribers</span>
                  <img
                    onClick={() =>
                      setIsSubscriberSelected(!isSubscriberSelected)
                    }
                    src={isSubscriberSelected ? selectedRadio : Radio}
                    alt=""
                    style={{ cursor: "pointer" }}
                    height={30}
                    width={30}
                  />
                </div>
              </div>
            </div>
            <div className="col-4">
              <span>Comment</span>
              <textarea
                style={{ height: "128px" }}
                className="darkMode-input form-control"
              ></textarea>
              <div className="my-2 d-flex gap-3">
                <div className="col-2">
                  <div className="col d-flex flex-column">
                    <span className="p-1 ps-0">Like</span>
                    <input
                      type="text"
                      className="darkMode-input form-control"
                    />
                  </div>
                </div>
                <div className="col-2">
                  <div className="col d-flex flex-column">
                    <span className="p-1 ps-0">Favorite</span>
                    <input
                      type="text"
                      className="darkMode-input form-control"
                    />
                  </div>
                </div>
                <div className="col-2">
                  <div className="col d-flex flex-column">
                    <span className="p-1 ps-0">Clap</span>
                    <input
                      type="text"
                      className="darkMode-input form-control"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default EditorCommentsSettings;
