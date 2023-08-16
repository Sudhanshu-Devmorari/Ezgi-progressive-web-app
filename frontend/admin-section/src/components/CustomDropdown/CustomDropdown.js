import './CustomDropdown.css'
export const CustomDropdown = ({
  label,
  options,
  selectedOption,
  onSelectOption,
  isOpen,
  toggleDropdown,
}) => {
  return (
    <div className="my-2">
      <span>{label}</span>
      <div
        className={`${"customDropdown-dark-mode"} p-1 text-center`}
        onClick={toggleDropdown}
      >
        <span>{selectedOption}</span>
      </div>
      <div
        className={`customDropdown-content-dark-mode p-2 flex-column d-flex text-center ${isOpen ? "d-block" : "d-none"}`}
        style={{
          width:
          ([" "].includes(label) &&
              "20%") ||
          ([ "Type", "Status", "Duration"].includes(label) &&
              "43.5%") ||
            (["Country", "City", "Match Details"].includes(label) &&
              "100%") || "45%" ,
            // label === "Match Details" ||
            // label === "Country" ||
            // label === "City" 
            // // label === "Age" ||
            // // label === "Gender"
            //   ? "100%"
            //   : "45%",
        }}
      >
        {options.map((option, index) => (
          <span
          style={{fontSize: label === " " && "12px"}}
            className="dpcontent-dark-mode my-1 p-2"
            key={index}
            onClick={() => {
              onSelectOption(option);
              toggleDropdown();
            }}
          >
            {option}
          </span>
        ))}
      </div>
    </div>
  );
};
