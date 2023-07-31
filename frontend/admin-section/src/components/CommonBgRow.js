import './CommonBgRow.css'
export const MainDiv = ({children}) => {
    return(
        <div className="my-2 px-2 d-flex row-fonts d-flex align-items-center" style={{backgroundColor:"#0B2447"}}>
            {children}
        </div>
    );
};