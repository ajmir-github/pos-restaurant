import { useSelector } from "react-redux";

const ProtectedRoute = ({ children }) => {
  const signed = useSelector((state) => state.auth.signed);
  return !signed ? <Navigate to="/login" replace /> : children;
};

export default ProtectedRoute;
