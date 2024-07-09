import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Sidebar, Menu, MenuItem } from 'react-pro-sidebar';
import { Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import Style from './sidebar.module.css'
import axios from 'axios';
import { FieldError } from 'react-hook-form';
import { BookOpenCheck, ChevronLeft, CircleHelp, ContactRound, House, Newspaper, UsersRound } from 'lucide-react';
interface Placeholders {
  oldPassword: string;
  newPassword: string;
  confirmNewPassword: string;
}

export default function SideBar() {
  let { register, handleSubmit, formState: { errors }, watch, reset } = useForm();
  // const { getToast } = useToast();
  const navigate = useNavigate();
  const [placeholder, setPlaceholder] = useState<Placeholders>({
    oldPassword: 'Enter your old password',
    newPassword: 'Enter your new password',
    confirmNewPassword: 'Confirm your new password',
  });  
  const [showPassword, setShowPassword] = useState({
    oldPassword: true,
    newPassword: true,
    confirmNewPassword: true,
  });
  
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [iconRotation, setIconRotation] = useState(1);
  let [isCollapse, setIsCollapse] = useState(true);
  let [collapsedWidth, setCollapsedWidth] = useState("80px");

  const updateCollapsedWidth = () => {
    const width = window.innerWidth;
    if (width <= 576) {
      setCollapsedWidth("60px");
    } else if (width <= 768) {
      setCollapsedWidth("80px");
    } else if (width <= 992) {
      setCollapsedWidth("80px");
    } else {
      setCollapsedWidth("80px");
    }
  };
const logout= ()=>{
  localStorage.removeItem("token");
  navigate("/")
}
  useEffect(() => {
    updateCollapsedWidth();
    window.addEventListener('resize', updateCollapsedWidth);
    return () => window.removeEventListener('resize', updateCollapsedWidth);
  }, []);
 
  const handleCollapse = () => {
    setIsCollapse(!isCollapse);
    setIconRotation(prevRotation => prevRotation === 1 ? -1 : 1);
  }
  
 
  
  return (
    <div className='sidebar-container sticky-top'>
      <Sidebar 
          collapsed={isCollapse} 
          // breakPoint={breakPoint}
          collapsedWidth={collapsedWidth}
          className=' bg-danger'
          >
          <Menu className='my- py-'>

            <MenuItem
              className='text-cente flex items-center justify-center d-none h-20 d-md-block border-b-2 bg-yellow-10'
              onClick={handleCollapse}
            >
              <div 
                className="icon-container" 
                style={
                  isCollapse ? 
                  { 
                    transform: `scaleX(${iconRotation})`, 
                    transition: 'transform 0.5s ease-out'
                  } : 
                  { 
                    transform: `scaleX(${iconRotation})`,
                    transition: 'transform 0.5s ease-out'
                  }
                }
              >
                <i className="fa-solid fa-arrow-right "></i>
              </div>
            </MenuItem>
            
            


            <MenuItem 
              className='border-2 border-t-0 border-r-0 border-l-0'
              component={<Link to="" />} 
              icon={
                  <div className="bg-menuItem w-16 h-10 flex justify-center items-center rounded-md">
                    <House className="w-10 h-9" />
                  </div>
                  }
            >
              
              <span>Dashboard</span>
            </MenuItem>

            {/* {loginUser?.userGroup=='Manager'?   */}
            <MenuItem 
            className=" border-2 border-t-0 border-l-0 border-r-0"
              component={<Link to="students" />} 
              icon={<div className="bg-menuItem w-16 h-10 flex justify-center items-center rounded-md">
                <ContactRound className="w-10 h-9" />
              </div>}
            >
             Students
            </MenuItem>    

            <MenuItem 
            className=" border-2 border-t-0 border-l-0 border-r-0 "
              component={<Link to="groups" />} 
              icon={<div className="bg-menuItem w-16 h-10 flex justify-center items-center rounded-md">
                <UsersRound className="w-10 h-9" />
              </div>}
            >
           Groups
            </MenuItem>

            <MenuItem 
            className=" border-2 border-t-0 border-l-0 border-r-0"
              component={<Link to="questions" />} 
              icon={<div className="bg-menuItem w-16 h-10 flex justify-center items-center rounded-md">
                <BookOpenCheck className="w-10 h-9" />
              </div>}
            >
         Questions
            </MenuItem>
            <MenuItem 
            className=" border-2 border-t-0 border-l-0 border-r-0"
              component={<Link to="quizes" />} 
              icon={<div className="bg-menuItem w-16 h-10 flex justify-center items-center rounded-md">
                <BookOpenCheck className="w-10 h-9" />
              </div>}
            >
          Quizes
            </MenuItem>

            <MenuItem 
            className=" border-2 border-t-0 border-l-0 border-r-0"
            component={<Link to="results" />} 
              icon={<div className="bg-menuItem w-16 h-10 flex justify-center items-center rounded-md">
                <Newspaper className="w-10 h-9" />
              </div>}
            >
           Results
            </MenuItem>

            <MenuItem 
            className=" border-2 border-t-0 border-l-0 border-r-0 fixed-bottom"
              // onClick={logout}
              icon={<div className="bg-menuItem w-16 h-10 flex justify-center items-center rounded-md">
                <CircleHelp className="w-10 h-9" />
              </div>}
            >
              Help
            </MenuItem>

            

          </Menu>
        </Sidebar> 
        </div> 
  )
}