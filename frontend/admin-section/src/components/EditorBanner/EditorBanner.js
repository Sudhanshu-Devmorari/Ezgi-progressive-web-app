import React, { useEffect, useState } from "react";
import cross from "../../assets/Group 81.svg";
import upload from "../../assets/upload.svg";
import Swal from "sweetalert2";
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import config from "../../config";
import { useCookies } from "react-cookie";
import AxiosInstance from "../AxiosInstance";

const EditorBanner = () => {
  const [bannerPreview, setBannerPreview] = useState(null);
  const [cookies, setCookie, removeCookie] = useCookies();

  const [bannerId, setbannerId] = useState(null);

  const formData = new FormData();
  const admin_id = localStorage.getItem("admin-user-id")

  useEffect(() => {
    async function getBannerImg() {
      try {
        const res = await AxiosInstance.get(`${config.apiUrl}/editor-banner/?admin=${admin_id}`);
        if (res.status == 204) {
          localStorage.clear();
          removeCookie("admin-user-id");
          removeCookie("access-token")
          window.location.reload();
        }
        const img = res?.data?.data[0]?.editor_banner;
        const id = res?.data?.data[0]?.id;
        setbannerId(id);
        formik.setValues({
          editorBanner: img,
        });

        setBannerPreview(`${config.apiUrl}${img}`);
      } catch (error) {
        console.log(error);
      }
    }
    getBannerImg();
  }, []);

  const validationSchema = Yup.object().shape({
    editorBanner: Yup.mixed().required("Banner image is required"),
  });

  const formik = useFormik({
    initialValues: {
      editorBanner: null,
    },
    validationSchema,
    onSubmit: async (values) => {
      formData.append("editor_banner", values.editorBanner);
      if (bannerId) {
        formData.append("bannerId", bannerId);
      }
      try {
        const res = await AxiosInstance.patch(
          `${config.apiUrl}/editor-banner/?admin=${admin_id}`,
          formData
        );
        if (res.status == 204) {
          localStorage.clear();
          removeCookie("admin-user-id");
          removeCookie("access-token")
          window.location.reload();
        }
        // console.log(res);
        if (res?.status === 200) {
          Swal.fire({
            title: "Success",
            text: res?.data?.data,
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
        console.log(error);
      }
    },
  });

  const handleBannerChange = (e) => {
    const allowedTypes = ["image/jpeg", "image/png"];
    const file = e.target.files[0];
    if (allowedTypes.includes(file.type)) {
      setBannerPreview(URL.createObjectURL(file));
      formik.setFieldValue("editorBanner", file);
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

  return (
    <>
      <div
        className="modal fade"
        id="EditorBanner"
        data-bs-backdrop="static"
        data-bs-keyboard="false"
        tabindex="-1"
        aria-labelledby="EditorBannerLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <form onSubmit={formik.handleSubmit}>
              <div className="modal-body p-3 dark-mode">
                <span>Add or Update Editor Banner</span>
                <div className="mx-2 my-3">
                  {bannerPreview !== null && (
                    <img
                      src={bannerPreview}
                      alt=""
                      height={100}
                      width={100}
                      style={{ objectFit: "cover" }}
                    />
                  )}
                  <label htmlFor="editorBanner">
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
                    name="editorBanner"
                    id="editorBanner"
                    onChange={handleBannerChange}
                  />
                  {formik.touched.editorBanner &&
                    formik.errors.editorBanner && (
                      <div className="text-danger">
                        {formik.errors.editorBanner}
                      </div>
                    )}
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
                    disabled={formik.isSubmitting}
                  >
                    {formik.isSubmitting ? "Loading..." : "Update"}
                  </button>
                </div>
              </div>
            </form>
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

export default EditorBanner;
