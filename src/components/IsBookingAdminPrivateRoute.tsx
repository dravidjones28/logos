import { Navigate, Outlet } from "react-router-dom";
import useAuth from "../hooks/useAuth";

const IsBookingAdminPrivateRoute = () => {
  const auth = useAuth();

  if (!auth) return <Navigate to="/login" />;

  if (auth.isBookingAdmin || auth.isAdmin) return <Outlet />;
  else {
    return <Navigate to="/login" />;
  }
};

export default IsBookingAdminPrivateRoute;
