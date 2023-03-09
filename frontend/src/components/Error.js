import { useDispatch } from "react-redux";
import { RxCross2 } from "react-icons/rx";

import TimeOutBar from "./TimeOutBar";
import { popError } from "../slices/uiSlice";

function Error({ id, children }) {
  const dispatch = useDispatch();

  const popErrorHandler = () => {
    dispatch(popError(id));
  };

  return (
    <div
      className={`mb-4 text-neutral font-form font-extrabold flex flex-col justify-between p-2 rounded-md w-full h-auto bg-error/40 backdrop-blur border-solid border-2 border-error`}
    >
      <RxCross2
        onClick={() => popErrorHandler()}
        className="self-end hover:bg-neutral/40 transition-all duration-300 ease-in-out hover:rounded-full hover:scale-125"
      />
      <p className="text-center mb-3">{children}</p>
      <TimeOutBar onComplete={popErrorHandler} color="progress-error" />
    </div>
  );
}

export default Error;
