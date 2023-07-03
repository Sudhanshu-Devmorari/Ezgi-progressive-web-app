import React, {useState} from 'react'
import NavBar from '../NavBar/NavBar'
import './MainPage.css'

const MainPage = () => {

  // CHANGE THEME
  const [DarkMode, setDarkMode] = useState(false);

  return (
    <> 
    <div className={`container-fluid mt-2`} style={{fontFamily:'none'}}>
        <div>
            <NavBar setDarkMode={setDarkMode} DarkMode={DarkMode}/>
        </div>
    </div>
    </>
  )
}

export default MainPage