import logo from "../../../../assets/images/logo.png";
import image from "../../../../assets/images/Image.png";

export default function ForgetPass() {
  return (
    <div className="min-h-screen bg-[#0D1321] text-white">
    <div className="container">
      <div className="flex">
        <div className="flex-1 h-screen pt-8">
          <img src={logo} className="w-[150px]" alt="" />
          <div className="mt-10">
          <p className="text-[#C5D86D] text-2xl font-semibold">Forgot Password</p>

        {/* input */}
        {/* buton */}
        {/* navigation to login */}
          </div>
        </div>
        <div className="flex-1 hidden md:flex justify-end items-center h-screen">
          <img src={image} className="w-[80%]" alt="" />
        </div>
      </div>
    </div>
  </div>
  )
}
