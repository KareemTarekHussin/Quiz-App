import { useNavigate } from "react-router-dom";
import CookieServices from "../../../utils/Cookies";
import { useEffect } from "react";
interface IProps {
  children: React.ReactNode
}
const ProtectedRoute= ({ children }: IProps) => {
  const navigate = useNavigate()

  useEffect(() => {
    const userInfo = CookieServices.get("userInfo").role;
    if (userInfo === "Student") {
      navigate(-1);
    }
  }, [navigate]);

  return children;
};

export default ProtectedRoute