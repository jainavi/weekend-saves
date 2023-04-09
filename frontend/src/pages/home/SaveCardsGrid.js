import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";

import SaveCards from "./SaveCards";
import LoadingCard from "../../components/LoadingCard";
import { loadSaves } from "../../slices/userSlice";

export default function SaveCardsGrid({ type, pageNum }) {
  const dispatch = useDispatch();
  const { isSavesLoading, saves, savesLimitPerPage } = useSelector(
    (state) => state.user
  );

  const savesArr = saves[type].savesArr || [];

  useEffect(() => {
    if (
      !saves[type].savesArr ||
      (savesArr.length < pageNum * savesLimitPerPage &&
        savesArr.length < saves[type].count)
    ) {
      dispatch(loadSaves({ type, pageNum }));
    }
  }, [type, pageNum]);

  const deleteHandler = (saveId) => {
    // Code
  };

  return (
    <div className="mt-8 grid grid-cols-3">
      {isSavesLoading
        ? Array.from({ length: 6 }, (_, index) => <LoadingCard key={index} />)
        : savesArr.map((save, index) => {
            if (
              index < savesLimitPerPage * (pageNum - 1) ||
              index > savesLimitPerPage * pageNum - 1
            ) {
              return false;
            }

            return (
              <SaveCards
                key={save._id}
                saveData={save}
                onDelete={() => {
                  deleteHandler(save._id);
                }}
              />
            );
          })}
    </div>
  );
}
