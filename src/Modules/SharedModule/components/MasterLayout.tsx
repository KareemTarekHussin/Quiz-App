import { Outlet } from 'react-router-dom';
import Navbar from './Navbar';
import SideBar from './SideBar';
import { useState } from 'react';

export default function MasterLayout() {
  const [isSidebarToggled, setIsSidebarToggled] = useState(false);
  const [selectedMenuItem, setSelectedMenuItem] = useState("Groups"); // Default text

  const toggleSidebar = () => {
    setIsSidebarToggled(!isSidebarToggled);
  };

  return (
    <div className="flex">
      <div>
        <SideBar 
          toggled={isSidebarToggled} 
          toggleSidebar={toggleSidebar} 
          setSelectedMenuItem={setSelectedMenuItem} // Pass the setter function
        />
      </div>
      <div className="w-full flex flex-col">
        <div className="bg-master-bg">
          <Navbar 
            toggleSidebar={toggleSidebar} 
            selectedMenuItem={selectedMenuItem} // Pass the selected menu item
          />
        </div>
        <div className="w-full overflow-auto p-2 md:p-5 bg-master-bg">
          <Outlet />
        </div>
      </div>
    </div>
  );
}
