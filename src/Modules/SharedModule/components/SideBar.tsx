import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Sidebar, Menu, MenuItem } from 'react-pro-sidebar';
import { Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import Style from './sidebar.module.css'
import axios from 'axios';
import { FieldError } from 'react-hook-form';
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

  // ?============================================================================================
 
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
          className='border-0 bg-danger'
          >
          <Menu className='my-5 py-5'>

            <MenuItem
              className='text-center d-none d-md-block'
              onClick={handleCollapse}
            >
              <div className="icon-container bg-warnin p-2 rounded-3" style={isCollapse? { transform: `scaleX(${iconRotation})` }: { transform: `scaleX(${iconRotation})` }}>
                <i className="fa-solid fa-arrow-right"></i>
              </div>
            </MenuItem>
            
            <MenuItem 
              className='mt-4 mb-2'
              component={<Link to="" />} 
              icon={<i className="fa-solid fa-house"></i>}
            >
              <span>Dashboard</span>
            </MenuItem>

{/* {loginUser?.userGroup=='Manager'?   */}
<MenuItem 
            className="mb-2"
              component={<Link to="students" />} 
              icon={<i className="fa-solid fa-users"></i>}
            >
             Students
            </MenuItem>
      
          

            <MenuItem 
            className="mb-2"
              component={<Link to="groups" />} 
              icon={<i className="fa-solid fa-bars-progress"></i>}
            >
           Groups
            </MenuItem>

            <MenuItem 
            className="mb-2"
              component={<Link to="quizes" />} 
              icon={<i className="fa-solid fa-tasks"></i>}
            >
          Quizes
            </MenuItem>

            <MenuItem 
            className="mb-2"
            component={<Link to="results" />} 
              icon={<i className="fa-solid fa-unlock"></i>}
            >
           Results
            </MenuItem>

            <MenuItem 
            className="mb-2"
              onClick={logout}
              icon={<i className="fa-solid fa-circle-left"></i>}
            >
              Logout
            </MenuItem>

            

          </Menu>
        </Sidebar> 
        </div> 
  )
}
