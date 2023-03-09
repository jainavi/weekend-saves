import { useDispatch } from "react-redux";
import { RxCross2 } from "react-icons/rx";

import TimeOutBar from "./TimeOutBar";
import { popSuccess } from "../slices/uiSlice";

function Success({ id, children }) {
  const dispatch = useDispatch();

  const popSuccessHandler = () => {
    dispatch(popSuccess(id));
  };

  return (
    <div
      className={`mb-4 text-neutral font-form font-extrabold flex flex-col justify-between p-2 rounded-md w-full h-auto bg-success/50 backdrop-blur border-solid border-2 border-success`}
    >
      <RxCross2
        onClick={() => popSuccessHandler()}
        className="self-end hover:bg-neutral/40 transition-all duration-300 ease-in-out hover:rounded-full hover:scale-125"
      />
      <p className="text-center mb-3">{children}</p>
      <TimeOutBar onComplete={popSuccessHandler} color="progress-success" />
    </div>
  );
}

export default Success;
