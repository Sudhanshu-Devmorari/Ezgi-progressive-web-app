import React, { useContext, useEffect, useState } from "react";
import CurrentTheme from "../../context/CurrentTheme";
import Form from "react-bootstrap/Form";
import moment from "moment";
import { UserId } from "../GetUser";
import axios from "axios";
import config from "../../config";
import Swal from "sweetalert2";
import AxiosInstance from "../AxiosInstance";
import { Cookies, useCookies } from "react-cookie";
import { Provider, useDispatch, useSelector} from "react-redux";
import { selectUser } from "../../Redux/selector";

const AnsweredTicketView = (props) => {
  const { currentTheme, setCurrentTheme } = useContext(CurrentTheme);
  const { ticketResponse } = props;
  // const userId = UserId()
  const ticketData = props?.ticketData || {};
  const ticketAllData = props?.ticketAllData

  const [displayAllticketsData, setDisplayAllTicketsData] = useState(props?.ticketData);
  
  useEffect(() => {
    setDisplayAllTicketsData(props?.ticketData)
  }, [props?.ticketData]);

  const handleResolvedTicket = () => {
    AxiosInstance
      .post(`${config.apiUrl}/resolved-ticket/${userId}`, {
        ticket_id: ticketData[0]?.ticket_support?.id,
      })
      .then((res) => {
        if (res.status === 200) {
          props.setShowModal(1);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const cookies = new Cookies();
  const userData = useSelector(selectUser);
  // const userId = cookies.get("user-id");
  const userId = userData.user.id;
  const showAllTicketHistory = async(ticket_id) => {
    try {
      const res = await AxiosInstance.get(`${config?.apiUrl}/view-all-ticket-history/${userId}/${ticket_id}/`);
      // console.log("All res: ", res)
      setDisplayAllTicketsData(res.data)
    }
    catch (error) {

    }
  }
  const displayAllData = () => {
    setDisplayAllTicketsData(ticketAllData)
  }

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
          Subject {ticketData[0]?.ticket_support?.subject}
        </div>
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
        {/* <div
          className="p-1 mb-2 mt-1"
          style={{
            backgroundColor: currentTheme === "dark" ? "#0B2447" : "#F6F6F6",
            fontSize: "14px",
            height: "100px",
          }}
        >
          {ticketData?.message}
        </div> */}
        {displayAllticketsData?.reverse().map((res, index) => (
          <>
            <div className="d-flex justify-content-between">
              <span>
                {res?.user?.id != userId && "Support - "}
                <span style={{ color: "#D2DB08" }}>{res?.user?.username}</span>
              </span>
              <span className="">
                {moment(res?.created).format("DD-MM.YYYY - HH:mm")}
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
              value={res?.message}
            />
          </>
        ))}
        {/* {ticketData?.admin_response && (
          <>
            <div className="d-flex justify-content-between">
              <span>
                {res?.user?.id != userId && "Support - "}
                <span style={{ color: "#D2DB08" }}>{res?.user?.username}</span>
              </span>
              <span className="">
                {moment(res?.created).format("DD-MM.YYYY - HH:mm")}
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
              defaultValue={res?.message}
            />
          </>
        ))}

        {ticketResponse && ticketResponse != "resolved" && (
          <div className="my-3 d-flex justify-content-center gap-2">
            <button
              onClick={() => {
                if (
                  ticketData?.length == 1 ||
                  props?.responseTicketID == userId ||
                  props?.responseTicketID == null
                ) {
        )} */}

        <div className="my-3 d-flex justify-content-center gap-2">
          {ticketData[0]?.ticket_support.user_label != "resolved" && (
            <>
              <button
                onClick={() => {
                  if (
                    ticketData?.length == 1 ||
                    props?.responseTicketID == userId ||
                    props?.responseTicketID == null
                  ) {
                    Swal.fire({
                      text: "You cannot reply to your own ticket as admin has not responded yet.",
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
                  // props.setShowModal(4);
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
              {ticketData?.length != 1 && (
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
              )}
            </>
          )}

          {ticketAllData.length > 2 && 
            <button id="viewAllId"
            onClick={() => {
              // showAllTicketHistory(ticketData[0]?.ticket_support?.id);
              displayAllData()
              document.getElementById("viewAllId").style.display="none"
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
            View All
          </button>
          }
        </div>
      </div>
    </>
  );
};

export default AnsweredTicketView;
