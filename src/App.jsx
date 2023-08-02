import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "./pages/homePage";
import TabelsPage from "./pages/tablesPage";
import TablePage from "./pages/tablePage";
import { useEffect } from "react";
import { trackChanges } from "./firebase";
import { useDispatch } from "react-redux";
import { tablesActions } from "./state";

function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    const unsubscribe = trackChanges((table) => {
      dispatch({ type: tablesActions.updateTable, payload: table });
    });
    return unsubscribe;
  }, []);
  return (
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
