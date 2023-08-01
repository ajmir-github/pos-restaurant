import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "./pages/homePage";
import TabelsPage from "./pages/tablesPage";
import TablePage from "./pages/tablePage";

function App() {
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
