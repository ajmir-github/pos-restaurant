import { ITEM_TYPE } from "../utils";
import { OrdersProvider } from "../state/OrdersState";
import PageLoading from "../components/PageLoading";
import Orders from "../components/Orders";

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

  const audio = useNotification(orders);
  const [filterOption, setFilterOption] = useState(
    FILTER_OPTIONS.waitingAndReady
  );
  return (
    <OrdersProvider
      loadingComponent={<PageLoading />}
      filterOrders={(order) => order.types.includes(ITEM_TYPE.food)}
    >
      <Orders
        filterItems={(item) => item.type === ITEM_TYPE.food}
        filterComponent={<div>wait</div>}
      />
    </OrdersProvider>
  );
}
