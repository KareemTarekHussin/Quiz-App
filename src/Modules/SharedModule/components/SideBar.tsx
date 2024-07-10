import { BookOpenCheck, CircleHelp, CircleX, ContactRound, House, Newspaper, SearchCheck, UsersRound } from 'lucide-react';
import { useEffect, useState } from "react";
import { Menu, MenuItem, Sidebar } from 'react-pro-sidebar';
import { Link } from 'react-router-dom';
import logoImg from '../../../assets/images/logo.png'

export default function SideBar({ toggled, toggleSidebar }) {
  const [iconRotation, setIconRotation] = useState(1);
  const [collapsedWidth, setCollapsedWidth] = useState("80px");
  const [collapsed, setCollapsed] = useState(true);

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
            >
            <div className='flex items-center justify-center '>
              <p className='text-2xl  font-semibold'>QuizApp</p>
              <BookOpenCheck className='ml-1 mt- ' />
            </div>
          </MenuItem>

          <MenuItem
            className='hidden sm:block h-20 border-b-2 bg-yellow-10'
            onClick={handleCollapse}
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

          <MenuItem 
            className='border-2 border-t-0 border-r-0 border-l-0'
            component={<Link to="" />} 
            icon={
              <div className="bg-menuItem mr-4 sm:mr-0 w-16 h-10 flex justify-center items-center rounded-md">
                <House className="w-10 h-9" />
              </div>
            }
          >
            <span>Dashboard</span>
          </MenuItem>

          <MenuItem 
            className="border-2 border-t-0 border-l-0 border-r-0"
            component={<Link to="students" />} 
            icon={
              <div className="bg-menuItem mr-4 sm:mr-0 w-16 h-10 flex justify-center items-center rounded-md">
                <ContactRound className="w-10 h-9" />
              </div>
            }
          >
            Students
          </MenuItem>    

          <MenuItem 
            className="border-2 border-t-0 border-l-0 border-r-0"
            component={<Link to="groups" />} 
            icon={
              <div className="bg-menuItem mr-4 sm:mr-0 w-16 h-10 flex justify-center items-center rounded-md">
                <UsersRound className="w-10 h-9" />
              </div>
            }
          >
            Groups
          </MenuItem>

          <MenuItem 
            className="border-2 border-t-0 border-l-0 border-r-0"
            component={<Link to="quizes" />} 
            icon={
              <div className="bg-menuItem mr-4 sm:mr-0 w-16 h-10 flex justify-center items-center rounded-md">
                <BookOpenCheck className="w-10 h-9" />
              </div>
            }
          >
            Quizes
          </MenuItem>

          <MenuItem 
            className="border-2 border-t-0 border-l-0 border-r-0"
            component={<Link to="results" />} 
            icon={
              <div className="bg-menuItem mr-4 sm:mr-0 w-16 h-10 flex justify-center items-center rounded-md">
                <Newspaper className="w-10 h-9" />
              </div>
            }
          >
            Results
          </MenuItem>

          <MenuItem 
            className="border-2 border-t-0 border-l-0 border-r-0"
            icon={
              <div className="bg-menuItem mr-4 sm:mr-0 w-16 h-10 flex justify-center items-center rounded-md">
                <CircleHelp className="w-10 h-9" />
              </div>
            }
          >
            Help
          </MenuItem>

        </Menu>
      </Sidebar> 
    </div> 
  );
}
