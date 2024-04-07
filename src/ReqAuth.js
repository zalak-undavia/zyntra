import { useAuth } from "./auth";
import { Navigate } from "react-router-dom";

export default function ReqAuth({ children }) {
  const auth = useAuth();

  if (!auth.userName) {
    return <Navigate to="/profile" />;
  }
  return children;
}
