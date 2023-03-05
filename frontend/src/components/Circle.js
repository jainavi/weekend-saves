function Circle({ size, position, color }) {
  return (
    <div
      className={`rounded-full aspect-square absolute -z-10 ${size} ${position} ${color}`}
    />
  );
}

export default Circle;
