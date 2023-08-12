import {
  EURO_SYMBOL,
  ITEM_TYPE,
  MOD_COMPONENT,
  MOD_TYPE,
  generateID,
} from "../utils";
import { useState } from "react";
import {
  ICON_CHECK,
  ICON_DUPLICATE,
  ICON_TRASH,
  ICON_X_MARK,
} from "../utils/icons";

export default function EditItem({
  item,
  cancelEdit,
  editItemFromCart,
  addItemToCart,
  removeItemFromCart,
}) {
  const [qty, setQty] = useState(item.qty);
  const [price, setPrice] = useState(item.price);
  const [message, setMessage] = useState(item.message);
  const [mods, setMods] = useState(item.mods);
  const [starter, setStarter] = useState(item.starter || false);
  const increment = () => setQty(qty + 1);
  const decrement = () => qty > 1 && setQty(qty - 1);

  const removeItem = () => {
    removeItemFromCart(item);
    cancelEdit();
  };

  const onSave = () => {
    const editedItem = {
      ...item,
      qty,
      price,
      starter,
      message,
      mods,
    };
    editedItem.totalPrice = editedItem.mods.reduce((total, mod) => {
      if (mod.type === MOD_TYPE.addToPrice) {
        return total + mod.amount;
      }
      if (mod.type === MOD_TYPE.subtractFromPrice) {
        return total - mod.amount;
      }

      return total;
    }, editedItem.price);
    editItemFromCart(editedItem);
    cancelEdit();
  };

  const onInputChange = (mod) =>
    setMods(mods.map((a) => (a.name !== mod.name ? a : mod)));

  const duplicateItem = () =>
    addItemToCart({
      ...item,
      _id: generateID(),
    });

  return (
    <div className="flex flex-col gap-2 grow">
      <div className="card-title flex font-bold text-xl p-4">
        <div className="grow">{item.name}</div>
        <div>
          Price: {EURO_SYMBOL} {item.price}
        </div>
      </div>

      <div className="flex w-full">
        <div className="btn grow btn-primary" onClick={duplicateItem}>
          {ICON_DUPLICATE}
          Repeat the item
        </div>
      </div>

      {item.type === ITEM_TYPE.food && (
        <div className="form-control">
          <label className="label cursor-pointer">
            <span className="label-text">As a starter</span>
            <input
              type="checkbox"
              checked={starter}
              className="checkbox "
              onChange={(e) => setStarter(e.target.checked)}
            />
          </label>
        </div>
      )}

      <div className="flex gap-2 flex-col">
        {item.mods.map((mod, index) => {
          // checkbox
          if (mod.component === MOD_COMPONENT.checkbox)
            return (
              <div className="form-control" key={item._id + mod.name}>
                <label className="label cursor-pointer">
                  <span className="label-text">{mod.name}</span>
                  <input
                    type="checkbox"
                    defaultChecked={mod.value || item.defaultValue}
                    className="checkbox"
                    onChange={(e) =>
                      onInputChange({ ...mod, value: e.target.checked })
                    }
                  />
                </label>
              </div>
            );

          // select
          if (mod.component === MOD_COMPONENT.select)
            return (
              <select
                key={item._id + mod.name}
                className="select select-bordered w-full"
                defaultValue={mod.value || item.defaultValue}
                onChange={(e) =>
                  onInputChange({
                    ...mod,
                    ...mod.options.find(
                      (option) => option.value === e.target.value
                    ),
                  })
                }
              >
                {mod.options.map((option, index) => (
                  <option key={item.id + mod.name + index}>
                    {option.value}
                  </option>
                ))}
              </select>
            );
        })}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
        <div>
          <div className="opacity-60">Number of items</div>
          <div className="flex join">
            <button
              className="join-item btn btn-primary text-lg"
              onClick={decrement}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M19.5 12h-15"
                />
              </svg>
            </button>

            <input
              type="number"
              className="join-item input w-full input-bordered"
              value={qty}
              onChange={(e) => setQty(Number(e.target.value) || 1)}
            />
            <button
              className="join-item btn btn-primary text-lg"
              onClick={increment}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 4.5v15m7.5-7.5h-15"
                />
              </svg>
            </button>
          </div>
        </div>
        <div>
          <div className="opacity-60">Price per item</div>
          <div className="flex join">
            <input
              type="number"
              className="join-item input w-full input-bordered"
              value={price}
              onChange={(e) => setPrice(Number(e.target.value))}
            />
          </div>
        </div>
      </div>
      <div>
        <div className="opacity-60">Message</div>
        <textarea
          className="textarea w-full input-bordered"
          placeholder="Write your message here!"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        ></textarea>
      </div>

      <div className="join">
        <div className="btn join-item  grow btn-primary" onClick={onSave}>
          {ICON_CHECK}
          Save
        </div>
        <div className="btn join-item  grow btn-primary" onClick={removeItem}>
          {ICON_TRASH}
          Remove
        </div>
        <div className="btn join-item  grow btn-primary" onClick={cancelEdit}>
          {ICON_X_MARK}
          Cancel
        </div>
      </div>
    </div>
  );
}
