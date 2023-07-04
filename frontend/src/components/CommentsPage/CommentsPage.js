import React, { useState } from "react";
import Modal from "react-bootstrap/Modal";
import "./CommentsPage.css";
import { RxCross2 } from "react-icons/rx";
// import MultiSelect from "react-native-multiple-select";
import Select from "react-select";
import EditorFilter from "../EditorFilter/EditorFilter";
import { CommentFilter } from "../CommentFilter/CommentFilter";

const CommentsPage = (props) => {

  const [MatchDropDown, setMatchDropDown] = useState(false);
  const [LevelDropdown, setLevelDropdown] = useState(false);
  const [PredictionType, setPredictionType] = useState(false);

  const [editorFilterModal, setEditorFlterModal] = useState(false);

  const options = [
    { value: "React", label: "React" },
    { value: "React Native", label: "React Native" },
    { value: "Vue", label: "Vue" },
    { value: "Angular", label: "Angular" },
    { value: "RxJS", label: "RxJS" },
    { value: "jQuery", label: "jQuery" },
  ];

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
            <CommentFilter/>
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
                <span>Level Details</span>
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
                <span>Prediction Type</span>
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
            <div className="my-4">
                <div className="row">
                    <div className="col d-flex align-items-center">
                    <div className="me-2" style={{border:"3px solid #007BF6",borderRadius:" 50%",width: "2rem",height: "2rem"}}></div>
                        <span className="">Only Public</span>
                    </div>
                    <div className="col d-flex align-items-center justify-content-end">
                        <span className="">Only Subscriber</span>
                    <div className="ms-2" style={{border:"3px solid #0D2A53",borderRadius:" 50%",width: "2rem",height: "2rem"}}></div>
                    </div>
                </div>
                <div className="row my-3">
                    <div className="col d-flex align-items-center">
                    <div className="me-2" style={{border:"3px solid #0D2A53",borderRadius:" 50%",width: "2rem",height: "2rem"}}></div>
                        <span className="">Finished</span>
                    </div>
                    <div className="col d-flex align-items-center justify-content-end">
                        <span className="">Not Started</span>
                    <div className="ms-2" style={{border:"3px solid #FFCC00",borderRadius:" 50%",width: "2rem",height: "2rem"}}></div>
                    </div>
                </div>
                <div className="row mb-3">
                    <div className="col d-flex align-items-center">
                    <div className="me-2" style={{border:"3px solid #0D2A53",borderRadius:" 50%",width: "2rem",height: "2rem"}}></div>
                        <span className="">Winning</span>
                    </div>
                    <div className="col d-flex align-items-center justify-content-end">
                        <span className="">Lose</span>
                    <div className="ms-2" style={{border:"3px solid #0D2A53",borderRadius:" 50%",width: "2rem",height: "2rem"}}></div>
                    </div>
                </div>
            </div>
            <div className="d-flex justify-content-center my-4">
                <button className="continuebtn px-3 py-1" onClick={()=>setEditorFlterModal(true)}>Show</button>
            </div>
          </div>
        </Modal.Body>
      </Modal>

      <EditorFilter show={editorFilterModal} onHide={() => setEditorFlterModal(false)}/>
    </>
  );
};

export default CommentsPage;
