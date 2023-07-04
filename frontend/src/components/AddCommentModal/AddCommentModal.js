import React, { useState } from "react";
import { CommentFilter } from "../CommentFilter/CommentFilter";
import Modal from "react-bootstrap/Modal";
import { RxCross2 } from "react-icons/rx";
import "./AddCommentModal.css";
import Form from "react-bootstrap/Form";

const AddCommentModal = (props) => {
  const [MatchDropDown, setMatchDropDown] = useState(false);
  const [LevelDropdown, setLevelDropdown] = useState(false);
  const [PredictionType, setPredictionType] = useState(false);
  return (
    <>
      <Modal
        {...props}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
        scrollable
      >
        <Modal.Body closeButton>
          <div
            className="m-3"
            style={{ fontFamily: "none", color: "#0D2A53", fontWeight: "500" }}
          >
            <div className="">
              <span className="mb-2">
                <RxCross2
                  fontSize={"1.8rem"}
                  style={{
                    position: "absolute",
                    right: "9px",
                    top: "4px",
                    color: "#0D2A53",
                  }}
                />
              </span>
            </div>
            <CommentFilter />
            <div className="my-3">
              <div className="">
                <span>Match Details</span>
                <div
                  className="customDropdown p-2 text-center"
                  onClick={() => setMatchDropDown(!MatchDropDown)}
                >
                  <span>Select</span>
                </div>
                <div
                  className={`customDropdown-content pt-2 w-100 flex-column d-flex text-center h-50 ${
                    MatchDropDown ? "d-block" : "d-none"
                  } `}
                >
                  <span className="dpcontent my-1 p-2">India</span>
                  <span className="dpcontent my-1 p-2">Turkey</span>
                  <span className="dpcontent my-1 p-2">Turkey</span>
                  <span className="dpcontent my-1 p-2">Turkey</span>
                </div>
              </div>
            </div>
            <div className="row my-3">
              <div className="col">
                <span>Predicticon Type</span>
                <div
                  className="customDropdown p-2 text-center"
                  onClick={() => setLevelDropdown(!LevelDropdown)}
                >
                  <span>Select</span>
                </div>
                <div
                  className={`customDropdown-content pt-2 w-100 flex-column d-flex text-center h-50 ${
                    LevelDropdown ? "d-block" : "d-none"
                  } `}
                >
                  <span className="dpcontent my-1 p-2">India</span>
                  <span className="dpcontent my-1 p-2">Turkey</span>
                  <span className="dpcontent my-1 p-2">Turkey</span>
                  <span className="dpcontent my-1 p-2">Turkey</span>
                </div>
              </div>
              <div className="col">
                <span>Prediction</span>
                <div
                  className="customDropdown p-2 text-center"
                  onClick={() => setPredictionType(!PredictionType)}
                >
                  <span>Select</span>
                </div>
                <div
                  className={`customDropdown-content pt-2 w-100 flex-column d-flex text-center h-50 ${
                    PredictionType ? "d-block" : "d-none"
                  } `}
                >
                  <span className="dpcontent my-1 p-2">India</span>
                  <span className="dpcontent my-1 p-2">Turkey</span>
                  <span className="dpcontent my-1 p-2">Turkey</span>
                  <span className="dpcontent my-1 p-2">Turkey</span>
                </div>
              </div>
            </div>
            <div className="">
              {/* <Form.Check
                type="switch"
                id="custom-switch"
                label="Public Content"
              /> */}
              <div class="form-check form-switch">
                <input
                  class="form-check-input"
                  type="checkbox"
                  role="switch"
                  id="flexSwitchCheckDefault"
                />
                <label class="form-check-label" for="flexSwitchCheckDefault">
                  Public Content
                </label>
              </div>
            </div>
            <div className="">
                <div style={{fontWeight:"600"}}>
                    Comment 
                <small style={{color:"#FF5757"}}> ( If illegal content is detected, the membership will be terminated. )</small>
                </div>
              <Form.Control
                as="textarea"
                maxLength={250}
                className="textArea"
              />
              <small>Max. 250 character</small>
            </div>
            <div className="text-center">
            <div className="my-3">
                  <input type="checkbox" name="" id="" className="me-2" />I have
                  read and agree to the{" "}
                  <span style={{ color: "#00659D" }}>Terms of use</span>
                </div>
            <div className="d-flex justify-content-center my-3">
              <button className="continuebtn px-3 py-1">Publish</button>
            </div>
              <div className="my-3">
                "The published predictions can be edited withis 5 minutes."
              </div>
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default AddCommentModal;
