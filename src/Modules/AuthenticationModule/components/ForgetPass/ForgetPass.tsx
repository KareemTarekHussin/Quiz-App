import { useFormik } from 'formik';
import logo from '../../../../assets/images/logo.png';
import image from '../../../../assets/images/Image.png';
import { Link, useNavigate } from 'react-router-dom';
import { useForgotPasswordMutation } from '../../../../redux/auth/authSlice';

interface FormValues {
  email: string;
}

export default function ForgetPass() {
  const navigate = useNavigate();
  const [forgotPassword, { isLoading }] = useForgotPasswordMutation();

  const formik = useFormik<FormValues>({
    initialValues: {
      email: '',
    },
    onSubmit: async (values) => {
      try {
        const response = await forgotPassword({ email: values.email });
        if ('data' in response) {
          navigate('/resetpass');
        }
      } catch (error) {
        console.error(error);
      }
    },
  });

  return (
    <div className="min-h-screen bg-[#0D1321] text-white font-nunito">
      <div className="container">
        <div className="flex">
          <div className="flex-1 h-screen pt-8">
            <img src={logo} className="w-[150px]" alt="Logo" />
            <div className="mt-10">
              <p className="text-[#C5D86D] text-2xl font-semibold">Forgot Password</p>
              <div>
                <form
                  onSubmit={formik.handleSubmit}
                  className="space-y-4 font-[sans-serif] text-[#333] mx-auto mt-10"
                >
                  <div>
                    <p className="text-white">Email address</p>
                    <div className="relative flex items-center">
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
                  <button
                    type="submit"
                    className="px-6 py-2.5 !mt-20 font-nunito font-bold text-sm border bg-[#F5F5F5] text-black rounded-lg transition-all duration-200 hover:bg-[#000] hover:text-white active:bg-[#000] flex items-center"
                  >
                    {isLoading ? 'Sending...' : 'Send Email'}
                  </button>
                </form>
              </div>
              <div className="grid justify-items-end mt-60">
                <div>
                  Login?{' '}
                  <span className="text-[#C5D86D] font-semibold underline">
                    <Link to="/login">Click here</Link>
                  </span>
                </div>
              </div>
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