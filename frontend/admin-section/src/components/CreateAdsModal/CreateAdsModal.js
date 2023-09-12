import React, { useEffect, useState } from "react";
import cross from "../../assets/Group 81.svg";
import upload from "../../assets/upload.svg";
import img1 from "../../assets/img1.svg";
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import Swal from "sweetalert2";
import config from "../../config";
import { CustomDropdown } from "../CustomDropdown/CustomDropdown";

const CreateAdsModal = (props) => {
  const [profilePreview, setProfilePreview] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (props?.editTrue && props?.adsEditData) {
      formik.setValues({
        profile: props.adsEditData.picture,
        adsSpace: props.adsEditData.ads_space,
        startDate: props.adsEditData.start_date,
        endDate: props.adsEditData.end_date,
        companyName: props.adsEditData.company_name,
        link: props.adsEditData.link,
        addBudget: props.adsEditData.ads_budget,
      });
      setProfilePreview(`${config.apiUrl}${props.adsEditData.picture}`);
    }
  }, [props?.editTrue, props?.adsEditData]);

  const validationSchema = Yup.object({
    profile: Yup.mixed().required("Ads picture is required"),
    adsSpace: Yup.string().required("Ads Space is required"),
    startDate: Yup.date().required("Start Date is required"),
    endDate: Yup.date().required("End Date is required"),
    companyName: Yup.string().required("Company Name is required"),
    link: Yup.string().url("Invalid URL format").required("Link is required"),
    addBudget: Yup.number()
      .required("Add Budget is required")
      .positive("Budget must be positive"),
  });

  const formik = useFormik({
    initialValues: {
      profile: null,
      adsSpace: "",
      startDate: "",
      endDate: "",
      companyName: "",
      link: "",
      addBudget: "",
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      const formData = new FormData();
      formData.append("ads_space", selectedAdsSpace);
      formData.append("start_date", values.startDate);
      formData.append("end_date", values.endDate);
      formData.append("company_name", values.companyName);
      formData.append("link", values.link);
      formData.append("ads_budget", values.addBudget);
      formData.append("file", values.profile);
      if (props?.editTrue && props?.adsEditData) {
        try {
          setIsLoading(true);
          const response = await axios.patch(
            `${config?.apiUrl}/ads-management/${props?.adsEditData?.id}/`,
            formData
          );
          setIsLoading(false);
          if (response.status === 200) {
            Swal.fire({
              title: "Success",
              text: "Ads Updated successfully!",
              icon: "success",
              backdrop: false,
              customClass: "dark-mode-alert",
            }).then((result) => {
              if (result.isConfirmed) {
                window.location.reload();
              }
            });
          }
        } catch (error) {
          console.log("Error while updating data: ", error);
        }
      } else {
        try {
          setIsLoading(true);
          const response = await axios.post(
            `${config?.apiUrl}/ads-management/`,
            formData
          );
          setIsLoading(false);
          if (response.status === 200) {
            Swal.fire({
              title: "Success",
              text: "Ads Created!",
              icon: "success",
              backdrop: false,
              customClass: "dark-mode-alert",
            }).then((result) => {
              if (result.isConfirmed) {
                window.location.reload();
              }
            });
          }
        } catch (error) {
          console.error("Error sending data:", error);
        }
      }
    },
  });

  const handleProfileChange = (e) => {
    const allowedTypes = ["image/jpeg", "image/png"];
    const file = e.target.files[0];
    if (allowedTypes.includes(file.type)) {
      formik.setFieldValue("profile", file);
      setProfilePreview(URL.createObjectURL(file));
    } else {
      Swal.fire({
        title: "Error",
        text: "Invalid file type. Please select a valid image file.",
        icon: "error",
        backdrop: false,
        customClass: "dark-mode-alert",
      });
      e.target.value = "";
    }
  };

  const adsSpaceOptions = ["Timeline", "Main Page Top Right"];
  const [selectedAdsSpace, setSelectedAdsSpace] =
    useState("Main Page Top Left");

  const handleAdsSpaceSelection = (adsSpace) => {
    setSelectedAdsSpace(adsSpace);
  };

  const toggleAdsSpaceDropdown = () => {
    setAdsSpaceDropDown(!adsSpaceDropDown);
  };

  const [adsSpaceDropDown, setAdsSpaceDropDown] = useState(false);

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
              <form onSubmit={formik.handleSubmit}>
                <div className="modal-body p-3 dark-mode">
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
                        className="py-1 mb-2 px-3 m-1 cursor"
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
                    </label>
                    <input
                      className="d-none"
                      accept=".jpg, .jpeg, .png"
                      type="file"
                      name=""
                      id="profile"
                      onChange={handleProfileChange}
                    />
                    {formik.errors.profile && formik.touched.profile && (
                      <div className="error-message text-danger">
                        {formik.errors.profile}
                      </div>
                    )}
                  </div>

                  <div className="row g-0 p-2 gap-3">
                    <div className="col d-flex flex-column">
                      <CustomDropdown
                        label="Ads Space"
                        options={adsSpaceOptions}
                        selectedOption={selectedAdsSpace}
                        onSelectOption={handleAdsSpaceSelection}
                        isOpen={adsSpaceDropDown}
                        toggleDropdown={toggleAdsSpaceDropdown}
                      />
                    </div>
                    <div className="col d-flex flex-column">
                      <span>Start Date</span>
                      <input
                        type="datetime-local"
                        name="startDate"
                        className="darkMode-input form-control text-center"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.startDate}
                      />
                      {formik.errors.startDate && formik.touched.startDate && (
                        <div className="error-message text-danger">
                          {formik.errors.startDate}
                        </div>
                      )}
                    </div>
                    <div className="col d-flex flex-column">
                      <span>End Date</span>
                      <input
                        type="datetime-local"
                        name="endDate"
                        className="darkMode-input form-control text-center"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.endDate}
                      />
                      {formik.errors.endDate && formik.touched.endDate && (
                        <div className="error-message text-danger">
                          {formik.errors.endDate}
                        </div>
                      )}
                    </div>
                  </div>
                  <div className="row g-0 p-2 gap-3">
                    <div className="col-4 d-flex flex-column">
                      <span>Company Name</span>
                      <input
                        type="text"
                        name="companyName"
                        className="darkMode-input form-control text-center"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.companyName}
                      />
                      {formik.errors.companyName &&
                        formik.touched.companyName && (
                          <div className="error-message text-danger">
                            {formik.errors.companyName}
                          </div>
                        )}
                    </div>
                    <div className="col d-flex flex-column text-center">
                      <span>Link</span>
                      <input
                        type="text"
                        name="link"
                        className="darkMode-input form-control text-center"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.link}
                      />
                      {formik.errors.link && formik.touched.link && (
                        <div className="error-message text-danger">
                          {formik.errors.link}
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="col-4 p-2">
                    <div className="col d-flex flex-column text-center">
                      <span>Add Budget</span>
                      <input
                        type="text"
                        name="addBudget"
                        className="darkMode-input form-control text-center"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.addBudget}
                      />
                      {formik.errors.addBudget && formik.touched.addBudget && (
                        <div className="error-message text-danger">
                          {formik.errors.addBudget}
                        </div>
                      )}
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
                      {isLoading
                        ? "Loading..."
                        : props?.editTrue
                        ? "Update"
                        : "Create"}
                    </button>
                  </div>
                </div>
              </form>
            </div>
            <img
              onClick={() => {
                props?.setEditTrue(false);
                setAdsSpaceDropDown(false);
                setProfilePreview(null);
                formik.resetForm();
              }}
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
