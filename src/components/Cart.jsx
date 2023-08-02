import { EURO_SYMBOL, classes, ITEM_GROUPS, ADDITION_TYPE } from "../utils";

export default function Cart({
  cartItems,
  activeItem,
  setSelectedItem,
  sendCart,
}) {
  const total = cartItems.reduce(
    (art, item) => art + item.price * (item.qty || 1),
    0
  );
  return (
    <div className="flex flex-col gap-2">
      <div className="bg-base-100 flex flex-col">
        <ul className="menu  font-bold  p-0 [&_li>*]:rounded-none [&_summary>*]:rounded-none">
          <li className="menu-title">Cart</li>
          {ITEM_GROUPS.map((group) => (
            <li className="" key={"GROUP:" + group.id}>
              <details open className="">
                <summary className="rounded-none">{group.name}</summary>
                <ul>
                  {cartItems.filter(group.filterFunc).map((item) => {
                    const isSelected = activeItem(item);
                    const isMultiple = item.qty > 1;

                    return (
                      <li key={item.id}>
                        <button
                          className={classes(
                            "flex flex-col gap-0",
                            isSelected && "border-l-4 border-l-primary",
                            item.edited && "border-r-4 border-r-warning"
                          )}
                          onClick={() => setSelectedItem(item, isSelected)}
                        >
                          <div className={"flex w-full"}>
                            <span className="grow flex  items-center gap-1">
                              {isMultiple && item.qty + "x"} {item.name}{" "}
                            </span>
                            {isMultiple ? (
                              <span className="flex gap-1">
                                <span>
                                  {EURO_SYMBOL}
                                  {item.price}
                                </span>
                                <span>
                                  {EURO_SYMBOL}
                                  {item.price * item.qty}
                                </span>
                              </span>
                            ) : (
                              <span>
                                {EURO_SYMBOL}
                                {item.price}
                              </span>
                            )}
                          </div>
                          <div className="flex w-full flex-col pl-4">
                            {(item.additions || []).map((addition, index) => (
                              <div key={item.id + ":CART_ADDITION:" + addition}>
                                {addition}
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
      {cartItems.some((item) => !item.sent || item.edited) && (
        <div
          className="btn rounded-none grow w-auto btn-outline btn-sm btn-warning"
          onClick={sendCart}
        >
          Send
        </div>
      )}
    </div>
  );
}
