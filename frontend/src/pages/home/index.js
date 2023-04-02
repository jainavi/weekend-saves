import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { BiHomeAlt } from "react-icons/bi";
import { AiOutlineHeart } from "react-icons/ai";
import { BsArchive } from "react-icons/bs";
import { IoAdd } from "react-icons/io5";

import { getSaves } from "../../util/api";
import { pushError } from "../../slices/uiSlice";
import Select from "../../components/Select";
import LoadingCard from "../../components/LoadingCard";

function HomePage() {
  const { token } = useSelector((state) => state.auth);
  const [isLoading, setIsLoading] = useState(true);
  const [pageNumber, setPageNumber] = useState(1);
  const [maxPageNumber, setMaxPageNumber] = useState(1);
  const [saves, setSaves] = useState([]);
  const [type, setType] = useState("all");
  const dispatch = useDispatch();
  const [searchParams, setSearchParams] = useSearchParams();

  useEffect(() => {
    setIsLoading(true);
    (async () => {
      try {
        const res = await getSaves(token, type, pageNumber);
        setSaves(res.saves);
        setMaxPageNumber(Math.floor(res.docCount / 6) + 1);
        setSearchParams({ type, page: pageNumber });
        setIsLoading(false);
      } catch (err) {
        dispatch(pushError(err.message));
        setIsLoading(false);
      }
    })();
  }, [pageNumber, type, token, dispatch, setSearchParams]);

  const typeChangeHandler = async (type) => {
    setSearchParams({ type, page: pageNumber });
    setPageNumber(1);
    setType(type);
  };

  return (
    <>
      <div className="p-12 w-full max-w-screen-maxSize mx-auto min-h-screen">
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
          <div className="group w-12 h-10 p-2 rounded-full bg-primary flex justify-center items-center transition-all ease-in-out hover:w-16 hover:cursor-pointer">
            <IoAdd className="text-neutral scale-150  group-hover:hidden" />
            <div className="hidden group-hover:block text-neutral">Add</div>
          </div>
        </div>
        <div className="mt-4 w-full rounded-full border-t-2 border-grayL opacity-50"></div>

        <div className="mt-8 grid grid-cols-3">
          {!isLoading
            ? saves.map((save) => {
                return (
                  <div
                    className="card card-compact w-96 h-80 mb-4 justify-self-center border border-grayL border-opacity-50 hover:cursor-pointer transition-transform ease-in-out hover:scale-[101%] hover:drop-shadow-xl"
                    key={save._id}
                  >
                    <figure
                      className="h-40 bg-cover bg-center"
                      style={{
                        backgroundImage: `url('${save.image}')`,
                      }}
                    ></figure>
                    <div className="card-body bg-neutral text-gray rounded-b-2xl">
                      <h2 className="card-title text-black">
                        {save.title}
                        <div className="badge badge-error w-32 text-neutral">
                          {Math.round(save.ttr / 60) + " Min"}
                        </div>
                      </h2>
                      <p>{save.source}</p>
                      <div className="card-actions justify-end">
                        <div className="badge badge-outline">Tag-1</div>
                        <div className="badge badge-outline">Tag-2</div>
                        <div className="badge badge-outline">+5 more</div>
                      </div>
                    </div>
                  </div>
                );
              })
            : Array.from({ length: 6 }, (_, index) => <LoadingCard />)}
        </div>
        <div className="btn-group mt-8 w-full justify-center">
          <button
            className={`btn border bg-neutral border-grayL ${
              pageNumber < 2 || isLoading
                ? "opacity-25 hover:bg-neutral hover:cursor-not-allowed"
                : " hover:bg-primary"
            }`}
            style={{ borderRadius: "999px" }}
            onClick={() => {
              pageNumber < 2 ||
                isLoading ||
                setPageNumber((prevState) => prevState - 1);
            }}
          >
            «
          </button>

          <button className="p-3 text-black bg-neutral hover:bg-neutral">
            Page {pageNumber}
          </button>
          <button
            className={`btn border bg-neutral border-grayL ${
              pageNumber >= maxPageNumber || isLoading
                ? "opacity-25 hover:bg-neutral hover:cursor-not-allowed"
                : " hover:bg-primary"
            }`}
            style={{ borderRadius: "999px" }}
            onClick={() => {
              pageNumber >= maxPageNumber ||
                isLoading ||
                setPageNumber((prevState) => prevState + 1);
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
