export const kitchenActions = {
  feed: "KITCHEN_FEED",
  clear: "KITCHEN_CLEAR",
};

export function kitchenReducer(state = [], { type, payload }) {
  switch (type) {
    case kitchenActions.feed:
      return state.some((order) => order._id === payload._id)
        ? state.map((order) => (order._id === payload._id ? payload : order))
        : [...state, payload];

    case kitchenActions.clear:
      return [];

    default:
      return state;
  }
}
