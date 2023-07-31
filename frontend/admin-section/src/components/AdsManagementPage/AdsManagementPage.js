import React, { useState } from "react";
import NavBar from "../NavBar/NavBar";
import SideBar from "../SideBar/SideBar";
import ad1 from "../../assets/ad-1.svg";
import ad3 from "../../assets/ad-3.svg";
import ad4 from "../../assets/ad-4.svg";
import ad5 from "../../assets/ad-5.svg";
import img1 from "../../assets/img1.svg";
import img2 from "../../assets/img2.svg";
import eye from "../../assets/eye (1).svg";
import pointer from "../../assets/pointer.svg";
import chart from "../../assets/chart-bar.svg";
import edit from "../../assets/Group 75.svg";
import { MainDiv } from "../CommonBgRow";
import cross from "../../assets/Group 81.svg";
import upload from "../../assets/upload.svg";

const AdsManagementPage = () => {
  const [editTrue, setEditTrue] = useState(false);
  const requestArray = [
    { img: ad3, name: "Active" },
    { img: ad4, name: "Pending" },
    { img: ad5, name: "Ended" },
  ];
  const ads = [
    {
      page: "Main",
      img: img1,
    },
    {
      page: "editor",
      img: img2,
    },
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
            <div className="row g-0" style={{ height: "25vh" }}>
              <div className="d-flex flex-column align-items-center justify-content-center col-2 dark-mode mx-2">
                <img src={ad1} alt="" height={45} width={45} />
                <span className="name-fonts" style={{ fontSize: "1.2rem" }}>
                  Advertisements
                </span>
                <span style={{ fontSize: "1.6rem" }}>127</span>
              </div>
              <div className="col col p-0 dark-mode">
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
              <div className="col-3 dark-mode mx-2 p-2 px-3">
                <div className="" style={{ fontSize: "1.2rem" }}>
                  Advertisements Spaces
                </div>
                <div className="row g-0 h-100">
                  <div className="col d-flex flex-column align-items-center justify-content-center">
                    <span style={{ fontSize: "1.2rem" }}>Banners</span>
                    <span style={{ fontSize: "1.6rem" }}>127</span>
                  </div>
                  <div className="col d-flex flex-column align-items-center justify-content-center">
                    <span style={{ fontSize: "1.2rem" }}>Pop ups</span>
                    <span style={{ fontSize: "1.6rem" }}>127</span>
                  </div>
                </div>
              </div>
            </div>
            <div
              className="dark-mode p-2 m-2 mb-0 home-height"
              style={{ height: "65vh" }}
            >
              <div className="my-2 d-flex justify-content-end">
                <button
                  data-bs-toggle="modal"
                  data-bs-target="#exampleModal"
                  className="px-2"
                  style={{
                    border: "1px solid #D2DB08",
                    color: "#D2DB08",
                    borderRadius: "4px",
                    backgroundColor: "transparent",
                  }}
                >
                  Create Ads
                </button>
                <button
                  className="px-2 mx-2"
                  style={{
                    border: "1px solid #58DEAA",
                    color: "#58DEAA",
                    borderRadius: "4px",
                    backgroundColor: "transparent",
                  }}
                >
                  Export
                </button>
              </div>

              {ads.map((res, index) => (
                <MainDiv>
                  <>
                    <div className="col-2 p-2 d-flex justify-content-center">
                      <img src={res.img} alt="" />
                    </div>

                    <div className="col-4">
                      {res.page === "Main" ? (
                        <>
                          <div className="gap-3 d-flex">
                            <div className="">
                              <button
                                style={{
                                  backgroundColor: "#4DD5FF",
                                  borderRadius: "3px",
                                  color: "#00D2A53",
                                  border: "1px solid #4DD5FF",
                                }}
                              >
                                Flash
                              </button>
                            </div>
                            <div className="">
                              <button
                                style={{
                                  backgroundColor: "#FFEE7D",
                                  borderRadius: "3px",
                                  color: "#00D2A53",
                                  border: "1px solid #FFEE7D",
                                }}
                              >
                                Banners
                              </button>
                            </div>
                            <div className="">
                              <button
                                style={{
                                  backgroundColor: "#FFEE7D",
                                  borderRadius: "3px",
                                  color: "#00D2A53",
                                  border: "1px solid #FFEE7D",
                                }}
                              >
                                Banners
                              </button>
                            </div>
                            <div className="">
                              <button
                                style={{
                                  backgroundColor: "#4DD5FF",
                                  borderRadius: "3px",
                                  color: "#00D2A53",
                                  border: "1px solid #4DD5FF",
                                }}
                              >
                                Flash
                              </button>
                            </div>
                          </div>
                          <div className="gap-2 my-2 d-flex">
                            <div className="">
                              <button
                                style={{
                                  backgroundColor: "transparent",
                                  borderRadius: "3px",
                                  color: "#58DEAA",
                                  border: "1px solid #58DEAA",
                                }}
                              >
                                Main Page Top Left
                              </button>
                            </div>
                            <div className="">
                              <button
                                style={{
                                  backgroundColor: "transparent",
                                  borderRadius: "3px",
                                  color: "#DD7DFF",
                                  border: "1px solid #DD7DFF",
                                }}
                              >
                                Timeline
                              </button>
                            </div>
                            <div className="">
                              <button
                                style={{
                                  backgroundColor: "transparent",
                                  borderRadius: "3px",
                                  color: "#4DD5FF",
                                  border: "1px solid #4DD5FF",
                                }}
                              >
                                Main Page Top Right
                              </button>
                            </div>
                          </div>
                        </>
                      ) : (
                        <>
                          <div className="my-2">
                            <button
                              style={{
                                backgroundColor: "#4DD5FF",
                                borderRadius: "3px",
                                color: "#00D2A53",
                                border: "1px solid #4DD5FF",
                              }}
                            >
                              Flash
                            </button>
                          </div>
                          <div className="">
                            <button
                              style={{
                                backgroundColor: "transparent",
                                borderRadius: "3px",
                                color: "#FFDD00",
                                border: "1px solid #FFDD00",
                              }}
                            >
                              Editor Page
                            </button>
                          </div>
                        </>
                      )}
                    </div>
                    <div className="col-1">
                      <div className="">nesine.com</div>
                    </div>
                    <div className="col-1">
                      <img src={eye} alt="" height={30} width={30} />
                      <span className="ps-2">12.645</span>
                    </div>
                    <div className="col-1">
                      <img src={pointer} alt="" height={30} width={30} />
                      <span className="ps-2">4.645</span>
                    </div>
                    <div className="col-1">
                      <img src={chart} alt="" height={30} width={30} />
                      <span className="ps-2">%43.8</span>
                    </div>
                    <div className="col-2 d-flex gap-3 justify-content-end pe-2">
                      <div className="d-flex flex-column">
                        <span>08.06.2023 - 18:33</span>
                        <span>23.06.2023 - 00:00</span>
                      </div>
                      <div className="">
                        <img
                          onClick={() => setEditTrue(true)}
                          className="cursor"
                          data-bs-toggle="modal"
                          data-bs-target="#exampleModal"
                          src={edit}
                          alt=""
                          height={30}
                          width={30}
                        />
                      </div>
                    </div>
                  </>
                </MainDiv>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* <!-- Modal --> */}
      <div
        className="modal fade"
        id="exampleModal"
        data-bs-backdrop="static"
        data-bs-keyboard="false"
        tabindex="-1"
        aria-labelledby="staticBackdropLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered modal-lg">
          <div className="modal-content">
            <div className="modal-body p-3 dark-mode">
              <div className="mx-2 my-3">
                {editTrue && <img src={img1} alt="" srcset="" />}
                <span
                  className="py-1 mb-2 px-3 m-1"
                  style={{
                    backgroundColor: "#0B2447",
                    borderRadius: "2px",
                  }}
                >
                  <img
                    className="mb-1"
                    src={upload}
                    alt=""
                    height={20}
                    width={20}
                  />
                  <span className="ps-2">Upload</span>
                </span>
              </div>
              <div className="row g-0 p-2 gap-3">
                <div className="col d-flex flex-column">
                  <span>Ads Space</span>
                  <input type="text" className="darkMode-input form-control" />
                </div>
                <div className="col d-flex flex-column">
                  <span>Start Date</span>
                  <input type="text" className="darkMode-input form-control" />
                </div>
                <div className="col d-flex flex-column">
                  <span>End Date</span>
                  <input type="text" className="darkMode-input form-control" />
                </div>
              </div>
              <div className="row g-0 p-2 gap-3">
                <div className="col-4 d-flex flex-column">
                  <span>Company Name</span>
                  <input type="text" className="darkMode-input form-control" />
                </div>
                <div className="col d-flex flex-column">
                  <span>Link</span>
                  <input type="text" className="darkMode-input form-control" />
                </div>
              </div>
              <div className="col-4 p-2">
                <div className="col d-flex flex-column">
                  <span>Add Budget</span>
                  <input type="text" className="darkMode-input form-control" />
                </div>
              </div>
              <div className="my-3 d-flex justify-content-center gap-3">
                {editTrue ? (
                  <>
                    <div className="">
                      <button
                        className="px-3 py-1"
                        style={{
                          color: "#FF5757",
                          backgroundColor: "transparent",
                          border: "1px solid #FF5757",
                          borderRadius: "4px",
                        }}
                      >
                        Deactive
                      </button>
                    </div>
                    <div className="">
                      <button
                        className="px-3 py-1"
                        style={{
                          color: "#D2DB08",
                          backgroundColor: "transparent",
                          border: "1px solid #D2DB08",
                          borderRadius: "4px",
                        }}
                      >
                        Update
                      </button>
                    </div>
                  </>
                ) : (
                  <button
                    className="px-3 py-1"
                    style={{
                      color: "#D2DB08",
                      backgroundColor: "transparent",
                      border: "1px solid #D2DB08",
                      borderRadius: "4px",
                    }}
                  >
                    Create
                  </button>
                )}
              </div>
            </div>
            <img
              onClick={() => setEditTrue(false)}
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

export default AdsManagementPage;
