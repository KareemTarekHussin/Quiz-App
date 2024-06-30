import logo from "../../../../assets/images/logo.png";
import image from "../../../../assets/images/Image.png";
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import EmailIcon from '@mui/icons-material/Email';
import PhoneAndroidIcon from '@mui/icons-material/PhoneAndroid';
import KeyIcon from '@mui/icons-material/Key';
import { useFormik } from "formik";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { apiPuplic } from "../../../../utils/axiosinst";
interface FormValues {
  email: string;
  otp: string;
  password: string;
}

export default function ResetPass() {
  const navigate = useNavigate();

  const formik = useFormik<FormValues>({
    initialValues: {
      email: "",
      otp: "",
      password: ""
    },
    onSubmit: async (values) => {
      try {
        const response = await apiPuplic.post("/auth/reset-password", {
          email: values.email,
          otp: values.otp,
          password: values.password
        });
        console.log(response.data);
        navigate('/login')
      } catch (error) {
        console.error(error);
        // Handle error response
      }
    }
  });

  return (
    <div className="min-h-screen bg-[#0D1321] text-white font-nunito">
      <div className="container">
        <div className="flex">
          <div className="flex-1 h-screen pt-8">
            <img src={logo} className="w-[150px]" alt="Logo" />
            <div className="mt-10">
              <p className="text-[#C5D86D] text-2xl font-semibold">
                Reset Password
              </p>
              <div>
                <form onSubmit={formik.handleSubmit} className="space-y-4 font-[sans-serif] text-[#333] mx-auto mt-10">
                  <div>
                    <p className="text-white">Your Email address</p>
                    <div className="relative flex items-center">
                      <EmailIcon className="absolute left-4 text-[#F5F5F5]" />
                      <input
                        type="email"
                        name="email"
                        onChange={formik.handleChange}
                        value={formik.values.email}
                        placeholder="Type Your email"
                        className="pl-12 px-4 py-3 bg-[#0D1321] focus:bg-transparent w-full text-sm border outline-[#ccc] rounded-xl transition-all text-white"
                      />
                    </div>
                  </div>
                  <div>
                    <p className="text-white">OTP</p>
                    <div className="relative flex items-center">
                      <PhoneAndroidIcon className="absolute left-4 text-[#F5F5F5]" />
                      <input
                        type="text"
                        name="otp"
                        onChange={formik.handleChange}
                        value={formik.values.otp}
                        placeholder="Type OTP"
                        className="pl-12 px-4 py-3 bg-[#0D1321] focus:bg-transparent w-full text-sm border outline-[#ccc] rounded-xl transition-all text-white"
                      />
                    </div>
                  </div>
                  <div>
                    <p className="text-white">Password</p>
                    <div className="relative flex items-center">
                      <KeyIcon className="absolute left-4 text-[#F5F5F5]" />
                      <input
                        type="password"
                        name="password"
                        onChange={formik.handleChange}
                        value={formik.values.password}
                        placeholder="Type Your Password"
                        className="pl-12 px-4 py-3 bg-[#0D1321] focus:bg-transparent w-full text-sm border outline-[#ccc] rounded-xl transition-all text-white"
                      />
                    </div>
                  </div>
                  <button
                    type="submit"
                    className="px-6 py-2.5 !mt-20 font-nunito font-bold text-sm border bg-[#F5F5F5] text-black rounded-lg transition-all duration-200 hover:bg-[#000] hover:text-white active:bg-[#000] flex items-center"
                  >
                    Reset <CheckCircleIcon className="ml-2" />
                  </button>
                </form>
              </div>
              {/* input */}
              {/* button */}
            </div>
          </div>
          <div className="flex-1 hidden md:flex justify-end items-center h-screen">
            <img src={image} className="w-[80%]" alt="Background" />
          </div>
        </div>
      </div>
    </div>
  );
}
