import React, { useEffect, useState } from "react";
import NavBar from "../NavBar/NavBar";
import SideBar from "../SideBar/SideBar";
import ad1 from "../../assets/ad-1.svg";
import ad3 from "../../assets/ad-3.svg";
import ad4 from "../../assets/ad-4.svg";
import ad5 from "../../assets/ad-5.svg";
import img1 from "../../assets/img1.svg";
import img2 from "../../assets/img2.svg";
import eye from "../../assets/eye (1).svg";
import pointer from "../../assets/pointer.svg";
import chart from "../../assets/chart-bar.svg";
import edit from "../../assets/Group 75.svg";
import { MainDiv } from "../CommonBgRow";
import cross from "../../assets/Group 81.svg";
import upload from "../../assets/upload.svg";
import axios from "axios";
import CreateAdsModal from "../CreateAdsModal/CreateAdsModal";

const AdsManagementPage = () => {
  const [editTrue, setEditTrue] = useState(false);

  const adsArray = [
    {
      page: "Main",
      img: img1,
    },
    {
      page: "editor",
      img: img2,
    },
  ];

  const [banners, setBanners] = useState(0);
  const [active, setActive] = useState(0);
  const [ads, setAds] = useState([]);
  const [adsCount, setAdsCount] = useState(0);
  const [end, setEnd] = useState(0);
  const [pending, setPending] = useState(0);
  const [popUps, setPopUps] = useState(0);

  const AdsArray = [
    { img: ad3, name: "Active", count: active },
    { img: ad4, name: "Pending", count: pending },
    { img: ad5, name: "Ended", count: end },
  ];

  // Get Ads data API
  useEffect(() => {
    async function getAdsData() {
      try {
        const res = await axios.get("http://127.0.0.1:8000/ads-management/");
        console.log(res.data, "==========>>>res sub users");
        const data = res.data;
        setBanners(data.Banners);
        setActive(data.active);
        setAds(data.ads);
        setAdsCount(data.ads_count);
        setEnd(data.end);
        setPending(data.pending);
        setPopUps(data.pop_ups);
      } catch (error) {
        console.log(error);
      }
    }
    getAdsData();
  }, []);

  return (
    <>
      <div className="conatainer-fluid m-2">
        <NavBar />
        <div className="row g-0 mt-2">
          <div className="col-1" style={{ width: "5%" }}>
            <SideBar />
          </div>
          <div className="col-11" style={{ width: "95%" }}>
            <div className="row g-0" style={{ height: "25vh" }}>
              <div className="d-flex flex-column align-items-center justify-content-center col-2 dark-mode mx-2">
                <img src={ad1} alt="" height={45} width={45} />
                <span className="name-fonts" style={{ fontSize: "1.2rem" }}>
                  Advertisements
                </span>
                <span style={{ fontSize: "1.6rem" }}>{adsCount}</span>
              </div>
              <div className="col col p-0 dark-mode">
                <div className="row g-0 h-100">
                  {AdsArray.map((res, index) => (
                    <div className="d-flex flex-column align-items-center justify-content-center col">
                      <img src={res.img} alt="" height={45} width={45} />
                      <span
                        className="name-fonts"
                        style={{ fontSize: "1.2rem" }}
                      >
                        {res.name}
                      </span>
                      <span style={{ fontSize: "1.6rem" }}>{res.count}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div className="col-3 dark-mode mx-2 p-2 px-3">
                <div className="" style={{ fontSize: "1.2rem" }}>
                  Advertisements Spaces
                </div>
                <div className="row g-0 h-100">
                  <div className="col d-flex flex-column align-items-center justify-content-center">
                    <span style={{ fontSize: "1.2rem" }}>Banners</span>
                    <span style={{ fontSize: "1.6rem" }}>{banners}</span>
                  </div>
                  <div className="col d-flex flex-column align-items-center justify-content-center">
                    <span style={{ fontSize: "1.2rem" }}>Pop ups</span>
                    <span style={{ fontSize: "1.6rem" }}>{popUps}</span>
                  </div>
                </div>
              </div>
            </div>
            <div className="dark-mode p-2 m-2 mb-0 home-height">
              <div className="my-2 d-flex justify-content-end">
                <button
                  data-bs-toggle="modal"
                  data-bs-target="#CreateAds"
                  className="px-2"
                  style={{
                    border: "1px solid #D2DB08",
                    color: "#D2DB08",
                    borderRadius: "4px",
                    backgroundColor: "transparent",
                  }}
                >
                  Create Ads
                </button>
                <button
                  className="px-2 mx-2"
                  style={{
                    border: "1px solid #58DEAA",
                    color: "#58DEAA",
                    borderRadius: "4px",
                    backgroundColor: "transparent",
                  }}
                >
                  Export
                </button>
              </div>

              {adsArray.map((res, index) => (
                <MainDiv>
                  <>
                    <div className="col-2 d-flex justify-content-center">
                      <img src={res.img} alt="" height={120} width={120} />
                    </div>

                    <div className="col-4">
                      {res.page === "Main" ? (
                        <>
                          <div className="gap-3 d-flex">
                            <div className="">
                              <button
                                style={{
                                  backgroundColor: "#4DD5FF",
                                  borderRadius: "3px",
                                  color: "#00D2A53",
                                  border: "1px solid #4DD5FF",
                                }}
                              >
                                Flash
                              </button>
                            </div>
                            <div className="">
                              <button
                                style={{
                                  backgroundColor: "#FFEE7D",
                                  borderRadius: "3px",
                                  color: "#00D2A53",
                                  border: "1px solid #FFEE7D",
                                }}
                              >
                                Banners
                              </button>
                            </div>
                            <div className="">
                              <button
                                style={{
                                  backgroundColor: "#FFEE7D",
                                  borderRadius: "3px",
                                  color: "#00D2A53",
                                  border: "1px solid #FFEE7D",
                                }}
                              >
                                Banners
                              </button>
                            </div>
                            <div className="">
                              <button
                                style={{
                                  backgroundColor: "#4DD5FF",
                                  borderRadius: "3px",
                                  color: "#00D2A53",
                                  border: "1px solid #4DD5FF",
                                }}
                              >
                                Flash
                              </button>
                            </div>
                          </div>
                          <div className="gap-2 my-2 d-flex">
                            <div className="">
                              <button
                                style={{
                                  backgroundColor: "transparent",
                                  borderRadius: "3px",
                                  color: "#58DEAA",
                                  border: "1px solid #58DEAA",
                                }}
                              >
                                Main Page Top Left
                              </button>
                            </div>
                            <div className="">
                              <button
                                style={{
                                  backgroundColor: "transparent",
                                  borderRadius: "3px",
                                  color: "#DD7DFF",
                                  border: "1px solid #DD7DFF",
                                }}
                              >
                                Timeline
                              </button>
                            </div>
                            <div className="">
                              <button
                                style={{
                                  backgroundColor: "transparent",
                                  borderRadius: "3px",
                                  color: "#4DD5FF",
                                  border: "1px solid #4DD5FF",
                                }}
                              >
                                Main Page Top Right
                              </button>
                            </div>
                          </div>
                        </>
                      ) : (
                        <>
                          <div className="my-2">
                            <button
                              style={{
                                backgroundColor: "#4DD5FF",
                                borderRadius: "3px",
                                color: "#00D2A53",
                                border: "1px solid #4DD5FF",
                              }}
                            >
                              Flash
                            </button>
                          </div>
                          <div className="">
                            <button
                              style={{
                                backgroundColor: "transparent",
                                borderRadius: "3px",
                                color: "#FFDD00",
                                border: "1px solid #FFDD00",
                              }}
                            >
                              Editor Page
                            </button>
                          </div>
                        </>
                      )}
                    </div>
                    <div className="col-1 d-flex align-items-center">
                      <div className="">nesine.com</div>
                    </div>
                    <div className="col-1 d-flex align-items-center">
                      <img src={eye} alt="" height={24} width={24} />
                      <span className="ps-1">12.645</span>
                    </div>
                    <div className="col-1 d-flex align-items-center">
                      <img src={pointer} alt="" height={24} width={24} />
                      <span className="ps-1">4.645</span>
                    </div>
                    <div className="col-1 d-flex align-items-center">
                      <img src={chart} alt="" height={24} width={24} />
                      <span className="ps-1">%43.8</span>
                    </div>
                    <div className="col-2 d-flex gap-2 justify-content-end pe-2 align-items-center">
                      <div className="d-flex flex-column">
                        <span>08.06.2023 - 18:33</span>
                        <span>23.06.2023 - 00:00</span>
                      </div>
                      <div className="">
                        <img
                          onClick={() => setEditTrue(true)}
                          className="cursor"
                          data-bs-toggle="modal"
                          data-bs-target="#CreateAds"
                          src={edit}
                          alt=""
                          height={25}
                          width={25}
                        />
                      </div>
                    </div>
                  </>
                </MainDiv>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* <!-- Modal --> */}
      <CreateAdsModal setEditTrue={setEditTrue} editTrue={editTrue}/>
    </>
  );
};

export default AdsManagementPage;
