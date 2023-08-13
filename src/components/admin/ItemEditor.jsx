import { useSelector } from "react-redux";
import { useState } from "react";
import { setItem } from "../../firebase";
import {
  ITEM_COLOR,
  ITEM_TYPE,
  ITEM_TYPES,
  classes,
  generateID,
} from "../../utils";
import Feed from "../Feed";
import { ICON_X_MARK } from "../../utils/icons";

function ItemCoreEditor({ selectedItem }) {
  const categories = useSelector((state) => state.categories);
  const [loading, setLoading] = useState(false);
  const [alert, setAlert] = useState(false);
  const INPUT_NAMES = {
    name: "name",
    type: "type",
    category: "category",
    price: "price",
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
    const item = {
      name: form.get(INPUT_NAMES.name),
      type: form.get(INPUT_NAMES.type),
      category: form.get(INPUT_NAMES.category),
      price: Number(form.get(INPUT_NAMES.price)),
      color: form.get(INPUT_NAMES.color),
    };

    setItem({
      qty: 1,
      mods: [],
      message: "",
      totalPrice: item.price,
      _id: generateID(),
      ...item,
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

      <div className="form-control w-full">
        <label className="label">
          <span className="label-text">Name</span>
        </label>

        <input
          type="text"
          className="input input-bordered w-full "
          name={INPUT_NAMES.name}
          defaultValue={selectedItem && selectedItem.name}
          required
          disabled={loading}
        />
      </div>

      <div className="join">
        <div className="join-item form-control w-full ">
          <label className="label">
            <span className="label-text">Price</span>
          </label>

          <input
            type="number"
            className="input input-bordered w-full "
            name={INPUT_NAMES.price}
            step=".01"
            required
            disabled={loading}
            defaultValue={selectedItem && selectedItem.price}
          />
        </div>
        <div className="join-item form-control w-full ">
          <label className="label">
            <span className="label-text">Type</span>
          </label>

          <select
            className="select select-bordered w-full "
            defaultValue={(selectedItem && selectedItem.type) || ITEM_TYPE.food}
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
      </div>

      <div className="join">
        <div className="join-item form-control w-full ">
          <label className="label">
            <span className="label-text">Category</span>
          </label>

          <select
            className="select select-bordered w-full "
            defaultValue={
              (selectedItem && selectedItem.category) || categories[0]
            }
            name={INPUT_NAMES.category}
            required
            disabled={loading}
          >
            {categories.map((category, index) => (
              <option key={index} value={category.name}>
                {category.name}
              </option>
            ))}
          </select>
        </div>

        <div className="join-item form-control w-full ">
          <label className="label">
            <span className="label-text">Color</span>
          </label>

          <select
            className="select select-bordered w-full "
            defaultValue={
              (selectedItem && selectedItem.color) || ITEM_COLOR.primary
            }
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
      </div>

      {loading ? (
        <div className="flex justify-center p-2">
          <span className="loading loading-infinity loading-lg"></span>
        </div>
      ) : (
        <button className="join-item btn btn-primary grow" type="submit">
          {selectedItem ? "Edit" : "Create"}
        </button>
      )}
    </form>
  );
}

function EditItem() {
  const [selectedItem, setSelectedItem] = useState(null);
  const select = (item) => setSelectedItem(item);
  return (
    <div className="flex gap-2 w-full">
      {selectedItem ? (
        <div className="grid gap-2 w-full">
          <div className="grow flex justify-end">
            <button
              className="join-item btn btn-ghost btn-circle"
              onClick={() => setSelectedItem(null)}
            >
              {ICON_X_MARK}
            </button>
          </div>
          <ItemCoreEditor selectedItem={selectedItem} />

          <div className="join w-full">
            <button className="join-item btn btn-success grow">
              Save mods
            </button>
            <button className="join-item btn btn-error grow">
              Remove Item
            </button>
          </div>
        </div>
      ) : (
        <Feed addItemToCart={select} />
      )}
    </div>
  );
}

function ItemEditor() {
  const TAB = {
    add: "add",
    edit: "edit",
  };
  const [tab, setTab] = useState(TAB.add);
  const tabElement = (
    <div className="tabs tabs-boxed font-bold w-full">
      {Object.values(TAB).map((value, index) => (
        <button
          key={index}
          className={classes("tab", tab === value && "tab-active")}
          onClick={() => setTab(value)}
        >
          {value}
        </button>
      ))}
    </div>
  );
  return (
    <div className="w-full flex flex-col gap-4 items-center">
      {tabElement}
      <div className="max-w-lg w-full">
        {tab === TAB.add && <ItemCoreEditor />}
        {tab === TAB.edit && <EditItem />}
      </div>
    </div>
  );
}

export default ItemEditor;
