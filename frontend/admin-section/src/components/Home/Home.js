import React, { useState } from "react";
import userEdit from "../../assets/user-edit.svg";
import trash from "../../assets/trash.svg";
import "./Home.css";
import { GoSearch } from "react-icons/go";
import CreateUserModal from "../CreateUserModal/CreateUserModal";

const Home = (props) => {
  const [modalShow, setModalShow] = useState(false);

  const currentUrl = window.location.href;
  const urlObject = new URL(currentUrl);

  // Extract the "users" part from the URL
  const usersPart = urlObject.pathname.split('/').filter(part => part !== '')[0];

  return (
    <>
      <div className="dark-mode p-2 m-2 mb-0 home-height" style={{height:"65vh"}}>
        {usersPart === "users" && (
          <div className="d-flex p-2" style={{ fontSize: "1.2rem" }}>
            <div className="p-2 flex-grow-1">
              <div class="input-group w-50">
                <span
                  class="input-group-text search-icon-dark"
                  id="basic-addon1"
                >
                  <GoSearch style={{ color: "#FFFFFF" }} />
                </span>
                <input type="text" className="input-field-dark" />
              </div>
            </div>
            <div className="p-2">
              <button
                className="px-2"
                style={{
                  backgroundColor: "transparent",
                  borderRadius: "3px",
                  border: "1px solid #E6E6E6",
                  color: "#E6E6E6",
                }}
              >
                Filter
              </button>
            </div>
            <div className="p-2">
              <button
                onClick={() => setModalShow(true)}
                className="px-2"
                style={{
                  backgroundColor: "transparent",
                  borderRadius: "3px",
                  border: "1px solid #0CC6FF",
                  color: "#0CC6FF",
                }}
              >
                Add User
              </button>
            </div>
          </div>
        )}
        {props?.users?.map((res, index) => (
          <div
            className="d-flex justify-content-between px-2 py-1 mb-2 users-section-fonts"
            style={{ backgroundColor: "#0B2447", fontSize: "1rem" }}
          >
            <div className="">
              <div className="">
                <span className="pe-1">{res.sr}</span>
                <img src={res.profile} alt="" height={37} width={37} />
                <span className="ps-1">{res.name}</span>
              </div>
            </div>
            <div className="d-flex gap-2 align-items-center">
              <div>{res.username}</div>
              <div className="">
                <img src={res.gender} alt="" height={23} width={23} />
                <span>{res.age}</span>
              </div>
              <div className="">{res.country}</div>
            </div>
            {usersPart === "users" && (
              <div
                className="d-flex align-items-center block-width"
                style={{ minWidth: "7.5rem" }}
              >
                {res.role ? (
                  <button
                  className="btn-user"
                    style={{
                      textAlign: "center",
                      paddingTop: "0.1rem",
                      width: "7.5rem",
                      color:
                        (res.role === "Journeyman" && "#4DD5FF") ||
                        (res.role === "Expert" && "#FF9100") ||
                        (res.role === "Apprentice" && "#FFEE7D"),
                      border:
                        (res.role === "Journeyman" && "1px solid #4DD5FF") ||
                        (res.role === "Expert" && "1px solid #FF9100") ||
                        (res.role === "Apprentice" && "1px solid #FFEE7D"),
                      borderRadius: "2px",
                      backgroundColor: "transparent",
                    }}
                  >
                    {res.role}
                  </button>
                ) : (
                  <span></span>
                )}
              </div>
            )}
            <div className="d-flex align-items-center gap-2 edit-icon-gap">
              <span>{res.date}</span>
              <img src={userEdit} alt="" height={28} width={28} />
              <img src={trash} alt="" height={28} width={28} />
            </div>
          </div>
        ))}
      </div>
      {modalShow && 
      <CreateUserModal
        show={modalShow}
        onHide={() => setModalShow(false)}
      />
      } 
    </>
  );
};

export default Home;
