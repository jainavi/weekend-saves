function Error({ position, children }) {
  const { top, right } = position;

  return (
    <div
      style={{ top, right }}
      className={`fixed z-10 text-neutral font-form font-extrabold flex flex-col justify-between p-2 rounded-md w-40 h-20 bg-error/80 backdrop-blur border-solid border-2 border-error animate-slideIn`}
    >
      <p className="text-center">{children}</p>
      <progress
        className="progress progress-error w-full h-1"
        value="70"
        max="100"
      ></progress>
    </div>
  );
}

export default Error;
