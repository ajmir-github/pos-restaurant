import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  const signed = useSelector((state) => state.auth.signed);
  return !signed ? <Navigate to="/login" replace /> : children;
};

export default ProtectedRoute;
