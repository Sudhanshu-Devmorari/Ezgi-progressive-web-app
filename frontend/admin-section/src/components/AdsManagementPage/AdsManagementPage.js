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
import config from "../../config";
import Export from "../Export/Export";
import EditorBanner from "../EditorBanner/EditorBanner";

const AdsManagementPage = () => {
  const [editTrue, setEditTrue] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

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
    { img: ad3, name: "Active", count: isLoading ? "Loading..." : active },
    { img: ad4, name: "Pending", count: isLoading ? "Loading..." : pending },
    { img: ad5, name: "Ended", count: isLoading ? "Loading..." : end },
  ];

  const [adsEditData, setAdsEditData] = useState([]);
  // Get Ads data API
  useEffect(() => {
    async function getAdsData() {
      try {
        setIsLoading(true);
        const res = await axios.get(`${config?.apiUrl}/ads-management/`);
        // console.log(res.data, "==========>>>res sub users");
        const data = res.data;
        setBanners(data.Banners);
        setActive(data.active);
        setAds(data.ads);
        setAdsCount(data.ads_count);
        setEnd(data.end);
        setPending(data.pending);
        setPopUps(data.pop_ups);
        setIsLoading(false);
      } catch (error) {
        console.log(error);
      }
    }
    getAdsData();
  }, []);

  function DateTimeConverter({ datetime }) {
    if (!datetime) return null;

    const date = new Date(datetime);

    const day = date.getDate().toString().padStart(2, "0");
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const year = date.getFullYear().toString();

    const hours = date.getHours().toString().padStart(2, "0");
    const minutes = date.getMinutes().toString().padStart(2, "0");

    const formattedDateTime = `${day}.${month}.${year} - ${hours}:${minutes}`;

    return <span dangerouslySetInnerHTML={{ __html: formattedDateTime }} />;
  }

  function AdsPercentage({ ads, adClicksCount }) {
    if (!ads || ads.length === 0) return null;

    // Calculate the total number of ads
    const totalAds = ads.length;

    // Calculate the percentage
    const percentage = (adClicksCount / totalAds) * 100;

    return <span className="ps-1">{percentage.toFixed(1)}%</span>;
  }

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
                <img src={ad1} alt="" className="icon" />
                <span className="heading">Advertisements</span>
                <span className="number">
                  {isLoading ? "Loading..." : adsCount}
                </span>
              </div>
              <div className="col col p-0 dark-mode">
                <div className="row g-0 h-100">
                  {AdsArray.map((res, index) => (
                    <div className="d-flex flex-column align-items-center justify-content-center col">
                      <img src={res.img} alt="" className="icon" />
                      <span className="heading">{res.name}</span>
                      <span className="number">{res.count}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div className="col-3 dark-mode mx-2 p-2 px-3">
                <div className="" style={{ fontSize: "1.2rem" }}>
                  Advertisements Spaces
                </div>
                <div className="row g-0 pt-3">
                  <div className="col d-flex flex-column align-items-center justify-content-center">
                    <span className="heading">Banners</span>
                    <span className="number">
                      {isLoading ? "Loading..." : banners}
                    </span>
                  </div>
                  <div className="col d-flex flex-column align-items-center justify-content-center">
                    <span className="heading">Pop ups</span>
                    <span style={{ fontSize: "1.6rem" }}>
                      {isLoading ? "Loading..." : popUps}
                    </span>
                  </div>
                </div>
              </div>
            </div>
            <div className="dark-mode p-2 m-2 mb-0 home-height">
              <div className="my-2 d-flex justify-content-end">
                <button
                  data-bs-toggle="modal"
                  data-bs-target="#EditorBanner"
                  className="px-2 me-2"
                  style={{
                    border: "1px solid #D2DB08",
                    color: "#D2DB08",
                    borderRadius: "4px",
                    backgroundColor: "transparent",
                  }}
                >
                  Editor banner
                </button>
                <button
                  onClick={() => setEditTrue(false)}
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
                  data-bs-toggle="modal"
                  data-bs-target="#exportModal"
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

              {isLoading ? (
                <div className="d-flex gap-1 my-2 pb-2 h-75 align-items-center justify-content-center">
                  Loading...
                </div>
              ) : (
                <>
                  {ads?.length == 0 ? (
                    <div className="d-flex gap-1 my-2 pb-2 h-75 align-items-center justify-content-center">
                      No Record Found!
                    </div>
                  ) : (
                    <>
                      {ads &&
                        ads.map((res, index) => (
                          <MainDiv>
                            <>
                              <div className="col-2 d-flex justify-content-center">
                                <img
                                  src={`${config.apiUrl}${res?.picture}`}
                                  alt="Ads.."
                                  height={100}
                                  width={100}
                                  style={{ objectFit: "cover" }}
                                />
                              </div>

                              <div className="col-3">
                                <div className="gap-3 d-flex">
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
                                  {res?.ads_space === "Main Page Top Left" && (
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
                                  )}
                                  {res?.ads_space === "Main Page Top Right" && (
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
                                  )}
                                  {res?.ads_space === "Timeline" && (
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
                                  )}
                                </div>
                                {/* {res.page === "Main" ? (
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
                          )} */}
                              </div>
                              <div
                                className="col-2 d-flex align-items-center"
                                style={{ overflowWrap: "anywhere" }}
                              >
                                {/* <div className=""> */}{" "}
                                {/* {res &&
                                    res.link &&
                                    new URL(res?.link).hostname} */}
                                {res?.link}
                                {/* </div> */}
                              </div>
                              <div className="col-1 d-flex align-items-center">
                                <img src={eye} alt="" height={24} width={24} />
                                <span className="ps-1">
                                  {res?.ad_views_count}
                                </span>
                              </div>
                              <div className="col-1 d-flex align-items-center">
                                <img
                                  src={pointer}
                                  alt=""
                                  height={24}
                                  width={24}
                                />
                                <span className="ps-1">
                                  {res?.ad_clicks_and_redirected_count}
                                </span>
                              </div>
                              <div className="col-1 d-flex align-items-center">
                                <img
                                  src={chart}
                                  alt=""
                                  height={24}
                                  width={24}
                                />
                                {/* <span className="ps-1">%43.8</span> */}
                                <AdsPercentage
                                  ads={ads}
                                  adClicksCount={
                                    res?.ad_clicks_and_redirected_count
                                  }
                                />
                              </div>
                              <div className="col-2 d-flex gap-2 justify-content-end pe-2 align-items-center">
                                <div className="d-flex flex-column">
                                  {/* <span>08.06.2023 - 18:33</span> */}
                                  <DateTimeConverter datetime={res?.end_date} />
                                  <DateTimeConverter
                                    datetime={res?.start_date}
                                  />
                                </div>
                                <div className="">
                                  <img
                                    onClick={() => {
                                      setEditTrue(true);
                                      setAdsEditData(res);
                                    }}
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
                    </>
                  )}
                </>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* <!-- Modal --> */}
      <CreateAdsModal
        setEditTrue={setEditTrue}
        editTrue={editTrue}
        adsEditData={adsEditData}
      />
      <Export exportList={ads} exportData={"Ads"} />

      <EditorBanner />
    </>
  );
};

export default AdsManagementPage;
