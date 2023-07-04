import React,{useState} from "react";
import { RxCross2 } from "react-icons/rx";
import { CiBasketball } from "react-icons/ci";
import { RiFootballLine } from "react-icons/ri";
import Modal from "react-bootstrap/Modal";
import profile from "../../assets/profile.png";
import crown from "../../assets/crown.png";
import "./SubscribeModal.css";
import SubscribeRenewModal from "../SubscribeRenewModal/SubscribeRenewModal";

const SubscribeModal = (props) => {

    const [RenewModalShow, setRenewModalShow] = useState(false);

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
              <div className="row">
                <div className="col gap-1 d-flex justify-content-center flex-column text-center px-0">
                  <div className="" style={{ backgroundColor: "#F6F6F6" }}>
                    Success Rate
                  </div>
                  <div
                    className=""
                    style={{
                      color: "#D2DB08",
                      fontSize: "1.5rem",
                      fontWeight: "600",
                    }}
                  >
                    %67.6
                  </div>
                  <div className="">
                    <span
                      className="px-3 py-1"
                      style={{ backgroundColor: "#F6F6F6" }}
                    >
                      Win
                    </span>
                  </div>
                  <div
                    className=""
                    style={{
                      color: "#37FF80",
                      fontSize: "1.5rem",
                      fontWeight: "600",
                    }}
                  >
                    256
                  </div>
                </div>
                <div className="col gap-1 d-flex justify-content-center flex-column text-center px-0">
                  <div className="">
                    <img src={profile} width={75} height={75} />
                    <img
                      src={crown}
                      width={25}
                      height={25}
                      className="crown-img"
                    />
                  </div>
                  <div className="">
                    <div className="fs-5">johndoe</div>
                    <div className="">Ankara/Turkey</div>
                    <div className="">22.04.2022</div>
                    <div className="">
                      <CiBasketball
                        style={{ color: "#FF9100" }}
                        fontSize={"1.8rem"}
                      />
                      <RiFootballLine
                        style={{ color: "#00C936" }}
                        fontSize={"1.8rem"}
                      />
                    </div>
                  </div>
                </div>
                <div className="col gap-1 d-flex justify-content-center flex-column text-center px-0">
                  <div className="" style={{ backgroundColor: "#F6F6F6" }}>
                    Score Points
                  </div>
                  <div
                    className=""
                    style={{
                      color: "#FF9100",
                      fontSize: "1.5rem",
                      fontWeight: "600",
                    }}
                  >
                    256
                  </div>
                  <div className="">
                    <span
                      className="px-3 py-1"
                      style={{ backgroundColor: "#F6F6F6" }}
                    >
                      Lose
                    </span>
                  </div>
                  <div
                    className=""
                    style={{
                      color: "#FF5757",
                      fontSize: "1.5rem",
                      fontWeight: "600",
                    }}
                  >
                    256
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
                  <div className="fs-5" style={{fontWeight:"600"}}>329.90</div>
                </div>
                <div className="text-center">
                  <div className="my-3">
                    <input type="checkbox" name="" id="" className="me-2" />
                    <span>I have read and agree to the Terms of use</span>
                  </div>
                  <div className="d-flex justify-content-center my-3">
                    <button className="continuebtn px-3 py-1"  onClick={() => setRenewModalShow(true)}>Checkout</button>
                  </div>
                  <div className="text-center">
                    <div className="">
                      Subscription plans do not renew automatically.
                    </div>
                    <div className="">
                      You can cancel the subscription at any time.
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Modal.Body>
      </Modal>

      <SubscribeRenewModal show={RenewModalShow} onHide={() => setRenewModalShow(false)}/>
    </>
  );
};

export default SubscribeModal;
