import { useFormik } from "formik";
import * as Yup from "yup";
import AuthContainer from "../../../../components/AuthContainer/AuthContainer";
import { useRegisterMutation } from "../../../../redux/auth/authSlice";
import { useNavigate } from "react-router-dom";

const RegisterSchema = Yup.object().shape({
  first_name: Yup.string().required("first name is required"),
  last_name: Yup.string().required("last name is required"),
  email: Yup.string().email().required("email is required"),
  role: Yup.string().required("role is required"),
  password: Yup.string().required("password is required"),
});

interface FormValueProps {
  first_name: string;
  last_name: string;
  email: string;
  role: string;
  password: string;
}

export default function Register() {
  const [register, { isLoading }] =
    useRegisterMutation();
  const navigate = useNavigate();

  const handleSubmit = async (user: FormValueProps) => {
    const response = await register(user);
    if (response.data?.message === "Record created successfully") {
      navigate("/");
    }
  };



  const formik = useFormik({
    initialValues: {
      first_name: "",
      last_name: "",
      email: "",
      role: "",
      password: "",
    },
    validationSchema: RegisterSchema,
    onSubmit: handleSubmit,
  });

  return (
    <>
      <AuthContainer header="Create your account and start using QuizWiz!">
        <form onSubmit={formik.handleSubmit}>
          <div className="flex gap-3 md:flex-row flex-col">
            <div className="flex flex-col w-full md:w-[50%] mt-1">
              <label htmlFor="firstname">Your first name</label>
              <input
                type="text"
                id="firstname"
                name="first_name"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.first_name}
                placeholder="Type your first name"
                className="w-full p-[8px] outline-none bg-transparent border-2 border-white rounded"
              />
              {formik.touched.first_name && formik.errors.first_name && (
                <div className="text-red-500">{formik.errors.first_name}</div>
              )}
            </div>
            <div className="flex flex-col w-full md:w-[50%]  mt-1">
              <label htmlFor="lastname">Your last name</label>
              <input
                type="text"
                id="lastname"
                name="last_name"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.last_name}
                placeholder="Type Your last name"
                className="w-full p-[8px] outline-none bg-transparent border-2 border-white rounded"
              />
              {formik.touched.last_name && formik.errors.last_name && (
                <div className="text-red-500">{formik.errors.last_name}</div>
              )}
            </div>
          </div>
          <div>
            <div className="mt-1">
              <label htmlFor="email">Your email</label>
              <input
                type="email"
                placeholder="Type your email"
                name="email"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.email}
                className="w-full p-[8px] outline-none bg-transparent border-2 border-white rounded"
                id="email"
              />
              {formik.touched.email && formik.errors.email && (
                <div className="text-red-500">{formik.errors.email}</div>
              )}
            </div>
            <div className="mt-1">
              <label htmlFor="role">Your role</label>
              <select
                name="role"
                id="role"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.role}
                className="w-full p-[8px] outline-none bg-transparent border-2 border-white rounded "
              >
                <option value="" className="text-black">
                  Choose your role
                </option>
                <option value="Student" className="text-black">
                  Student
                </option>
                <option value="Instructor" className="text-black">
                  Instructor
                </option>
              </select>
              {formik.touched.role && formik.errors.role && (
                <div className="text-red-500">{formik.errors.role}</div>
              )}
            </div>
            <div className="mt-1">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                placeholder="Type your password"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.password}
                name="password"
                className="w-full p-[8px] outline-none bg-transparent border-2 border-white rounded"
                id="password"
              />
              {formik.touched.password && formik.errors.password && (
                <div className="text-red-500">{formik.errors.password}</div>
              )}
            </div>

            <button
              type="submit"
              className="bg-white text-black font-semibold py-[8px] px-[20px] my-3 rounded"
            >
              {isLoading ? (
                "Sign Up..."
              ) : (
                <>
                  Sign Up
                  <i className="fa-solid fa-user"></i>
                </>
              )}
            </button>
          </div>
        </form>
      </AuthContainer>
    </>
  );
}
