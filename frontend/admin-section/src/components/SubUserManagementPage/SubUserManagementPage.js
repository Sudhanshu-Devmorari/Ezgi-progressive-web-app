import React from "react";
import NavBar from "../NavBar/NavBar";
import SideBar from "../SideBar/SideBar";
import bell from "../../assets/bell (2).svg";
import transactionIcon from "../../assets/webhook.svg";
import SubUsers from "../../assets/users30.png";
import { HiArrowSmUp } from "react-icons/hi";
import { MainDiv } from "../CommonBgRow";
import SubUserManagementFilter from "../SubUserManagementFilter/SubUserManagementFilter";
import user1 from "../../assets/user3.png";
import user2 from "../../assets/user2.png";
import user3 from "../../assets/user1.png";
import user4 from "../../assets/user6.png";
import edit from "../../assets/user-edit.svg";
import trash from "../../assets/trash.svg";
import SubUsesTimeLine from "../SubUsesTimeLine/SubUsesTimeLine";

const SubUserManagementPage = () => {
  const users = [
    { profile: user1, btn: "Support Supervisor" },
    { profile: user2, btn: "Financial Supervisor" },
    { profile: user3, btn: "IT Supervisor" },
    { profile: user4, btn: "Ads Manager" },
    { profile: user1, btn: "Director Manager" },
  ];
  return (
    <>
      <div className="conatainer-fluid m-2">
        <NavBar />
        <div className="row g-0 mt-2">
          <div className="col-1" style={{ width: "5%" }}>
            <SideBar />
          </div>
          <div className="col-11" style={{ width: "95%" }}>
            <div className="row g-0">
              <div className="col-8">
                <div className="row g-0">
                  <div
                    className="col p-0 mx-2 dark-mode d-flex flex-column align-items-center justify-content-center"
                    style={{ height: "25vh" }}
                  >
                    <img src={SubUsers} alt="" height={45} width={45} />
                    <span style={{ fontSize: "1.2rem" }}>Sub Users</span>
                    <span style={{ fontSize: "1.6rem" }}>127</span>
                  </div>
                  <div className="col p-0">
                    <div
                      className="dark-mode p-2 mx-2"
                      style={{ height: "25vh" }}
                    >
                      <div className="mt-2 d-flex flex-column p-2 align-items-center justify-content-center">
                        <img
                          src={transactionIcon}
                          alt=""
                          height={45}
                          width={45}
                        />
                        <span
                          className="name-fonts"
                          style={{ fontSize: "1.2rem" }}
                        >
                          Transactions
                        </span>
                        <span style={{ fontSize: "1.6rem" }}>127</span>
                      </div>
                      <div className="d-flex align-items-end mt-3 p-2">
                        <span className="" style={{ fontSize: "1rem" }}>
                          <span
                            className=""
                            style={{ color: "#58DEAA", fontSize: "1.2rem" }}
                          >
                            %22
                            <HiArrowSmUp
                              fontSize={"1.4rem"}
                              style={{ marginBottom: "0.1rem" }}
                            />
                          </span>
                          last day
                        </span>
                      </div>
                    </div>
                  </div>
                  <div
                    className="col p-0 mx-2 dark-mode d-flex flex-column align-items-center justify-content-center"
                    style={{ height: "25vh" }}
                  >
                    <img src={bell} alt="" height={45} width={45} />
                    <span style={{ fontSize: "1.2rem" }}>Notifications</span>
                    <span style={{ fontSize: "1.6rem" }}>127</span>
                  </div>
                </div>
                <div
                  className="dark-mode p-2 m-2 mb-0 home-height"
                  style={{ height: "65vh" }}
                >
                  <SubUserManagementFilter />
                  {users.map((res, index) => (
                    <MainDiv>
                      <>
                        <div className="col d-flex align-items-center">
                          <span>#0001</span>
                          <span className="px-2">
                            <img
                              src={res.profile}
                              alt=""
                              height={50}
                              width={50}
                            />
                          </span>
                          <span>johndoe</span>
                        </div>
                        <div className="col d-flex align-items-center justify-content-start">
                          <button
                            className="px-2"
                            style={{
                              backgroundColor: "transparent",
                              borderRadius: "4px",
                              border:
                                (res.btn === "Support Supervisor" &&
                                  "1px solid #FF9100") ||
                                (res.btn === "Financial Supervisor" &&
                                  "1px solid #58DEAA") ||
                                (res.btn === "IT Supervisor" &&
                                  "1px solid #4DD5FF") ||
                                (res.btn === "Ads Manager" &&
                                  "1px solid #FFEE7D") ||
                                (res.btn === "Director Manager" &&
                                  "1px solid #FF33E4"),
                              color:
                                (res.btn === "Support Supervisor" &&
                                  "#FF9100") ||
                                (res.btn === "Financial Supervisor" &&
                                  "#58DEAA") ||
                                (res.btn === "IT Supervisor" && "#4DD5FF") ||
                                (res.btn === "Ads Manager" && "#FFEE7D") ||
                                (res.btn === "Director Manager" && "#FF33E4"),
                            }}
                          >
                            {res.btn}
                          </button>
                        </div>
                        <div className="col d-flex align-items-center justify-content-end">
                          <div className="">15-06-2023 - 16:37</div>
                        </div>
                        <div className="col-1 d-flex align-items-center justify-content-end">
                          <img src={edit} alt="" height={27} width={27} />
                          <img src={trash} alt="" height={27} width={27} />
                        </div>
                      </>
                    </MainDiv>
                  ))}
                </div>
              </div>
              <div className="col-4">
                <SubUsesTimeLine />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SubUserManagementPage;
