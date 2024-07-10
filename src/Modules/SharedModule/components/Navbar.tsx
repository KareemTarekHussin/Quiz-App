import { Bell, ChevronDown, Mail, Menu } from "lucide-react";
import { useState } from "react";

interface NavbarProps {
  toggleSidebar: () => void;
}

export default function Navbar({ toggleSidebar }: NavbarProps) {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className="w-full bg-yellow-30 h-20 border-2 border-l-0 flex items-center">
      <div className="bg-green-40 h-20 flex flex-1">
          <button onClick={toggleSidebar} className="p-5 sm:hidden border-r-2">
            <Menu />
          </button>
        <div className="flex bg-red-10 justify-between items-center flex-1 border-r-2 px-2 gap-4">
          <h1 className="font-semibold">Groups</h1>
          <button className="rounded-full bg-transparent font-semibold py-2 px-4 border border-black">
            New Quiz
          </button>
        </div>
        <div className="hidden md:flex flex px-10 gap-4 bg-red-5 justify-center border-r-2">
          <div className="flex justify-center items-center bg-yellow-40">
            <Mail />
          </div>
        </div>
        <div className="hidden md:flex flex px-10 gap-4 bg-red-5 justify-center border-r-2">
          <div className="flex justify-center items-center bg-yellow-40">
            <Bell />
          </div>
        </div>
        <div className="hidden md:flex flex-1 items-center justify-between px-10">
          <div>
            <p>Lorem ipsum dolor</p>
            <p>Lorem ipsum dolor</p>
          </div>
          <div>
            <ChevronDown />
          </div>
        </div>
        <div className="md:hidden flex items-center px-4">
          <button onClick={toggleDropdown} className="flex items-center">
            <ChevronDown />
          </button>
          {isOpen && (
            <div className="absolute top-20 left-0 w-full bg-white shadow-md">
              <div className="flex flex-col items-start px-4 py-2">
                <div className="flex items-center gap-4">
                  <Mail />
                  <span>Messages</span>
                </div>
                <div className="flex items-center gap-4 mt-2">
                  <Bell />
                  <span>Notifications</span>
                </div>
                <div className="flex flex-col mt-4">
                  <span>Lorem ipsum dolor</span>
                  <span>Lorem ipsum dolor</span>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}
