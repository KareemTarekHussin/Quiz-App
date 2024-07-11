import { Navigate } from "react-router-dom";
import CookieServices from "../../../utils/Cookies";

export default function ProtectedRoute({ children }: React.PropsWithChildren) {
  if (!CookieServices.get("accessToken")) {
    return <Navigate to="/login" />;
  } else {
    return children;
  }
}
