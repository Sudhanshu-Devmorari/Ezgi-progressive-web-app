import axios from "axios";
import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";
import config from "../../config";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useCookies } from "react-cookie";

const SalesMembershipSettings = (props) => {
  const [isLoading, setIsLoading] = useState(false);
  const admin_id = localStorage.getItem("admin-user-id")
  const [cookies, setCookie, removeCookie] = useCookies();

  const validationSchema = Yup.object().shape({
    plan_price: Yup.number()
      .required("Plan Price is required")
      .positive("Plan Price must be a positive number"),
    commission_rate: Yup.string()
      .required("Commission Rate is required")
      .matches(/^\d+$/, "Promotion Rate must be a valid number"),
    promotion_rate: Yup.string()
      .required("Promotion Rate is required")
      .matches(/^\d+$/, "Promotion Rate must be a valid number"),
    promotion_duration: Yup.string()
      .required("Promotion Duration is required")
      .matches(/^\d+$/, "Promotion Rate must be a valid number"),
  });
  const initialValues = {
    plan_price: "",
    commission_rate: "",
    promotion_rate: "",
    promotion_duration: "",
  };

  useEffect(() => {
    async function getData() {
      try {
        // setIsLoading(true);
        const res = await axios.get(
          `${
            config?.apiUrl
          }/membership-setting/?commentator_level=${props?.selectLevel?.toLowerCase()}&admin=${admin_id}`
        );
        const data = res.data[0];
        // console.log(data,"===================>>>>data")
        setIsLoading(false);
        if (res.status == 204) {
          localStorage.clear();
          removeCookie("admin-user-id");
          window.location.reload();
        }
        if (res.status === 200) {
          formik.setValues({
            plan_price: data?.plan_price,
            commission_rate: data?.commission_rate,
            promotion_rate: data?.promotion_rate,
            promotion_duration: data?.promotion_duration,
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

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: async (values) => {
      try {
        const data = {
          plan_price: values?.plan_price,
          commission_rate: values?.commission_rate,
          promotion_rate: values?.promotion_rate,
          promotion_duration: values?.promotion_duration,
        };
        // console.log(data,"====================data")
        setIsLoading(true);
        const res = await axios.post(
          `${
            config?.apiUrl
          }/membership-setting/?commentator_level=${props?.selectLevel.toLowerCase()}&admin=${admin_id}`,
          data
        );
        if (res.status == 204) {
          localStorage.clear();
          removeCookie("admin-user-id");
          window.location.reload();
        }
        // console.log(res,"=res")
        if (res.status === 201) {
          setIsLoading(false);
          Swal.fire({
            title: "Success",
            text: "Membership Setting Updated!",
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
                <span className="p-1 ps-0">Plan Price</span>
                <input
                  onChange={formik.handleChange}
                  type="text"
                  className="darkMode-input form-control text-center"
                  value={formik.values.plan_price}
                  name="plan_price"
                />
                {formik.errors.plan_price && (
                  <div className="text-danger">{formik.errors.plan_price}</div>
                )}
              </div>
            </div>
            <div className="col-2">
              <div className="col d-flex flex-column">
                <span className="p-1 ps-0">Commision Rate <small>(%)</small></span>
                <input
                  onChange={formik.handleChange}
                  type="text"
                  className="darkMode-input form-control text-center"
                  value={formik.values.commission_rate}
                  name="commission_rate"
                />
                {formik.errors.commission_rate && (
                  <div className="text-danger">
                    {formik.errors.commission_rate}
                  </div>
                )}
              </div>
            </div>
            <div className="col-2">
              <div className="col d-flex flex-column">
                <span className="p-1 ps-0">Promotion Rate <small>(%)</small></span>
                <input
                  onChange={formik.handleChange}
                  type="text"
                  className="darkMode-input form-control text-center"
                  value={formik.values.promotion_rate}
                  name="promotion_rate"
                />
                {formik.errors.promotion_rate && (
                  <div className="text-danger">
                    {formik.errors.promotion_rate}
                  </div>
                )}
              </div>
            </div>
            <div className="col-2">
              <div className="col d-flex flex-column">
                <span className="p-1 ps-0">
                  Promotion Duration <small>(Months)</small>
                </span>
                <input
                  onChange={formik.handleChange}
                  type="text"
                  className="darkMode-input form-control text-center"
                  value={formik.values.promotion_duration}
                  name="promotion_duration"
                />
                {formik.errors.promotion_duration && (
                  <div className="text-danger">
                    {formik.errors.promotion_duration}
                  </div>
                )}
              </div>
            </div>
          </div>

          <div className="my-3 d-flex justify-content-center">
            <div className="fixed-bottom d-flex justify-content-center save-btn">
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

export default SalesMembershipSettings;
