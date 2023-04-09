import { useEffect, useRef, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { BiHomeAlt } from "react-icons/bi";
import { AiOutlineHeart, AiOutlineCloudUpload } from "react-icons/ai";
import { BsArchive } from "react-icons/bs";
import { IoAdd } from "react-icons/io5";

import { postSave } from "../../util/api";
import { TYPES_ITS, TYPE_STI } from "../../util/global";
import { addNewSave } from "../../slices/userSlice";
import { pushError, pushSuccess } from "../../slices/uiSlice";
import Select from "../../components/Select";
import InputFeild from "../../components/Input";
import SaveCardsGrid from "./SaveCardsGrid";
import PageButtons from "./PageButtons";

function HomePage() {
  const { token } = useSelector((state) => state.auth);
  const { isSavesLoading, saves, savesLimitPerPage } = useSelector(
    (state) => state.user
  );

  const [searchParams, setSearchParams] = useSearchParams();

  const [saveUploading, setSaveUploading] = useState(false);
  const [pageState, setPageState] = useState({
    currPageNum: 1,
    type: 0,
  });
  const [addClicked, setAddClicked] = useState(false);

  const addRef = useRef(null);

  const dispatch = useDispatch();

  const maxPageNum = Math.ceil(saves[pageState.type].count / savesLimitPerPage);

  useEffect(() => {
    const typeQuery = searchParams.get("type") || "all";
    const type = TYPE_STI[typeQuery] || 0;
    typeChangeHandler(type);
  }, [searchParams]);

  const urlSubmitHandler = async (event) => {
    setSaveUploading(true);
    event.preventDefault();
    const formData = new FormData(event.target);
    const url = formData.get("url");
    setAddClicked(false);
    try {
      const res = await postSave(token, url);
      dispatch(addNewSave(res));
      dispatch(pushSuccess("New save added!"));
    } catch (err) {
      dispatch(pushError(err.message));
    }
    setSaveUploading(false);
    setAddClicked(false);
  };

  const typeChangeHandler = async (type) => {
    setSearchParams({ type: TYPES_ITS[type] });
    setPageState((prevState) => ({
      ...prevState,
      type,
      currPageNum: 1,
    }));
  };

  const pageUp = () => {
    pageState.currPageNum >= maxPageNum ||
      isSavesLoading ||
      setPageState((prevState) => ({
        ...prevState,
        currPageNum: prevState.currPageNum + 1,
      }));
  };

  const pageDown = () => {
    pageState.currPageNum < 2 ||
      isSavesLoading ||
      setPageState((prevState) => ({
        ...prevState,
        currPageNum: prevState.currPageNum - 1,
      }));
  };

  return (
    <>
      <div
        onClick={() => {
          setAddClicked(false);
        }}
        className="p-12 w-full max-w-screen-maxSize mx-auto min-h-screen"
      >
        <div className="w-full flex justify-between items-end">
          <Select
            labelStyles="mt-10 p-2 px-4 bg-primary rounded-full text-neutral"
            label={
              <>
                <BiHomeAlt className="mr-1 shrink-0 scale-110 mb-[0.15rem]" />
                Home
              </>
            }
            optionsStyles="mt-3 p-2 bg-primary w-44"
            options={[
              <div
                onClick={() => {
                  typeChangeHandler(0);
                }}
              >
                <BiHomeAlt className="inline mr-1 scale-110 mb-[0.3rem]" />
                Home
              </div>,
              <div
                onClick={() => {
                  typeChangeHandler(1);
                }}
              >
                <AiOutlineHeart className="inline mr-1 scale-110 mb-[0.3rem]" />
                Favourite
              </div>,
              <div
                onClick={() => {
                  typeChangeHandler(2);
                }}
              >
                <BsArchive className="inline mr-1 scale-110 mb-[0.3rem]" />
                Archive
              </div>,
            ]}
          />

          <div
            ref={addRef}
            onClick={(event) => {
              event.stopPropagation();
              setAddClicked(true);
            }}
            className={`group h-10 p-2 rounded-full bg-primary flex justify-center items-center transition-all ease-in-out ${
              saveUploading
                ? "w-auto hover:cursor-wait"
                : addClicked
                ? "w-96"
                : "w-10 hover:w-16 hover:cursor-pointer"
            }`}
          >
            {saveUploading ? (
              <>
                <AiOutlineCloudUpload className="text-neutral w-6 h-6 animate-bounce" />
                <p className="mx-2 text-neutral">Saving...</p>
              </>
            ) : !addClicked ? (
              <>
                <IoAdd className="text-neutral scale-150  group-hover:hidden" />
                <div className="hidden group-hover:block text-neutral">
                  Save
                </div>
              </>
            ) : (
              <form
                onSubmit={urlSubmitHandler}
                className="w-full flex justify-around"
              >
                <InputFeild
                  type="text"
                  id="url"
                  name="url"
                  placeholder="Drop your url"
                  extra="w-64 pb-0 bg-primary border-neutral text-neutral placeholder:text-white focus:outline-0"
                />
                <button
                  type="submit"
                  className="text-white rounded-full py-1 px-2 hover:bg-secondry/20"
                >
                  Save
                </button>
              </form>
            )}
          </div>
        </div>
        <div className="mt-4 w-full rounded-full border-t-2 border-grayL opacity-50" />

        <SaveCardsGrid type={pageState.type} pageNum={pageState.currPageNum} />

        <PageButtons
          type={pageState.type}
          pageNum={pageState.currPageNum}
          pageUp={pageUp}
          pageDown={pageDown}
        />
      </div>
    </>
  );
}

export default HomePage;
