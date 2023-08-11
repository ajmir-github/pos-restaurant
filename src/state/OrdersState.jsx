import {
  useReducer,
  createContext,
  useState,
  useContext,
  useEffect,
} from "react";
import { orderRef, trackChanges } from "../firebase";

const OrdersContext = createContext();

export const OrdersActions = {
  feed: "ORDER_FEED",
};

const initialState = [];

const OrdersReducer = (state, { type, payload }) => {
  switch (type) {
    case OrdersActions.feed:
      return payload;

    default:
      return state;
  }
};

export function OrdersProvider({ children, loadingComponent, filterOrders }) {
  const [state, dispatch] = useReducer(OrdersReducer, initialState);
  const [tempOrders, setTempOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timeout = setTimeout(() => {
      dispatch({ type: OrdersActions.feed, payload: tempOrders });
    }, 1000);
    return () => clearTimeout(timeout);
  }, [tempOrders]);

  useEffect(() => {
    const unsub = trackChanges(orderRef, (order) => {
      if (loading) setLoading(false);
      if (!filterOrders(order)) return;
      if (tempOrders.some((orderB) => order._id === orderB._id)) return;
      setTempOrders((orders) => [...orders, order]);
    });
    return () => unsub();
  }, []);

  return (
    <OrdersContext.Provider value={[state, dispatch]}>
      {loading ? loadingComponent : children}
    </OrdersContext.Provider>
  );
}

export function useOrders() {
  return useContext(OrdersContext);
}

export function withOrders(main, loadingComponent, filterOrders) {
  return (
    <OrdersProvider
      loadingComponent={loadingComponent}
      filterOrders={filterOrders}
    >
      {main}
    </OrdersProvider>
  );
}
