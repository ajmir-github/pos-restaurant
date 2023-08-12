import { useDispatch, useSelector } from "react-redux";
import Layout from "../components/Layout";
import TopPanel from "../components/TopPanel";
import { useEffect, useState } from "react";
import { ICON_CHECK, ICON_EDIT, ICON_X_MARK } from "../utils/icons";
import { getCurrentUser, updateUser } from "../firebase";
import { AuthActions } from "../state";
import { ITEM_COLOR, ITEM_TYPE, ITEM_TYPES, classes } from "../utils";

const ChangeUserDisplayName = () => {
  const [saved, setSaved] = useState(false);
  const user = useSelector((state) => state.auth.user);
  const initValue = user.displayName || "";
  const [editable, setEditable] = useState(false);
  const [displayName, setDisplayName] = useState(initValue);
  const handleInputChange = (e) => {
    setSaved(false);
    setDisplayName(e.target.value);
  };
  const handleSaveButton = () => {
    updateUser({ displayName }).then(() => {
      setEditable(false);
      setSaved(true);
    });
  };
  return (
    <div className="w-full items-center">
      <div className={classes("join w-full items-center")}>
        <input
          type="text"
          placeholder="Type here"
          value={displayName}
          disabled={!editable}
          onChange={handleInputChange}
          className={classes(
            "join-item input w-full input-bordered",
            editable && "input-primary"
          )}
        />

        {saved && !editable && (
          <span className="join-item text-success mx-4">{ICON_CHECK}</span>
        )}
        {editable ? (
          <>
            {initValue !== displayName && (
              <button
                className=" join-item btn btn-success"
                onClick={handleSaveButton}
              >
                {ICON_CHECK}
              </button>
            )}
            <button
              className=" join-item btn btn-error"
              onClick={() => setEditable(false)}
            >
              {ICON_X_MARK}
            </button>
          </>
        ) : (
          <button
            className=" join-item btn btn-primary"
            onClick={() => setEditable(true)}
          >
            {ICON_EDIT}
          </button>
        )}
      </div>
    </div>
  );
};

function AddItems() {
  return (
    <form className="grid gap-4">
      <div className="form-control w-full">
        <label className="label">
          <span className="label-text">Name</span>
        </label>

        <input
          type="text"
          className="input input-bordered w-full "
          name="name"
        />
      </div>

      <div className="form-control w-full ">
        <label className="label">
          <span className="label-text">Type</span>
        </label>

        <select
          className="select select-bordered w-full "
          defaultValue={ITEM_TYPE.food}
          name="type"
        >
          {ITEM_TYPES.map((type, index) => (
            <option key={index} value={type}>
              {type}
            </option>
          ))}
        </select>
      </div>
      <div className="form-control w-full ">
        <label className="label">
          <span className="label-text">Price</span>
        </label>

        <input
          type="number"
          className="input input-bordered w-full "
          name="price"
        />
      </div>

      <div className="form-control w-full ">
        <label className="label">
          <span className="label-text">Color</span>
        </label>

        <select
          className="select select-bordered w-full "
          defaultValue={ITEM_COLOR.primary}
          name="color"
        >
          {Object.entries(ITEM_COLOR).map(([key, value], index) => (
            <option value={value} key={index}>
              {key}
            </option>
          ))}
        </select>
      </div>

      <div className="join w-full">
        <button className="join-item btn btn-error grow" type="submit">
          Reset
        </button>
        <button className="join-item btn btn-primary grow" type="submit">
          Create
        </button>
      </div>
    </form>
  );
}

export default function AdminPage() {
  const user = useSelector((state) => state.auth.user);

  return (
    <Layout>
      <TopPanel>{user.displayName || user.email}</TopPanel>
      <div className="flex flex-col gap-4">
        <ChangeUserDisplayName />
        <AddItems />
      </div>
    </Layout>
  );
}
