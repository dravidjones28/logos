import { Navigate, Outlet } from "react-router-dom";
import useAuth from "../hooks/useAuth";

const IsIntercessionPrivateRoute = () => {
  const auth = useAuth();

  if (!auth) return <Navigate to="/login" />;

  if (auth.isIntercessionAdmin || auth.isAdmin) return <Outlet />;
  else {
    return <Navigate to="/login" />;
  }
};

export default IsIntercessionPrivateRoute;
