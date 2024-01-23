import { Navigate, Outlet } from "react-router-dom";
import useAuth from "../hooks/useAuth";

// interface Props {
//   allowedRoles: {
//     isAdmin: boolean;
//   };
//   // isBookingAdmin?: boolean;
// }
const YoutubeAdminPrivateRoute = () =>
  // {allowedRoles}: Props
  {
    const auth = useAuth();

    // allowedRoles.isAdmin

    if (!auth) return <Navigate to="/login" />;

    if (auth.isYoutubeLinkAdmin || auth.isAdmin) return <Outlet />;
    else {
      return <Navigate to="/login" />;
    }
  };

export default YoutubeAdminPrivateRoute;
