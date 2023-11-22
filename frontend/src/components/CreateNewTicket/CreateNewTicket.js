import axios from "axios";
import React, { useContext, useState } from "react";
import { UserId } from "../GetUser";
import CurrentTheme from "../../context/CurrentTheme";
import { CustomDropdown } from "../CustomDropdown/CustomDropdown";
import Form from "react-bootstrap/Form";
import config from "../../config";
import Swal from "sweetalert2";
import AxiosInstance from "../AxiosInstance";

const CreateNewTicket = (props) => {
  const { setShowModal, ticketsData } = props;
  const { currentTheme, setCurrentTheme } = useContext(CurrentTheme);

  const [matchDetailsDropdown, setMatchDetailsDropdown] = useState(false);
  const matchDetailsOptions = ["Financial", "Technical"];
  const [selectedMatchDetails, setSelectedMatchDetails] =
    useState("Select Department");
  const toggleMatchDetailsDropdown = () => {
    setMatchDetailsDropdown(!matchDetailsDropdown);
  };
  const handleMatchDetailsSelection = (matchDetails) => {
    setSelectedMatchDetails(matchDetails);
  };

  // Create New Ticket API
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");

  const [departmentError, setDepartmentError] = useState("");
  const [subjectError, setSubjectError] = useState("");
  const [messageError, setMessageError] = useState("");

  const createNewTicket = async () => {
    if (selectedMatchDetails === "Select Department") {
      setDepartmentError("Department is required.");
    } else if (subject === "") {
      setSubjectError("Subject is required.");
    } else if (message === "") {
      setMessageError("Message is required.");
    } else {
      const filterData  =  ticketsData?.filter(res => res.department == selectedMatchDetails)
      const mapDepartmentData = filterData?.map((res) => res.department);
      const mapStatusData = filterData?.map((res) => res.status);

      if (
        mapDepartmentData?.includes(selectedMatchDetails) &&
       ( mapStatusData?.includes("pending") ||  mapStatusData?.includes("progress"))
      ) {
        await Swal.fire({
          title: "Error",
          text: "You must wait until the previous ticket for the same department is resolved before creating another one.",
          icon: "error",
          backdrop: false,
          customClass:
            currentTheme === "dark" ? "dark-mode-alert" : "light-mode-alert",
        });
        setShowModal(1);
      } else {
        const res = await AxiosInstance.post(`${config?.apiUrl}/support/`, {
          department: selectedMatchDetails,
          subject: subject,
          message: message,
        });
        if (res.status === 200) {
          await Swal.fire({
            title: "Success",
            text: "Support request successfully submitted. We will respond as soon as possible.",
            icon: "success",
            backdrop: false,
            customClass:
              currentTheme === "dark" ? "dark-mode-alert" : "light-mode-alert",
            timer: 2000,
          });
          
          setShowModal(1);
        }
      }
    }
  };
  return (
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
          <small className="text-danger" style={{ fontSize: "0.78rem" }}>
            {departmentError}
          </small>
        </div>
        <div className="my-2">
          <label htmlFor="subject">Subject</label>
          <input
            onChange={(e) => setSubject(e.target.value)}
            className={`${
              currentTheme === "dark" ? "darkMode-input" : "lightMode-input"
            } form-control`}
            type="text"
            name=""
            id="subject"
            style={{ fontSize: "14px" }}
          />
          <small className="text-danger" style={{ fontSize: "0.78rem" }}>
            {subjectError}
          </small>
        </div>
        <div className="">
          <label htmlFor="message">Message</label>
          <br />
          <Form.Control
            style={{ fontSize: "14px" }}
            onChange={(e) => setMessage(e.target.value)}
            id="message"
            as="textarea"
            maxLength={250}
            className={`${
              currentTheme === "dark"
                ? "textArea-dark-mode"
                : "textArea-light-mode"
            }`}
          />
          <small className="text-danger" style={{ fontSize: "0.78rem" }}>
            {messageError}
          </small>
        </div>
        <div className="my-3 d-flex justify-content-center gap-2">
          <button
            onClick={() => {
              createNewTicket();
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
              props.setShowModal(1);
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
  );
};

export default CreateNewTicket;
