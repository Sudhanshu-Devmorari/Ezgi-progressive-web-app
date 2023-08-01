import { useContext } from "react";
import CurrentTheme from "../../context/CurrentTheme";

export const CustomDropdown = ({
  label,
  options,
  selectedOption,
  onSelectOption,
  isOpen,
  toggleDropdown,
}) => {
  const { currentTheme, setCurrentTheme } = useContext(CurrentTheme);
  return (
    <div className="my-2">
      <span>{label}</span>
      <div
        className={`${
          currentTheme === "dark"
            ? "customDropdown-dark-mode"
            : "customDropdown-light-mode"
        } p-1 text-center`}
        onClick={toggleDropdown}
      >
        <span>{selectedOption}</span>
      </div>
      <div
        className={`${
          currentTheme === "dark"
            ? "customDropdown-content-dark-mode"
            : "customDropdown-content-light-mode"
        } pt-2 flex-column d-flex text-center ${isOpen ? "d-block" : "d-none"}`}
        // style={{ width: ((label === "Category" || label === "Level" || label === "Score Point" || label === "Success Rate") && "41%") && (label === "Match Details" ||label === "Country" ||label === "City" || label === "Age" || label === "Gender") ? "100%" : "46%" }}
        style={{
          width:
            (["Category", "Level", "Score Point", "Success Rate"].includes(label) &&
              "41%") ||
            (["Match Details", "Country", "City", "Age", "Gender", " "].includes(label) &&
              "100%") ||
            "47%",
        }}
      >
        {options.map((option, index) => (
          <span
            className={`${
              currentTheme === "dark"
                ? "dpcontent-dark-mode"
                : "dpcontent-light-mode"
            } my-1 p-2`}
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
