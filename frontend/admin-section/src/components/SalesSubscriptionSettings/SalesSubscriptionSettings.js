import axios from "axios";
import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";
import config from "../../config";
import { useFormik } from "formik";
import * as Yup from "yup";

const SalesSubscriptionSettings = (props) => {
  const [isLoading, setIsLoading] = useState(false);

  const validationSchema = Yup.object({
    duration: Yup.string()
      .required("Duration is required"),
    month_1: Yup.number()
      .required("1 Month is required")
      .positive("1 Month must be positive"),
    month_3: Yup.number()
      .required("3 Months is required")
      .positive("3 Months must be positive"),
    month_6: Yup.number()
      .required("6 Months is required")
      .positive("6 Months must be positive"),
    year_1: Yup.number()
      .required("1 Year is required")
      .positive("1 Year must be positive"),
  });

  const initialValues = {
    duration: "",
    month_1: "",
    month_3: "",
    month_6: "",
    year_1: "",
  };

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: async (values) => {
      const data = {
        duration: values.duration,
        month_1: values.month_1,
        month_3: values.month_3,
        month_6: values.month_6,
        year_1: values.year_1,
      };
      try {
        setIsLoading(true);
        const res = await axios.post(
          `${
            config?.apiUrl
          }/subscription-setting/?commentator_level=${props?.selectLevel?.toLowerCase()}`,
          data
        );
        setIsLoading(false);
        if (res.status === 201) {
          Swal.fire({
            title: "Success",
            text: "Subscription Setting Updated!",
            icon: "success",
            backdrop: false,
            customClass: "dark-mode-alert",
          });
        }
      } catch (error) {
        console.log(error);
      }
    },
  });

  useEffect(() => {
    async function getData() {
      try {
        const res = await axios.get(
          `${
            config?.apiUrl
          }/subscription-setting/?commentator_level=${props?.selectLevel?.toLowerCase()}`
        );
        if (res.status === 200) {
          const data = res?.data[0];
          formik.setValues({
            duration: data.duration,
            month_1: data.month_1,
            month_3: data.month_3,
            month_6: data.month_6,
            year_1: data.year_1,
          });
        }
      } catch (error) {
        console.log(error);
        if (error.response.status === 404) {
          formik.resetForm();
        }
      }
    }
    getData();
  }, [props?.selectLevel]);

  return (
    <>
      {isLoading ? (
        <div className="d-flex gap-1 h-100 my-2 pb-2 align-items-center justify-content-center">
          Loading...
        </div>
      ) : (
        <form onSubmit={formik.handleSubmit}>
          <div className="my-2 mt-3 d-flex gap-3">
            <div className="col-2">
              <div className="col d-flex flex-column">
                <span className="p-1 ps-0">Duration</span>
                <input
                  type="text"
                  className="darkMode-input form-control text-center"
                  name="duration"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.duration}
                />
                {formik.errors.duration && formik.touched.duration && (
                  <div className="error-message text-danger">
                    {formik.errors.duration}
                  </div>
                )}
              </div>
            </div>
            <div className="col-2">
              <div className="col d-flex flex-column">
                <span className="p-1 ps-0">1 Month</span>
                <input
                  type="text"
                  className="darkMode-input form-control text-center"
                  name="month_1"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.month_1}
                />
                {formik.errors.month_1 && formik.touched.month_1 && (
                  <div className="error-message text-danger">
                    {formik.errors.month_1}
                  </div>
                )}
              </div>
            </div>
            <div className="col-2">
              <div className="col d-flex flex-column">
                <span className="p-1 ps-0">3 Months</span>
                <input
                  type="text"
                  className="darkMode-input form-control text-center"
                  name="month_3"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.month_3}
                />
                {formik.errors.month_3 && formik.touched.month_3 && (
                  <div className="error-message text-danger">
                    {formik.errors.month_3}
                  </div>
                )}
              </div>
            </div>
          </div>
          <div className="my-2 mt-3 d-flex gap-3">
            <div className="col-2">
              <div className="col d-flex flex-column">
                <span className="p-1 ps-0">6 Months</span>
                <input
                  type="text"
                  className="darkMode-input form-control text-center"
                  name="month_6"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.month_6}
                />
                {formik.errors.month_6 && formik.touched.month_6 && (
                  <div className="error-message text-danger">
                    {formik.errors.month_6}
                  </div>
                )}
              </div>
            </div>
            <div className="col-2">
              <div className="col d-flex flex-column">
                <span className="p-1 ps-0">1 Year</span>
                <input
                  type="text"
                  className="darkMode-input form-control text-center"
                  name="year_1"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.year_1}
                />
                {formik.errors.year_1 && formik.touched.year_1 && (
                  <div className="error-message text-danger">
                    {formik.errors.year_1}
                  </div>
                )}
              </div>
            </div>
          </div>
          <div className="my-3 d-flex justify-content-center">
            <div
              className="fixed-bottom  d-flex justify-content-center"
              style={{ marginBottom: "200px" }}
            >
              <button
                type="submit"
                className="py-1 px-3"
                style={{
                  color: "#D2DB08",
                  border: "1px solid #D2DB08",
                  borderRadius: "3px",
                  backgroundColor: "transparent",
                }}
              >
                {isLoading ? "Loading..." : "Save"}
              </button>
            </div>
          </div>
        </form>
      )}
    </>
  );
};

export default SalesSubscriptionSettings;
