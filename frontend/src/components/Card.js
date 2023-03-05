function Card({ color, size, position, extra, children }) {
  return (
    <div
      className={`p-8 rounded-md  flex ${color} ${size} ${position} ${extra}`}
    >
      {children}
    </div>
  );
}

export default Card;
