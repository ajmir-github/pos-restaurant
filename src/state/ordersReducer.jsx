export const ordersActions = {
  startWorking: "START_WORKING",
  orderReady: "ORDER_READY",
  needsInfo: "NEEDS_INFO",
  updateOrder: "UPDATE_ORDER",
};

export function ordersReducer(state = [], { type, payload }) {
  switch (type) {
    case ordersActions.updateOrder:
      return [...state, payload];
    default:
      return state;
  }
}
