import React, { useState } from "react";
import cross from "../../assets/Group 81.svg";
import upload from "../../assets/upload.svg";
import img1 from "../../assets/img1.svg";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import axios from "axios";
import Swal from "sweetalert2";

const CreateAdsModal = (props) => {
  const [profilePreview, setProfilePreview] = useState(null);

  const validationSchema = Yup.object({
    profile: Yup.string().required("Required*"),
    adsSpace: Yup.string().required("Required*"),
    startDate: Yup.string().required("Required*"),
    endDate: Yup.string().required("Required*"),
    companyName: Yup.string().required("Required*"),
    link: Yup.string().required("Required*"),
    addBudget: Yup.string().required("Required*"),
  });

  const onSubmit = async (values) => {
    try {
      const formData = new FormData();
      formData.append("ads_space", values.adsSpace);
      formData.append("start_date", values.startDate);
      formData.append("end_date", values.endDate);
      formData.append("company_name", values.companyName);
      formData.append("link", values.link);
      formData.append("ads_budget", values.addBudget);
      formData.append("file", values.profile);

      const response = await axios.post(
        "http://127.0.0.1:8000/ads-management/",
        formData
      );

      console.log("Response from backend:", response);
      if (response.status === 200){
        Swal.fire({
          title: "Success",
          text: "Ads Created!",
          icon: "success",
          backdrop: false,
          customClass: "dark-mode-alert",
        }).then((result) => {
          if (result.isConfirmed){
            window.location.reload();
          }
        })
      }
    } catch (error) {
      console.error("Error sending data:", error);
    }
  };

  // Update Ads
  const updateAds = async () => {
    try{
      const res = await axios.patch("http://127.0.0.1:8000/ads-management/",)
    } catch (error){}
  }

  return (
    <>
      <div
        className="modal fade"
        id="CreateAds"
        data-bs-backdrop="static"
        data-bs-keyboard="false"
        tabindex="-1"
        aria-labelledby="staticBackdropLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered modal-lg">
          <div className="modal-content">
            <div className="modal-body p-3 dark-mode">
              <Formik
                initialValues={{
                  profile: null,
                  adsSpace: "",
                  startDate: "",
                  endDate: "",
                  companyName: "",
                  link: "",
                  addBudget: "",
                }}
                validationSchema={validationSchema}
                onSubmit={onSubmit}
              >
                {({ setFieldValue }) => (
                  <Form>
                    <div className="modal-body p-3 dark-mode">
                      {/* Image Upload */}
                      <div className="mx-2 my-3">
                        {profilePreview !== null && (
                          <img
                            src={profilePreview}
                            alt=""
                            height={100}
                            width={100}
                            style={{ objectFit: "cover" }}
                          />
                        )}
                        <label htmlFor="profile">
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
                            <span className="ps-2 cursor">Upload</span>
                          </span>
                        </label>
                        <input
                          className="d-none"
                          type="file"
                          name=""
                          id="profile"
                          onChange={(e) => {
                            setFieldValue("profile", e.target.files[0]); // Update the "profile" field value
                            setProfilePreview(
                              URL.createObjectURL(e.target.files[0])
                            );
                          }}
                        />
                        <ErrorMessage
                          name="profile"
                          component="div"
                          className="error-message text-danger"
                        />
                      </div>

                      {/* Ads Form Fields */}
                      <div className="row g-0 p-2 gap-3">
                        <div className="col d-flex flex-column">
                          <span>Ads Space</span>
                          <Field
                            type="text"
                            name="adsSpace"
                            className="darkMode-input form-control text-center"
                          />
                          <ErrorMessage
                            name="adsSpace"
                            component="div"
                            className="error-message text-danger px-2"
                          />
                        </div>
                        <div className="col d-flex flex-column">
                          <span>Start Date</span>
                          <Field
                            type="date"
                            name="startDate"
                            className="darkMode-input form-control text-center"
                          />
                          <ErrorMessage
                            name="startDate"
                            component="div"
                            className="error-message text-danger"
                          />
                        </div>
                        <div className="col d-flex flex-column">
                          <span>End Date</span>
                          <Field
                            type="date"
                            name="endDate"
                            className="darkMode-input form-control text-center"
                          />
                          <ErrorMessage
                            name="endDate"
                            component="div"
                            className="error-message text-danger"
                          />
                        </div>
                      </div>

                      <div className="row g-0 p-2 gap-3">
                        <div className="col-4 d-flex flex-column">
                          <span>Company Name</span>
                          <Field
                            type="text"
                            name="companyName"
                            className="darkMode-input form-control text-center"
                          />
                          <ErrorMessage
                            name="companyName"
                            component="div"
                            className="error-message text-danger"
                          />
                        </div>
                        <div className="col d-flex flex-column text-center">
                          <span>Link</span>
                          <Field
                            type="text"
                            name="link"
                            className="darkMode-input form-control text-center"
                          />
                          <ErrorMessage
                            name="link"
                            component="div"
                            className="error-message text-danger"
                          />
                        </div>
                      </div>

                      <div className="col-4 p-2">
                        <div className="col d-flex flex-column text-center">
                          <span>Add Budget</span>
                          <Field
                            type="text"
                            name="addBudget"
                            className="darkMode-input form-control text-center"
                          />
                          <ErrorMessage
                            name="addBudget"
                            component="div"
                            className="error-message text-danger"
                          />
                        </div>
                      </div>

                      <div className="my-3 d-flex justify-content-center gap-3">
                        <button
                          type="submit"
                          className="px-3 py-1"
                          style={{
                            color: "#D2DB08",
                            backgroundColor: "transparent",
                            border: "1px solid #D2DB08",
                            borderRadius: "4px",
                          }}
                        >
                          {props?.editTrue ? "Update" : "Create"}
                        </button>
                      </div>
                    </div>
                  </Form>
                )}
              </Formik>
            </div>
            <img
              onClick={() => props?.setEditTrue(false)}
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

export default CreateAdsModal;
