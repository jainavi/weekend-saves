import { SlOptionsVertical } from "react-icons/sl";
import { AiOutlineHeart } from "react-icons/ai";
import { BsTrash, BsArchive } from "react-icons/bs";
import { useDispatch, useSelector } from "react-redux";

import DropDown from "../../components/DropDown";
import { deleteSave } from "../../util/api";
import { pushError } from "../../slices/uiSlice";

export default function SaveCards({ saveData, onDelete }) {
  const { token } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const saveId = saveData._id;

  const archiveSaveHandler = async () => {
    try {
    } catch (err) {
      dispatch(pushError(err.message));
    }
  };

  const deleteSaveHandler = async () => {
    try {
      await deleteSave(token, saveId);
      onDelete();
    } catch (err) {
      dispatch(pushError(err.message));
    }
  };

  return (
    <div className="card card-compact w-96 h-80 mb-4 justify-self-center border border-grayL border-opacity-50 hover:cursor-pointer transition-transform ease-in-out hover:scale-[101%] hover:drop-shadow-xl">
      <figure
        className="h-40 bg-cover bg-center"
        style={{
          backgroundImage: `url('${saveData.image}')`,
        }}
      ></figure>
      <div className="card-body bg-neutral text-gray rounded-b-2xl">
        <h2 className="card-title text-black">
          {saveData.title}
          <div className="badge badge-error w-32 text-neutral">
            {Math.round(saveData.ttr / 60) + " Min"}
          </div>
        </h2>
        <p>{saveData.source}</p>
        <div className="card-actions justify-end">
          <div className="badge badge-outline">Tag-1</div>
          <div className="badge badge-outline">Tag-2</div>
          <div className="badge badge-outline">+5 more</div>
          <div className="badge px-0">
            <DropDown
              icon={<SlOptionsVertical />}
              direction="dropdown-top dropdown-end"
              options={[
                <p className="text-neutral">
                  <AiOutlineHeart /> Favourite
                </p>,
                <p className="text-neutral" onClick={archiveSaveHandler}>
                  <BsArchive /> Archive
                </p>,
                <p
                  className="text-neutral hover:bg-error/30"
                  onClick={deleteSaveHandler}
                >
                  <BsTrash />
                  Delete
                </p>,
              ]}
              optionsStyles="bg-primary"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
