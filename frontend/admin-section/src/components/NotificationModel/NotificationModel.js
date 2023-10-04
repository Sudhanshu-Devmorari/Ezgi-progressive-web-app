import React, { useEffect, useState } from "react";
import cross from "../../assets/Group 81.svg";
import { CustomDropdown } from "../CustomDropdown/CustomDropdown";
import { useFormik } from "formik";
import axios from "axios";
import Swal from "sweetalert2";
import config from "../../config";
import UserTagList from "../UserTagList/UserTagList";

const NotificationModel = () => {
  const [selectedOption, setSelectedOption] = useState("");
  const [userList, setUserList] = useState([]);

  const handleClearData = () => {
    setUserList([]);
    setSelectedOption("")
    setSelectedUserType("Select")
  };

  // useEffect(() => {
  //   console.log("NotificationModel userList-", userList)
  // }, [userList]);

  const userTypeOptions = ["Standard", "Commentator", "Sub User"];
  const [userTypeDropdown, setUserTypeDropdown] = useState(false);
  const [toDropdown, setToDropdown] = useState(false);
  const [selectedUserType, setSelectedUserType] = useState("Select");
  const handleUserTypeSelection = (e) => {
    // formik.values.userType = e;
    setSelectedUserType(e);
  };
  const toggleUserTypeDropdown = () => {
    setToDropdown(false);
    setUserTypeDropdown(!userTypeDropdown);
  };

  const handleToSelection = (option) => {
    formik.values.to = option;
    toggleToDropdown();
  };

  const toggleToDropdown = () => {
    setUserTypeDropdown(false);
    setToDropdown(!toDropdown);
  };

  // Get ALL Users
  const [usernames, setUsernames] = useState([]);
  function getUsers() {
    try {
      let userType = selectedUserType;
      if (selectedUserType === "Sub User") {
        userType = "sub_user";
      }
      if (selectedUserType !== "Select") {
        axios
          .get(`${config.apiUrl}/all-users/?userType=${userType.toLowerCase()}`)
          .then((res) => {
            // console.log(res.data);
            const data = res?.data?.data;
            if (data.length === 0) {
              setUsernames(["User not found"]);
            } else {
              const extractedUsernames = data.map((user) => user.username);
              setUsernames(extractedUsernames);
            }
          })
          .catch((err) => {
            console.log(err);
          });
      }
    } catch (error) {
      console.log(error);
    }
  }
  useEffect(() => {
    getUsers();
  }, [selectedUserType]);

  const adminUserId = localStorage.getItem("admin-user-id");
  const formik = useFormik({
    initialValues: {
      subject: "",
      user_type: "Select",
      to: "Select",
      sending_type: "",
      date: "",
      message: "",
      data: "",
    },
    onSubmit: async (values,{resetForm}) => {
      try {
        values.data = userList;
        const res = await axios.post(
          `${config?.apiUrl}/notification-management/?sender=${adminUserId}`,
          values
        );
        // console.log(res,"========================MMMM");
        // console.log(res.status);
        if (res.status === 200) {
          Swal.fire({
            title: "Success",
            text: "Notification sent successfully",
            icon: "success",
            backdrop: false,
            customClass: "dark-mode-alert",
          });
          resetForm({
            subject: "",
            user_type: "Select",
            to: "Select",
            sending_type: "",
            date: "",
            message: "",
            data: "",
          });
          handleClearData()
        } else {
          // console.log(res);
        }
      } catch (error) {
        console.error("Error submitting form:", error);
      }
    },
    validate: (values) => {
      const errors = {};
      if (!values.subject) {
        errors.subject = "Required";
      }
      if (!values.user_type) {
        errors.user_type = "Required";
      }
      if (!values.to) {
        errors.to = "Required";
      }
      if (!values.sending_type) {
        errors.sending_type = "Required";
      }
      if (!values.date) {
        errors.date = "Required";
      }
      if (!values.message) {
        errors.message = "Required";
      }
      return errors;
    },
  });
  return (
    <>
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
            <div className="modal-body p-3 dark-mode gap-2">
              <form onSubmit={formik.handleSubmit}>
                <div
                  className="row d-flex my-2 g-0 gap-2"
                  style={{ alignItems: "center" }}
                >
                  <div className="col d-flex flex-column">
                    <span>Subject</span>
                    <input
                      type="text"
                      className="darkMode-input form-control"
                      name="subject"
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      value={formik.values.subject}
                    />
                    {formik.touched.subject && formik.errors.subject ? (
                      <div className="error text-danger">
                        {formik.errors.subject}
                      </div>
                    ) : null}
                  </div>
                  <div className="col cursor">
                    <CustomDropdown
                      label="User Type"
                      options={userTypeOptions}
                      selectedOption={selectedUserType}
                      onSelectOption={handleUserTypeSelection}
                      isOpen={userTypeDropdown}
                      toggleDropdown={toggleUserTypeDropdown}
                    />
                    {formik.touched.user_type && formik.errors.user_type ? (
                      <div className="error text-danger">
                        {formik.errors.user_type}
                      </div>
                    ) : null}
                  </div>
                </div>

                <div>
                  <UserTagList
                    usernames={usernames}
                    setUserList={setUserList}
                    selectedOption={selectedOption}
                    setSelectedOption={setSelectedOption}
                  />
                </div>

                <div className="row my-2 g-0 gap-2">
                  <div className="col d-flex flex-column cursor">
                    {/* <span>To</span>
                    <input
                      type="text"
                      className="darkMode-input form-control"
                      name="to"
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      value={formik.values.to}
                    />
                    {formik.touched.to && formik.errors.to ? (
                      <div className="error text-danger">
                        {formik.errors.to}
                      </div>
                    ) : null} */}
                    {/* <CustomDropdown
                      label="To"
                      options={usernames}
                      selectedOption={formik.values.to}
                      onSelectOption={handleToSelection}
                      isOpen={toDropdown}
                      toggleDropdown={toggleToDropdown}
                    />
                    {formik.touched.to && formik.errors.to ? (
                      <div className="error text-danger">
                        {formik.errors.to}
                      </div>
                    ) : null} */}
                    <span>Date</span>
                    <input
                      type="date"
                      className="darkMode-input form-control"
                      name="date"
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      value={formik.values.date}
                    />
                    {formik.touched.date && formik.errors.date ? (
                      <div className="error text-danger">
                        {formik.errors.date}
                      </div>
                    ) : null}
                  </div>
                  <div className="col d-flex flex-column">
                    <span>Sending Type</span>
                    <input
                      type="text"
                      className="darkMode-input form-control"
                      name="sending_type"
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      value={formik.values.sending_type}
                    />
                    {formik.touched.sending_type &&
                    formik.errors.sending_type ? (
                      <div className="error text-danger">
                        {formik.errors.sending_type}
                      </div>
                    ) : null}
                  </div>
                </div>
                {/* <div className="my-2">
                  <div className="col-6">
                    <span>Date</span>
                    <input
                      type="date"
                      className="darkMode-input form-control"
                      name="date"
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      value={formik.values.date}
                    />
                    {formik.touched.date && formik.errors.date ? (
                      <div className="error text-danger">
                        {formik.errors.date}
                      </div>
                    ) : null}
                  </div>
                </div> */}
                <div className="my-2">
                  <span>Message</span>
                  <textarea
                    style={{ height: "100px" }}
                    className="darkMode-input form-control"
                    name="message"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.message}
                  />
                  {formik.touched.message && formik.errors.message ? (
                    <div className="error text-danger">
                      {formik.errors.message}
                    </div>
                  ) : null}
                </div>
                <div className="my-4 d-flex justify-content-center">
                  <button
                    data-bs-dismiss="modal"
                    type="submit"
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
              </form>
            </div>
            <img
              data-bs-dismiss="modal"
              onClick={() => {
                setUserTypeDropdown(false);
                setToDropdown(false);
                formik.resetForm({
                  subject: "",
                  user_type: "Select",
                  to: "Select",
                  sending_type: "",
                  date: "",
                  message: "",
                  data: "",
                });
                handleClearData()
              }}
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

export default NotificationModel;
