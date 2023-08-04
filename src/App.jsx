import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "./pages/homePage";
import TabelsPage from "./pages/tablesPage";
import TablePage from "./pages/tablePage";
import { useEffect, useState } from "react";
import { trackChanges } from "./firebase";
import { useDispatch } from "react-redux";
import { tablesActions } from "./state";

function App() {
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();
  useEffect(() => {
    const unsubscribe = trackChanges((table) => {
      dispatch({ type: tablesActions.updateTable, payload: table });
      if (loading) setLoading(false);
    });
    return unsubscribe;
  }, []);

  const PageLoading = () => (
    <div className="w-full min-h-screen flex justify-center items-center">
      <span className="loading loading-infinity loading-lg"></span>
    </div>
  );
  return loading ? (
    <PageLoading />
  ) : (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/tables" element={<TabelsPage />} />
        <Route path="/table/:tableNumber" element={<TablePage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
