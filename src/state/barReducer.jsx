export const barActions = {
  feed: "BAR_FEED",
  clear: "BAR_CLEAR",
};

export function barReducer(state = [], { type, payload }) {
  switch (type) {
    case barActions.feed:
      return state.some((order) => order._id === payload._id)
        ? state.map((order) => (order._id === payload._id ? payload : order))
        : [...state, payload];

    case barActions.clear:
      return [];

    default:
      return state;
  }
}
