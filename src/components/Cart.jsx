import {
  EURO_SYMBOL,
  classes,
  ITEM_GROUPS,
  MOD_COMPONENT,
  MOD_TYPE,
  ITEM_TYPE,
} from "../utils";
import {
  ICON_EDIT,
  ICON_MORE,
  ICON_PAY,
  ICON_PRINTER,
  ICON_SEND,
} from "../utils/icons";

export default function Cart({
  table,
  cartItems,
  isSelectedItem,
  setSelectedItem,
  saveCart,
  sendCart,
  closeTable,
  printReceipt,
}) {
  const total = cartItems.reduce(
    (art, item) => art + item.totalPrice * (item.qty || 1),
    0
  );
  return (
    <div className="flex flex-col gap-2 justify-start items-stretch">
      <div className="flex join">
        <div className="btn join-item grow  btn-success" onClick={closeTable}>
          {ICON_PAY}
          Pay
        </div>

        <div className="btn join-item grow  btn-warning" onClick={printReceipt}>
          {ICON_PRINTER}
          Reciept
        </div>

        <div className="btn join-item grow  btn-primary">
          {ICON_MORE}
          More
        </div>
      </div>
      <div className="bg-gray-500 bg-opacity-10 rounded-box flex flex-col">
        <ul className="menu menu-sm sm:menu-md">
          {ITEM_GROUPS.map((group) => (
            <li className="font-bold" key={"GROUP:" + group._id}>
              <details open className="">
                <summary>{group.name}</summary>
                <ul>
                  {cartItems.filter(group.filterFunc).map((item) => {
                    const isSelected = isSelectedItem(item);
                    const isMultiple = item.qty > 1;

                    return (
                      <li key={item._id}>
                        <button
                          className={classes(
                            "flex flex-col gap-1",
                            isSelected && "border-l-4 border-l-primary",
                            item.edited && "border-r-4 border-r-warning",
                            item.removed && "btn-disabled line-through"
                          )}
                          onClick={() => setSelectedItem(item, isSelected)}
                        >
                          <div className={"flex w-full gap-1"}>
                            <span className="grow flex  items-center justify-between gap-1">
                              {isMultiple && item.qty + "x"} {item.name}{" "}
                              <span className="flex gap-1 flex-col">
                                {item.sent || (
                                  <span className="badge badge-warning badge-xs p-1 h-3">
                                    not sent
                                  </span>
                                )}
                              </span>
                            </span>
                            {isMultiple ? (
                              <span className="flex gap-1">
                                <span>
                                  {EURO_SYMBOL}
                                  {item.totalPrice}
                                </span>
                                <span>
                                  {EURO_SYMBOL}
                                  {item.totalPrice * item.qty}
                                </span>
                              </span>
                            ) : (
                              <span>
                                {EURO_SYMBOL}
                                {item.totalPrice}
                              </span>
                            )}
                          </div>
                          <div className="flex w-full flex-col pl-4">
                            {(item.mods || [])
                              .filter(
                                (mod) =>
                                  mod.required || mod.defaultValue !== mod.value
                              )
                              .map((mod, index) => (
                                <div
                                  key={item._id + ":CART_MODS_INDEX:" + index}
                                  className="flex gap-2 items-center"
                                >
                                  <span>
                                    {mod.component === MOD_COMPONENT.select
                                      ? mod.value
                                      : mod.name}
                                  </span>
                                  {mod.type === MOD_TYPE.addToPrice && (
                                    <span className="badge badge-sm  badge-outline badge-info">
                                      {EURO_SYMBOL}
                                      {item.price}+{EURO_SYMBOL}
                                      {mod.amount}
                                    </span>
                                  )}
                                  {mod.type === MOD_TYPE.subtractFromPrice && (
                                    <span className="badge badge-sm  badge-outline badge-info">
                                      {EURO_SYMBOL}
                                      {item.price}-{EURO_SYMBOL}
                                      {mod.amount}
                                    </span>
                                  )}
                                </div>
                              ))}
                            {item.message && <div>{item.message}</div>}
                          </div>
                        </button>
                      </li>
                    );
                  })}
                </ul>
              </details>
            </li>
          ))}
        </ul>
        <div className="font-bold text-center p-2">
          Total: {EURO_SYMBOL} {total}
        </div>
      </div>

      <div className="flex flex-col gap-2">
        {table.stats.hasUnsentDrinks && (
          <div
            className="btn grow btn-primary"
            onClick={() =>
              sendCart((item) => ITEM_TYPE.drink === item.type && !item.sent)
            }
          >
            {ICON_SEND}
            Drinks
          </div>
        )}
        {table.stats.hasUnsentDesserts && (
          <div
            className="btn grow btn-secondary"
            onClick={() =>
              sendCart((item) => ITEM_TYPE.dessert === item.type && !item.sent)
            }
          >
            {ICON_SEND}
            Desserts
          </div>
        )}

        {table.stats.hasUnsentStarters && (
          <div
            className="btn grow btn-info"
            onClick={() =>
              sendCart(
                (item) =>
                  item.type === ITEM_TYPE.food && item.starter && !item.sent
              )
            }
          >
            {ICON_SEND}
            Starter
          </div>
        )}

        {table.stats.hasUnsentMains && (
          <div
            className="btn grow btn-success"
            onClick={() =>
              sendCart(
                (item) =>
                  item.type === ITEM_TYPE.food && !item.starter && !item.sent
              )
            }
          >
            {ICON_SEND}
            Mains
          </div>
        )}
      </div>
    </div>
  );
}
