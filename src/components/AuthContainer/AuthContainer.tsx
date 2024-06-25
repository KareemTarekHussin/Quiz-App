import logo from "../../assets/images/logo.png";
import image from "../../assets/images/Image.png";
import PersonAddAltOutlinedIcon from "@mui/icons-material/PersonAddAltOutlined";
import PersonOutlineOutlinedIcon from "@mui/icons-material/PersonOutlineOutlined";
import { Link, useLocation } from "react-router-dom";

interface AuthLayoutProps {
  header: string;
  children: React.ReactNode;
}

export default function AuthContainer({ header, children }: AuthLayoutProps) {
  const { pathname } = useLocation();

  return (
    <>
      <div className="min-h-screen bg-[#0D1321] text-white">
        <div className="container">
          <div className="flex">
            <div className="flex-1 h-screen pt-8">
              <img src={logo} className="w-[150px]" alt="" />
              <div className="mt-10">
                <p className="text-[#C5D86D] text-2xl font-semibold">{header}</p>
                {pathname === "/" || pathname === "/register" ? (
                  <div className="flex gap-9 pt-10">
                    <Link to="/">
                      <div
                        className={`bg-[#333333] p-10 rounded-md text-center h-[150px] w-[150px] ${
                          pathname === "/" ? "border-4 border-[#C5D86D]" : ""
                        }`}
                      >
                        <PersonOutlineOutlinedIcon
                          sx={
                            pathname === "/"
                              ? { fontSize: "40px", color: "#C5D86D" }
                              : { fontSize: "40px" }
                          }
                        />
                        <p>Sign in</p>
                      </div>
                    </Link>

                    <Link to="/register">
                      <div
                        className={`bg-[#333333] p-10 rounded-md text-center h-[150px] w-[150px] ${
                          pathname === "/register"
                            ? "border-4 border-[#C5D86D]"
                            : ""
                        }`}
                      >
                        <PersonAddAltOutlinedIcon
                          sx={
                            pathname === "/register"
                              ? { fontSize: "40px", color: "#C5D86D" }
                              : { fontSize: "40px" }
                          }
                        />
                        <p>Sign Up</p>
                      </div>
                    </Link>
                  </div>
                ) : null}
              </div>
              <div className="mt-5">{children}</div>
            </div>
            <div className="flex-1 hidden md:flex justify-end items-center h-screen">
              <img src={image} className="w-[80%]" alt="" />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
