import { BookOpenCheck, CircleHelp, ContactRound, House, Newspaper, UsersRound,LogOut,Watch } from 'lucide-react';
import { useEffect, useState } from "react";
import { Menu, MenuItem, Sidebar } from 'react-pro-sidebar';
import { Link, useNavigate } from 'react-router-dom';
import { useMediaQuery } from '@mui/material';
import CookieServices from '../../../utils/Cookies'

export default function SideBar({ toggled, toggleSidebar, setSelectedMenuItem }:any) {
  const navigate = useNavigate();
  const [iconRotation, setIconRotation] = useState(1);
  const [collapsedWidth, setCollapsedWidth] = useState("80px");
  const [collapsed, setCollapsed] = useState(true);
  const [selectedItem, setSelectedItem] = useState('');

  const handleCollapse = () => {
    setCollapsed(!collapsed);
    setIconRotation(prevRotation => prevRotation === 1 ? -1 : 1);
  };

  const updateCollapsedWidth = () => {
    const width = window.innerWidth;
    if (width <= 576) {
      setCollapsedWidth("60px");
    } else if (width <= 768) {
      setCollapsedWidth("80px");
    } else {
      setCollapsedWidth("80px");
    }
  };

  const handleResize = () => {
    const width = window.innerWidth;
    if (width <= 768) {
      setCollapsed(false); // Un-collapsed on mobile
    } else {
      setCollapsed(true); // Collapsed on larger screens
    }
  };

  useEffect(() => {
    updateCollapsedWidth();
    handleResize();
    window.addEventListener('resize', updateCollapsedWidth);
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', updateCollapsedWidth);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const isMobile = useMediaQuery('(max-width:576px)');

  
  
  const handleMenuItemClick = (item:any) => {
    setSelectedItem(item.to);
    setSelectedMenuItem(item.label); // Update the selected menu item text
    if (isMobile) {
      toggleSidebar();
    }
  };
  const role = CookieServices.get("userInfo").role;
  
  const instructorItems = [
    { to: "", label: "Dashboard", icon: <House className="w-10 h-9" /> },
    { to: "student", label: "Students", icon: <ContactRound className="w-10 h-9" /> },
    { to: "groups", label: "Groups", icon: <UsersRound className="w-10 h-9" /> },
    { to: "questions", label: "Questions", icon: <BookOpenCheck className="w-10 h-9" /> },
    { to: "quizes", label: "Quizes", icon: <Watch className="w-10 h-9" /> },
    { to: "results", label: "Results", icon: <Newspaper className="w-10 h-9" /> },
    // { to: "help", label: "Help", icon: <CircleHelp className="w-10 h-9" /> }
  ];
  const studentItems = [
    { to: "quizes", label: "Quizes", icon: <Watch className="w-10 h-9" /> },
    { to: "results", label: "Results", icon: <Newspaper className="w-10 h-9" /> },
  ];

  const menuItems = role === "Instructor" ? instructorItems : studentItems;

  const logout = () => {
    CookieServices.remove("userInfo")
    CookieServices.remove("token")
    navigate('/')
  }
 
  return (
    <div className='sidebar-container border-r-2 sticky-top'>
      <Sidebar 
        collapsed={collapsed} 
        collapsedWidth={collapsedWidth}
        toggled={toggled}
        breakPoint="sm"
        onBackdropClick={toggleSidebar}
        className=''
      >
        <Menu className='my-14 sm:my-0'>
          <MenuItem 
            className='sm:hidden text-blue-950 text-center bg-menuItem'
             key="logo"
          >
            <div className='flex items-center justify-center '>
              <p className='text-2xl  font-semibold'>QuizApp</p>
              <BookOpenCheck className='ml-1 mt- ' />
            </div>
          </MenuItem>

          <MenuItem
            className='hidden sm:block h-20 border-b-2 bg-yellow-10'
            onClick={handleCollapse}
             key="collapse"
          >
            <div 
              className="icon-container flex justify-center" 
              style={{
                transform: `scaleX(${iconRotation})`, 
                transition: 'transform 0.5s ease-out'
              }}
            >
              <i className="fa-solid fa-arrow-right"></i>
            </div>
          </MenuItem>

          {menuItems.map((item) => (
            <>
            <MenuItem 
            key={item.to}
            className='border-2 bg-blac relative border-t-0 border-r-0 border-l-0 overflow-hidden'
            component={<Link to={item.to} />}
            onClick={() => handleMenuItemClick(item)}
            icon={
              <div className={`mr-4 sm:mr-0 w-16 h-10 flex justify-center items-center rounded-md ${selectedItem === item.to ? 'bg-blue-950 text-white' : 'bg-menuItem'}`}>
                {item.icon}
              </div>
            }
          >
            <div className="flex items-center justify-between">
              <span>{item.label}</span>
              {selectedItem === item.to && <div className="w-1 h-24 ml-2 absolute right-0 bg-blue-950"></div>}
            </div>
          </MenuItem>
            </>
          ))}
           <MenuItem 
            key="logout"
            className='border-2 bg-blac relative border-t-0 border-r-0 border-l-0 overflow-hidden'
            onClick={logout}
            icon={
              <div className='mr-4 sm:mr-0 w-16 h-10 flex justify-center items-center rounded-md bg-menuItem'>
                <LogOut className="w-10 h-9" />
              </div>
            }
          >
            <div className="flex items-center justify-between">
              <span>Logout</span>
            </div>
          </MenuItem>
        </Menu>
      </Sidebar> 
    </div> 
  );
}