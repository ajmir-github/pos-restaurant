// Imports
import { configureStore, combineReducers } from "@reduxjs/toolkit";
import { Provider } from "react-redux";
import {
  themeActions,
  themeReducer,
  themesList,
  initialTheme,
} from "./themeReducer";
import { tablesActions, tablesReducer } from "./tablesReducer";

// Export Actions
export { themeActions, themesList, initialTheme, tablesActions };

// Reducers
const reducers = {
  theme: themeReducer,
  tables: tablesReducer,
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
