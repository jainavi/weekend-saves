import { useSelector } from "react-redux";

import Error from "./Error";

function ErrorList() {
  const { errorArr } = useSelector((store) => store.ui);

  return (
    <div className="fixed z-20 top-[80px] right-0 w-44 lg:w-52">
      {errorArr.map((error, index) => (
        <Error key={error.id} id={error.id}>
          {error.msg}
        </Error>
      ))}
    </div>
  );
}

export default ErrorList;
