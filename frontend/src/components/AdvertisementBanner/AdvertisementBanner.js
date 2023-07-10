import React, { useContext } from 'react'
import CurrentTheme from '../../context/CurrentTheme'

export const AdvertisementBanner = () => {
    const { currentTheme, setCurrentTheme } = useContext(CurrentTheme);
  return (
    <>
    <div className={`my-2 d-flex align-items-center justify-content-center ${currentTheme === "dark" ? "dark-mode" : "light-mode"}`} style={{minHeight:"153px"}}>
        Advertisement Banner
    </div>
    </>
  )
}
