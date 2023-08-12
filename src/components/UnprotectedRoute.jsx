import { useSelector } from "react-redux";

const UnprotectedRoute = ({ children }) => {
  const signed = useSelector((state) => state.signed);
  return signed ? <Navigate to="/" replace /> : children;
};

export default UnprotectedRoute;
