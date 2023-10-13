import React, { useContext, useEffect, useState } from "react";
import Form from "react-bootstrap/Form";
import CurrentTheme from "../../context/CurrentTheme";
import axios from "axios";
import Swal from "sweetalert2";
import moment from "moment";
import config from "../../config";
import { userId } from "../GetUser";

const TicketReplyModal = (props) => {
  const { currentTheme, setCurrentTheme } = useContext(CurrentTheme);

  const ticketData = props?.ticketData || [];

  const [replyMessage, setReplyMessage] = useState("");

  const handelTicketReply = () => {
    if (replyMessage === "") {
      Swal.fire({
        title: "Error",
        text: "Please add a reply",
        icon: "error",
        backdrop: false,
        customClass:
          currentTheme === "dark" ? "dark-mode-alert" : "light-mode-alert",
      });
    } else if (replyMessage !== "") {
      axios
        .post(
          `${config?.apiUrl}/reply-ticket/${userId}/${ticketData[0]?.ticket_support?.id}/`,
          {
            message: replyMessage,
            admin_id: props?.responseTicketID,
            // admin_id: ticketData?.admin_response?.user?.id,
          }
        )
        .then(async(res) => {
          // console.log(res);
          if (res.status === 200) {
            props?.setShowModal(1);
            const confirm = await Swal.fire({
              title: "Success",
              text: "Reply sent successfully",
              icon: "success",
              backdrop: false,
              customClass:
                currentTheme === "dark"
                  ? "dark-mode-alert"
                  : "light-mode-alert",
            });
            if (confirm.value === true) {
              window.location.reload();
            }
          }
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };
  return (
    <>
      <div className="p-2">
        <div className="d-flex">
          <span className="pe-2">Department</span>
          <span style={{ color: "#D2DB08" }}>
            {ticketData[0]?.ticket_support?.department}
          </span>
          <span className="ms-auto">
            Ticket{" "}
            {`#${ticketData[0]?.ticket_support?.id
              ?.toString()
              ?.padStart(4, "0")}`}
          </span>
        </div>
        <div className="my-2">
          Subject: {ticketData[0]?.ticket_support?.subject}
        </div>
        <div className="my-2">Message</div>

        {/* <div className="d-flex justify-content-between">
          <span>
            Support -{" "}
            <span style={{ color: "#D2DB08" }}>
              {ticketData?.admin_response?.user?.name}
            </span>
          </span>
          <span className="">
            {moment(ticketData?.admin_response?.created).format(
              "DD-MM.YYYY - HH:mm"
            )}
          </span>
        </div>
        <Form.Control
          style={{ fontSize: "14px", height: "100px" }}
          id="Reply"
          as="textarea"
          maxLength={250}
          className={`${
            currentTheme === "dark"
              ? "textArea-dark-mode"
              : "textArea-light-mode"
          }`}
          defaultValue={ticketData?.admin_response?.response}
          disabled
        /> */}
        <div className="">
          <label htmlFor="Reply">Reply</label>
          <br />
          <Form.Control
            style={{ fontSize: "14px", height: "100px" }}
            id="Reply"
            as="textarea"
            maxLength={250}
            className={`${
              currentTheme === "dark"
                ? "textArea-dark-mode"
                : "textArea-light-mode"
            }`}
            onChange={(e) => setReplyMessage(e.target.value)}
            value={replyMessage}
          />
        </div>
        <div className="my-3 d-flex justify-content-center gap-2">
          <button
            onClick={() => {
              handelTicketReply();
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
              props?.setShowModal(3);
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

export default TicketReplyModal;
