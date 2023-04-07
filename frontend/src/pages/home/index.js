import { useEffect, useRef, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { BiHomeAlt } from "react-icons/bi";
import { AiOutlineHeart, AiOutlineCloudUpload } from "react-icons/ai";
import { BsArchive } from "react-icons/bs";
import { IoAdd } from "react-icons/io5";

import { getSaves, postSave } from "../../util/api";
import { pushError, pushSuccess } from "../../slices/uiSlice";
import Select from "../../components/Select";
import LoadingCard from "../../components/LoadingCard";
import InputFeild from "../../components/Input";
import SaveCards from "./SaveCards";

function HomePage() {
  const { token } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const [searchParams, setSearchParams] = useSearchParams();
  const [saveStatus, setSaveStatus] = useState({
    savesLoading: true,
    saveUploading: false,
  });
  const [saves, setSaves] = useState([]);
  const [pageState, setPageState] = useState({ currPageNum: 1, maxPageNum: 1 });
  const [type, setType] = useState("all");
  const [addClicked, setAddClicked] = useState(false);
  const addRef = useRef(null);

  const savesFetch = async () => {
    setSaveStatus((prevState) => ({ ...prevState, savesLoading: true }));
    try {
      const res = await getSaves(token, type, pageState.currPageNum);
      setSaves(res.saves);
      setPageState((prevState) => ({
        ...prevState,
        maxPageNum: Math.ceil(res.docCount / 6),
      }));
      setSearchParams({ type, page: pageState.currPageNum });
    } catch (err) {
      dispatch(pushError(err.message));
    }
    setSaveStatus((prevState) => ({ ...prevState, savesLoading: false }));
  };

  useEffect(() => {
    savesFetch();
  }, [pageState.currPageNum, type, token, dispatch, setSearchParams]);

  const urlSubmitHandler = async (event) => {
    setSaveStatus((prevState) => ({ ...prevState, saveUploading: true }));
    event.preventDefault();
    const formData = new FormData(event.target);
    const url = formData.get("url");
    setAddClicked(false);
    try {
      await postSave(token, url);
      await savesFetch();
      dispatch(pushSuccess("New save added!"));
    } catch (err) {
      dispatch(pushError(err.message));
    }
    setSaveStatus((prevState) => ({ ...prevState, saveUploading: false }));
    setAddClicked(false);
  };

  const typeChangeHandler = async (type) => {
    setSearchParams({ type, page: pageState.currPageNum });
    setPageState((prevState) => ({
      ...prevState,
      currPageNum: 1,
    }));
    setType(type);
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
                  typeChangeHandler("all");
                }}
              >
                <BiHomeAlt className="inline mr-1 scale-110 mb-[0.3rem]" />
                Home
              </div>,
              <div
                onClick={() => {
                  typeChangeHandler("favourite");
                }}
              >
                <AiOutlineHeart className="inline mr-1 scale-110 mb-[0.3rem]" />
                Favourite
              </div>,
              <div
                onClick={() => {
                  typeChangeHandler("archive");
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
              saveStatus.saveUploading
                ? "w-auto hover:cursor-wait"
                : addClicked
                ? "w-96"
                : "w-10 hover:w-16 hover:cursor-pointer"
            }`}
          >
            {saveStatus.saveUploading ? (
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

        <div className="mt-8 grid grid-cols-3">
          {saveStatus.savesLoading
            ? Array.from({ length: 6 }, (_, index) => (
                <LoadingCard key={index} />
              ))
            : saves.map((save) => {
                return (
                  <SaveCards
                    key={save._id}
                    saveData={save}
                    onDelete={savesFetch}
                  />
                );
              })}
        </div>
        <div className="btn-group mt-8 w-full justify-center">
          <button
            className={`btn border bg-neutral border-grayL ${
              pageState.currPageNum < 2 || saveStatus.savesLoading
                ? "opacity-25 hover:bg-neutral hover:cursor-not-allowed"
                : " hover:bg-primary"
            }`}
            style={{ borderRadius: "999px" }}
            onClick={() => {
              pageState.currPageNum < 2 ||
                saveStatus.savesLoading ||
                setPageState((prevState) => ({
                  ...prevState,
                  currPageNum: prevState.currPageNum - 1,
                }));
            }}
          >
            «
          </button>

          <button className="p-3 text-black bg-neutral hover:bg-neutral">
            Page {pageState.currPageNum}
          </button>
          <button
            className={`btn border bg-neutral border-grayL ${
              pageState.currPageNum >= pageState.maxPageNum ||
              saveStatus.savesLoading
                ? "opacity-25 hover:bg-neutral hover:cursor-not-allowed"
                : " hover:bg-primary"
            }`}
            style={{ borderRadius: "999px" }}
            onClick={() => {
              pageState.currPageNum >= pageState.maxPageNum ||
                saveStatus.savesLoading ||
                setPageState((prevState) => ({
                  ...prevState,
                  currPageNum: prevState.currPageNum + 1,
                }));
            }}
          >
            »
          </button>
        </div>
      </div>
    </>
  );
}

export default HomePage;
