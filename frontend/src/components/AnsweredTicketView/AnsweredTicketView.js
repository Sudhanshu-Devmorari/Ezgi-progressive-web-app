import React, { useContext } from "react";
import CurrentTheme from "../../context/CurrentTheme";
import Form from "react-bootstrap/Form";
import moment from "moment";
import { userId } from "../GetUser";
import axios from "axios";
import config from "../../config";
import Swal from "sweetalert2";

const AnsweredTicketView = (props) => {
  const { currentTheme, setCurrentTheme } = useContext(CurrentTheme);

  const ticketData = props?.ticketData || [];

  const handleResolvedTicket = () => {
    axios
      .post(`${config.apiUrl}/resolved-ticket/${userId}`, {
        ticket_id: ticketData?.id,
      })
      .then((res) => {
        console.log(res);
        if (res.status === 200) {
          props.setShowModal(1);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <>
      <div className="p-2">
        <div className="d-flex">
          <span className="pe-2">Department</span>
          <span style={{ color: "#D2DB08" }}>{ticketData?.department}</span>
          <span className="ms-auto">
            Ticket {`#${ticketData?.id?.toString()?.padStart(4, "0")}`}
          </span>
        </div>
        <div className="my-2">Subject {ticketData?.subject}</div>
        <div className="my-2">Message</div>
        <div className="d-flex justify-content-between">
          <span
            className=""
            style={{
              color: currentTheme === "dark" ? "#4DD5FF" : "#007BF6",
            }}
          >
            {ticketData?.user?.name}
          </span>
          <span className="">{ticketData?.created}</span>
        </div>
        <div
          className="p-1 mb-2 mt-1"
          style={{
            backgroundColor: currentTheme === "dark" ? "#0B2447" : "#F6F6F6",
            fontSize: "14px",
            height: "100px",
          }}
        >
          {ticketData?.message}
        </div>
        {ticketData?.admin_response && (
          <>
            <div className="d-flex justify-content-between">
              <span>
                Support -{" "}
                <span style={{ color: "#D2DB08" }}>
                  {ticketData?.admin_response?.user?.username}
                </span>
              </span>
              <span className="">
                {moment(ticketData?.admin_response?.created).format(
                  "DD-MM.YYYY - HH:mm"
                )}
              </span>
            </div>
            <Form.Control
              disabled
              style={{ fontSize: "14px", height: "100px" }}
              id="Reply"
              as="textarea"
              maxLength={250}
              className={`${
                currentTheme === "dark"
                  ? "textArea-dark-mode"
                  : "textArea-light-mode"
              } mb-2 mt-1`}
              defaultValue={ticketData?.admin_response?.response}
            />
          </>
        )}
        <div className="my-3 d-flex justify-content-center gap-2">
          <button
            onClick={() => {
              if (!ticketData?.admin_response) {
                Swal.fire({
                  // title: "Success",
                  text: "You cannot reply to your own ticket as admin has not responded yet.",
                  // icon: "success",
                  backdrop: false,
                  customClass: `${
                    currentTheme === "dark"
                      ? "dark-mode-alert"
                      : "light-mode-alert"
                  }`,
                });
              } else {
                props.setShowModal(4);
              }
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
              handleResolvedTicket();
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
