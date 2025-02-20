import { Navigate, Outlet } from "react-router-dom";
import useAuthStore from "../store/app.store";

const ProtectedRoute = () => {
  const isAuthenticated = useAuthStore((state:any) => state.isAuthenticated);
  return isAuthenticated ? <Outlet /> : <Navigate to="/login" replace />;
};

export default ProtectedRoute;
