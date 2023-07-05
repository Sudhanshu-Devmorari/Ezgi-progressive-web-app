import { currentTheme } from "../GetCurrentTheme";

export const CustomDropdown = ({ label, options, selectedOption, onSelectOption, isOpen, toggleDropdown }) => (
    <div className="my-2">
      <span>{label}</span>
      <div className={`${currentTheme === "dark" ? "customDropdown-dark-mode" : "customDropdown-light-mode"} p-2 text-center`} onClick={toggleDropdown}>
        <span>{selectedOption}</span>
      </div>
      <div
        className={`${currentTheme === "dark" ? "customDropdown-content-dark-mode" : "customDropdown-content-light-mode"} pt-2 w-100 flex-column d-flex text-center ${
          isOpen ? 'd-block' : 'd-none'
        }`}
      >
        {options.map((option, index) => (
          <span
            className={`${currentTheme === "dark" ? "dpcontent-dark-mode" : "dpcontent-light-mode"} my-1 p-2`}
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