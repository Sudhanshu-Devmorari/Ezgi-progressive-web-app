import React, { useState } from "react";
import SideBar from "../SideBar/SideBar";
import NavBar from "../NavBar/NavBar";
import { HiArrowSmUp } from "react-icons/hi";
import profile from "../../assets/profile.png";
import user1 from "../../assets/profile.png";
import UserTimeLine from "../UserTimeLine/UserTimeLine";
import "./WithdrawalManagementPage.css";
import { MainDiv } from "../CommonBgRow";
import eye from "../../assets/eye.svg";
import circle_check from "../../assets/circle-check-1.png";
import circle_x from "../../assets/circle-x.png";
import circle_b from "../../assets/Group 311.png";
import circle_y from "../../assets/clock-exclamation.png";
import circel_check from "../../assets/circle-check-1.png";
import WithdrawalRqstFilter from "../WithdrawalRqstFilter/WithdrawalRqstFilter";
import VerificationRequestsBtns from "../VerificationRequestsBtns/VerificationRequestsBtns";
import user2 from "../../assets/user2.png";
import user3 from "../../assets/user3.png";
import user4 from "../../assets/user4.png";
import user5 from "../../assets/user5.png";
import user6 from "../../assets/user6.png";
import "./WithdrawalManagementPage.css";
import axios from "axios";
import config from "../../config";
import { useEffect } from "react";
import { useCookies } from "react-cookie";
import moment from "moment";

const WithdrawalManagementPage = (props) => {
  const users = [
    {
      sr: "#0001",
      name: "John Doe",
      username: "johndoe",
      acc: "TR76 0009 9012 3456 7800 1000 01",
      date: "15-06-2023 - 16:37",
      profile: profile,
      icon: circle_check,
    },
    {
      sr: "#0002",
      name: "John Doe",
      username: "johndoe",
      acc: "TR76 0009 9012 3456 7800 1000 01",
      date: "15-06-2023 - 16:37",
      profile: user1,
      icon: circle_y,
    },
    {
      sr: "#0003",
      name: "John Doe",
      username: "johndoe",
      acc: "TR76 0009 9012 3456 7800 1000 01",
      date: "15-06-2023 - 16:37",
      profile: profile,
      icon: circle_x,
    },
    {
      sr: "#0003",
      name: "John Doe",
      username: "johndoe",
      acc: "TR76 0009 9012 3456 7800 1000 01",
      date: "15-06-2023 - 16:37",
      profile: profile,
      icon: circle_b,
    },
  ];

  const [Requests, setRequests] = useState(false);
  const [withdrawalIndex, setWithdrawalIndex] = useState(null);
  const notification = [
    {
      profile_pic: user3,
      countPeople: "283",
      people: "people",
      name: "johndoe+",
      content: "Become a Editor viewed the pages",
      status: "10 min ago",
    },
    {
      profile_pic: user2,
      countPeople: "283",
      people: "people",
      name: "johndoe+",
      content: "clap @johndoe Liverpool - Arsenal comment",
      status: "10 min ago",
    },
    {
      profile_pic: user1,
      countPeople: "283",
      people: "people",
      name: "johndoe+",
      content: "added  fovarites @johndoe Liverpool - Arsenal comment",
      status: "10 min ago",
    },
    {
      profile_pic: user4,
      name: "johndoe",
      content: "started following @johndoe",
      status: "10 min ago",
    },
    {
      profile_pic: user5,
      name: "melihjohndoe905",
      content: "viewed @johndoe profile",
      status: "10 min ago",
    },
    {
      profile_pic: user6,
      name: "johndoe",
      content: "subscribed for 3 months @johndoe",
      status: "10 min ago",
    },
    {
      profile_pic: user6,
      name: "johndoe",
      content: "upgrade a MASTER level",
      status: "10 min ago",
    },
    {
      profile_pic: user6,
      name: "johndoe",
      content: "become a Editor",
      status: "10 min ago",
    },
  ];
  const [cookies, setCookie, removeCookie] = useCookies();
  const admin_id = localStorage.getItem("admin-user-id");
  const [countsRequest, setCountsRequest] = useState({
    bank_request: 0,
    pending: 0,
    approved: 0,
    new: 0,
    lastmonth: 0,
    total_payment: 0.0,
  });
  const [isLoading, setIsLoading] = useState(false);
  const [UpdateRequest, setUpdateRequest] = useState([]);
  const [filteredArray, setFilteredArray] = useState([]);

  const [notifications, setNotifications] = useState([]);
  const [requestCount, setRequestCount] = useState({});
  async function getWithdrawData() {
    try {
      setIsLoading(true);
      const res = await axios.get(
        `${config.apiUrl}/bank-details/?admin=${admin_id}`
      );
      if (res?.status === 200) {
        const data = res?.data?.data;
        // setUpdateRequest(data?.bank_details);
        setCountsRequest({
          ...countsRequest,
          bank_request: data?.bank_details?.length,
          pending: data?.pending,
          approved: data?.approved,
          new: data?.new,
          lastmonth: data?.lastmonth,
          total_payment: data?.total_payment,
        });
        setNotifications(res?.data?.data?.notifications);
        setIsLoading(false);
      }
      if (res.status == 204) {
        localStorage.clear();
        removeCookie("admin-user-id");
        window.location.reload();
      }
    } catch (error) {
      console.log(error);
    }
  }

  async function WithdrawDataRetrieve() {
    try {
      setIsLoading(true);
      const res = await axios.get(`${config.apiUrl}/show-withdrawable-data/`);
      if (res?.status === 200) {
        // console.log("resData: ", res)
        if (props.withdrawableData === true) {
          setUpdateRequest(res.data.new_request);
          setFilteredArray(res.data.new_request);
        } else {
          setUpdateRequest(res.data.all_request);
          setFilteredArray(res.data.all_request);
        }
        setRequestCount({
          new: res.data.new_request_count,
          pending: res.data.new_request_count,
          approve: res.data.approve_request_count,
        });
        setIsLoading(false);
      }
    } catch (error) {
      console.log(error);
    }
  }
  // console.log("props.withdrawableData: ", props.withdrawableData);
  useEffect(() => {
    getWithdrawData();
    WithdrawDataRetrieve();
  }, [props.withdrawableData]);

  const rqstArray = [
    { name: "New", count: countsRequest?.new },
    { name: "Pending", count: countsRequest.pending },
    { name: "Approved", count: countsRequest.approved },
  ];

  const [selectedOption, setSelectedOption] = useState("All");
  const [filterChar, setFilterChar] = useState("");


  const filteredData = (value) => {
    // const filteredData = (value, status) => {
    // console.log(value, status,"================>>>value, status")

    const filteredArray1 = (
      value == "" && selectedOption == "All" ? UpdateRequest : filteredArray
    ).filter(
      (obj) =>
        obj?.bankdetails?.user?.name
          ?.toLowerCase()
          .startsWith(value.toLowerCase()) ||
        obj?.bankdetails?.user?.name
          ?.toLowerCase()
          .includes(value.toLowerCase()) ||
        obj?.bankdetails?.username?.name
          ?.toLowerCase()
          .startsWith(value.toLowerCase()) ||
        obj?.bankdetails?.username?.name
          ?.toLowerCase()
          .includes(value.toLowerCase())
      // obj?.status?.toLowerCase().includes(status.toLowerCase())
    );
    // console.log(filteredArray1, "=>>filteredArray1");
    setFilteredArray(filteredArray1);
    selectedOption !== "All" && value == "" && handleDropFilter();
  };

  const handleDropFilter = () => {
    const updatedFilteredData = UpdateRequest.filter((obj) => {
      if (selectedOption === "All") {
        return true;
      } else if (selectedOption === "Pendings") {
        return obj.status === "pending";
      } else if (selectedOption === "Approved") {
        return obj.status === "approve";
      } else if (selectedOption === "Rejected") {
        return obj.status === "reject";
      }
      return false;
    });
    // filteredData(selectedOption)
    setFilteredArray(updatedFilteredData);
  };

  useEffect(() => {
    selectedOption && handleDropFilter();
    // selectedOption !== 'All' && filterChar !== '' && filteredData(filterChar)
  }, [selectedOption]);

  return (
    <>
      <div className="container-fluid">
        <NavBar />
        <div className="row g-0 mt-2">
          <div className="col-1" style={{ width: "5%" }}>
            <SideBar
              setWithdrawableData={props.setWithdrawableData}
              setCommentData={props.setCommentData}
              refreshComments={WithdrawDataRetrieve}
            />
          </div>
          <div className="col-11" style={{ width: "95%" }}>
            <div className="row g-0">
              <div className="col-8">
                <div className="row g-0">
                  <div className="col-8">
                    <div
                      className={`${"dark-mode p-2 mx-2 gap-ceown new-user-height "} `}
                      style={{ height: "25vh" }}
                    >
                      <div className="" style={{ fontSize: "1.1rem" }}>
                        Withdrawal Requests
                      </div>
                      <div className="row g-0 py-2 padding-0">
                        {rqstArray?.map((res, index) => (
                          <div
                            className={`${
                              res.name === "New" ? "col-2" : "col-3"
                            } text-center d-flex align-items-center justify-content-center`}
                          >
                            <div className="d-flex flex-column">
                              <span
                                className="heading"
                                style={{
                                  color:
                                    (res.name === "New" && "#4DD5FF") ||
                                    (res.name === "Pending" && "#FFDD00") ||
                                    (res.name === "Approved" && "#58DEAA"),
                                }}
                              >
                                {res.name}
                              </span>
                              <span className="number">{res.count}</span>
                            </div>
                          </div>
                        ))}
                        <div className="col-4">
                          <div
                            className="p-2 py-3 mx-3 d-flex flex-column align-items-center justify-content-center text-center"
                            style={{ border: "1px solid #D2DB08" }}
                          >
                            <span
                              className="heading"
                              style={{
                                color: "#D2DB08",
                              }}
                            >
                              Total Payment
                            </span>
                            <span className="number">
                              {countsRequest?.total_payment} <small>₺</small>
                            </span>
                          </div>
                        </div>
                      </div>
                      <div className="">
                        <span className="rate-font">
                          <span
                            className="rate-font"
                            style={{ color: "#58DEAA" }}
                          >
                            %{countsRequest?.lastmonth}
                            <HiArrowSmUp
                              className="arrow"
                              style={{ marginBottom: "0.1rem" }}
                            />
                          </span>
                          last month
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="col-4">
                    <div
                      className="d-flex flex-column align-items-center justify-content-center dark-mode new-user-height me-2"
                      style={{ height: "25vh" }}
                    >
                      <span className="heading">Bank Update Requests</span>
                      <span className="number">
                        {countsRequest?.bank_request}
                      </span>
                    </div>
                  </div>
                </div>
                <div
                  className="dark-mode p-2 m-2 mb-0 home-height"
                  style={{ height: "64vh" }}
                >
                  <WithdrawalRqstFilter
                    filteredData={filteredData}
                    selectedOption={selectedOption}
                    setSelectedOption={setSelectedOption}
                    setFilterChar={setFilterChar}
                  />

                  {isLoading ? (
                    <div className="d-flex gap-1 my-2 pb-2 h-75 align-items-center justify-content-center">
                      Loading...
                    </div>
                  ) : filteredArray?.length === 0 ? (
                    <div className="d-flex gap-1 my-2 pb-2 h-75 align-items-center justify-content-center">
                      No Record Found!
                    </div>
                  ) : (
                    <>
                      {filteredArray?.map((res, index) => (
                        <>
                          <MainDiv>
                            <>
                              <div className="col-3 d-flex align-items-center">
                                <span className="pe-2">{`# ${(
                                  UpdateRequest.length - index
                                )
                                  .toString()
                                  .padStart(4, "0")}`}</span>
                                <img
                                  style={{
                                    borderRadius: "50%",
                                    objectFit: "cover",
                                  }}
                                  src={
                                    res?.bankdetails.user?.profile_pic
                                      ? `${config.apiUrl}${res?.bankdetails.user?.profile_pic}`
                                      : user1
                                  }
                                  alt=""
                                  height={45}
                                  width={45}
                                />
                                <span className="ps-2">
                                  {res?.bankdetails.user?.name}
                                </span>
                              </div>
                              <div className="col-4 d-flex align-items-center justify-content-center">
                                <div>TR {res?.bankdetails?.bank_iban}</div>
                              </div>
                              <div className="col-1 d-flex align-items-center justify-content-center">
                                <div>{res?.amount}</div>
                              </div>
                              <div className="col-4 d-flex align-items-center justify-content-end gap-1 pe-2">
                                <div>
                                  {moment(res?.created).format(
                                    "DD-MM-YYYY - HH:mm"
                                  )}
                                </div>
                                <img
                                  src={
                                    (res?.status === "pending" && circle_y) ||
                                    (res?.status === "approve" && circel_check) ||
                                    (res?.status === "reject" && circle_x) ||
                                    (res?.status === "in progress" && circle_b)
                                  }
                                  alt=""
                                  height={22}
                                  width={22}
                                />
                                <img
                                  onClick={() => {
                                    // if (res?.status === "pending" || res?.status === "in progress" ) {
                                    if (res?.status === "pending") {
                                      if (withdrawalIndex === index) {
                                        setRequests(!Requests);
                                      } else {
                                        setWithdrawalIndex(index);
                                      }
                                    }
                                    
                                  }}
                                  className="cursor"
                                  src={eye}
                                  alt=""
                                  height={22}
                                  width={22}
                                />
                              </div>
                            </>
                          </MainDiv>
                          {Requests && index === withdrawalIndex && (
                            <VerificationRequestsBtns
                              setRequests={setRequests}
                              WithdrawDataRetrieve={WithdrawDataRetrieve}
                              status={res?.status}
                              from={"withdrawal"}
                              id={res?.bankdetails?.id}
                              withdrawalId={res?.id}
                              getWithdrawData={getWithdrawData}
                            />
                          )}
                        </>
                      ))}
                    </>
                  )}
                </div>
              </div>
              <div className="col-4">
                <UserTimeLine
                  transactionHistory={"history"}
                  notification={notifications}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default WithdrawalManagementPage;
