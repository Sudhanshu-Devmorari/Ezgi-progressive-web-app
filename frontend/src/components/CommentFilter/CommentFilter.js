import React, {useState} from 'react'

export const CommentFilter = () => {
    const [categoryDropDown, setCategoryDropDown] = useState(false);
    const [CountryDropdown, setCountryDropdown] = useState(false);
    const [leagueDropDown, setLeagueDropDown] = useState(false);
    const [DateDropDown, setDateDropDown] = useState(false);
  return (
    <>
    <div className="row my-3">
              <div className="col">
                {/* <Select closeMenuOnSelect={false} isMulti options={options} /> */}

                {/* Category DROPDOWN */}
                <div className="">
                  <span>Category</span>
                  <div
                    className="customDropdown p-2 text-center"
                    onClick={() => setCategoryDropDown(!categoryDropDown)}
                  >
                    <span>Select</span>
                  </div>
                  <div
                    className={`customDropdown-content pt-2 w-100 flex-column d-flex text-center h-50 ${
                      categoryDropDown ? "d-block" : "d-none"
                    } `}
                  >
                    <span className="dpcontent my-1 p-2">India</span>
                    <span className="dpcontent my-1 p-2">Turkey</span>
                    <span className="dpcontent my-1 p-2">Turkey</span>
                    <span className="dpcontent my-1 p-2">Turkey</span>
                    <span className="dpcontent my-1 p-2">Turkey</span>
                    <span className="dpcontent my-1 p-2">Turkey</span>
                    <span className="dpcontent my-1 p-2">Turkey</span>
                    <span className="dpcontent my-1 p-2">Turkey</span>
                    <span className="dpcontent my-1 p-2">Turkey</span>
                  </div>
                </div>
                {/* End Category DROPDOWN */}
              </div>
              <div className="col">
                {/* Country DROPDOWN */}
                <div className="">
                  <span>Country</span>
                  <div
                    className="customDropdown p-2 text-center"
                    onClick={() => setCountryDropdown(!CountryDropdown)}
                  >
                    <span>Select</span>
                  </div>
                  <div
                    className={`customDropdown-content pt-2 w-100 flex-column d-flex text-center h-50 ${
                      CountryDropdown ? "d-block" : "d-none"
                    } `}
                  >
                    <span className="dpcontent my-1 p-2">India</span>
                    <span className="dpcontent my-1 p-2">Turkey</span>
                    <span className="dpcontent my-1 p-2">Turkey</span>
                    <span className="dpcontent my-1 p-2">Turkey</span>
                  </div>
                </div>
                {/* End Country DROPDOWN */}
              </div>
              {/* League DROPDOWN */}
            </div>
            <div className="row my-3">
              <div className="col">
                <div className="">
                  <span>League</span>
                  <div
                    className="customDropdown p-2 text-center"
                    onClick={() => setLeagueDropDown(!leagueDropDown)}
                  >
                    <span>Select</span>
                  </div>
                  <div
                    className={`customDropdown-content pt-2 w-100 flex-column d-flex text-center h-50 ${
                      leagueDropDown ? "d-block" : "d-none"
                    } `}
                  >
                    <span className="dpcontent my-1 p-2">India</span>
                    <span className="dpcontent my-1 p-2">Turkey</span>
                    <span className="dpcontent my-1 p-2">Turkey</span>
                    <span className="dpcontent my-1 p-2">Turkey</span>
                  </div>
                </div>
              </div>
              {/* End League DROPDOWN */}
              <div className="col">
                {/* Date DropDown */}
                <div className="">
                  <span>Date</span>
                  <div
                    className="customDropdown p-2 text-center"
                    onClick={() => setDateDropDown(!DateDropDown)}
                  >
                    <span>Select</span>
                  </div>
                  <div
                    className={`customDropdown-content pt-2 w-100 flex-column d-flex text-center h-50 ${
                      DateDropDown ? "d-block" : "d-none"
                    } `}
                  >
                    <span className="dpcontent my-1 p-2">India</span>
                    <span className="dpcontent my-1 p-2">Turkey</span>
                    <span className="dpcontent my-1 p-2">Turkey</span>
                    <span className="dpcontent my-1 p-2">Turkey</span>
                  </div>
                </div>
                {/* End date Dropdown*/}
              </div>
            </div>
    </>
  )
}
