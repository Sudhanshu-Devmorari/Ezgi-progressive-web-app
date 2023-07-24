import React from "react";
import SideBar from "../SideBar/SideBar";
import NavBar from "../NavBar/NavBar";
import WithdrawalRequests from "../WithdrawalRequests/WithdrawalRequests";
import Requests from "../Requests/Requests";
import { HiArrowSmUp } from "react-icons/hi";
import Home from "../Home/Home";
import profile from "../../assets/profile.png";
import user1 from "../../assets/user1.png";
import UserTimeLine from "../UserTimeLine/UserTimeLine";

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
      // gender: gender_female,
      age: "25 - 34",
      country: "Ankara",
      date: "15-06-.2023 - 16:37",
      role: "Journeyman",
      profile: profile,
    },
    {
      sr: "#0002",
      name: "John Doe",
      username: "johndoe",
      // gender: gender_male,
      age: "18 - 24",
      country: "İstanbul",
      date: "15-06-.2023 - 16:37",
      profile: user1,
    },
    {
      sr: "#0003",
      name: "John Doe",
      username: "johndoe",
      // gender: gender_female,
      age: "35 - 44",
      country: "İzmir",
      date: "15-06-.2023 - 16:37",
      role: "Expert",
      profile: profile,
    },
    {
      sr: "#0004",
      name: "John Doe",
      username: "johndoe",
      // gender: gender_male,
      age: "25 - 34",
      country: "Bursa",
      date: "15-06-.2023 - 16:37",
      role: "Apprentice",
      profile: profile,
    },
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
                    <div className={`${"dark-mode p-2 mx-2 gap-ceown new-user-height"} `} style={{height:"25vh"}}>
                      <div className="" style={{ fontSize: "1.2rem" }}>
                        Withdrawal Requests
                      </div>
                      <div className="row g-0 d-flex justify-content-center">
                        <div className="col-2">
                          <div className="p-3 me-2 d-flex flex-column align-items-center justify-content-center">
                            <span
                              className="level-font"
                              style={{
                                fontSize: "1.2rem",
                                color: "#4DD5FF",
                              }}
                            >
                              New
                            </span>
                            <span
                              className="level-count-font"
                              style={{ fontSize: "1.6rem" }}
                            >
                              127
                            </span>
                          </div>
                        </div>
                        <div className="col-3">
                          <div className="p-3 me-2 d-flex flex-column align-items-center justify-content-center">
                            <span
                              className="level-font"
                              style={{
                                fontSize: "1.2rem",
                                color: "#FFDD00",
                              }}
                            >
                              Pending
                            </span>
                            <span
                              className="level-count-font"
                              style={{ fontSize: "1.6rem" }}
                            >
                              127
                            </span>
                          </div>
                        </div>
                        <div className="col-3">
                          <div className="p-3 me-2 d-flex flex-column align-items-center justify-content-center">
                            <span
                              className="level-font"
                              style={{
                                fontSize: "1.2rem",
                                color: "#58DEAA",
                              }}
                            >
                              Approved
                            </span>
                            <span
                              className="level-count-font"
                              style={{ fontSize: "1.6rem" }}
                            >
                              127
                            </span>
                          </div>
                        </div>
                        <div className="col-4">
                          <div
                            className="p-3 me-2 d-flex flex-column align-items-center justify-content-center"
                            style={{ border: "1px solid #D2DB08" }}
                          >
                            <span
                              className="level-font"
                              style={{
                                fontSize: "1.2rem",
                                color: "#D2DB08",
                              }}
                            >
                              Total Payment
                            </span>
                            <span
                              className="level-count-font"
                              style={{ fontSize: "1.6rem" }}
                            >
                              12.645 <small>₺</small>
                            </span>
                          </div>
                        </div>
                        <div className="mt-2">
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
                  </div>
                  <div className="col-4">
                    <div className="d-flex flex-column align-items-center justify-content-center rqst-block dark-mode new-user-height me-2" style={{height:"25vh"}}>
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
              <Home users={users} />
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
