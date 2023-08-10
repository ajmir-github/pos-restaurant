import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import HomePage from "./pages/homePage";
import TabelsPage from "./pages/tablesPage";
import TablePage from "./pages/tablePage";
import { useEffect, useState } from "react";
import { orderRef, tablesRef, trackChanges, useAuth } from "./firebase";
import { useDispatch } from "react-redux";
import { ordersActions, tablesActions } from "./state";
import KitchenPage from "./pages/kitchenPage";
import PageLoading from "./components/PageLoading";
import BarPage from "./pages/barPage";
import PrintReceiptPage from "./pages/printReceiptPage";
import LoginPage from "./pages/loginPage";

function App() {
  const dispatch = useDispatch();
  const { loading, signed } = useAuth();

  useEffect(() => {
    const tableUnsubscribe = trackChanges(tablesRef, (table) => {
      dispatch({ type: tablesActions.updateTable, payload: table });
    });
    const orderUnsubscribe = trackChanges(orderRef, (order) => {
      dispatch({ type: ordersActions.updateOrder, payload: order });
    });
    return () => tableUnsubscribe() && orderUnsubscribe();
  }, []);

  const ProtectedRoute = ({ children }) =>
    !signed ? <Navigate to="/login" replace /> : children;

  const UnprotectedRoute = ({ children }) =>
    signed ? <Navigate to="/" replace /> : children;

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
      </Routes>
    </BrowserRouter>
  );
}

export default App;
