import { useSelector } from "react-redux";

export default function PageButtons({ type, pageNum, pageUp, pageDown }) {
  const userState = useSelector((state) => state.user);
  const { isSavesLoading, savesLimitPerPage } = userState;
  const count = userState.saves[type].count;

  const maxPageNum = Math.ceil(count / savesLimitPerPage);

  return (
    <div className="btn-group mt-8 w-full justify-center">
      <button
        className={`btn border bg-neutral border-grayL ${
          pageNum < 2 || isSavesLoading
            ? "opacity-25 hover:bg-neutral hover:cursor-not-allowed"
            : " hover:bg-primary"
        }`}
        style={{ borderRadius: "999px" }}
        onClick={pageDown}
      >
        «
      </button>

      <div className="p-3 text-black bg-neutral hover:bg-neutral">
        Page {pageNum}
      </div>
      <button
        className={`btn border bg-neutral border-grayL ${
          pageNum >= maxPageNum || isSavesLoading
            ? "opacity-25 hover:bg-neutral hover:cursor-not-allowed"
            : " hover:bg-primary"
        }`}
        style={{ borderRadius: "999px" }}
        onClick={pageUp}
      >
        »
      </button>
    </div>
  );
}
