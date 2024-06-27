import logo from "../../../../assets/images/logo.png";
import image from "../../../../assets/images/Image.png";
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import EmailIcon from '@mui/icons-material/Email';
import { Link, useNavigate } from "react-router-dom";

export default function ForgetPass() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-[#0D1321] text-white font-nunito">
      <div className="container">
        <div className="flex">
          <div className="flex-1 h-screen pt-8">
            <img src={logo} className="w-[150px]" alt="" />
            <div className="mt-10">
              <p className="text-[#C5D86D] text-2xl font-semibold">
                Forgot Password
              </p>
              <div>
                <form className="space-y-4 font-[sans-serif] text-[#333] max-w-md mx-auto">
                  <div className="relative flex items-center">
                    <EmailIcon className="absolute left-4 text-[#F5F5F5]" />
                    <input
                      type="email"
                      placeholder="Type Your email"
                      className="pl-12 px-4 py-3 bg-[#0D1321] focus:bg-transparent w-full text-sm border outline-[#ccc] rounded-xl transition-all"
                    />
                  </div>
                  <button
                    type="button"
                    className="px-6 py-2.5 !mt-8 font-nunito font-bold text-sm border bg-[#F5F5F5] hover:bg-[#000] text-black rounded-lg active:bg-[#000]"
                  >
                    Send Email <CheckCircleIcon />
                  </button>
                </form>
              </div>
              {/* input */}
              {/* button */}
              {/* navigation to login */}
              <div className="grid justify-items-end">
                <div>
                  Login?  
                  <span className="text-[#C5D86D] font-semibold">
                    <Link to="/login">
                      Click here
                    </Link>
                  </span>
                </div>
              </div>
              {/* navigation to login */}
            </div>
          </div>
          <div className="flex-1 hidden md:flex justify-end items-center h-screen">
            <img src={image} className="w-[80%]" alt="" />
          </div>
        </div>
      </div>
    </div>
  );
}
