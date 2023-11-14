import { Navigate } from "react-router-dom";
import db from "./common/db";
import CreateBlog from "../pages/CreateBlog";

const PrivateRoute = () => {
  const session = db();
  if (!session?.isAdmin) return <Navigate to="/blog" />;
  else {
    return <CreateBlog />;
  }
};

export default PrivateRoute;
