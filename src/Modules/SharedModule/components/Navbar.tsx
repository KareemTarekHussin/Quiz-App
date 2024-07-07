import { Bell, ChevronDown, Mail,AlarmClockPlus } from "lucide-react";

export default function Navbar() {
  return (
    <nav className="w-full bg-yellow-30 h-20 border-2 border-l-0
     flex items-center" >

      <div className="bg-green-40 h-20 flex flex-1">

        <div className="flex bg-red-10 justify-between items-center flex-1 border-r-2 px-2 gap-4">
          <h1 className="font-semibold" >Groups</h1>

          <button 
  className="
    flex 
    items-center 
    rounded-full 
    bg-transparent 
    font-semibold 
    py-2 
    px-4 
    border 
    border-black
  "
>
  <AlarmClockPlus className="mr-2" />
  New Quiz
</button>
          
        </div>

        {/* Messages */}
        
        <div className="flex flex- px-10 gap-4 bg-red-5 justify-center border-r-2">

          <div className="flex justify-center items-center bg-yellow-40 p-" >
            <Mail />
          </div>

          {/* <div className="flex justify-center items-center bg-yellow-40 p-" >l
            <Bell />
          </div> */}

        </div>

          {/* Notifications */}
        <div className="flex flex- px-10 gap-4 bg-red-5 justify-center border-r-2">

          <div className="flex justify-center items-center bg-yellow-40 p-" >
            <Bell />
          </div>
        </div>

            {/* Information */}
        <div className="flex flex-1 items-center justify-between px-10">
          <div>
            <p>Kareem Tarek</p>
            <p>kareemtarek3219521@gmail.com</p>
          </div>
          <div>
          <ChevronDown />
          </div>

        </div>



      </div>

    

  </nav>
  )
}