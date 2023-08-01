import React from "react";
import "./NavBar.css";
import profile from "../../assets/profile.png";
import bell from "../../assets/bell-ringing-1.svg";
import cross from "../../assets/Group 81.svg";

const NavBar = () => {
  return (
    <>
      <nav className="navbar navbar-expand-lg p-0">
        <div
          className="container-fluid justify-content-end dark-mode"
          style={{ fontSize: "1rem" }}
        >
          <button
            className="px-3 py-1"
            data-bs-toggle="modal"
            data-bs-target="#staticBackdrop"
            style={{
              color: "#D2DB08",
              border: "1px solid #D2DB08",
              borderRadius: "3px",
              backgroundColor: "transparent",
            }}
          >
            Send Notification
          </button>
          <span className="p-2">
            <img src={bell} alt="" height={33} width={33} />
          </span>
          <span
            className="py-1 px-4"
            style={{
              backgroundColor: "#19376D",
            }}
          >
            Admin Panel
          </span>
          <span className="ps-2">
            <img
              src={profile}
              alt=""
              height={45}
              width={45}
              style={{ borderRadius: "50%" }}
            />
          </span>
        </div>
      </nav>

      {/* <!-- Modal --> */}
      <div
        className="modal fade"
        id="staticBackdrop"
        data-bs-backdrop="static"
        data-bs-keyboard="false"
        tabindex="-1"
        aria-labelledby="staticBackdropLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div class="modal-body p-3 dark-mode gap-2">
              <div className="row my-2 g-0 gap-2">
                <div className="col d-flex flex-column">
                  <span>Subject</span>
                  <input type="text" className="darkMode-input form-control" />
                </div>
                <div className="col d-flex flex-column">
                  <span>User Type</span>
                  <input type="text" className="darkMode-input form-control" />
                </div>
              </div>
              <div className="row my-2 g-0 gap-2">
                <div className="col d-flex flex-column">
                  <span>To</span>
                  <input type="text" className="darkMode-input form-control" />
                </div>
                <div className="col d-flex flex-column">
                  <span>Sending Type</span>
                  <input type="text" className="darkMode-input form-control" />
                </div>
              </div>
              <div className="my-2">
                <div className="col-6">
                  <span>Date</span>
                  <input type="text" className="darkMode-input form-control" />
                </div>
              </div>
              <div className="my-2">
                <span>Message</span>
                <textarea
                  style={{ height: "100px" }}
                  className="darkMode-input form-control"
                ></textarea>
              </div>
              <div className="my-4 d-flex justify-content-center">
                <button
                  className="px-4 py-1"
                  style={{
                    border: "1px solid #D2DB08",
                    color: "#D2DB08",
                    borderRadius: "4px",
                    backgroundColor: "transparent",
                  }}
                >
                  Send
                </button>
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

export default NavBar;
