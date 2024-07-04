
export default function Navbar() {
  return (
    <nav className="w-full  h-16  border-b flex px-5 items-center" >
    <div className="flex justify-between w-full items-center">
      
      <div className="flex md:order-2">
        {/* {i18n.language == "ar" ?
          <Button className="mx-2 border-2" onClick={() => { i18n.changeLanguage("en") }}>En</Button>
          : <Button className="mx-2 border-2" onClick={() => { i18n.changeLanguage("ar") }}>Ar</Button>
        } */}
        <div className="flex flex-col mx-2 ">
          <div className="flex justify-between items-center text-sm p "><span className="block">
            {/* {profileString?.first_name} {profileString?.last_name} */}Kareem
            </span> <span className=" text-mainColor font-bold">
              {/* {profileString?.role} */}Tarek
              </span></div>
          <span className="block truncate  font-medium">
            {/* {profileString?.email} */}aaaawwdaa@gma
            asdasd
          </span>
        </div>
      </div>
    </div>

  </nav>
  )
}
