function Button({ onClick, type, color, size, extra, children }) {
  return (
    <button
      type={type}
      onClick={onClick}
      className={`btn ${size} ${color} text-neutral text-base ${extra}`}
    >
      {children}
    </button>
  );
}

export default Button;
