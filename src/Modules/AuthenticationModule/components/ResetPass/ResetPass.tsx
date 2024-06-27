import logo from "../../../../assets/images/logo.png";
import image from "../../../../assets/images/Image.png";

export default function ResetPass() {
  return (
    <div className="min-h-screen bg-[#0D1321] text-white">
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
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="#bbb"
                    stroke="#bbb"
                    className="w-[18px] h-[18px] absolute left-4"
                    viewBox="0 0 682.667 682.667"
                  >
                    <defs>
                      <clipPath id="a" clipPathUnits="userSpaceOnUse">
                        <path
                          d="M0 512h512V0H0Z"
                          data-original="#000000"
                        ></path>
                      </clipPath>
                    </defs>
                    <g
                      clip-path="url(#a)"
                      transform="matrix(1.33 0 0 -1.33 0 682.667)"
                    >
                      <path
                        fill="none"
                        stroke-miterlimit="10"
                        stroke-width="40"
                        d="M452 444H60c-22.091 0-40-17.909-40-40v-39.446l212.127-157.782c14.17-10.54 33.576-10.54 47.746 0L492 364.554V404c0 22.091-17.909 40-40 40Z"
                        data-original="#000000"
                      ></path>
                      <path
                        d="M472 274.9V107.999c0-11.027-8.972-20-20-20H60c-11.028 0-20 8.973-20 20V274.9L0 304.652V107.999c0-33.084 26.916-60 60-60h392c33.084 0 60 26.916 60 60v196.653Z"
                        data-original="#000000"
                      ></path>
                    </g>
                  </svg>
                  <input
                    type="email"
                    placeholder="Type Your email"
                    className="pl-12 px-4 py-3 bg-[#0D1321] focus:bg-transparent w-full text-sm border outline-[#0D1321] rounded transition-all"
                  />
                </div>
                <div className="relative flex items-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="#bbb"
                    stroke="#bbb"
                    className="w-[18px] h-[18px] absolute left-4"
                    viewBox="0 0 682.667 682.667"
                  >
                    <defs>
                      <clipPath id="a" clipPathUnits="userSpaceOnUse">
                        <path
                          d="M0 512h512V0H0Z"
                          data-original="#000000"
                        ></path>
                      </clipPath>
                    </defs>
                    <g
                      clip-path="url(#a)"
                      transform="matrix(1.33 0 0 -1.33 0 682.667)"
                    >
                      <path
                        fill="none"
                        stroke-miterlimit="10"
                        stroke-width="40"
                        d="M452 444H60c-22.091 0-40-17.909-40-40v-39.446l212.127-157.782c14.17-10.54 33.576-10.54 47.746 0L492 364.554V404c0 22.091-17.909 40-40 40Z"
                        data-original="#000000"
                      ></path>
                      <path
                        d="M472 274.9V107.999c0-11.027-8.972-20-20-20H60c-11.028 0-20 8.973-20 20V274.9L0 304.652V107.999c0-33.084 26.916-60 60-60h392c33.084 0 60 26.916 60 60v196.653Z"
                        data-original="#000000"
                      ></path>
                    </g>
                  </svg>
                  <input
                    type="email"
                    placeholder="Type Your email"
                    className="pl-12 px-4 py-3 bg-[#0D1321] focus:bg-transparent w-full text-sm border outline-[#0D1321] rounded transition-all"
                  />
                </div>
                <button
                  type="button"
                  className="px-6 py-2.5 !mt-8 text-sm bg-[#007bff] hover:bg-blue-600 text-white rounded active:bg-[#006bff]"
                >
                  Submit
                </button>
              </form>
            </div>
            {/* input */}
            {/* button */}
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
