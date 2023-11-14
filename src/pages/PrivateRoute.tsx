import useAuth from "../hooks/useAuth";
import { Navigate, Outlet } from "react-router-dom";

const PrivateRoute = () => {
  const auth = useAuth();

  if (!auth) return <Navigate to="/login" />;
  return <Outlet />;
};

export default PrivateRoute;
