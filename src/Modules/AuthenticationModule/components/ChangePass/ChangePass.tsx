import logo from "../../../../assets/images/logo.png";
import image from "../../../../assets/images/Image.png";
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import EmailIcon from '@mui/icons-material/Email';
import KeyIcon from '@mui/icons-material/Key';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import axios from "axios";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";
import { apiPuplic } from "../../../../utils/axiosinst";

// interface FormValues {
//   password: string;
//   password_new: string;
// }

export default function ChangePass() {
  const navigate = useNavigate();

  const initialValues = {
    password: "",
    password_new: "",

  }
  const onSubmit = async (values) => {
      try {
        const response =  apiPuplic.post("/auth/change-password",values, {
          headers:{Authorization:`Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NjZiNDU3NjI1N2I3NmM0YWRlMDBjODgiLCJyb2xlIjoidXNlciIsInZlcmlmaWVkIjpmYWxzZSwiaWF0IjoxNzE4MzA2MjI0LCJleHAiOjE3MTk1MTU4MjR9.0STMLTHCp4neRXyeXBi8DzyJ9-JhOJ-M4MdVJhW7waA`}
 
        });
        console.log(response.data);
        alert("sooooooo");
        navigate('/login')
      } catch (error) {
        console.error(error);
        // Handle error response
      }
    
  };
  const valiationSchema = Yup.object({
    password: Yup.string().required("password is required"),
    password_new: Yup.string().required("password is required")

  })
  return (
    <div className="min-h-screen bg-[#0D1321] text-white font-nunito">
      <div className="container">
        <div className="flex">
          <div className="flex-1 h-screen pt-8">
            <img src={logo} className="w-[150px]" alt="Logo" />
            <div className="mt-10">
              <p className="text-[#C5D86D] text-2xl font-semibold">
                Change Password
              </p>
              <div>
                <Formik initialValues={initialValues} onSubmit={onSubmit} validationSchema={valiationSchema}>
                  {() => (
                    <Form className="space-y-4 font-[sans-serif] text-[#333] mx-auto mt-10">
                      <div>
                        <p className="text-white">Old Password</p>
                        <div className="relative flex items-center">
                          <KeyIcon className="absolute left-4 text-[#F5F5F5]" />
                          <Field
                            name="password"
                            placeholder="Type Your Old Password"
                            className="pl-12 px-4 py-3 bg-[#0D1321] focus:bg-transparent w-full text-sm border outline-[#ccc] rounded-xl transition-all text-white"
                          />
                        </div>
                        <div className="error text-white">
                          <ErrorMessage name="password" component="span" />

                        </div>
                      </div>
                      <div>
                        <p className="text-white">New Password</p>
                        <div className="relative flex items-center">
                          <KeyIcon className="absolute left-4 text-[#F5F5F5]" />
                          <Field
                            name="password_new"
                            placeholder="Type Your New  Password"
                            className="pl-12 px-4 py-3 bg-[#0D1321] focus:bg-transparent w-full text-sm border outline-[#ccc] rounded-xl transition-all text-white"
                          />
                        </div>
                        <div className="error text-white">
                          <ErrorMessage name="password_new" component="span" />

                        </div>
                      </div>
                      <div>
                        <p className="text-white">Confirm Password</p>
                        <div className="relative flex items-center">
                          <KeyIcon className="absolute left-4 text-[#F5F5F5]" />
                          <Field
                            name="password_new"
                            placeholder="confirm Password"
                            className="pl-12 px-4 py-3 bg-[#0D1321] focus:bg-transparent w-full text-sm border outline-[#ccc] rounded-xl transition-all text-white"
                          />
                        </div>
                        <div className="error text-white">
                          <ErrorMessage name="password_new" component="span" />

                        </div>
                      </div>
                      <button
                        type="submit"
                        className="px-6 py-2.5 !mt-20 font-nunito font-bold text-sm border bg-[#F5F5F5] text-black rounded-lg transition-all duration-200 hover:bg-[#000] hover:text-white active:bg-[#000] flex items-center"
                      >
                        Change <CheckCircleIcon className="ml-2" />
                      </button>
                    </Form>
                  )}
                </Formik>

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

