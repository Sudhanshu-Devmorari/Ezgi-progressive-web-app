import React, { useEffect, useState } from "react";
import { HiArrowSmDown, HiArrowSmUp } from "react-icons/hi";
import SideBar from "../SideBar/SideBar";
import NavBar from "../NavBar/NavBar";
import support from "../../assets/lifebuoy.png";
import pending from "../../assets/lifebuoy-1.png";
import resolved from "../../assets/lifebuoy-2.png";
import "./SupportManagementPage.css";
import SupportManagementFilter from "../SupportManagementFilter/SupportManagementFilter";
import user1 from "../../assets/user3.png";
import user2 from "../../assets/user2.png";
import user3 from "../../assets/user1.png";
import user4 from "../../assets/user6.png";
import eye from "../../assets/eye.svg";
import { MainDiv } from "../CommonBgRow";
import SupportHistory from "../SupportHistory/SupportHistory";
import axios from "axios";
import Export from "../Export/Export";
import TicketReplyModal from "../TicketReplyModal/TicketReplyModal";
import config from "../../config";
import { useCookies } from "react-cookie";

const SupportManagementPage = () => {
  // Support management API
  const [cookies, setCookie, removeCookie] = useCookies();

  const [NewRequest, setNewRequest] = useState("");
  const [PendingRequest, setPendingRequest] = useState("");
  const [ResolvedRequest, setResolvedRequest] = useState("");
  const [Total, setTotal] = useState("");
  const [tickets, setTickets] = useState([]);
  const [supportHistory, setSupportHistory] = useState([]);
  const [filteredArray, setFilteredArray] = useState([]);
  const [filteredTickets, setFilteredTickets] = useState([]);
  const [perNewRequest, setPerNewRequest] = useState(0);
  const [TotalRequest, setTotalRequest] = useState(0);

  const [selectedOption, setSelectedOption] = useState("All");

  const [tickeview, setTickeview] = useState([]);

  function getTicketsLatestData(e) {
    axios
      .get(`${config.apiUrl}/show-ticket-data/${e}/`)
      .then((res) => {
        // console.log(res.data);
        setTickeview(res.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  async function getSupportData() {
    try {
      const adminId = localStorage.getItem('admin-user-id')

      const res = await axios.get(`${config?.apiUrl}/support-management?admin=${adminId}`);
      if (res.status == 204) {
        localStorage.clear();
        removeCookie("admin-user-id");
        window.location.reload();
      }
      const formattedPercentage = Math.round(
        res?.data?.new_tickets_percentage
      );
      // console.log("=?????", res.data);
      setPerNewRequest(formattedPercentage);
      setTotalRequest(Math.round(res?.data?.total_ticket_percentage));
      setTickets(res?.data?.tickets);
      setNewRequest(res?.data?.new_request);
      setPendingRequest(res?.data?.pending_request);
      setResolvedRequest(res?.data?.resolved_request);
      setTotal(res?.data?.total);
      setSupportHistory(res?.data?.support_history);
    } catch (error) {
      console.log(error);
    }
  }
  useEffect(() => {
    getSupportData();
  }, []);

  useEffect(() => {
    const updatedFilteredTickets = tickets.filter((ticket) => {
      if (selectedOption === "All") {
        return true;
      } else if (selectedOption === "Pendings") {
        return ticket.status === "pending";
      } else if (selectedOption === "Resolved") {
        return ticket.status === "resolved";
      } else if (selectedOption === "Redirected") {
        return ticket.status === "redirected";
      }
      return false;
    });
    setFilteredTickets(updatedFilteredTickets);
  }, [selectedOption, tickets]);

  const filteredData = (value) => {
    let sourceArray = selectedOption === "All" ? tickets : filteredTickets;
    const filteredArray = sourceArray.filter(
      (obj) =>
        obj?.user?.username?.toLowerCase().startsWith(value.toLowerCase()) ||
        obj?.user?.name?.toLowerCase().startsWith(value.toLowerCase()) ||
        obj?.user?.username?.toLowerCase().includes(value.toLowerCase()) ||
        obj?.user?.name?.toLowerCase().includes(value.toLowerCase())
    );
    // setFilteredArray(filteredArray);
    setFilteredTickets(filteredArray);
  };

  const displayTickets =
    filteredArray.length > 0 ? filteredArray : filteredTickets;

  const requestArray = [
    { img: pending, name: "Pending Requests", count: PendingRequest },
    { img: resolved, name: "Resolved Requests", count: ResolvedRequest },
  ];
  const users = [
    {
      profile: user1,
      btn: "Financial",
      rqst: "Withdrawal Request",
      status: "Pending",
    },
    {
      profile: user2,
      btn: "Technical",
      rqst: "Account Request",
      status: "Answered",
    },
    {
      profile: user3,
      btn: "Financial",
      rqst: "Withdrawal Request",
      status: "Resolved",
    },
    {
      profile: user4,
      btn: "Technical",
      rqst: "Account Request",
      status: "Redirected",
    },
  ];

  return (
    <>
      <div className="conatainer-fluid m-2">
        <NavBar />
        <div className="row g-0 mt-2">
          <div className="col-1" style={{ width: "5%" }}>
            <SideBar setSelectedOption={setSelectedOption} refreshComments={getSupportData}/>
          </div>
          <div className="col-11" style={{ width: "95%" }}>
            <div className="row g-0">
              <div className="col-8">
                <div className="row g-0">
                  <div className="col-4 p-0">
                    <div
                      className="dark-mode p-2 mx-2 d-flex flex-column align-items-center justify-content-center"
                      style={{ height: "25vh" }}
                    >
                      <img src={support} alt="" className="icon" />
                      <span className="heading">New Requests</span>
                      <span className="number">{NewRequest}</span>
                      <div className="w-100">
                        <span className="rate-font">
                          {perNewRequest >= 0 ? (
                            <span
                              className="rate-font"
                              style={{ color: "#58DEAA" }}
                            >
                              %{perNewRequest}
                              <HiArrowSmUp
                                className="arrow"
                                style={{ marginBottom: "0.1rem" }}
                              />
                            </span>
                          ) : (
                            <span
                              className="rate-font"
                              style={{ color: "#FF5757" }}
                            >
                              %{perNewRequest}
                              <HiArrowSmDown
                                className="arrow"
                                style={{ marginBottom: "0.1rem" }}
                              />
                            </span>
                          )}
                          last day
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="col p-0 me-2 dark-mode">
                    <div className="row g-0 h-100">
                      {requestArray.map((res, index) => (
                        <div className="d-flex flex-column align-items-center justify-content-center col">
                          <img src={res.img} alt="" className="icon" />
                          <span className="heading">{res.name}</span>
                          <span className="number">{res.count}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
                <div className="dark-mode p-2 m-2 mb-0 home-height">
                  <SupportManagementFilter
                    setSelectedOption={setSelectedOption}
                    selectedOption={selectedOption}
                    // filteredTickets={filteredTickets}
                    tickets={tickets}
                    setTickets={setTickets}
                    filteredData={filteredData}
                    setFilteredArray={setFilteredArray}
                  />
                  {filteredTickets.map((res, index) => (
                    <MainDiv>
                      <>
                        <div
                          key={index}
                          className="col-3 d-flex align-items-center cursor"
                          data-bs-toggle="modal"
                          data-bs-target="#exampleModal"
                          onClick={() => getTicketsLatestData(res.id)}
                        >
                          <span className="pe-1">{`# ${(index + 1)
                          .toString()
                          .padStart(4, "0")}`}</span>
                          <span className="px-2">
                            <img
                              style={{
                                objectFit: "cover",
                                borderRadius: "50%",
                              }}
                              src={`${config?.apiUrl}${res?.user?.profile_pic}`}
                              alt=""
                              height={45}
                              width={45}
                            />
                          </span>
                          <span>{res?.user?.username}</span>
                        </div>
                        <div
                          className="col-2 d-flex align-items-center justify-content-center cursor"
                          data-bs-toggle="modal"
                          data-bs-target="#exampleModal"
                          onClick={() => getTicketsLatestData(res.id)}
                        >
                          <button
                            className="px-2"
                            style={{
                              backgroundColor: "transparent",
                              borderRadius: "4px",
                              border:
                                (res.department.toLowerCase() === "financial" &&
                                  "1px solid #58DEAA") ||
                                (res.department.toLowerCase() === "technical" &&
                                  "1px solid #4DD5FF"),
                              color:
                                (res.department.toLowerCase() === "financial" &&
                                  "#58DEAA") ||
                                (res.department.toLowerCase() === "technical" &&
                                  "#4DD5FF"),
                            }}
                          >
                            {res.department}
                          </button>
                        </div>
                        <div
                          className="col-2 d-flex align-items-center justify-content-center cursor"
                          data-bs-toggle="modal"
                          data-bs-target="#exampleModal"
                          onClick={() => getTicketsLatestData(res.id)}
                        >
                          <div>{res?.subject}</div>
                        </div>
                        <div
                          className="col-2 d-flex align-items-center justify-content-center cursor"
                          data-bs-toggle="modal"
                          data-bs-target="#exampleModal"
                          onClick={() => getTicketsLatestData(res.id)}
                        >
                          <button
                            className="px-2 text-center text-capitalize"
                            style={{
                              backgroundColor:
                                (res.status === "pending" && "#FFDD00") ||
                                (res.status === "answered" && "#4DD5FF") ||
                                (res.status === "resolved" && "#58DEAA") ||
                                (res.status === "progress" && "#FF9100"),
                              borderRadius: "4px",
                              border:
                                (res.status === "pending" &&
                                  "1px solid #FFDD00") ||
                                (res.status === "answered" && "#4DD5FF") ||
                                (res.status === "resolved" && "#58DEAA") ||
                                (res.status === "progress" && "#FF9100"),
                              // (res.status === "redirected" && "#FF9100"),
                              color: "#0D2A53",
                              width: "5.4rem",
                            }}
                          >
                            {res?.status}
                          </button>
                        </div>
                        <div
                          className="col-3 d-flex align-items-center justify-content-end gap-1 cursor"
                          data-bs-toggle="modal"
                          data-bs-target="#exampleModal"
                          onClick={() => getTicketsLatestData(res.id)}
                        >
                          <div className="">{res?.created}</div>
                          {/* <div className="">15-06-2023 - 16:37</div> */}
                          <img src={eye} alt="" height={24} width={24} />
                        </div>
                      </>
                    </MainDiv>
                  ))}
                </div>
              </div>
              <div className="col-4">
                <div
                  className="p-2 dark-mode d-flex align-items-center justify-content-center flex-column g-0"
                  style={{ height: "25vh" }}
                >
                  <span className="heading">Total</span>
                  <span className="number">{Total}</span>
                  <div className="w-100 pt-2">
                    <span className="rate-font">
                      {TotalRequest >= 0 ? (
                        <span
                          className="rate-font"
                          style={{ color: "#58DEAA" }}
                        >
                          %{TotalRequest}
                          <HiArrowSmUp
                            className="arrow"
                            style={{ marginBottom: "0.1rem" }}
                          />
                        </span>
                      ) : (
                        <span
                          className="rate-font"
                          style={{ color: "#FF5757" }}
                        >
                          %{TotalRequest}
                          <HiArrowSmDown
                            className="arrow"
                            style={{ marginBottom: "0.1rem" }}
                          />
                        </span>
                      )}
                      last day
                    </span>
                  </div>
                </div>
                <div className="mt-2">
                  <SupportHistory supportHistory={supportHistory} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <TicketReplyModal tickeview={tickeview} />

      <Export exportList={displayTickets} exportData={"Support"} />
    </>
  );
};

export default SupportManagementPage;
