import {
  EURO_SYMBOL,
  classes,
  ITEM_GROUPS,
  ADDITION_TYPE,
  ADDITION_EFFECT,
} from "../utils";

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
    <div className="flex flex-col gap-2">
      <div className="bg-base-100 flex flex-col">
        <ul className="menu  font-bold  p-0 [&_li>*]:rounded-none [&_summary>*]:rounded-none">
          <li className="menu-title">Cart</li>
          {ITEM_GROUPS.map((group) => (
            <li className="" key={"GROUP:" + group._}>
              <details open className="">
                <summary className="rounded-none">{group.name}</summary>
                <ul>
                  {cartItems.filter(group.filterFunc).map((item) => {
                    const isSelected = isSelectedItem(item);
                    const isMultiple = item.qty > 1;

                    return (
                      <li key={item._id}>
                        <button
                          className={classes(
                            "flex flex-col gap-0",
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
                                {item.saved || (
                                  <span className="badge badge-warning badge-xs p-1 h-3">
                                    unsaved
                                  </span>
                                )}
                                {item.sent ? (
                                  <span className="badge badge-warning badge-xs p-1 h-3">
                                    Sent
                                  </span>
                                ) : (
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
      {cartItems.some((item) => !item.saved) && (
        <div
          className="btn rounded-none grow w-auto btn-outline btn-sm btn-warning"
          onClick={saveCart}
        >
          Save
        </div>
      )}
      {cartItems.every((item) => item.saved) &&
        cartItems.some((item) => !item.sent) &&
        (cartItems.some((item) => item.starter && !item.sent) ? (
          <div
            className="btn rounded-none grow w-auto btn-outline btn-sm btn-info"
            onClick={() => sendCart(false)}
          >
            Send Starter
          </div>
        ) : (
          <div
            className="btn rounded-none grow w-auto btn-outline btn-sm btn-success"
            onClick={() => sendCart(true)}
          >
            Send
          </div>
        ))}
    </div>
  );
}
