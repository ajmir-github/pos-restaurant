export const itemsActions = {
  feed: "ITEMS_FEED",
  clear: "ITEMS_CLEAR",
};

export function itemsReducer(state = [], { type, payload }) {
  switch (type) {
    case itemsActions.feed:
      return payload;

    case itemsActions.clear:
      return [];

    default:
      return state;
  }
}
