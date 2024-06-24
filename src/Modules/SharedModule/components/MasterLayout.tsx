import { Outlet } from 'react-router-dom'
import Navbar from './Navbar'
import SideBar from './SideBar'

export default function MasterLayout() {
  return (
    <>
    <div><SideBar/></div>
    <div>
<Navbar/>
<Outlet/>
    </div>
    </>
  )
}
