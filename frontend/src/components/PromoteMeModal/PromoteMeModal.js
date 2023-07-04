import React, { useState } from "react";
import Modal from "react-bootstrap/Modal";
import "./PromoteMeModal.css";
import { RxCross2 } from "react-icons/rx";
import { BsStar } from "react-icons/bs";
import CommentsPage from "../CommentsPage/CommentsPage";

const PromoteMeModal = (props) => {

    const [commentsModalShow, setCommentsModalShow] = useState(false);

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
              <div className="">
                <div className="text-center">
                  <div className="my-3" style={{ color: "#FFDD00" }}>
                    <div className="">
                      <BsStar fontSize={"2rem"} />
                    </div>
                    <span>
                      <BsStar fontSize={"1.7rem"} className="me-4" />
                      <BsStar fontSize={"1.7rem"} />
                    </span>
                  </div>
                  <div className="" style={{color:"#00659D"}}>
                    <h1>Highlights</h1>
                    <h2>
                      Stand out among the best increase your interactions!
                    </h2>
                  </div>
                </div>
              </div>
              <div className="my-2">
                <div className="fs-4 my-2">Subscription Plans</div>
                <div className="d-flex mb-2">
                  <div className="BlankCircle me-2"></div>
                  <div
                    className="d-flex justify-content-between w-100 px-2 py-1"
                    style={{ backgroundColor: "#F6F6F6" }}
                  >
                    <span>1 Month</span>
                    <span className="fs-5" style={{ fontWeight: "600" }}>
                      69.90
                    </span>
                  </div>
                </div>
                <div className="d-flex mb-2">
                  <div className="BlankCircle me-2"></div>
                  <div
                    className="d-flex justify-content-between w-100 px-2 py-1"
                    style={{ backgroundColor: "#F6F6F6" }}
                  >
                    <span>1 Month</span>
                    <span className="fs-5" style={{ fontWeight: "600" }}>
                      69.90
                    </span>
                  </div>
                </div>
                <div className="d-flex mb-2">
                  <div className="FilledCircle me-2"></div>
                  <div
                    className="d-flex justify-content-between w-100 px-2 py-1"
                    style={{ backgroundColor: "#F6F6F6" }}
                  >
                    <span>1 Month</span>
                    <span className="fs-5" style={{ fontWeight: "600" }}>
                      <span className="pe-2" style={{ color: "#7BFFAB" }}>
                        %20 Save!
                      </span>
                      69.00
                    </span>
                  </div>
                </div>
              </div>
              <div className="">
                <div className="text-center my-2">
                  <div className="fs-5">Total Amount</div>
                  <div className="fs-5" style={{ fontWeight: "600" }}>
                    329.90
                  </div>
                </div>
                <div className="text-center">
                  <div className="my-3">
                    <input type="checkbox" name="" id="" className="me-2" />
                    <span>I have read and agree to the Terms of use</span>
                  </div>
                  <div className="d-flex justify-content-center my-3">
                    <button className="continuebtn px-3 py-1" onClick={()=>setCommentsModalShow(true)}>Checkout</button>
                  </div>
                  <div className="">
                    <p>
                      With Highlights, your profile and contents will be
                      prominently displayed at the top of the lists for the
                      duration of the plan you purchased.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Modal.Body>
      </Modal>

      <CommentsPage show={commentsModalShow} onHide={() => setCommentsModalShow(false)}/>
    </>
  );
};

export default PromoteMeModal;
