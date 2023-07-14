import React, { useContext } from 'react'
import CurrentTheme from '../../context/CurrentTheme';

const FavoriteSelection = (props) => {
    const { currentTheme, setCurrentTheme } = useContext(CurrentTheme);
  return (
    <>
    <div
        className={`${
          currentTheme === "dark" ? "dark-mode" : "light-mode"
        } d-flex my-2 px-2 py-3 gap-3`} style={{fontSize:"15px"}}
      >
        <div style={{color: props.favSelection === "fav editor" ? "#D2DB08" : ""}} onClick={()=>props.setFavSelection("fav editor")}>Favorite Editor</div>
        <div style={{color: props.favSelection === "fav comments" ? "#D2DB08" : ""}} onClick={()=>props.setFavSelection("fav comments")}>Favorite Comments</div>
      </div>
    </>
  )
}

export default FavoriteSelection