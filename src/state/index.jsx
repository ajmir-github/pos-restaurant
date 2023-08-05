// Imports
import { configureStore, combineReducers } from "@reduxjs/toolkit";
import { Provider } from "react-redux";
import { themeActions, themeReducer, initialTheme } from "./themeReducer";
import { tablesActions, tablesReducer } from "./tablesReducer";
import { ordersActions, ordersReducer } from "./ordersReducer";

// Export Actions
export { themeActions, initialTheme, tablesActions, ordersActions };

// Reducers
const reducers = {
  theme: themeReducer,
  tables: tablesReducer,
  orders: ordersReducer,
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
