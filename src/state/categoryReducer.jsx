export const categoriesActions = {
  feed: "categories_FEED",
  clear: "categories_CLEAR",
};

export function categoriesReducer(state = [], { type, payload }) {
  switch (type) {
    case categoriesActions.feed:
      return payload;

    case categoriesActions.clear:
      return [];

    default:
      return state;
  }
}
