import { useSelector } from "react-redux";
import {
  ADDITION_EFFECT,
  ADDITION_TYPE,
  EURO_SYMBOL,
  ITEM_TYPE,
  ORDER_STATUS,
  classes,
  conditionalComponents,
} from "../utils";
import Layout from "../components/Layout";
import TopPanel from "../components/TopPanel";
import useNotification from "../hooks/useNotification";
import { useState } from "react";
import { setOrder } from "../firebase";

export default function BarPage() {
  const FILTER_OPTIONS = {
    all: "All",
    waitingAndReady: "Waiting and Ready",
    waiting: "Waiting",
    ready: "Ready",
    pinned: "Pinned",
  };
  const FILTER_OPTIONS_ARRAY = [
    "all",
    "waitingAndReady",
    "waiting",
    "ready",
    "pinned",
  ];
  const FILTER_FUNCS = {
    [FILTER_OPTIONS.all]: () => true,
    [FILTER_OPTIONS.waitingAndReady]: (order) =>
      order.status === ORDER_STATUS.working ||
      order.status === ORDER_STATUS.waiting,
    [FILTER_OPTIONS.waiting]: (order) => order.status === ORDER_STATUS.waiting,
    [FILTER_OPTIONS.ready]: (order) => order.status === ORDER_STATUS.ready,
    [FILTER_OPTIONS.pinned]: (order) => order.status === ORDER_STATUS.pinned,
  };
  const orders = useSelector((state) => state.orders);

  const audio = useNotification(orders);
  const [filterOption, setFilterOption] = useState(
    FILTER_OPTIONS.waitingAndReady
  );

  return (
    <Layout>
      <TopPanel backHref={"/"} userName={"Ajmir Raziqi"}>
        <span>Orders:{orders.length}</span>
        {/* <span>Customers:{table.customers}</span> */}
      </TopPanel>
      <div className="tabs tabs-boxed flex">
        {FILTER_OPTIONS_ARRAY.map((key) => (
          <button
            onClick={() => setFilterOption(FILTER_OPTIONS[key])}
            className={classes(
              "tab grow",
              filterOption === FILTER_OPTIONS[key] && "tab-active"
            )}
          >
            {FILTER_OPTIONS[key]}
          </button>
        ))}
      </div>
      <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
        {orders
          .filter(FILTER_FUNCS[filterOption])
          .filter(
            (order) =>
              order.types.includes(ITEM_TYPE.drink) ||
              order.types.includes(ITEM_TYPE.dessert)
          )
          .sort((orderA, orderB) => orderA.sentAt - orderB.sentA)
          .map((order, index) => {
            const changeOrderStatus = (status) => {
              setOrder({
                ...order,
                status,
              });
            };

            return (
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
                  {order.cartItems
                    .filter(
                      (item) =>
                        item.type === ITEM_TYPE.drink ||
                        item.type === ITEM_TYPE.dessert
                    )
                    .map((item, index) => (
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
                        {item.message && (
                          <div className="ml-4">{item.message}</div>
                        )}
                      </div>
                    ))}
                </div>
                <div className="bg-base-content bg-opacity-10 flex">
                  {conditionalComponents(order.status, {
                    [ORDER_STATUS.waiting]: (
                      <button
                        className=" btn rounded-none btn-primary  border-none btn-sm grow"
                        onClick={() => changeOrderStatus(ORDER_STATUS.working)}
                      >
                        Take
                      </button>
                    ),
                    [ORDER_STATUS.working]: (
                      <button
                        className=" btn rounded-none btn-success  border-none btn-sm grow"
                        onClick={() => changeOrderStatus(ORDER_STATUS.ready)}
                      >
                        Ready
                      </button>
                    ),
                    [ORDER_STATUS.ready]: (
                      <button
                        className=" btn rounded-none btn-error  border-none btn-sm grow"
                        onClick={() => changeOrderStatus(ORDER_STATUS.pinned)}
                      >
                        Pin
                      </button>
                    ),
                  })}
                </div>
              </div>
            );
          })}
      </div>
    </Layout>
  );
}
