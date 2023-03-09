import { useSelector } from "react-redux";
import { useAutoAnimate } from "@formkit/auto-animate/react";

import Error from "./Error";

function ErrorList() {
  const { errorArr } = useSelector((store) => store.ui);
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
    </div>
  );
}

export default ErrorList;
