import React, { useContext, useEffect, useState } from "react";
import CurrentTheme from "../../context/CurrentTheme";
import lifebuoy from "../../assets/lifebuoy.png";
import axios from "axios";
import { userId } from "../GetUser";
import CreateNewTicket from "../CreateNewTicket/CreateNewTicket";
import AnsweredTicketView from "../AnsweredTicketView/AnsweredTicketView";
import TicketReplyModal from "../../components/TicketReplyModal/TicketReplyModal";
import config from "../../config";

const Support = () => {
  const { currentTheme, setCurrentTheme } = useContext(CurrentTheme);
  const [showModal, setShowModal] = useState(1);

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

  // Get ALL Tickets API
  const [ticketsData, setTicketsData] = useState([]);
  useEffect(() => {
    async function getTicketsData() {
      const res = await axios.get(`${config?.apiUrl}/support/${userId}`);
      // console.log("res----------", res.data);
      setTicketsData(res.data);
    }
    getTicketsData();
  }, [showModal]);

  // Ticket View
  const [ticketId, setticketId] = useState("");
  function handleTicketView(e) {
    setticketId(e);
    setShowModal(3);
  }

  const [ticketData, setTicketData] = useState([]);
  function getData(e) {
    try {
      axios
        .get(`${config?.apiUrl}/subuser-answer-ticket/${userId}/${e}/`)
        .then((res) => {
          // console.log(res.data, "=================>>>>res");
          setTicketData(res.data);
        })
        .catch((error) => {
          console.log(error);
        });
    } catch (e) {}
  }

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
              <img
                onContextMenu={(e) => e.preventDefault()}
                src={lifebuoy}
                alt=""
                height={50}
                width={50}
              />
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
            {ticketsData?.map((res, index) => (
              <>
                <div
                  onClick={() => {
                    handleTicketView(res.id);
                    getData(res.id);
                  }}
                  key={index}
                  className="my-2 row g-0 p-2 ps-0"
                  style={{
                    backgroundColor:
                      currentTheme === "dark" ? "#0B2447" : "#F6F6F6",
                  }}
                >
                  <div className="d-flex col-4">
                    <div
                      style={{
                        width: "7px",
                        height: "18px",
                        backgroundColor:
                          (res.status.toLowerCase() === "pending" &&
                            "#F8FF61") ||
                          (res.status.toLowerCase() === "progress" &&
                            "#4DD5FF") ||
                          (res.status.toLowerCase() === "resolved" &&
                            "#37FF80"),
                      }}
                    ></div>
                    <span className="ps-1 text-capitalize">
                      {res.department}
                    </span>
                  </div>
                  <div className="col-6 text-center">{res.created}</div>
                  <div className="text-capitalize col-2 text-end">
                    {res.status}
                  </div>
                </div>
              </>
            ))}
          </>
        )}

        {showModal === 2 && (
          <>
            <CreateNewTicket
              setShowModal={setShowModal}
              ticketsData={ticketsData}
            />
          </>
        )}

        {showModal === 3 && (
          <AnsweredTicketView
            setShowModal={setShowModal}
            ticketId={ticketId}
            ticketData={ticketData}
          />
        )}

        {showModal === 4 && (
          <TicketReplyModal
            setShowModal={setShowModal}
            ticketData={ticketData}
          />
        )}
      </div>
    </>
  );
};

export default Support;
