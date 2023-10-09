import React, { useContext, useEffect } from "react";
import Accordion from "react-bootstrap/Accordion";
import "./FAQEditor.css";
import CurrentTheme from "../../context/CurrentTheme";
import { Range, getTrackBackground } from "react-range";
import { useState } from "react";
import axios from "axios";
import config from "../../config";
import Swal from "sweetalert2";

const FAQEditor = () => {
  const { currentTheme, setCurrentTheme } = useContext(CurrentTheme);
  const [allFAQs, setAllFAQs] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const staticFaq = {
    question: "Ne kadar kazanırım?",
    answer: `Motiwy'de her abonelikten belirli bir kazanç elde edersin. 
    Kazancını doğru ve güvenilir tahminler paylaşarak artırabilirsin.
    Örnek kazanç tablosu ile tahmini aylık kazancını seviye seçerek 
    abonelik sayısına göre hesaplayabilirsin.`,
  };

  const [selectSub, setSelectSub] = useState("KALFA");

  const [values, setValues] = useState([0]);

  const STEP = 1;
  const MIN = 0;
  const MAX = 1000;

  const [openAccordionIndex, setOpenAccordionIndex] = useState(null);

  const handleAccordionClick = (index) => {
    if (openAccordionIndex === index) {
      setOpenAccordionIndex(null);
    } else {
      setOpenAccordionIndex(index);
    }
  };

  // Editor earning API
  const [earnings, setEarnings] = useState(0);
  function getEarnings(newValues) {
    console.log(newValues, ":::::::::::newValues:::::::")
    const type =
      (selectSub === "KALFA" && "journeyman") ||
      (selectSub === "USTA" && "master") ||
      (selectSub === "büyük usta" && "grandmaster");
    // if (type) {
      axios
        .get(
          `${config.apiUrl}/become-editor-earn-details/${newValues}/?type=${type}`
        )
        .then((res) => {
          // console.log(res);
          if (res.status === 200) {
            console.log("res.data.total_earning::::::::::::", res.data.total_earning)
            setEarnings(res.data.total_earning);
          }
        })
        .catch((error) => {
          console.log(error);
          if (error.response.status === 404 || error.response.status === 500) {
            Swal.fire({
              title: "Error",
              text: error.response.data.error,
              icon: "error",
              backdrop: false,
              customClass:
                currentTheme === "dark"
                  ? "dark-mode-alert"
                  : "light-mode-alert",
            });
          }
        });
    // }
  }

  const fetchFaqs = async () => {
    try {
      const userId = localStorage.getItem("user-id");
      const response = await axios.get(
        `${config.apiUrl}/become-editor-faq/?id=${userId}`
      );
      if (response.status == 204) {
        localStorage.clear();
        window.location.reload();
      }
      if (response.data.length > 2) {
        response.data.splice(2, 0, staticFaq);
      } else {
        response.data.push(staticFaq);
      }
      setAllFAQs(response.data);
      setIsLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchFaqs();
    // values && getEarnings();
  }, [selectSub]);

  return (
    <>
      <div className="accordion accordion-flush" id="accordionFlushExample">
        {isLoading ? (
          <div className="d-flex gap-1 my-2 pb-2 h-75 align-items-center justify-content-center">
            Loading...
          </div>
        ) : allFAQs.length == 0 ? (
          <div className="d-flex gap-1 my-2 pb-2 h-75 align-items-center justify-content-center">
            No Record Found!
          </div>
        ) : (
          allFAQs.map((res, index) => (
            <div className="accordion-item mb-2" key={index}>
              <h2
                className={`accordion-header ${
                  currentTheme === "dark"
                    ? "accordian-dark-mode"
                    : "accordian-light-mode"
                }`}
                id={`flush-heading-${index}`}
              >
                <button
                  onClick={() => handleAccordionClick(index)}
                  style={{ fontSize: "15px" }}
                  className={`accordion-button  ${
                    currentTheme === "dark" ? "staticClass" : ""
                  } font-poppins ${
                    currentTheme === "dark"
                      ? "accordian-dark-mode"
                      : "accordian-light-mode"
                  } ${openAccordionIndex === index ? "collapsed" : ""}`}
                  type="button"
                  data-bs-toggle="collapse"
                  data-bs-target={`#flush-collapse-${index}`}
                  aria-expanded="false"
                  aria-controls={`flush-collapse-${index}`}
                >
                  {res.question}
                </button>
              </h2>
              <div
                id={`flush-collapse-${index}`}
                className={`accordion-collapse collapse ${
                  openAccordionIndex === index ? "show" : ""
                }`}
                aria-labelledby={`flush-heading-${index}`}
                data-bs-parent={`accordionFlushExample`}
              >
                <div
                  className="accordion-body"
                  style={{
                    backgroundColor:
                      currentTheme === "dark" ? "#0B2447" : "#F6F6F6",
                    color: currentTheme === "dark" ? "#E6E6E6" : "#000000",
                    fontFamily: "Open Sans",
                    fontSize: "12px",
                  }}
                >
                  {res.answer}
                  {res.question === "Ne kadar kazanırım?" && (
                    <div
                      className="mt-3 font-poppins"
                      style={{ fontSize: ".82rem" }}
                    >
                      <div className="d-flex justify-content-center gap-3 fw-bold my-2">
                        <span
                          className="cursor text-center"
                          onClick={() => setSelectSub("KALFA")}
                          style={{
                            backgroundColor:
                              currentTheme === "dark" && selectSub === "KALFA"
                                ? "#FF9100"
                                : currentTheme !== "dark" &&
                                  selectSub === "KALFA"
                                ? "#007BF6"
                                : currentTheme === "dark"
                                ? "#0D2A53"
                                : "#E6E6E6",
                            color:
                              (selectSub === "KALFA" &&
                                currentTheme === "dark" &&
                                "#0B2447") ||
                              (selectSub === "KALFA" &&
                                currentTheme !== "dark" &&
                                "#F6F6F6"),
                            borderRadius: "3px",
                            padding: "0.2rem 0",
                            width: "3.5rem",
                          }}
                        >
                          KALFA
                        </span>
                        <span
                          className="cursor text-center"
                          onClick={() => setSelectSub("USTA")}
                          style={{
                            backgroundColor:
                              currentTheme === "dark" && selectSub === "USTA"
                                ? "#FF9100"
                                : currentTheme !== "dark" &&
                                  selectSub === "USTA"
                                ? "#007BF6"
                                : currentTheme === "dark"
                                ? "#0D2A53"
                                : "#E6E6E6",
                            color:
                              (selectSub === "USTA" &&
                                currentTheme === "dark" &&
                                "#0B2447") ||
                              (selectSub === "USTA" &&
                                currentTheme !== "dark" &&
                                "#F6F6F6"),
                            borderRadius: "3px",
                            padding: "0.2rem 0",
                            width: "3.5rem",
                          }}
                        >
                          USTA
                        </span>
                        <span
                          className="cursor text-center"
                          onClick={() => setSelectSub("büyük usta")}
                          // onClick={() => setSelectSub("ÜSTAD")}
                          style={{
                            backgroundColor:
                              currentTheme === "dark" &&
                              selectSub === "büyük usta"
                                ? "#FF9100"
                                : currentTheme !== "dark" &&
                                  selectSub === "büyük usta"
                                ? "#007BF6"
                                : currentTheme === "dark"
                                ? "#0D2A53"
                                : "#E6E6E6",
                            color:
                              (selectSub === "büyük usta" &&
                                currentTheme === "dark" &&
                                "#0B2447") ||
                              (selectSub === "büyük usta" &&
                                currentTheme !== "dark" &&
                                "#F6F6F6"),
                            borderRadius: "3px",
                            padding: "0.2rem 0",
                            // width: "3.5rem",
                            width: "5.3rem",
                          }}
                        >
                          büyük usta
                        </span>
                      </div>
                      <div
                        style={{
                          display: "flex",
                          justifyContent: "center",
                          flexWrap: "wrap",
                          margin: "1em",
                        }}
                      >
                        <Range
                          values={values}
                          step={STEP}
                          min={MIN}
                          max={MAX}
                          // onChange={(newValues) => getEarnings()}
                          onChange={(newValues) => {
                            setValues(newValues);
                            getEarnings(newValues);
                          }}
                          renderTrack={({ props, children }) => {
                            return (
                              <div
                                onMouseDown={props.onMouseDown}
                                onTouchStart={props.onTouchStart}
                                style={{
                                  ...props.style,
                                  height: "36px",
                                  display: "flex",
                                  width: "90%",
                                }}
                              >
                                <div
                                  ref={props.ref}
                                  style={{
                                    height: "5px",
                                    width: "100%",
                                    borderRadius: "4px",
                                    background: getTrackBackground({
                                      values: values,
                                      colors: [
                                        currentTheme === "dark"
                                          ? "#FF9100"
                                          : "#007BF6",
                                        currentTheme === "dark"
                                          ? "#E6E6E6"
                                          : "#313131",
                                      ],
                                      min: MIN,
                                      max: MAX,
                                    }),
                                    alignSelf: "center",
                                  }}
                                >
                                  {children}
                                </div>
                              </div>
                            );
                          }}
                          renderThumb={({ props, isDragged }) => (
                            <div
                              {...props}
                              style={{
                                ...props.style,
                                height: "27px",
                                width: "27px",
                                borderRadius: "50%",
                                backgroundColor:
                                  currentTheme === "dark"
                                    ? "#FF9100"
                                    : "#007BF6",
                                display: "flex",
                                justifyContent: "center",
                                alignItems: "center",
                              }}
                            />
                          )}
                        />
                        <div className="row g-o row-width">
                          <div className="col d-flex flex-column text-center">
                            <span>Abone Sayısı</span>
                            <span className="fw-bold">{values}</span>
                          </div>
                          <div className="col d-flex flex-column text-center">
                            <span>Tahmini Kazanç</span>
                            <span className="fw-bold">{earnings} ₺</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </>
  );
};

export default FAQEditor;
