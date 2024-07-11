import logo from "../../../../assets/images/logo.png";
import image from "../../../../assets/images/Image.png";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";
import { useChangePasswordMutation } from '../../../../redux/auth/authSlice';
import { useState } from "react";


interface initialValues {
  password: string;
  password_new: string;
}

export default function ChangePass() {

  const [changePassword, { isLoading }] = useChangePasswordMutation();
  const navigate = useNavigate();
  const [visible, setVisible] = useState(false);
  const [visibleConfirm, setVisibleConfirm] = useState(false);

  const valiationSchema = Yup.object({
    password: Yup.string().required("password is required"),
    password_new: Yup.string().required(" New password is required"),

  })

  const formik = useFormik<initialValues>({
    initialValues: {
      password: "",
      password_new: "",
    },
    validationSchema: valiationSchema,
    onSubmit: (values) => {
      onSubmit(values);
    },
  });

  const onSubmit = async (values) => {
    try {
      const response = await changePassword(values).unwrap();
      if ('data' in response) {
        navigate('/login');
      }
    } catch (error: any) {
      console.error(error);
    }
  }

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
                <form onSubmit={formik.handleSubmit}>
                  <label>Old Password</label>
                  <div>
                    <span className="absolute p-2">
                      <i className="fa-solid fa-envelope text-white text-xl mx-2"></i>
                    </span>
                    <input
                      type="text"
                      name="password"
                      placeholder="Type your old password"
                      className="relative w-full bg-transparent border-[3px] rounded-[8px] py-2 px-[50px] mb-5 placeholder:text-white"
                      onChange={formik.handleChange}
                    />
                    <div className="text-[#ff0000]">
                      {formik.touched.password && formik.errors.password
                        ? formik.errors.password
                        : null}
                    </div>
                  </div>
                  <label>New Password</label>
                  <div className="relative">
                    <span className="absolute p-2">
                      <i className="fa-solid fa-lock text-white text-xl mx-2"></i>
                    </span>
                    <input
                      type={visible ? "text" : "password"}
                      name="password_new"
                      placeholder="Type your new password"
                      className="relative w-full bg-transparent border-[3px] rounded-[8px] py-2 px-[50px] mb-5 placeholder:text-white"
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
                      {formik.touched.password_new && formik.errors.password_new
                        ? formik.errors.password_new
                        : null}
                    </div>
                  </div>
                  <label>Confirm New Password</label>
                  <div className="relative">
                    <span className="absolute p-2">
                      <i className="fa-solid fa-lock text-white text-xl mx-2"></i>
                    </span>
                    <input
                      type={visibleConfirm ? "text" : "password"}
                      name="password_new"
                      placeholder="Type your confirm password"
                      className="relative w-full bg-transparent border-[3px] rounded-[8px] py-2 px-[50px] mb-5 placeholder:text-white"
                      onChange={formik.handleChange}
                    />
                    <span
                      onClick={() => setVisibleConfirm(!visibleConfirm)}
                      className=" absolute p-2 right-1"
                    >
                      {visibleConfirm ? (
                        <i className="fa-regular fa-eye text-white text-xl mx-2  "></i>
                      ) : (
                        <i className="fa-regular fa-eye-slash text-white text-xl mx-2 "></i>
                      )}
                    </span>
                    <div className="text-[#ff0000]">
                      {formik.touched.password_new && formik.errors.password_new
                        ? formik.errors.password_new
                        : null}
                    </div>
                  </div>

                  <div className="flex justify-between">
                    <button
                      type="submit"
                      className="bg-white my-5 px-6 py-2 text-black font-semibold rounded-md"
                    >
                      {isLoading ? (
                        "Changing..."
                      ) : (
                        <>
                          Change
                          <i className="fa-solid fa-check bg-black rounded-full text-white p-1 mx-1"></i>
                        </>
                      )}
                    </button>

                  </div>
                </form>

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

