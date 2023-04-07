export default function DropDown({ icon, direction, options, optionsStyles }) {
  return (
    <div className={`dropdown ${direction}`}>
      <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
        {icon}
      </label>
      <ul
        tabIndex={0}
        className={`mt-3 p-2 shadow menu menu-compact dropdown-content rounded-box ${optionsStyles}`}
      >
        {options.map((element, index) => {
          return <li key={index}>{element}</li>;
        })}
      </ul>
    </div>
  );
}
