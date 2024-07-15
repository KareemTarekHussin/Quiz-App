import { useFormik } from "formik";
import CookieServices from "../../../../utils/Cookies";
import { Link, useNavigate } from "react-router-dom";
import AuthContainer from "../../../../components/AuthContainer/AuthContainer";
import { useState } from "react";
import * as Yup from "yup";
import { useLoginMutation } from "../../../../redux/auth/authSlice";

const loginSchema = Yup.object().shape({
  email: Yup.string()
    .email("Enter a valid email address")
    .required("Email is required"),
  password: Yup.string().required("Password is required"),
});
type AuthInputs = {
  email: string;
  password: string;
};


export default function Login() {
  const [login, { isLoading }] = useLoginMutation();
  const [visible, setVisible] = useState(false);
  const navigate = useNavigate();

  const onSubmit = async (user: AuthInputs) => {
    const response = await login (user);

    if (response.data?.message === "Login Success") {
      CookieServices.get("userInfo").role === "Instructor" ? navigate('/DashBoard') :
      //3lshan el student mafhosh dashboard
      navigate('/DashBoard/quizes')
    }
  };
  const formik = useFormik<AuthInputs>({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: loginSchema,
    onSubmit: (values) => {
      onSubmit(values);
    },
  });

  return (
    <>
      <AuthContainer header="Continue your learning journey with QuizWiz!">
        <form onSubmit={formik.handleSubmit}>
          <label>Registered email address</label>
          <div>
            <span className="absolute p-2">
              <i className="fa-solid fa-envelope text-white text-xl mx-2"></i>
            </span>
            <input
              type="text"
              name="email"
              placeholder="Type your email"
              className="relative w-full bg-transparent border-[3px] rounded-[8px] py-2 px-[50px] mb-5 placeholder:text-white"
              onChange={formik.handleChange}
            />
            <div className="text-[#ff0000]">
              {formik.touched.email && formik.errors.email
                ? formik.errors.email
                : null}
            </div>
          </div>
          <label>Password</label>
          <div className="relative">
            <span className="absolute p-2">
              <i className="fa-solid fa-lock text-white text-xl mx-2"></i>
            </span>
            <input
              type={visible ? "text" : "password"}
              name="password"
              placeholder="Type your password"
              className="relative w-full bg-transparent border-[3px] rounded-[8px] py-2 px-[50px] placeholder:text-white"
              onChange={formik.handleChange}
            />
            <span
              onClick={() => setVisible(!visible)}
              className=" absolute p-2 right-1"
            >
              {visible ? (
                <i className="fa-regular fa-eye text-white text-xl mx-2  "></i>
              ) : (
                <i className="fa-regular fa-eye-slash text-white text-xl mx-2 "></i>
              )}
            </span>
            <div className="text-[#ff0000]">
              {formik.touched.password && formik.errors.password
                ? formik.errors.password
                : null}
            </div>
          </div>
          <div className="flex justify-between">
            <button
              type="submit"
              className="bg-white my-5 px-6 py-2 text-black font-semibold rounded-md"
            >
              {isLoading ? (
                "Signing In..."
              ) : (
                <>
                  Sign In
                  <i className="fa-solid fa-check bg-black rounded-full text-white p-1 mx-1"></i>
                </>
              )}
            </button>
            <div className="my-5">
              <h1>
                Forget password?
                <Link className="text-[#C5D86D] p-1" to="/forgetpass">
                  Click here
                </Link>
              </h1>
            </div>
          </div>
        </form>
      </AuthContainer>
    </>
  );
}
