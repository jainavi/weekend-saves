import { useSelector } from "react-redux";
import { useAutoAnimate } from "@formkit/auto-animate/react";

import Error from "./Error";
import Success from "./Success";

function StatusList() {
  const { errorArr, successArr } = useSelector((store) => store.ui);
  const [parent, enableAnimations] = useAutoAnimate();

  return (
    <div
      ref={parent}
      className="fixed px-4 z-20 top-[80px] right-0 w-56 lg:w-52"
    >
      {errorArr.map((error, index) => (
        <Error key={error.id} id={error.id}>
          {error.msg}
        </Error>
      ))}
      {successArr.map((success, index) => (
        <Success key={success.id} id={success.id}>
          {success.msg}
        </Success>
      ))}
    </div>
  );
}

export default StatusList;
