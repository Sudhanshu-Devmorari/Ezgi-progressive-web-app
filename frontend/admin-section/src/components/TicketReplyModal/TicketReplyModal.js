import React, { useState } from "react";
import { BiSolidCrown } from "react-icons/bi";
import user3 from "../../assets/user1.png";
import cross from "../../assets/Group 81.svg";
import axios from "axios";
import Swal from "sweetalert2";
import { CustomDropdown } from "../CustomDropdown/CustomDropdown";

const TicketReplyModal = (props) => {
  const [selecteReply, setSelecteReply] = useState("reply");

  const tickeview = props?.tickeview;

  const [subUsersOptions, setSubUsersOptions] = useState([]);

  const [selectedSubUser, setSelectedSubUser] = useState({
    id: null,
    name: "Select",
  });
  const [subUserDropDown, setSubUserDropDown] = useState(false);
  console.log("subUsersOptions: ", subUsersOptions);
  console.log("selectedSubUser :", selectedSubUser);

  const handleSetSelectedSubUser = (name, value) => {
    setSelectedSubUser({ id: name, name: value });
  };

  const toggleSubUserDropDown = () => {
    // Get all subusers
    axios
      .post("http://127.0.0.1:8000/retrieve-redirect-user/", {
        department: tickeview?.department,
      })
      .then((res) => {
        // console.log(res.data, "==>>>>res");
        const subUsers = res.data;
        setSubUsersOptions(
          subUsers.map((user) => ({ id: user.id, name: user.name }))
        );
      })
      .catch((err) => {
        console.log(err);
      });
    setSubUserDropDown(!subUserDropDown);
  };

  const [ticketRepltOrRedirect, setTicketRepltOrRedirect] = useState({
    reply: "",
    note: "",
  });
  console.log(ticketRepltOrRedirect);
  const handleChange = (e) => {
    const { name, value } = e.target;
    setTicketRepltOrRedirect((prevDateSelected) => ({
      ...prevDateSelected,
      [name]: value,
    }));
  };

  const handleTicket = async (e) => {
    if (selecteReply === "reply") {
      if (ticketRepltOrRedirect.reply === "") {
        Swal.fire({
          title: "Error",
          text: "Please add a reply",
          icon: "error",
          backdrop: false,
          customClass: "dark-mode-alert",
        });
      } else if (ticketRepltOrRedirect.reply !== "") {
        axios
          .post(`http://127.0.0.1:8000/support-management/${38}/`, {
            message: ticketRepltOrRedirect.reply,
            ticket_id: tickeview?.id,
          })
          .then((res) => {
            console.log(res);
            if (res.status === 200) {
              Swal.fire({
                title: "Success",
                text: "Reply sent successfully",
                icon: "success",
                backdrop: false,
                customClass: "dark-mode-alert",
              });
            }
          })
          .catch((error) => {
            console.log(error);
          });
      }
    } else if (selecteReply === "redirect") {
      if (selectedSubUser.name === "Select") {
        Swal.fire({
          title: "Error",
          text: "Please select a user",
          icon: "error",
          backdrop: false,
          customClass: "dark-mode-alert",
        });
      } else if (ticketRepltOrRedirect.note === "") {
        Swal.fire({
          title: "Error",
          text: "Please add a note",
          icon: "error",
          backdrop: false,
          customClass: "dark-mode-alert",
        });
      } else {
        const selectedId = subUsersOptions.find(
          (subUser) => subUser.name === selectedSubUser.name
        )?.id;
        console.log(selectedId);
        if (selectedId) {
          axios
            .post(
              `http://127.0.0.1:8000/redirect-ticket/${38}/${tickeview?.id}`,
              {
                note: ticketRepltOrRedirect.note,
                id: selectedId, // sub user id
              }
            )
            .then((res) => {
              console.log(res);
              if (res.status === 200) {
                Swal.fire({
                  title: "Success",
                  text: "Ticket Redirected Successfully",
                  icon: "success",
                  backdrop: false,
                  customClass: "dark-mode-alert",
                });
              }
            })
            .catch((error) => {
              console.log(error);
            });
        }
      }
    }
  };

  return (
    <>
      <div
        className="modal fade"
        id="exampleModal"
        tabindex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div
          className="modal-dialog modal-dialog-centered"
          style={{ fontSize: "0.9rem" }}
        >
          <div className="modal-content">
            <div className="modal-body dark-mode p-3">
              <div className="row g-0">
                <div className="col position-relative d-flex gap-2">
                  <img
                    style={{ borderRadius: "50%", objectFit: "cover" }}
                    src={`http://127.0.0.1:8000${tickeview?.user?.profile_pic}`}
                    alt=""
                    height={100}
                    width={100}
                  />
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
                    <span>{tickeview?.user?.name}</span>
                    <span>{tickeview?.user?.username}</span>
                  </div>
                </div>
                <div className="col d-flex justify-content-end flex-column">
                  <span className="mb-1">Date</span>
                  <div className="">
                    <span
                      className="py-1 px-2"
                      style={{ backgroundColor: "#0B2447" }}
                    >
                      {tickeview?.created}
                    </span>
                  </div>
                </div>
              </div>
              <div className="my-2 d-flex flex-column">
                <span>Subject</span>
                <input
                  value={tickeview?.subject}
                  type="text"
                  name=""
                  id=""
                  className="form-control darkMode-input "
                  disabled
                />
              </div>
              <div className="my-2">
                <span>Message</span>
                <div className="">
                  <textarea
                    style={{ height: "100px", fontSize: ".8rem" }}
                    className="darkMode-input form-control my-2 p-2"
                    defaultValue={tickeview?.message}
                  ></textarea>
                </div>
              </div>
              {/* For Redirected msg */}
              {/* <div
                className="my-2 py-2"
                style={{ color: "#58DEAA", fontSize: "0.8rem" }}
              >
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed
                eleifend vehicula tristique. Suspendisse vitae lectus sed massa
                interdum consectetur.
              </div> */}
              {/* End For Redirected msg */}
              {tickeview?.updated_ticket_message && (
                <>
                  <div className="d-flex gap-2">
                    <div className="">Reply</div>
                    <div className="" style={{ color: "#DD7DFF" }}>
                      {tickeview?.user?.name}
                    </div>
                    <div className="ms-auto">{tickeview?.created}</div>
                  </div>
                  <textarea
                    style={{ height: "100px", fontSize: ".8rem" }}
                    className="darkMode-input form-control my-2 p-2"
                    defaultValue={tickeview?.updated_ticket_message}
                  ></textarea>
                </>
              )}
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
                      style={{ height: "100px", fontSize: ".8rem" }}
                      className="darkMode-input form-control"
                      value={ticketRepltOrRedirect.reply}
                      name="reply"
                      onChange={handleChange}
                    ></textarea>
                  )}
                  {selecteReply === "redirect" && (
                    <>
                      <div className="cursor" style={{ width: "99.59px" }}>
                        <CustomDropdown
                          label=" "
                          name={""}
                          value={selectedSubUser.name}
                          options={subUsersOptions.map((user) => user.name)}
                          selectedOption={selectedSubUser?.name}
                          onSelectOption={handleSetSelectedSubUser}
                          isOpen={subUserDropDown}
                          toggleDropdown={toggleSubUserDropDown}
                        />
                        {/* <CustomDropdown
                          label=" "
                          name=" "
                          value={selectedSubUser ? selectedSubUser.name : "Select"}
                          options={subUsersOptions.map((user) => user.name)} // Display only user names in the dropdown
                          selectedOption={selectedSubUser.name}
                          onSelectOption={handleSetSelectedSubUser}
                          isOpen={subUserDropDown}
                          toggleDropdown={toggleSubUserDropDown}
                        /> */}
                      </div>
                      <div className="my-2">
                        <span>Note</span>
                        <input
                        onChange={handleChange}
                        value={ticketRepltOrRedirect?.note}
                          type="text"
                          name="note"
                          id=""
                          className="form-control darkMode-input "
                        />
                      </div>
                    </>
                  )}
                </div>
                <div className="my-3 d-flex justify-content-center">
                  <button
                    data-bs-dismiss="modal"
                    onClick={() => handleTicket(tickeview?.id)}
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

export default TicketReplyModal;
