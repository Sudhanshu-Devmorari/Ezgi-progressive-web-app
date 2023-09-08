import React, { useState } from "react";
import cross from "../../assets/Group 81.svg";
import { CustomDropdown } from "../CustomDropdown/CustomDropdown";
import { useFormik } from "formik";
import axios from "axios";
import Swal from "sweetalert2";
import config from "../../config";

const NotificationModel = () => {
  const userTypeOptions = ["Standard", "Commentator", "Sub User"];
  const [userTypeDropdown, setUserTypeDropdown] = useState(false);
  const handleUserTypeSelection = (e) => {
    formik.values.userType = e;
  };
  const toggleUserTypeDropdown = () => {
    setUserTypeDropdown(!userTypeDropdown);
  };

  const formik = useFormik({
    initialValues: {
      subject: "",
      user_type: "Select",
      to: "",
      sending_type: "",
      date: "",
      message: "",
    },
    onSubmit: async (values) => {
      try {
        // console.log(values);
        const res = await axios.post(
          `${config?.apiUrl}/notification-management/`,
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
                <div className="row my-2 g-0 gap-2">
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
                      selectedOption={formik.values.user_type}
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
                <div className="row my-2 g-0 gap-2">
                  <div className="col d-flex flex-column">
                    <span>To</span>
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
                <div className="my-2">
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
                </div>
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
                    // data-bs-dismiss="modal"
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
