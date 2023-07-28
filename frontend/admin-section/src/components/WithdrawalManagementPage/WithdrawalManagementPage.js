import React from "react";
import SideBar from "../SideBar/SideBar";
import NavBar from "../NavBar/NavBar";
import WithdrawalRequests from "../WithdrawalRequests/WithdrawalRequests";
import { HiArrowSmUp } from "react-icons/hi";
import Home from "../Home/Home";
import profile from "../../assets/profile.png";
import user1 from "../../assets/user1.png";
import UserTimeLine from "../UserTimeLine/UserTimeLine";
import "./WithdrawalManagementPage.css";
import { MainDiv } from "../CommonBgRow";
import eye from "../../assets/eye.svg";
import circle_check from "../../assets/circle-check-1.png";
import circle_x from "../../assets/circle-x.png";
import circle_b from "../../assets/Group 311.png";
import circle_y from "../../assets/clock-exclamation.png";

const WithdrawalManagementPage = () => {
  const levelArray = [
    {
      name: "New",
      count: "127",
    },
    {
      name: "Pending",
      count: "127",
    },
    {
      name: "Approved",
      count: "127",
    },
    {
      name: "Total Payment",
      count: "127",
    },
  ];
  const users = [
    {
      sr: "#0001",
      name: "John Doe",
      username: "johndoe",
      acc: "TR76 0009 9012 3456 7800 1000 01",
      date: "15-06-2023 - 16:37",
      profile: profile,
      icon : circle_check
    },
    {
      sr: "#0002",
      name: "John Doe",
      username: "johndoe",
      acc: "TR76 0009 9012 3456 7800 1000 01",
      date: "15-06-2023 - 16:37",
      profile: user1,
      icon : circle_y
    },
    {
      sr: "#0003",
      name: "John Doe",
      username: "johndoe",
      acc: "TR76 0009 9012 3456 7800 1000 01",
      date: "15-06-2023 - 16:37",
      profile: profile,
      icon : circle_x
    },
    {
      sr: "#0003",
      name: "John Doe",
      username: "johndoe",
      acc: "TR76 0009 9012 3456 7800 1000 01",
      date: "15-06-2023 - 16:37",
      profile: profile,
      icon : circle_b
    },
  ];
  const rqstArray = [
    { name: "New" },
    { name: "Pending" },
    { name: "Approved" },
  ];
  return (
    <>
      <div className="container-fluid m-2">
        <NavBar />
        <div className="row g-0 mt-2">
          <div className="col-1" style={{ width: "5%" }}>
            <SideBar />
          </div>
          <div className="col-11" style={{ width: "95%" }}>
            <div className="row g-0">
              <div className="col-8">
                <div className="row g-0">
                  <div className="col-8">
                    <div
                      className={`${"dark-mode p-2 mx-2 gap-ceown new-user-height"} `}
                      style={{ height: "25vh" }}
                    >
                      <div className="" style={{ fontSize: "1.2rem" }}>
                        Withdrawal Requests
                      </div>
                      <div className="row g-0 mb-2">
                        {rqstArray.map((res, index) => (
                          <div
                            className={`${
                              res.name === "New" ? "col-2" : "col-3"
                            } text-center d-flex align-items-center justify-content-center`}
                          >
                            <div className="d-flex flex-column">
                              <span
                                style={{
                                  fontSize: "1.2rem",
                                  color:
                                    (res.name === "New" && "#4DD5FF") ||
                                    (res.name === "Pending" && "#FFDD00") ||
                                    (res.name === "Approved" && "#58DEAA"),
                                }}
                              >
                                {res.name}
                              </span>
                              <span
                                className="name-block"
                                style={{ fontSize: "1.6rem" }}
                              >
                                127
                              </span>
                            </div>
                          </div>
                        ))}
                        <div className="col-4">
                          <div
                            className="p-2 py-3 mx-3 d-flex flex-column align-items-center justify-content-center text-center"
                            style={{ border: "1px solid #D2DB08" }}
                          >
                            <span
                              style={{
                                fontSize: "1.2rem",
                                color: "#D2DB08",
                              }}
                            >
                              Total Payment
                            </span>
                            <span
                              className="name-block"
                              style={{ fontSize: "1.6rem" }}
                            >
                              12.645 <small>₺</small>
                            </span>
                          </div>
                        </div>
                      </div>
                      <div className="d-flex align-items-end">
                        <span>
                          <span
                            style={{ color: "#58DEAA", fontSize: "1.2rem" }}
                          >
                            %22
                            <HiArrowSmUp
                              fontSize={"1.4rem"}
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
                      <span
                        className="level-font"
                        style={{ fontSize: "1.2rem" }}
                      >
                        Bank Update Requests
                      </span>
                      <span
                        className="level-count-font"
                        style={{ fontSize: "1.6rem" }}
                      >
                        127
                      </span>
                    </div>
                  </div>
                </div>
                <div className="my-2">
                  <div
                    className="dark-mode p-2 m-2 mb-0 home-height"
                    style={{ height: "63vh" }}
                  >
                      {users.map((res, index) => (
                    <MainDiv>
                        <>
                          <div className="col d-flex align-items-center">
                            <span className="pe-2">{res.sr}</span>
                            <img src={user1} alt="" height={50} width={50} />
                            <span className="ps-2">{res.name}</span>
                          </div>
                          <div className="col d-flex align-items-center justify-content-center">
                            <div>{res.acc}</div>
                          </div>
                          <div className="col d-flex align-items-center justify-content-center">
                            <div>3.500</div>
                          </div>
                          <div className="d-flex align-items-center justify-content-end gap-2">
                            <div>15-06-2023 - 16:37</div>
                            <img src={res.icon} alt="" height={28} width={28}/>
                            <img src={eye} alt="" height={28} width={28}/>
                          </div>
                        </>
                    </MainDiv>
                      ))}
                  </div>
                </div>
              </div>
              <div className="col-4">
                <UserTimeLine />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default WithdrawalManagementPage;
