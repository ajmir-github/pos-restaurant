import { useState } from "react";
import { setCategory } from "../../firebase";
import { ITEM_COLOR, ITEM_TYPE, ITEM_TYPES, generateID } from "../../utils";

function CategoryEditor() {
  const [loading, setLoading] = useState(false);
  const [alert, setAlert] = useState(false);
  const INPUT_NAMES = {
    type: "type",
    name: "name",
    color: "color",
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
    const category = {
      name: form.get(INPUT_NAMES.name),
      type: form.get(INPUT_NAMES.type),
      color: form.get(INPUT_NAMES.color),
    };

    setCategory({
      ...category,
      _id: generateID(),
    }).then(onCompeletion);
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
          <span>Item has been successfully added!</span>
        </div>
      )}

      <div className="form-control w-full ">
        <label className="label">
          <span className="label-text">Type</span>
        </label>

        <select
          className="select select-bordered w-full "
          defaultValue={ITEM_TYPE.food}
          name={INPUT_NAMES.type}
          required
          disabled={loading}
        >
          {ITEM_TYPES.map((type, index) => (
            <option key={index} value={type}>
              {type}
            </option>
          ))}
        </select>
      </div>

      <div className="form-control w-full">
        <label className="label">
          <span className="label-text">Name</span>
        </label>

        <input
          type="text"
          className="input input-bordered w-full "
          name={INPUT_NAMES.name}
          required
          disabled={loading}
        />
      </div>

      <div className="form-control w-full ">
        <label className="label">
          <span className="label-text">Color</span>
        </label>

        <select
          className="select select-bordered w-full "
          defaultValue={ITEM_COLOR.primary}
          name={INPUT_NAMES.color}
          required
          disabled={loading}
        >
          {Object.entries(ITEM_COLOR).map(([key, value], index) => (
            <option value={value} key={index}>
              {key}
            </option>
          ))}
        </select>
      </div>

      {loading ? (
        <div className="flex justify-center p-2">
          <span className="loading loading-infinity loading-lg"></span>
        </div>
      ) : (
        <button className="join-item btn btn-primary grow" type="submit">
          Create
        </button>
      )}
    </form>
  );
}

export default CategoryEditor;
