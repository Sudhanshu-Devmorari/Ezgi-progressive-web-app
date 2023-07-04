import React, {useState} from "react";
import { RxCross2 } from "react-icons/rx";
import Modal from "react-bootstrap/Modal";
import WithdrawalModal from "../WithdrawalModal/WithdrawalModal";

const EditorFilter = (props) => {
    const [categoryDropDown, setCategoryDropDown] = useState(false);
    const [levelDropdown, setLevelDropdown] = useState(false);
    const [WithdrawalModalShow, setWithdrawalModalShow] = useState(false);
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
            className=""
            style={{ fontFamily: "none", color: "#0D2A53", fontWeight: "600" }}
          >
            <div className="m-3 mt-4">
              <div className="d-flex justify-content-center">
                <span>
                  <RxCross2
                    onClick={props.onHide}
                    fontSize={"1.8rem"}
                    style={{
                      position: "absolute",
                      right: "17px",
                      top: "10px",
                      color: "#0D2A53",
                    }}
                  />
                </span>
              </div>
              <div className="row">
              <div className="col">

                {/* Category DROPDOWN */}
                  <span>Category</span>
                  <div
                    className="customDropdown p-2 text-center"
                    onClick={() => setCategoryDropDown(!categoryDropDown)}
                  >
                    <span>Select</span>
                  </div>
                  <div
                    className={`customDropdown-content pt-2 w-100 flex-column d-flex text-center h-50 ${
                      categoryDropDown ? "d-block" : "d-none"
                    } `}
                  >
                    <span className="dpcontent my-1 p-2">India</span>
                    <span className="dpcontent my-1 p-2">Turkey</span>
                    <span className="dpcontent my-1 p-2">Turkey</span>
                    <span className="dpcontent my-1 p-2">Turkey</span>
                    <span className="dpcontent my-1 p-2">Turkey</span>
                    <span className="dpcontent my-1 p-2">Turkey</span>
                    <span className="dpcontent my-1 p-2">Turkey</span>
                    <span className="dpcontent my-1 p-2">Turkey</span>
                    <span className="dpcontent my-1 p-2">Turkey</span>
                  </div>
                {/* End Category DROPDOWN */}
              </div>
              <div className="col">
                {/* Level DROPDOWN */}
                  <span>Level</span>
                  <div
                    className="customDropdown p-2 text-center"
                    onClick={() => setLevelDropdown(!levelDropdown)}
                  >
                    <span>Select</span>
                  </div>
                  <div
                    className={`customDropdown-content pt-2 w-100 flex-column d-flex text-center h-50 ${
                      levelDropdown ? "d-block" : "d-none"
                    } `}
                  >
                    <span className="dpcontent my-1 p-2">India</span>
                    <span className="dpcontent my-1 p-2">Turkey</span>
                    <span className="dpcontent my-1 p-2">Turkey</span>
                    <span className="dpcontent my-1 p-2">Turkey</span>
                  </div>
                {/* End Level DROPDOWN */}
              </div>
              </div>
              <div className="row my-3">
              <div className="col">

                {/* Category DROPDOWN */}
                  <span>Score Point</span>
                  <div
                    className="customDropdown p-2 text-center"
                    onClick={() => setCategoryDropDown(!categoryDropDown)}
                  >
                    <span>Select</span>
                  </div>
                  <div
                    className={`customDropdown-content pt-2 w-100 flex-column d-flex text-center h-50 ${
                      categoryDropDown ? "d-block" : "d-none"
                    } `}
                  >
                    <span className="dpcontent my-1 p-2">India</span>
                    <span className="dpcontent my-1 p-2">Turkey</span>
                    <span className="dpcontent my-1 p-2">Turkey</span>
                    <span className="dpcontent my-1 p-2">Turkey</span>
                    <span className="dpcontent my-1 p-2">Turkey</span>
                    <span className="dpcontent my-1 p-2">Turkey</span>
                    <span className="dpcontent my-1 p-2">Turkey</span>
                    <span className="dpcontent my-1 p-2">Turkey</span>
                    <span className="dpcontent my-1 p-2">Turkey</span>
                  </div>
                {/* End Category DROPDOWN */}
              </div>
              <div className="col">
                {/* Level DROPDOWN */}
                  <span>Success Rate</span>
                  <div
                    className="customDropdown p-2 text-center"
                    onClick={() => setLevelDropdown(!levelDropdown)}
                  >
                    <span>Select</span>
                  </div>
                  <div
                    className={`customDropdown-content pt-2 w-100 flex-column d-flex text-center h-50 ${
                      levelDropdown ? "d-block" : "d-none"
                    } `}
                  >
                    <span className="dpcontent my-1 p-2">India</span>
                    <span className="dpcontent my-1 p-2">Turkey</span>
                    <span className="dpcontent my-1 p-2">Turkey</span>
                    <span className="dpcontent my-1 p-2">Turkey</span>
                  </div>
                {/* End Level DROPDOWN */}
              </div>
              </div>
              <div className="d-flex justify-content-center my-4">
                <button className="continuebtn px-3 py-1" onClick={()=>setWithdrawalModalShow(true)}>Show</button>
            </div>
            </div>
          </div>
        </Modal.Body>
      </Modal>

    <WithdrawalModal show={WithdrawalModalShow} onHide={() => setWithdrawalModalShow(false)}/>
    </>
  );
};

export default EditorFilter;
