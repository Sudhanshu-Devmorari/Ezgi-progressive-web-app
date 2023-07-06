import React, { useContext } from 'react'
import bannerimg from "../../assets/bannerimg.png"
import "./Banner.css"
import CurrentTheme from '../../context/CurrentTheme';

const Banner = () => {
  const {currentTheme, setCurrentTheme} = useContext(CurrentTheme);
  return (
    <>
    <div className={`row g-0 my-2 bannerText`}>
      <div className="col-6">
        <img src={bannerimg} alt="" style={{height:"100%", width:"100%", objectFit:"cover"}}/>
      </div>
      <div className={`col-6 my-2 d-flex align-items-center justify-content-center ${currentTheme === "dark" ? "dark-mode" : "light-mode"}`} >
          Advertisement Banner
      </div>
    </div>
    </>
  )
}

export default Banner