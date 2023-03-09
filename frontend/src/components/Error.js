import TimeOutBar from "./TimeOutBar";

function Error({ children }) {
  return (
    <div
      className={`mb-4 text-neutral font-form font-extrabold flex flex-col justify-between p-2 rounded-md w-40 h-auto bg-error/40 backdrop-blur border-solid border-2 border-error animate-slideIn`}
    >
      <p className="text-center mb-3">{children}</p>
      <TimeOutBar color="progress-error" />
    </div>
  );
}

export default Error;
