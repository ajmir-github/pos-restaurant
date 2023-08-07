import {
  EURO_SYMBOL,
  classes,
  ITEM_GROUPS,
  ADDITION_TYPE,
  ADDITION_EFFECT,
} from "../utils";
import { ICON_SEND } from "../utils/icons";

export default function Cart({
  cartItems,
  isSelectedItem,
  setSelectedItem,
  saveCart,
  sendCart,
}) {
  const total = cartItems.reduce(
    (art, item) => art + item.totalPrice * (item.qty || 1),
    0
  );
  return (
    <div className="flex flex-col gap-2 justify-start items-stretch">
      <div className="bg-base-100 flex flex-col text-lg">
        <ul className="menu ">
          {ITEM_GROUPS.map((group) => (
            <li className="text-lg" key={"GROUP:" + group._id}>
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
                            {(item.additions || []).map((addition, index) => (
                              <div
                                key={
                                  item._id + ":CART_ADDITIONS_INDEX:" + index
                                }
                                className="flex gap-2 items-center"
                              >
                                <span>
                                  {addition.component === ADDITION_TYPE.select
                                    ? addition.value
                                    : addition.name}
                                </span>
                                {addition.action ===
                                  ADDITION_EFFECT.addToPrice && (
                                  <span className="badge badge-sm  badge-outline badge-info">
                                    {EURO_SYMBOL}
                                    {item.price}+{EURO_SYMBOL}
                                    {addition.amount}
                                  </span>
                                )}
                                {addition.action ===
                                  ADDITION_EFFECT.subtractFromPrice && (
                                  <span className="badge badge-sm  badge-outline badge-info">
                                    {EURO_SYMBOL}
                                    {item.price}-{EURO_SYMBOL}
                                    {addition.amount}
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

      {cartItems.some((item) => !item.sent) &&
        (cartItems.some((item) => item.starter && !item.sent) ? (
          <div className="btn grow btn-info" onClick={() => sendCart(false)}>
            {ICON_SEND}
            Send Starter
          </div>
        ) : (
          <div className="btn grow btn-success" onClick={() => sendCart(true)}>
            {ICON_SEND}
            Send Mains
          </div>
        ))}
    </div>
  );
}
