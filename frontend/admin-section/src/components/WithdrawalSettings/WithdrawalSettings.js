import axios from "axios";
import React, { useEffect, useState } from "react";
import config from "../../config";
import Swal from "sweetalert2";
import { useFormik } from "formik";
import * as Yup from 'yup';

const WithdrawalSettings = (props) => {
  const WithdrawalSettingData = props?.WithdrawalSettingData || {};

  // const handleChange = (e) => {
  //   props?.setWithdrawalSettingData({
  //     ...WithdrawalSettingData,
  //     [e.target.name]: e.target.value,
  //   });
  // };
  // const [amount, setAmount] = useState(props?.minimum_amount || "");
  // const [blockedDays, setBlockedDays] = useState(props?.blocked_Days || "");

  useEffect(() => {
    formik.setValues({
      minAmount:props?.minimum_amount,
      blockdays:props?.blocked_Days
    })
  }, [props?.minimum_amount, props?.blocked_Days]);

  //  Update Withdrawal Setting
  // const UpdateWithdrawalSettings = async () => {
  //   console.log("amount========>>>", amount);
  //   console.log("blockedDays========>>>", blockedDays);
  //   console.log("selectLevel========>>>", props.selectLevel);

  //   if (amount == "" || amount == undefined) {
  //     setValidAmount("Minimum amount is required.");
  //   } else {
  //     setValidAmount(null);
  //   }
  //   if (blockedDays == "" || blockedDays == undefined) {
  //     setValidBlockedDays("Income Blocked Days is required.");
  //   } else {
  //     setValidBlockedDays(null);
  //   }

  //   console.log("validAmount========>>>", validAmount);
  //   console.log("validBlockedDays========>>>", validBlockedDays);

  //   if (validAmount == null && validBlockedDays == null) {
  //     const res = await axios.post(`${config?.apiUrl}/withdrawal-setting/`, {
  //       commentator_level: props.selectLevel.toLowerCase(),
  //       minimum_amount: amount,
  //       income_blocked_days: blockedDays,
  //     });
  //     if (res.status === 200) {
  //       const confirm = await Swal.fire({
  //         title: "Success",
  //         text: "Withdrawal data store sucessfully.",
  //         icon: "success",
  //         backdrop: false,
  //         customClass: "dark-mode-alert",
  //       });
  //       if (confirm.value === true) {
  //         window.location.reload();
  //       }
  //     }
  //   }
  // };

  const SignupSchema = Yup.object().shape({
    minAmount: Yup.number()
      .min(0, "Too Short!")
      .required("Required"),
      blockdays: Yup.number()
      .min(0, "Too Short!")
      .required("Required"),
  });

  const formik = useFormik({
    initialValues: {
      minAmount: "",
      blockdays: "",
    },
validationSchema: SignupSchema,
    onSubmit: async (values) => {
      const res = await axios.post(`${config?.apiUrl}/withdrawal-setting/`, {
        commentator_level: props.selectLevel.toLowerCase(),
        minimum_amount: values.minAmount,
        income_blocked_days: values.blockdays,
      });
      if (res.status === 200) {
        const confirm = await Swal.fire({
          title: "Success",
          text: "Withdrawal data store sucessfully.",
          icon: "success",
          backdrop: false,
          customClass: "dark-mode-alert",
        });
        if (confirm.value === true) {
          window.location.reload();
        }
      }
    },
  });

  return (
    <>
      <form onSubmit={formik.handleSubmit}>
        <div className="my-2 mt-3 d-flex gap-3">
          <div className="col-2">
            <div className="col d-flex flex-column">
              <span className="p-1 ps-0">Minimum Amount</span>
              <input
                name="minAmount"
                value={formik.values.minAmount}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                type="number"
                className="darkMode-input form-control text-center"
              />
              {formik.errors.minAmount && formik.touched.minAmount ? (
                <small className="text-danger">{formik.errors.minAmount}</small>
              ) : null}
            </div>
          </div>
          <div className="col-2">
            <div className="col d-flex flex-column">
              <span className="p-1 ps-0">Income Blocked Days</span>
              <input
                name="blockdays"
                value={formik.values.blockdays}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                type="number"
                className="darkMode-input form-control text-center"
              />
              {formik.errors.blockdays && formik.touched.blockdays ? (
                <small className="text-danger">{formik.errors.blockdays}</small>
              ) : null}
            </div>
          </div>
        </div>
        <div lassName="my-3 d-flex justify-content-center">
          <div class="fixed-bottom  d-flex justify-content-center save-btn">
            <button
              type="submit"
              // onClick={UpdateWithdrawalSettings}
              className="py-1 px-3"
              style={{
                color: "#D2DB08",
                border: "1px solid #D2DB08",
                borderRadius: "3px",
                backgroundColor: "transparent",
              }}
            >
              Save
            </button>
          </div>
        </div>
      </form>
    </>
  );
};

export default WithdrawalSettings;
