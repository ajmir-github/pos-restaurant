import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "./pages/homePage";
import TabelsPage from "./pages/tablesPage";
import TablePage from "./pages/tablePage";
import { useEffect, useState } from "react";
import { orderRef, tablesRef, trackChanges } from "./firebase";
import { useDispatch } from "react-redux";
import { ordersActions, tablesActions } from "./state";
import KitchenPage from "./pages/kitchenPage";
import PageLoading from "./components/PageLoading";
import BarPage from "./pages/barPage";
import PrintReceiptPage from "./pages/printReceiptPage";

function App() {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState({ tables: true, orders: true });
  const isLoading = () => !(loading.tables || loading.orders);
  useEffect(() => {
    const tableUnsubscribe = trackChanges(tablesRef, (table) => {
      dispatch({ type: tablesActions.updateTable, payload: table });
      if (isLoading()) setLoading({ ...loading, tables: false });
    });
    const orderUnsubscribe = trackChanges(orderRef, (order) => {
      dispatch({ type: ordersActions.updateOrder, payload: order });
      if (isLoading()) setLoading({ ...loading, orders: false });
    });
    return () => {
      tableUnsubscribe();
      orderUnsubscribe();
    };
  }, []);

  return isLoading() ? (
    <PageLoading />
  ) : (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/tables" element={<TabelsPage />} />
        <Route path="/table/:tableNumber" element={<TablePage />} />
        <Route path="/kitchen" element={<KitchenPage />} />
        <Route path="/bar" element={<BarPage />} />
        <Route
          path="/print-receipt/:tableNumber"
          element={<PrintReceiptPage />}
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
