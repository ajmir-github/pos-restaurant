import {
  EURO_SYMBOL,
  deepClone,
  ITEM_TYPE,
  classes,
  ADDITION_TYPE,
} from "../utils";
import { useEffect, useState } from "react";

export default function EditItem({
  item,
  cancelEdit,
  editItemFromCart,
  removeItemFromCart,
}) {
  const [qty, setQty] = useState(item.qty);
  const [price, setPrice] = useState(item.price);
  const [message, setMessage] = useState(item.message);
  const [additions, setAdditions] = useState(item.additions);
  const [starter, setStarter] = useState(item.starter || false);
  const increment = () => setQty(qty + 1);
  const decrement = () => qty > 1 && setQty(qty - 1);

  const onSave = () => {
    editItemFromCart(
      deepClone({
        ...item,
        qty,
        price,
        starter,
        message,
        additions,
        edited: true,
      })
    );
    cancelEdit();
  };

  const removeAddition = (addition) =>
    setAdditions(additions.filter((a) => a.name !== addition.name));
  const additionsHad = (name) => additions.some((a) => a.name === name);
  const updateAddition = (addition) =>
    setAdditions(
      additions.map((a) => (a.name !== addition.name ? a : addition))
    );
  const additionAdd = (addition) => setAdditions([...additions, addition]);

  const onInputChange = (addition) => {
    // delete
    if (addition.value === addition.defaultValue)
      return removeAddition(addition);
    //  update
    if (additionsHad(addition.name)) return updateAddition(addition);
    // add
    additionAdd(addition);
  };

  const allAdditions = item.possibleAdditions.map(
    (additionA) =>
      additions.find((additionB) => additionA.name === additionB.name) ||
      additionA
  );

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
              defaultChecked={item.starter}
              checked={starter}
              className="checkbox"
              onChange={(e) => setStarter(e.target.checked)}
            />
          </label>
        </div>
      )}

      <div className="flex gap-1 flex-col">
        {allAdditions.map((addition, index) => {
          // checkbox
          if (addition.component === ADDITION_TYPE.checkbox)
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
          if (addition.component === ADDITION_TYPE.select)
            return (
              <select
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
        <div className="flex join rounded-none">
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
            className="join-item input w-full"
            value={qty}
            onChange={(e) => setQty(Number(e.target.value) || 1)}
          />
          <button
            className="join-item btn btn-secondary text-lg"
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
        <div className="flex join rounded-none">
          <input
            type="number"
            className="join-item input w-full"
            value={price}
            onChange={(e) => setPrice(Number(e.target.value))}
          />
        </div>
      </div>

      <div>
        <div className="opacity-60">Message</div>
        <textarea
          className="textarea rounded-none w-full"
          placeholder="Write your message here!"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        ></textarea>
      </div>

      <div className="flex gap-2">
        <div
          className="btn rounded-none grow w-auto btn-outline btn-sm btn-success"
          onClick={onSave}
        >
          Save
        </div>
        <div
          className="btn rounded-none grow w-auto btn-outline btn-sm btn-error"
          onClick={() => removeItemFromCart(item)}
        >
          Remove
        </div>
        <div
          className="btn rounded-none grow w-auto btn-outline btn-sm btn-warning"
          onClick={cancelEdit}
        >
          Cancel
        </div>
      </div>
    </div>
  );
}
