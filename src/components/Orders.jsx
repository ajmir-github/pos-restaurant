import {
  MOD_COMPONENT,
  ORDER_STATUS,
  classes,
  conditionalComponents,
} from "../utils";
import Layout from "../components/Layout";
import TopPanel from "../components/TopPanel";
import useNotification from "../hooks/useNotification";
import { useEffect, useState } from "react";
import { setOrder } from "../firebase";
import dayjs from "dayjs";
import { ICON_STACK } from "../utils/icons";

function Order({ order, filterItems }) {
  const changeOrderStatus = (status) => {
    setOrder({
      ...order,
      status,
    });
  };

  const [timePassed, setTimePassed] = useState("");
  const checkPassedTime = () => {
    if (!order.sentAt) return false;
    const minutes = dayjs(new Date()).diff(order.sentAt, "minute");
    if (minutes > 1) {
      setTimePassed(`${minutes} mins`);
    } else {
      setTimePassed("New");
    }
    return true;
  };
  useEffect(() => {
    checkPassedTime();
    const unsub = setInterval(() => {
      checkPassedTime() || clearInterval(unsub);
    }, 1000 * 60);
    return () => clearInterval(unsub);
  }, []);
  return (
    <div className="flex flex-col">
      <div className="">
        <div className="flex justify-between px-2 font-bold">
          <span>Table: {order.tableNumber}</span>
          <span>Customers: {order.customers}</span>
        </div>

        <div className="px-2">{timePassed}</div>
      </div>
      <div className="p-2 gap-3 flex flex-col base-content">
        {order.cartItems.filter(filterItems).map((item, index) => (
          <div className="flex w-full flex-col" key={item._id + "IN_ORDER"}>
            <div className="">
              {index + 1} - {item.name}
            </div>
            {item.mods
              .filter((mod) => mod.required || mod.defaultValue !== mod.value)
              .map((mod, index) => (
                <div
                  key={item._id + ":ORDER_MODS_INDEX:" + index}
                  className="ml-4 flex gap-2 items-center text-secondary"
                >
                  {mod.component === MOD_COMPONENT.select
                    ? mod.value
                    : mod.name}
                </div>
              ))}
            {item.message && (
              <div className="ml-4 text-secondary">{item.message}</div>
            )}
          </div>
        ))}
      </div>
      <div className="flex">
        {conditionalComponents(order.status, {
          [ORDER_STATUS.waiting]: (
            <button
              className=" btn  btn-primary   grow"
              onClick={() => changeOrderStatus(ORDER_STATUS.working)}
            >
              Take
            </button>
          ),
          [ORDER_STATUS.working]: (
            <button
              className=" btn  btn-success   grow"
              onClick={() => changeOrderStatus(ORDER_STATUS.ready)}
            >
              Ready
            </button>
          ),
          [ORDER_STATUS.ready]: (
            <button
              className=" btn  btn-error   grow"
              onClick={() => changeOrderStatus(ORDER_STATUS.pinned)}
            >
              Pin
            </button>
          ),
        })}
      </div>
    </div>
  );
}

export default function Orders({ orders, filterItems }) {
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

  const audio = useNotification(orders);
  const [filterOption, setFilterOption] = useState(
    FILTER_OPTIONS.waitingAndReady
  );

  return (
    <Layout>
      <TopPanel backHref={"/"} userName={"Ajmir Raziqi"}>
        <span className="flex gap-2 items-center">
          {ICON_STACK}
          {orders.length}
        </span>
      </TopPanel>
      <div className="tabs tabs-boxed flex">
        {FILTER_OPTIONS_ARRAY.map((key, index) => (
          <button
            key={index}
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
          .sort((orderA, orderB) => orderA.sentAt - orderB.sentA)
          .map((order, index) => (
            <Order order={order} key={order._id} filterItems={filterItems} />
          ))}
      </div>
    </Layout>
  );
}
