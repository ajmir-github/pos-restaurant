import { ITEM_TYPE } from "../utils";
import { OrdersProvider } from "../state/OrdersState";
import PageLoading from "../components/PageLoading";
import Orders from "../components/Orders";

export default function BarPage() {
  return (
    <OrdersProvider
      loadingComponent={<PageLoading />}
      filterOrders={(order) =>
        order.types.includes(ITEM_TYPE.dessert) ||
        order.types.includes(ITEM_TYPE.drink)
      }
    >
      <Orders
        filterItems={(item) =>
          item.type === ITEM_TYPE.drink || item.type === ITEM_TYPE.dessert
        }
      />
    </OrdersProvider>
  );
}
