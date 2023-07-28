import React, { useState } from "react";
import { HiArrowSmUp } from "react-icons/hi";
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
import { BiSolidCrown } from "react-icons/bi";
import cross from "../../assets/Group 81.svg";

const SupportManagementPage = () => {
  const requestArray = [
    { img: pending, name: "Pending Requests" },
    { img: resolved, name: "Resolved Requests" },
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
  const [selecteReply, setSelecteReply] = useState("reply");
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
                  <div className="col p-0">
                    <div
                      className="dark-mode p-2 mx-2"
                      style={{ height: "25vh" }}
                    >
                      <div className="mt-2 d-flex flex-column align-items-center justify-content-center p-2">
                        <img src={support} alt="" height={45} width={45} />
                        <span
                          className="name-fonts"
                          style={{ fontSize: "1.2rem" }}
                        >
                          New Requests
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
                  <div className="col p-0 me-2 dark-mode">
                    <div className="row g-0 h-100">
                      {requestArray.map((res, index) => (
                        <div className="d-flex flex-column align-items-center justify-content-center col">
                          <img src={res.img} alt="" height={45} width={45} />
                          <span
                            className="name-fonts"
                            style={{ fontSize: "1.2rem" }}
                          >
                            {res.name}
                          </span>
                          <span style={{ fontSize: "1.6rem" }}>127</span>
                        </div>
                      ))}
                    </div>
                  </div>
                  {/* {salesArray.map((res, index) => (
                    <div className="col p-0">
                      <div
                        className={`dark-mode p-2 ${
                          res.name === "Plan Sales" ? "mx-2" : "me-2"
                        }`}
                        style={{ height: "25vh" }}
                      >
                        <div className="mt-2 d-flex flex-column align-items-center justify-content-center p-2">
                          <img src={res.icon} alt="" height={45} width={45} />
                          <span style={{ fontSize: "1.2rem" }}>{res.name}</span>
                          <span style={{ fontSize: "1.6rem" }}>
                            12.860 <small>₺</small>
                          </span>
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
                  ))} */}
                </div>
                <div
                  className="dark-mode p-2 m-2 mb-0 home-height"
                  style={{ height: "65vh" }}
                >
                  <SupportManagementFilter />
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
                        <div className="col d-flex align-items-center justify-content-center">
                          <div className="">
                            <button
                              className="px-2"
                              style={{
                                backgroundColor: "transparent",
                                borderRadius: "4px",
                                border:
                                  (res.btn === "Financial" &&
                                    "1px solid #58DEAA") ||
                                  (res.btn === "Technical" &&
                                    "1px solid #4DD5FF"),
                                color:
                                  (res.btn === "Financial" && "#58DEAA") ||
                                  (res.btn === "Technical" && "#4DD5FF"),
                              }}
                            >
                              {res.btn}
                            </button>
                          </div>
                        </div>
                        <div className="col d-flex align-items-center justify-content-center">
                          <div
                            className={
                              res.rqst === "Account Request" && "cursor"
                            }
                            data-bs-toggle={
                              res.rqst === "Account Request" && "modal"
                            }
                            data-bs-target="#exampleModal"
                          >
                            {res.rqst}
                          </div>
                        </div>
                        <div className="col d-flex align-items-center justify-content-center">
                          <button
                            className="px-2 text-center"
                            style={{
                              backgroundColor:
                                (res.status === "Pending" && "#FFDD00") ||
                                (res.status === "Answered" && "#4DD5FF") ||
                                (res.status === "Resolved" && "#58DEAA") ||
                                (res.status === "Redirected" && "#FF9100"),
                              borderRadius: "4px",
                              border:
                                (res.status === "Pending" &&
                                  "1px solid #FFDD00") ||
                                (res.status === "Answered" && "#4DD5FF") ||
                                (res.status === "Resolved" && "#58DEAA") ||
                                (res.status === "Redirected" && "#FF9100"),
                              color: "#0D2A53",
                              width: "5.4rem",
                            }}
                          >
                            {res.status}
                          </button>
                        </div>
                        <div className="col d-flex align-items-center justify-content-center">
                          <div className="">15-06-2023 - 16:37</div>
                        </div>
                        <div className="col-1 d-flex align-items-center justify-content-end">
                          <img src={eye} alt="" height={30} width={30} />
                        </div>
                      </>
                    </MainDiv>
                  ))}
                </div>
              </div>
              <div className="col-4">
                <div
                  className="row dark-mode d-flex align-items-center justify-content-center flex-column g-0 gap-2"
                  style={{ height: "25vh" }}
                >
                  <div className="mt-2 d-flex flex-column align-items-center justify-content-center p-2">
                    <span style={{ fontSize: "1.2rem" }}>Total</span>
                    <span style={{ fontSize: "1.6rem" }}>658</span>
                  </div>
                  <div className="d-flex text-start mt-3 p-2 pb-0">
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
                <div className="my-2" style={{ height: "30vh" }}>
                  <SupportHistory />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* <!-- Modal --> */}
      <div
        class="modal fade"
        id="exampleModal"
        tabindex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div class="modal-dialog modal-dialog-centered" style={{fontSize:"0.9rem"}}>
          <div class="modal-content">
            <div class="modal-body dark-mode p-3">
              <div className="row g-0">
                <div className="col position-relative d-flex gap-2">
                  <img src={user3} alt="" height={100} width={100} />
                  <div
                    className="position-absolute d-flex justify-content-center align-items-center"
                    style={{
                      height: "1.7rem",
                      width: "1.7rem",
                      border: "3px solid #FF9100",
                      borderRadius: "50%",
                      backgroundColor: "#0B2447",
                      top: "5px",
                      left: "4.6rem",
                    }}
                  >
                    <BiSolidCrown
                      fontSize={"0.8rem"}
                      style={{ color: "#FF9100" }}
                    />
                  </div>
                  <div
                    className="d-flex justify-content-center flex-column"
                    style={{ fontSize: "0.9rem" }}
                  >
                    <span>John Doe</span>
                    <span>johndoe</span>
                  </div>
                </div>
                <div className="col d-flex justify-content-end flex-column">
                  <span className="mb-1">Date</span>
                  <div className="">
                    <span
                      className="py-1 px-2"
                      style={{ backgroundColor: "#0B2447" }}
                    >
                      22-05-2023 - 16:38
                    </span>
                  </div>
                </div>
              </div>
              <div className="my-2 d-flex flex-column">
                <span>Subject</span>
                <input
                  type="text"
                  name=""
                  id=""
                  className="form-control darkMode-input "
                />
              </div>
              <div className="my-2">
                <span>Message</span>
                <div className="">
                  <textarea
                    style={{ height: "100px", fontSize: ".8rem" }}
                    className="darkMode-input form-control my-2 p-2"
                  >
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed
                    eleifend vehicula tristique. Suspendisse vitae lectus sed
                    massa interdum consectetur. Pellentesque habitant morbi
                    tristique senectus et netus et malesuada fames ac turpis
                    egestas. Integer auctor nisl in lacus fringilla, et
                    tincidunt ex laoreet.
                  </textarea>
                </div>
              </div>
              {/* For Redirected msg */}
              <div className="my-2 py-2" style={{ color: "#58DEAA", fontSize:"0.8rem" }}>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed
                eleifend vehicula tristique. Suspendisse vitae lectus sed massa
                interdum consectetur.
              </div>
              {/* End For Redirected msg */}
              {/* Reply */}
              <div className="d-flex gap-2">
                <div className="">Reply</div>
                <div className=""  style={{ color: "#DD7DFF",}}>Jhon Doe</div>
                <div className="ms-auto">22-05-2023 - 16:38</div>
              </div>
              <textarea
                    style={{ height: "100px", fontSize: ".8rem" }}
                    className="darkMode-input form-control my-2 p-2"
                  >
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed
                    eleifend vehicula tristique. Suspendisse vitae lectus sed
                    massa interdum consectetur. Pellentesque habitant morbi
                    tristique senectus et netus et malesuada fames ac turpis
                    egestas. Integer auctor nisl in lacus fringilla, et
                    tincidunt ex laoreet.
                  </textarea>
              {/* End Reply */}
              <div className="my-3">
                <span
                  className="cursor"
                  onClick={() => setSelecteReply("reply")}
                  style={{ color: selecteReply === "reply" && "#D2DB08" }}
                >
                  Reply
                </span>
                <span
                  onClick={() => setSelecteReply("redirect")}
                  style={{ color: selecteReply === "redirect" && "#D2DB08" }}
                  className="ps-2 cursor"
                >
                  Redirect
                </span>
                <div className="my-2">
                  {selecteReply === "reply" && (
                    <textarea
                      style={{ height: "100px", fontSize: ".9rem" }}
                      className="darkMode-input form-control"
                    >
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                      Sed eleifend vehicula tristique. Suspendisse vitae lectus
                      sed massa interdum consectetur.
                    </textarea>
                  )}
                  {selecteReply === "redirect" && (
                    <>
                      <div
                        style={{ backgroundColor: "#0B2447" }}
                        className="col-3 text-center"
                      >
                        Select
                      </div>
                      <div className="my-2">
                        <span>Note</span>
                        <input
                          type="text"
                          name=""
                          id=""
                          className="form-control darkMode-input "
                        />
                      </div>
                    </>
                  )}
                </div>
                <div className="my-3 d-flex justify-content-center">
                  <button
                    className="px-3 py-1"
                    style={{
                      backgroundColor: "transparent",
                      borderRadius: "4px",
                      border: "1px solid #D2DB08",
                      color: "#D2DB08",
                    }}
                  >
                    Done
                  </button>
                </div>
              </div>
            </div>
            <img
              data-bs-dismiss="modal"
              src={cross}
              alt=""
              style={{
                position: "absolute",
                top: "-1rem",
                right: "-1.1rem",
                cursor: "pointer",
              }}
              height={45}
              width={45}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default SupportManagementPage;
