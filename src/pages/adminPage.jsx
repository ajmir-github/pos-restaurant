import { useDispatch, useSelector } from "react-redux";
import Layout from "../components/Layout";
import TopPanel from "../components/TopPanel";
import { useEffect, useState } from "react";
import { ICON_CHECK, ICON_EDIT, ICON_X_MARK } from "../utils/icons";
import { getCurrentUser, updateUser } from "../firebase";
import { AuthActions } from "../state";
import { classes } from "../utils";

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

export default function AdminPage() {
  const user = useSelector((state) => state.auth.user);

  return (
    <Layout>
      <TopPanel>{user.displayName || user.email}</TopPanel>
      <div>
        <div>
          <ChangeUserDisplayName />
        </div>
      </div>
    </Layout>
  );
}
