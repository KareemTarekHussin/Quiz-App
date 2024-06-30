import { Outlet } from 'react-router-dom'
import Navbar from './Navbar'
import SideBar from './SideBar'

export default function MasterLayout() {
  return (
    <>
    <div className="flex">
    <div className="">
      <SideBar />
    </div>
    <div className="w-full flex flex-col">
      <div className="bg-master-bg">
        <Navbar />
      </div>
      <div className="w-full overflow-auto p-2 md:p-3 bg-master-bg">
        <Outlet />
      </div>
    </div>
  </div>
    </>
  )
}
