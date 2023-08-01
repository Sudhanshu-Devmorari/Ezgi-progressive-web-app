import React, { useContext, useState } from "react";
import CurrentTheme from "../../context/CurrentTheme";
import lifebuoy from "../../assets/lifebuoy.png";
import { CustomDropdown } from "../CustomDropdown/CustomDropdown";
import Form from "react-bootstrap/Form";

const Support = () => {
  const { currentTheme, setCurrentTheme } = useContext(CurrentTheme);
  const [showModal, setShowModal] = useState(1);
  const [matchDetailsDropdown, setMatchDetailsDropdown] = useState(false);
  const tickets = [
    {
      sub: "Financial",
      date: "11.03.2022 - 16:36",
      status: "Pending",
      color: "#F8FF61",
    },
    {
      sub: "Financial",
      date: "11.03.2022 - 16:36",
      status: "Progress",
      color: "#4DD5FF",
    },
    {
      sub: "Financial",
      date: "11.03.2022 - 16:36",
      status: "Resolved",
      color: "#37FF80",
    },
  ];
  const matchDetailsOptions = [
    "Match Details 1",
    "Match Details 2",
    "Match Details 3",
  ];
  const [selectedMatchDetails, setSelectedMatchDetails] =
    useState("Select Department");
  const toggleMatchDetailsDropdown = () => {
    setMatchDetailsDropdown(!matchDetailsDropdown);
  };
  const handleMatchDetailsSelection = (matchDetails) => {
    setSelectedMatchDetails(matchDetails);
  };
  return (
    <>
      <div
        className={`p-2 my-2 border-0 rounded-0 ${
          currentTheme === "dark" ? "dark-mode" : "light-mode"
        }`}
        style={{ fontSize: "14px" }}
      >
        {showModal === 1 && (
          <>
            <div className="my-2 d-flex justify-content-center align-items-center flex-column">
              <img src={lifebuoy} alt="" height={50} width={50} />
              <span>Do you need help?</span>
              <span className="my-2">
                <button
                  onClick={() => {
                    setShowModal(2);
                  }}
                  className="px-4 py-1"
                  style={{
                    border:
                      currentTheme === "dark"
                        ? "1px solid #E6E6E6"
                        : "1px solid #0D2A53",
                    backgroundColor:
                      currentTheme === "dark" ? "#E6E6E6" : "#0D2A53",
                    borderRadius: "2px",
                    color: currentTheme === "dark" ? "#19376D" : "#F6F6F6",
                  }}
                >
                  Create Ticket
                </button>
              </span>
            </div>
            <div className="my-2" style={{ fontSize: "15px" }}>
              Support Tickets
            </div>
            {tickets.map((res, index) => (
              <>
                <div
                  className="my-2 p-2 ps-0 d-flex justify-content-between"
                  style={{
                    backgroundColor:
                      currentTheme === "dark" ? "#0B2447" : "#F6F6F6",
                  }}
                >
                  <span className="d-flex">
                    <div
                      style={{
                        width: "7px",
                        height: "18px",
                        backgroundColor: `${res.color}`,
                      }}
                    ></div>
                    <span className="ps-1">{res.sub}</span>
                  </span>
                  <span>{res.date}</span>
                  <span
                    onClick={() => {
                      setShowModal(3);
                    }}
                  >
                    {res.status}
                  </span>
                </div>
              </>
            ))}
          </>
        )}

        {showModal === 2 && (
          <>
            <div className="">
              <div className="position-relative">
                <CustomDropdown
                label={" "}
                  options={matchDetailsOptions}
                  selectedOption={selectedMatchDetails}
                  onSelectOption={handleMatchDetailsSelection}
                  isOpen={matchDetailsDropdown}
                  toggleDropdown={toggleMatchDetailsDropdown}
                />
              </div>
              <div className="my-2">
                <label htmlFor="subject">Subject</label>
                <input
                  className={`${
                    currentTheme === "dark"
                      ? "darkMode-input"
                      : "lightMode-input"
                  } form-control`}
                  type="text"
                  name=""
                  id="subject"
                />
              </div>
              <div className="">
                <label htmlFor="message">Message</label>
                <br />
                <Form.Control
                  id="message"
                  as="textarea"
                  maxLength={250}
                  className={`${
                    currentTheme === "dark"
                      ? "textArea-dark-mode"
                      : "textArea-light-mode"
                  }`}
                />
              </div>
              <div className="my-3 d-flex justify-content-center gap-2">
                <button
                  onClick={() => {
                    setShowModal(1);
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
                  Send
                </button>
                <button
                  onClick={() => {
                    setShowModal(1);
                  }}
                  className="px-2"
                  style={{
                    color: "#FF5757",
                    backgroundColor: "transparent",
                    border: "1px solid #FF5757",
                    borderRadius: "3px",
                  }}
                >
                  Go Back
                </button>
              </div>
            </div>
          </>
        )}

        {showModal === 3 && (
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
                backgroundColor:
                  currentTheme === "dark" ? "#0B2447" : "#F6F6F6",
                fontSize: "13px",
              }}
            >
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed
              eleifend vehicula tristique. Suspendisse vitae lectus sed massa
              interdum consectetur. Pellentesque habitant morbi tristique
              senectus et netus et malesuada fames ac turpis egestas. Integer
              auctor nisl in lacus fringilla, et tincidunt ex laoreet. Nulla ac
              posuere tellus, a scelerisque purus. Sed euismod eleifend
              vulputate.
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
                backgroundColor:
                  currentTheme === "dark" ? "#0B2447" : "#F6F6F6",
                fontSize: "13px",
              }}
            >
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed
              eleifend vehicula tristique. Suspendisse vitae lectus sed massa
              interdum consectetur. Pellentesque habitant morbi tristique
              senectus et netus et malesuada fames ac turpis egestas. Integer
              auctor nisl in lacus fringilla, et tincidunt ex laoreet. Nulla ac
              posuere tellus, a scelerisque purus. Sed euismod eleifend
              vulputate.
            </div>
            <div className="my-3 d-flex justify-content-center gap-2">
              <button
                onClick={() => {
                  setShowModal(4);
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
                setShowModal(1);
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
        )}

        {showModal === 4 && (
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
              <span>
                Support - <span style={{ color: "#D2DB08" }}>Jenny Barden</span>
              </span>
              <span className="">23.05.2023 - 16:38</span>
            </div>
            <div
              className="p-1 mb-2 mt-1"
              style={{
                backgroundColor:
                  currentTheme === "dark" ? "#0B2447" : "#F6F6F6",
                fontSize: "13px",
              }}
            >
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed
              eleifend vehicula tristique. Suspendisse vitae lectus sed massa
              interdum consectetur. Pellentesque habitant morbi tristique
              senectus et netus et malesuada fames ac turpis egestas. Integer
              auctor nisl in lacus fringilla, et tincidunt ex laoreet. Nulla ac
              posuere tellus, a scelerisque purus. Sed euismod eleifend
              vulputate.
            </div>
            <div className="">
                <label htmlFor="Reply">Reply</label>
                <br />
                <Form.Control
                  id="Reply"
                  as="textarea"
                  maxLength={250}
                  className={`${
                    currentTheme === "dark"
                      ? "textArea-dark-mode"
                      : "textArea-light-mode"
                  }`}
                />
              </div>
            <div className="my-3 d-flex justify-content-center gap-2">
              <button
                onClick={() => {
                  setShowModal(4);
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
                    setShowModal(3);
                  }}
                  className="px-2"
                  style={{
                    color: "#FF5757",
                    backgroundColor: "transparent",
                    border: "1px solid #FF5757",
                    borderRadius: "3px",
                  }}
                >
                  Go Back
                </button>
            </div>
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default Support;
