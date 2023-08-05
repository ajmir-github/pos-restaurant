import { useSelector } from "react-redux";
import { ADDITION_EFFECT, ADDITION_TYPE, EURO_SYMBOL } from "../utils";

export default function KitchenPage() {
  const orders = useSelector((state) => state.orders);
  return (
    <div>
      <div className="overflow-x-auto">
        <table className="table table-zebra table-lg">
          {/* head */}
          <thead>
            <tr>
              <th>Table</th>
              <th>Order</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {orders
              .sort((oA, oB) => oA.sentAt - oB.sentAt)
              .map((order) => (
                <tr key={order._id}>
                  <td>{order.tableNumber}</td>
                  {order.cartItems.map((item) => (
                    <td
                      className="flex w-full flex-col pl-4"
                      key={item._id + "IN_ORDER"}
                    >
                      <div className="font-bold">{item.name}</div>
                      {(item.additions || []).map((addition, index) => (
                        <div
                          key={item._id + ":ORDER_ADDITIONS_INDEX:" + index}
                          className="flex gap-2 items-center"
                        >
                          {addition.component === ADDITION_TYPE.select
                            ? addition.name + " : " + addition.value
                            : addition.name}
                        </div>
                      ))}
                      {item.message && <div>{item.message}</div>}
                    </td>
                  ))}
                  <td>
                    <button className="btn btn-ghost">Take</button>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
