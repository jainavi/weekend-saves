import { SlOptionsVertical } from "react-icons/sl";
import { AiOutlineHeart, AiFillHeart } from "react-icons/ai";
import { BsTrash, BsArchive, BsArchiveFill } from "react-icons/bs";

import DropDown from "../../components/DropDown";

export default function SaveCards({ saveData, onDelete, onChange }) {
  const saveId = saveData._id;
  const type = saveData.userOptions.type;

  const onFavouriteClickHandler = () => {
    if (type === 1) {
      onChange(type, saveId, 0);
      return;
    }
    onChange(type, saveId, 1);
  };

  const onArchiveClickHandler = () => {
    if (type === 2) {
      onChange(type, saveId, 0);
      return;
    }
    onChange(type, saveId, 2);
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
                <p className="text-neutral" onClick={onFavouriteClickHandler}>
                  {type === 1 ? <AiFillHeart /> : <AiOutlineHeart />}{" "}
                  {type === 1 ? "Favourited" : "Favourite"}
                </p>,
                <p className="text-neutral" onClick={onArchiveClickHandler}>
                  {type === 2 ? <BsArchiveFill /> : <BsArchive />}
                  {type === 2 ? "Archived" : "Archive"}
                </p>,
                <p
                  className="text-neutral hover:bg-error/30"
                  onClick={() => {
                    onDelete(type, saveData._id);
                  }}
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
