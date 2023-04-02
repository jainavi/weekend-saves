import { useState } from "react";
import { FiChevronDown } from "react-icons/fi";

const Select = ({ label, labelStyles, options, optionsStyles }) => {
  const [active, setActive] = useState(label);

  const optionSelectHandler = (element) => {
    setActive(element);
  };

  return (
    <div className="dropdown dropdown-bottom">
      <label
        tabIndex={0}
        className={`flex flex-row items-center justify-around p-2 hover:cursor-pointer ${labelStyles}`}
      >
        {active}
        <FiChevronDown className="ml-1 shrink-0 scale-125" />
      </label>
      <ul
        tabIndex={0}
        className={`shadow menu menu-compact dropdown-content rounded-box ${optionsStyles}`}
      >
        {options.map((element) => {
          return (
            <li
              className="justify-start text-neutral"
              key={Math.random()}
              onClick={() => {
                optionSelectHandler(element);
              }}
            >
              {element}
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default Select;
