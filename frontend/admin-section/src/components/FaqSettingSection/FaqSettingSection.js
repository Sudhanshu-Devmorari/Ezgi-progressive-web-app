import React, { useEffect, useState } from "react";
import { MdDelete, MdDragIndicator } from "react-icons/md";
import { BiPlus } from "react-icons/bi";
import { Container, Draggable } from "react-smooth-dnd";

import { useFormik } from "formik";
import * as Yup from "yup";
import config from "../../config";
import axios from "axios";
import Swal from "sweetalert2";

const Item = ({ id, color: backgroundColor, removeInputFields, formik }) => {
  return (
    <div className="item">
      <div className="d-flex align-items-center">
        <div className="column-drag-handle me-3">
          <MdDragIndicator
            color="#fff"
            size={30}
            style={{ marginTop: "2.2rem" }}
          />
        </div>

        <div className="my-2 mt-3 d-flex gap-3 w-100">
          <div className=" d-flex flex-column w-100">
            <span className="p-1 ps-0">Questiont</span>
            <input
              //   onChange={formik.handleChange}
              name={`${id}.question`}
              type="text"
              className="darkMode-input form-control"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values[id].question}
            />
            {formik?.errors[id]?.question && formik?.touched[id]?.question && (
              <div className="error-message text-danger">
                {formik?.errors[id]?.question}
              </div>
            )}
          </div>
          <div className="d-flex flex-column w-100">
            <span className="p-1 ps-0">Answer</span>
            <input
              name={`${id}.answer`}
              type="text"
              className="darkMode-input form-control"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values[id].answer}
            />
            {formik?.errors[id]?.answer && formik?.touched[id]?.answer && (
              <div className="error-message text-danger">
                {formik?.errors[id]?.answer}
              </div>
            )}
          </div>
        </div>
        <div
          className="delete-icon ms-3"
          onClick={() => removeInputFields(id, formik.values[id].id)}
        >
          <MdDelete color="#fff" size={30} style={{ marginTop: "2.2rem" }} />
        </div>
      </div>
    </div>
  );
};

const DraggableItem = ({ index, item, removeInputFields, formik }) => {
  return (
    <Draggable>
      <div className="draggable-item">
        <Item
          id={index}
          item={item}
          removeInputFields={removeInputFields}
          formik={formik}
        />
      </div>
    </Draggable>
  );
};

const FaqSettingSection = () => {
  const [isLoading, setIsLoading] = useState(true);

  const validationSchema = Yup.object().shape({
    question: Yup.mixed().required("Question is required"),
    answer: Yup.string().required("Answer is required"),
  });

  const ArrayOfCarsSchema = Yup.array().of(validationSchema);

  const formik = useFormik({
    initialValues: [
      {
        question: "",
        answer: "",
      },
    ],
    validationSchema: ArrayOfCarsSchema,
    onSubmit: async (values) => {
        console.log(values)
      try {
        const response = await axios.post(
          `${config.apiUrl}/become-editor-faq/`,
          {
            faq_data: values,
          }
        );
        if (response.status == 200) {
          Swal.fire({
            title: "Success",
            text: "FAQs Update successfully!",
            icon: "success",
            backdrop: false,
            customClass: "dark-mode-alert",
          });
          console.log(response.data)
          formik.setValues(response.data.data)
        }
      } catch (error) {
        Swal.fire({
          title: "Error",
          text: `${error?.response?.data?.error}`,
          icon: "error",
          backdrop: false,
          customClass: "dark-mode-alert",
        });
      }
    },
  });

  // Create new Input box on Add new button click
  const addInputField = () => {
    formik.setValues([
      ...formik.values,
      {
        question: "",
        answer: "",
      },
    ]);
  };

  // Remove Input box on Delete Icon click
  const removeInputFields = async (index, deleteId) => {
    try {
      const response = await axios.delete(
        `${config.apiUrl}/become-editor-faq/${deleteId}`
      );
      if (response.status == 200) {
        Swal.fire({
          title: "Success",
          text: "FAQ Delete successfully!",
          icon: "success",
          backdrop: false,
          customClass: "dark-mode-alert",
        });
      }
      const rows = [...formik.values];
      rows.splice(index, 1);
      formik.setValues(rows);
    } catch (error) {
      console.log(error);
    }
  };

  const applyDrag = (arr, dragResult) => {
    const { removedIndex, addedIndex, payload } = dragResult;
    if (removedIndex === null && addedIndex === null) return arr;

    const result = [...arr];
    let itemToAdd = payload;

    if (removedIndex !== null) {
      itemToAdd = result.splice(removedIndex, 1)[0];
    }

    if (addedIndex !== null) {
      result.splice(addedIndex, 0, itemToAdd);
    }

    return result;
  };

  //   become-editor-faq
  // ${config.apiUrl}/become-editor-faq/

  useEffect(() => {
    const fetchFaqs = async () => {
      try {
        const response = await axios.get(`${config.apiUrl}/become-editor-faq/`);
        formik.setValues(response.data);
        setIsLoading(false);
      } catch (error) {
        console.log(error);
      }
    };
    fetchFaqs();
  }, []);

  return (
    <>
      <div className="my-3 d-flex justify-content-end">
        <div className="d-flex justify-content-center">
          <button
            type="submit"
            className="py-1 px-3 d-flex align-items-center gap-2"
            style={{
              color: "#D2DB08",
              border: "1px solid #D2DB08",
              borderRadius: "3px",
              backgroundColor: "transparent",
            }}
            onClick={() => addInputField()}
          >
            Add Q/A
            <BiPlus />
          </button>
        </div>
      </div>

      {isLoading ? (
        <div className="d-flex gap-1 my-2 pb-2 h-75 align-items-center justify-content-center">
          Loading...
        </div>
      ) : formik.values.length == 0 ? (
        <div className="d-flex gap-1 my-2 pb-2 h-75 align-items-center justify-content-center">
          No Record Found!
        </div>
      ) : (
        <div className="m-3">
          <form className="w-100 h-75" onSubmit={formik.handleSubmit}>
            <Container
              dragHandleSelector=".column-drag-handle"
              onDrop={(e) => {
                formik.setValues(applyDrag(formik.values, e));
              }}
              style={{
                maxHeight: "480px",
                overflow: "auto",
              }}
            >
              {formik.values.map((item, i) => {
                return (
                  <DraggableItem
                    key={item.id}
                    index={i}
                    item={item}
                    removeInputFields={removeInputFields}
                    formik={formik}
                  />
                );
              })}
            </Container>
            <div className="my-3 d-flex justify-content-center">
              <div className="d-flex justify-content-center save-btn">
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
                  {formik.isSubmitting ? "Loading.." : "Save"}
                </button>
              </div>
            </div>
          </form>
        </div>
      )}
    </>
  );
};

export default FaqSettingSection;

// setNestedObjectValues((prestate) => {
//   return [...prestate, {aksdjfkl}]
// })