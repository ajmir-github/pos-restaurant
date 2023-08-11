import { useSelector } from "react-redux";
import Orders from "../components/Orders";
import { ITEM_TYPE } from "../utils";

export default function BarPage() {
  const orders = useSelector((state) => state.bar);
  return (
    <Orders
      filterItems={(item) => item.type === ITEM_TYPE.food}
      orders={orders}
    />
  );
}
