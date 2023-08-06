export const ordersActions = {
  startWorking: "START_WORKING",
  orderReady: "ORDER_READY",
  needsInfo: "NEEDS_INFO",
  updateOrder: "UPDATE_ORDER",
};

export function ordersReducer(state = [], { type, payload }) {
  switch (type) {
    case ordersActions.updateOrder:
      if (!state.some((order) => order._id === payload._id))
        return [...state, payload];
      return state.map((order) =>
        order._id === payload._id ? payload : order
      );
    default:
      return state;
  }
}
