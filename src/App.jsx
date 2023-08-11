import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import HomePage from "./pages/homePage";
import TabelsPage from "./pages/tablesPage";
import TablePage from "./pages/tablePage";
import { useEffect, useState } from "react";
import { orderRef, tablesRef, trackChanges } from "./firebase";
import { useDispatch } from "react-redux";
import { tablesActions } from "./state";
import KitchenPage from "./pages/kitchenPage";
import BarPage from "./pages/barPage";
import PrintReceiptPage from "./pages/printReceiptPage";
import LoginPage from "./pages/loginPage";
import { useAuth } from "./state/AuthState";

function App() {
  const dispatch = useDispatch();
  const [auth] = useAuth();

  useEffect(() => {
    const tableUnsubscribe = trackChanges(tablesRef, (table) => {
      dispatch({ type: tablesActions.updateTable, payload: table });
    });

    return () => tableUnsubscribe();
  }, []);

  const ProtectedRoute = ({ children }) =>
    !auth.signed ? <Navigate to="/login" replace /> : children;

  const UnprotectedRoute = ({ children }) =>
    auth.signed ? <Navigate to="/" replace /> : children;

  return (
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
