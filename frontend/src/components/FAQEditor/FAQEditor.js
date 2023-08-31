import React, { useContext } from "react";
import Accordion from "react-bootstrap/Accordion";
import "./FAQEditor.css";
import CurrentTheme from "../../context/CurrentTheme";
import { Range, getTrackBackground } from "react-range";
import { useState } from "react";

const FAQEditor = () => {
  const { currentTheme, setCurrentTheme } = useContext(CurrentTheme);

  const FAQArray = [
    {
      question: "Motiwy nedir?",
      ans: ` Editör üyeler, deneyimli oldukları spor dallarında gerçekleşecek
        müsabakalara dair yorumlarını ve analizlerini diğer spor severler
        ile paylaşırlar. Editör üyelerin amacı, yaptıkları analizler ile
        daha derinlemesine içerikler ve değerli bilgiler sunmaktır.
        Yapılan analizler, spor severlerin sporla ilgili bilgilerini
        zenginleştirirken, platformda sağlanan içeriklerin güvenilirliğini
        ve kalitesini artırır.`,
    },
    {
      question: "Editör Üye nedir?",
      ans: ` Editör üyeler, deneyimli oldukları spor dallarında gerçekleşecek
        müsabakalara dair yorumlarını ve analizlerini diğer spor severler
        ile paylaşırlar. Editör üyelerin amacı, yaptıkları analizler ile
        daha derinlemesine içerikler ve değerli bilgiler sunmaktır.
        Yapılan analizler, spor severlerin sporla ilgili bilgilerini
        zenginleştirirken, platformda sağlanan içeriklerin güvenilirliğini
        ve kalitesini artırır.`,
    },
    {
      question: "Ne kadar kazanırım?",
      ans: `Motiwy'de her abonelikten belirli bir kazanç elde edersin. 
      Kazancını doğru ve güvenilir tahminler paylaşarak artırabilirsin.
      Örnek kazanç tablosu ile tahmini aylık kazancını seviye seçerek 
      abonelik sayısına göre hesaplayabilirsin.`,
    },
    {
      question: "Seviye nedir?",
      ans: ` Editör üyeler, deneyimli oldukları spor dallarında gerçekleşecek
        müsabakalara dair yorumlarını ve analizlerini diğer spor severler
        ile paylaşırlar. Editör üyelerin amacı, yaptıkları analizler ile
        daha derinlemesine içerikler ve değerli bilgiler sunmaktır.
        Yapılan analizler, spor severlerin sporla ilgili bilgilerini
        zenginleştirirken, platformda sağlanan içeriklerin güvenilirliğini
        ve kalitesini artırır.`,
    },
    {
      question: "Seviyemi nasıl yükseltirim?",
      ans: ` Editör üyeler, deneyimli oldukları spor dallarında gerçekleşecek
        müsabakalara dair yorumlarını ve analizlerini diğer spor severler
        ile paylaşırlar. Editör üyelerin amacı, yaptıkları analizler ile
        daha derinlemesine içerikler ve değerli bilgiler sunmaktır.
        Yapılan analizler, spor severlerin sporla ilgili bilgilerini
        zenginleştirirken, platformda sağlanan içeriklerin güvenilirliğini
        ve kalitesini artırır.`,
    },
    {
      question: "Kazancımı nasıl çekebilirim?",
      ans: ` Editör üyeler, deneyimli oldukları spor dallarında gerçekleşecek
        müsabakalara dair yorumlarını ve analizlerini diğer spor severler
        ile paylaşırlar. Editör üyelerin amacı, yaptıkları analizler ile
        daha derinlemesine içerikler ve değerli bilgiler sunmaktır.
        Yapılan analizler, spor severlerin sporla ilgili bilgilerini
        zenginleştirirken, platformda sağlanan içeriklerin güvenilirliğini
        ve kalitesini artırır.`,
    },
    {
      question: "Tahminlerimi düzenleyebilir miyim?",
      ans: ` Editör üyeler, deneyimli oldukları spor dallarında gerçekleşecek
        müsabakalara dair yorumlarını ve analizlerini diğer spor severler
        ile paylaşırlar. Editör üyelerin amacı, yaptıkları analizler ile
        daha derinlemesine içerikler ve değerli bilgiler sunmaktır.
        Yapılan analizler, spor severlerin sporla ilgili bilgilerini
        zenginleştirirken, platformda sağlanan içeriklerin güvenilirliğini
        ve kalitesini artırır.`,
    },
    {
      question: "Başarı oranı nasıl hesaplanır?",
      ans: ` Editör üyeler, deneyimli oldukları spor dallarında gerçekleşecek
        müsabakalara dair yorumlarını ve analizlerini diğer spor severler
        ile paylaşırlar. Editör üyelerin amacı, yaptıkları analizler ile
        daha derinlemesine içerikler ve değerli bilgiler sunmaktır.
        Yapılan analizler, spor severlerin sporla ilgili bilgilerini
        zenginleştirirken, platformda sağlanan içeriklerin güvenilirliğini
        ve kalitesini artırır.`,
    },
    {
      question: "Skor puanı nedir?",
      ans: ` Editör üyeler, deneyimli oldukları spor dallarında gerçekleşecek
        müsabakalara dair yorumlarını ve analizlerini diğer spor severler
        ile paylaşırlar. Editör üyelerin amacı, yaptıkları analizler ile
        daha derinlemesine içerikler ve değerli bilgiler sunmaktır.
        Yapılan analizler, spor severlerin sporla ilgili bilgilerini
        zenginleştirirken, platformda sağlanan içeriklerin güvenilirliğini
        ve kalitesini artırır.`,
    },
    {
      question: "Seviyemi görüntüleyebilir miyim?",
      ans: ` Editör üyeler, deneyimli oldukları spor dallarında gerçekleşecek
        müsabakalara dair yorumlarını ve analizlerini diğer spor severler
        ile paylaşırlar. Editör üyelerin amacı, yaptıkları analizler ile
        daha derinlemesine içerikler ve değerli bilgiler sunmaktır.
        Yapılan analizler, spor severlerin sporla ilgili bilgilerini
        zenginleştirirken, platformda sağlanan içeriklerin güvenilirliğini
        ve kalitesini artırır.`,
    },
    {
      question: "Bekleyen bakiye nedir?",
      ans: ` Editör üyeler, deneyimli oldukları spor dallarında gerçekleşecek
        müsabakalara dair yorumlarını ve analizlerini diğer spor severler
        ile paylaşırlar. Editör üyelerin amacı, yaptıkları analizler ile
        daha derinlemesine içerikler ve değerli bilgiler sunmaktır.
        Yapılan analizler, spor severlerin sporla ilgili bilgilerini
        zenginleştirirken, platformda sağlanan içeriklerin güvenilirliğini
        ve kalitesini artırır.`,
    },
    {
      question: "Nasıl destek alabilirim?",
      ans: ` Editör üyeler, deneyimli oldukları spor dallarında gerçekleşecek
        müsabakalara dair yorumlarını ve analizlerini diğer spor severler
        ile paylaşırlar. Editör üyelerin amacı, yaptıkları analizler ile
        daha derinlemesine içerikler ve değerli bilgiler sunmaktır.
        Yapılan analizler, spor severlerin sporla ilgili bilgilerini
        zenginleştirirken, platformda sağlanan içeriklerin güvenilirliğini
        ve kalitesini artırır.`,
    },
    {
      question: "Üyeliğimi iptal edebilir miyim?",
      ans: ` Editör üyeler, deneyimli oldukları spor dallarında gerçekleşecek
        müsabakalara dair yorumlarını ve analizlerini diğer spor severler
        ile paylaşırlar. Editör üyelerin amacı, yaptıkları analizler ile
        daha derinlemesine içerikler ve değerli bilgiler sunmaktır.
        Yapılan analizler, spor severlerin sporla ilgili bilgilerini
        zenginleştirirken, platformda sağlanan içeriklerin güvenilirliğini
        ve kalitesini artırır.`,
    },
    {
      question: "Profilim deaktif oldu, ne yapmalıyım?",
      ans: ` Editör üyeler, deneyimli oldukları spor dallarında gerçekleşecek
        müsabakalara dair yorumlarını ve analizlerini diğer spor severler
        ile paylaşırlar. Editör üyelerin amacı, yaptıkları analizler ile
        daha derinlemesine içerikler ve değerli bilgiler sunmaktır.
        Yapılan analizler, spor severlerin sporla ilgili bilgilerini
        zenginleştirirken, platformda sağlanan içeriklerin güvenilirliğini
        ve kalitesini artırır.`,
    },
  ];

  const [selectSub, setSelectSub] = useState("");

  const [values, setValues] = useState([0]);

  const STEP = 1;
  const MIN = 0;
  const MAX = (selectSub === "KALFA" && 100) || (selectSub === "USTA" && 1000) || (selectSub === "ÜSTAD" && 10000) || 100;

  const [openAccordionIndex, setOpenAccordionIndex] = useState(null);

  const handleAccordionClick = (index) => {
    if (openAccordionIndex === index) {
      setOpenAccordionIndex(null);
    } else {
      setOpenAccordionIndex(index);
    }
  };

  return (
    <>
      <div className="accordion accordion-flush" id="accordionFlushExample">
        {FAQArray.map((res, index) => (
          <div className="accordion-item mb-2">
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
                className={`accordion-button collapsed ${
                  currentTheme === "dark" ? "staticClass" : ""
                } font-poppins ${
                  currentTheme === "dark"
                    ? "accordian-dark-mode"
                    : "accordian-light-mode"
                }`}
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
              // className="accordion-collapse collapse"
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
                {res.ans}
                {index === 2 && (
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
                              : currentTheme !== "dark" && selectSub === "KALFA"
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
                              : currentTheme !== "dark" && selectSub === "USTA"
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
                        onClick={() => setSelectSub("ÜSTAD")}
                        style={{
                          backgroundColor:
                            currentTheme === "dark" && selectSub === "ÜSTAD"
                              ? "#FF9100"
                              : currentTheme !== "dark" && selectSub === "ÜSTAD"
                              ? "#007BF6"
                              : currentTheme === "dark"
                              ? "#0D2A53"
                              : "#E6E6E6",
                          color:
                            (selectSub === "ÜSTAD" &&
                              currentTheme === "dark" &&
                              "#0B2447") ||
                            (selectSub === "ÜSTAD" &&
                              currentTheme !== "dark" &&
                              "#F6F6F6"),
                          borderRadius: "3px",
                          padding: "0.2rem 0",
                          width: "3.5rem",
                        }}
                      >
                        ÜSTAD
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
                        onChange={(newValues) => setValues(newValues)}
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
                                currentTheme === "dark" ? "#FF9100" : "#007BF6",
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
                          <span className="fw-bold">36.258 ₺</span>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      <div class="accordion accordion-flush" id="accordionFlushExample">
        <div class="accordion-item">
          <h2 class="accordion-header" id="flush-headingOne">
            <button
              class="accordion-button collapsed"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#flush-collapseOne"
              aria-expanded="false"
              aria-controls="flush-collapseOne"
            >
              Accordion Item #1
            </button>
          </h2>
          <div
            id="flush-collapseOne"
            class="accordion-collapse collapse"
            aria-labelledby="flush-headingOne"
            data-bs-parent="#accordionFlushExample"
          >
            <div class="accordion-body">
              Placeholder content for this accordion, which is intended to
              demonstrate the <code>.accordion-flush</code> class. This is the
              first item's accordion body.
            </div>
          </div>
        </div>
        <div class="accordion-item">
          <h2 class="accordion-header" id="flush-headingTwo">
            <button
              class="accordion-button collapsed"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#flush-collapseTwo"
              aria-expanded="false"
              aria-controls="flush-collapseTwo"
            >
              Accordion Item #2
            </button>
          </h2>
          <div
            id="flush-collapseTwo"
            class="accordion-collapse collapse"
            aria-labelledby="flush-headingTwo"
            data-bs-parent="#accordionFlushExample"
          >
            <div class="accordion-body">
              Placeholder content for this accordion, which is intended to
              demonstrate the <code>.accordion-flush</code> class. This is the
              second item's accordion body. Let's imagine this being filled with
              some actual content.
            </div>
          </div>
        </div>
        <div class="accordion-item">
          <h2 class="accordion-header" id="flush-headingThree">
            <button
              class="accordion-button collapsed"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#flush-collapseThree"
              aria-expanded="false"
              aria-controls="flush-collapseThree"
            >
              Accordion Item #3
            </button>
          </h2>
          <div
            id="flush-collapseThree"
            class="accordion-collapse collapse"
            aria-labelledby="flush-headingThree"
            data-bs-parent="#accordionFlushExample"
          >
            <div class="accordion-body">
              Placeholder content for this accordion, which is intended to
              demonstrate the <code>.accordion-flush</code> class. This is the
              third item's accordion body. Nothing more exciting happening here
              in terms of content, but just filling up the space to make it
              look, at least at first glance, a bit more representative of how
              this would look in a real-world application.
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default FAQEditor;
