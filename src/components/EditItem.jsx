import { EURO_SYMBOL, ITEM_TYPE, MOD_COMPONENT, MODE_TYPE } from "../utils";
import { useState } from "react";
import { ICON_CHECK, ICON_TRASH, ICON_X_MARK } from "../utils/icons";

export default function EditItem({
  item,
  cancelEdit,
  editItemFromCart,
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
    editedItem.totalPrice = editedItem.mods.reduce((total, addition) => {
      if (addition.action === MODE_TYPE.addToPrice) {
        return total + addition.amount;
      }
      if (addition.action === MODE_TYPE.subtractFromPrice) {
        return total - addition.amount;
      }
      return total;
    }, editedItem.price);
    editItemFromCart(editedItem);
    cancelEdit();
  };

  const onInputChange = (mod) =>
    setMods(mods.map((a) => (a.name !== mod.name ? a : mod)));

  return (
    <div className="flex flex-col gap-2 grow">
      <div className="card-title flex">
        <div className="grow">{item.name}</div>
        <div>
          Price: {EURO_SYMBOL} {item.price}
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

      <div className="flex gap-1 flex-col">
        {item.mods.map((addition, index) => {
          // checkbox
          if (addition.component === MOD_COMPONENT.checkbox)
            return (
              <div className="form-control" key={item._id + addition.name}>
                <label className="label cursor-pointer">
                  <span className="label-text">{addition.name}</span>
                  <input
                    type="checkbox"
                    defaultChecked={addition.value || item.defaultValue}
                    // checked={addition.value}
                    className="checkbox"
                    onChange={(e) =>
                      onInputChange({ ...addition, value: e.target.checked })
                    }
                  />
                </label>
              </div>
            );

          // select
          if (addition.component === MOD_COMPONENT.select)
            return (
              <select
                key={item._id + addition.name}
                className="select select-bordered w-full"
                defaultValue={addition.value || item.defaultValue}
                onChange={(e) =>
                  onInputChange({ ...addition, value: e.target.value })
                }
              >
                {addition.options.map((option, index) => (
                  <option key={item.id + addition.name + index}>
                    {option}
                  </option>
                ))}
              </select>
            );
        })}
      </div>

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
