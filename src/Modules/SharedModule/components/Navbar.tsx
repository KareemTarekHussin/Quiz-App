import { Bell, Mail, AlarmClock } from "lucide-react";
import Cookies from "universal-cookie";

export default function Navbar() {
  const cookie = new Cookies();
  const userInfo = cookie.get("userInfo");

  return (
    <nav className="border-b-2 border-x-gray-300 w-full">
      <div className=" flex items-center h-[78px] px-2">
        <p className="text-xl font-semibold">Dashboard</p>

        <div className="flex items-center h-full ml-auto">
          <div className="border-r-2 h-full flex items-center pr-3 pl-3">
            <button className=" flex items-center border p-2 rounded-3xl">
              <AlarmClock />
              <p className="px-2 text-xs md:text-base">New quiz</p>
            </button>
          </div>

          <div className="pl-4 border-r-2 border-slate-200 pr-4 h-full md:flex hidden items-center">
            <Mail />
          </div>
          <div className="px-4 border-r-2 border-slate-200 pr-4 h-full md:flex hidden items-center">
            <Bell />
          </div>
          <div className="px-4">
            <div className="flex items-center gap-3">
              <p className="text-sm md:text-base">{userInfo.first_name}</p>
              <p className="text-sm md:text-base">{userInfo.role}</p>
            </div>

            <p className="text-sm md:text-base">{userInfo.email}</p>
          </div>
        </div>
      </div>
    </nav>
  );
}
