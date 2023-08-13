// Imports
import { configureStore, combineReducers } from "@reduxjs/toolkit";
import { Provider } from "react-redux";
import { themeActions, themeReducer, initialTheme } from "./themeReducer";
import { tablesActions, tablesReducer } from "./tablesReducer";
import { AuthActions, authReducer } from "./authReducer";
import { barActions, barReducer } from "./barReducer";
import { kitchenActions, kitchenReducer } from "./kitchenReducer";
import { itemsActions, itemsReducer } from "./itemReducer";
import { categoriesActions, categoriesReducer } from "./categoryReducer";

// Export Actions and meddlewares
export {
  themeActions,
  initialTheme,
  tablesActions,
  AuthActions,
  barActions,
  kitchenActions,
  itemsActions,
  categoriesActions,
};

// Reducers
const reducers = {
  theme: themeReducer,
  tables: tablesReducer,
  auth: authReducer,
  bar: barReducer,
  kitchen: kitchenReducer,
  items: itemsReducer,
  categories: categoriesReducer,
};

// Store
const store = configureStore({
  reducer: combineReducers(reducers),
});

// inital state

// StoreProvider
export function StoreProvider({ children }) {
  return <Provider store={store}>{children}</Provider>;
}
