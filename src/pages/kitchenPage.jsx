import { useSelector } from "react-redux";
import Orders from "../components/Orders";
import { ITEM_TYPE } from "../utils";

export default function KitchenPage() {
  const orders = useSelector((state) => state.kitchen);

  return (
    <Orders
      filterItems={(item) => item.type === ITEM_TYPE.food}
      orders={orders}
    />
  );
}
