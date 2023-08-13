import { useEffect, useState } from "react";
import { updateUser } from "../../firebase";

const ProfileEditor = () => {
  const [loading, setLoading] = useState(false);
  const [alert, setAlert] = useState(false);
  const INPUT_NAMES = {
    displayName: "displayName",
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    const form = new FormData(e.target);
    const onCompeletion = () => {
      e.target.reset();
      setLoading(false);
      setAlert(true);
    };
    const user = {
      displayName: form.get(INPUT_NAMES.displayName),
    };
    updateUser(user).then(onCompeletion());
  };

  return (
    <form className="grid gap-4" onSubmit={handleSubmit}>
      {alert && (
        <div className="alert alert-success">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="stroke-current shrink-0 h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          <span>User has been successfully updated!</span>
        </div>
      )}

      <div className="form-control w-full">
        <label className="label">
          <span className="label-text">Full name</span>
        </label>

        <input
          type="text"
          className="input input-bordered w-full "
          name={INPUT_NAMES.displayName}
          required
          disabled={loading}
        />
      </div>

      {loading ? (
        <div className="flex justify-center p-2">
          <span className="loading loading-infinity loading-lg"></span>
        </div>
      ) : (
        <button className="join-item btn btn-primary grow" type="submit">
          Edit
        </button>
      )}
    </form>
  );
};

export default ProfileEditor;
