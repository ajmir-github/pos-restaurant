import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import HomePage from "./pages/homePage";
import TabelsPage from "./pages/tablesPage";
import TablePage from "./pages/tablePage";
import { useEffect, useState } from "react";
import { orderRef, tablesRef, trackAuth, trackChanges } from "./firebase";
import { useDispatch } from "react-redux";
import {
  AuthActions,
  barActions,
  itemsActions,
  kitchenActions,
  tablesActions,
} from "./state";
import KitchenPage from "./pages/kitchenPage";
import BarPage from "./pages/barPage";
import PrintReceiptPage from "./pages/printReceiptPage";
import LoginPage from "./pages/loginPage";
import AdminPage from "./pages/adminPage";
import PageLoading from "./components/PageLoading";
import { ITEM_TYPE } from "./utils";
import ProtectedRoute from "./components/ProtectedRoute";
import UnprotectedRoute from "./components/UnprotectedRoute";

function App() {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    setLoading(true);
    const unsubAuth = trackAuth(
      ({ signed, user }) => {
        dispatch(
          signed
            ? { type: AuthActions.signIn, payload: user }
            : { type: AuthActions.signOut }
        );
        if (loading) setLoading(false);
      },
      () => setLoading(true) // while loading
    );

    const unsubTables = trackChanges(tablesRef, (table) => {
      dispatch({ type: tablesActions.updateTable, payload: table });
    });
    const unsubOrders = trackChanges(orderRef, (order) => {
      // if food to kitchen
      if (order.types.includes(ITEM_TYPE.food)) {
        return dispatch({ type: kitchenActions.feed, payload: order });
      }

      if (
        order.types.includes(ITEM_TYPE.drink) ||
        order.types.includes(ITEM_TYPE.dessert)
      ) {
        return dispatch({ type: barActions.feed, payload: order });
      }
    });

    // get items

    useEffect(() => {
      getItems().then((items) => {
        dispatch({ type: itemsActions.feed, payload: items });
      });
    }, []);

    return () => {
      unsubAuth();
      unsubTables();
      unsubOrders();
    };
  }, []);

  return loading ? (
    <PageLoading />
  ) : (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <HomePage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/tables"
          element={
            <ProtectedRoute>
              <TabelsPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/table/:tableNumber"
          element={
            <ProtectedRoute>
              <TablePage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/kitchen"
          element={
            <ProtectedRoute>
              <KitchenPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/bar"
          element={
            <ProtectedRoute>
              <BarPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/login"
          element={
            <UnprotectedRoute>
              <LoginPage />
            </UnprotectedRoute>
          }
        />
        <Route
          path="/print-receipt/:tableNumber"
          element={
            <ProtectedRoute>
              <PrintReceiptPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin"
          element={
            <ProtectedRoute>
              <AdminPage />
            </ProtectedRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
