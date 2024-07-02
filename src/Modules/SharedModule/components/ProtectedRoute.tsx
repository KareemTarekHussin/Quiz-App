import { Navigate } from "react-router-dom";
import Cookies from "universal-cookie";

export default function ProtectedRoute({ children }: React.PropsWithChildren) {
  const cookies = new Cookies();
  if (!cookies.get("accessToken")) {
    return <Navigate to="/login" />;
  } else {
    return children;
  }
}
