import { useSelector } from "react-redux";
import {
  ADDITION_EFFECT,
  ADDITION_TYPE,
  EURO_SYMBOL,
  ITEM_TYPE,
} from "../utils";
import { useEffect, useState } from "react";
import Layout from "../components/Layout";
import TopPanel from "../components/TopPanel";

function useNotification(url = "RZFWLXE-bell-hop-bell.mp3", orders) {
  const [ordersLength, setOrderslength] = useState(0);
  const audio = new Audio(url);
  const [ready, setReady] = useState(false);
  useEffect(() => {
    const listener = audio.addEventListener("canplaythrough", () =>
      setReady(true)
    );

    return () => removeEventListener("canplaythrough", listener);
  }, []);

  useEffect(() => {
    if (ordersLength !== orders.length) {
      setOrderslength(orders.length);
      if (ready) audio.play();
    }
  }, [orders]);
  return audio;
}

export default function KitchenPage() {
  const orders = useSelector((state) =>
    state.orders
      .filter((order) => order.types.includes(ITEM_TYPE.food))
      .sort((orderA, orderB) => orderA.sentAt - orderB.sentA)
  );

  const audio = useNotification("RZFWLXE-bell-hop-bell.mp3", orders);
  // audio.play()
  const itemFilter = (item) => item.type === ITEM_TYPE.food;

  return (
    <Layout>
      <TopPanel backHref={"/"} userName={"Ajmir Raziqi"}>
        <span>Orders:{orders.length}</span>
        {/* <span>Customers:{table.customers}</span> */}
      </TopPanel>
      <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
        {orders.map((order, index) => (
          <div key={order._id} className="flex flex-col">
            <div className="">
              <div className="flex justify-between px-2 font-bold">
                <span>Table: {order.tableNumber}</span>
                <span>Customers: {order.customers}</span>
              </div>

              <div className="px-2">
                {new Date(order.sentAt)
                  .toTimeString()
                  .split(" ")[0]
                  .split(":")
                  .slice(0, 2)
                  .join(":")}
              </div>
            </div>
            <div className="p-2 bg-base-content bg-opacity-10 gap-3 flex flex-col">
              {order.cartItems.filter(itemFilter).map((item, index) => (
                <div
                  className="flex w-full flex-col"
                  key={item._id + "IN_ORDER"}
                >
                  <div className="">
                    {index + 1} - {item.name}
                  </div>
                  {(item.additions || []).map((addition, index) => (
                    <div
                      key={item._id + ":ORDER_ADDITIONS_INDEX:" + index}
                      className="ml-4 flex gap-2 items-center"
                    >
                      {addition.component === ADDITION_TYPE.select
                        ? addition.value
                        : addition.name}
                    </div>
                  ))}
                  {item.message && <div className="ml-4">{item.message}</div>}
                </div>
              ))}
            </div>
            <div className="bg-base-content bg-opacity-10 flex">
              {![0, 1, 2].includes(index) ? (
                <button className=" btn rounded-none btn-primary  border-none btn-sm grow">
                  Take
                </button>
              ) : (
                <button className=" btn rounded-none btn-success  border-none btn-sm grow">
                  Ready
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
    </Layout>
  );
}
