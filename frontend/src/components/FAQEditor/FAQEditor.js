import React, { useContext } from "react";
import Accordion from "react-bootstrap/Accordion";
import "./FAQEditor.css";
import CurrentTheme from "../../context/CurrentTheme";

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
      ans: ` Editör üyeler, deneyimli oldukları spor dallarında gerçekleşecek
        müsabakalara dair yorumlarını ve analizlerini diğer spor severler
        ile paylaşırlar. Editör üyelerin amacı, yaptıkları analizler ile
        daha derinlemesine içerikler ve değerli bilgiler sunmaktır.
        Yapılan analizler, spor severlerin sporla ilgili bilgilerini
        zenginleştirirken, platformda sağlanan içeriklerin güvenilirliğini
        ve kalitesini artırır.`,
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
  return (
    <>
      {FAQArray.map((res, index) => (
        <div
          className="accordion accordion-flush"
          id="accordionFlushExample"
          key={index}
        >
          <div className="accordion-item">
            <h2
              className={`accordion-header ${
                currentTheme === "dark"
                  ? "accordian-dark-mode"
                  : "accordian-light-mode"
              }`}
              id="flush-headingOne"
            >
              <button
                style={{ fontSize: "15px" }}
                className={`accordion-button ${
                  currentTheme === "dark" ? "staticClass" : ""
                }  collapsed font-poppins ${
                  currentTheme === "dark"
                    ? "accordian-dark-mode"
                    : "accordian-light-mode"
                }`}
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#flush-collapseOne"
                aria-expanded="false"
                aria-controls="flush-collapseOne"
              >
                {res.question}
              </button>
            </h2>
            <div
              id="flush-collapseOne"
              className="accordion-collapse collapse"
              aria-labelledby="flush-headingOne"
              data-bs-parent="#accordionFlushExample"
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
              </div>
            </div>
          </div>
        </div>
      ))}
    </>
  );
};

export default FAQEditor;
