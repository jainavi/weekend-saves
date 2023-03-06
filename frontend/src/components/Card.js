function Card({ color, size, position, extra, children }) {
  return (
    <div
      className={`p-6 rounded-md ${color} ${size} ${position} ${extra}`}
    >
      {children}
    </div>
  );
}

export default Card;
