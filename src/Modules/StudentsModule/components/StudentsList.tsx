import userImg from "../../../assets/images/user.png";
import VisibilityIcon from "@mui/icons-material/Visibility";
import {
  useGetStudentsQuery,
} from "../../../redux/students/studentsSlice";
import { UserListProps } from "../../../interfaces/interfaces";
import { useState } from "react";
import StudentDetails from "./StudentDetails";
import Pagination from "../../SharedModule/components/UI/Pagination";
import { AnimatePresence, motion } from 'framer-motion';
export default function StudentsList() {
  const [open, setOpen] = useState<boolean>(false);
  const [detailsId, setDetailsId] = useState("");
  const { isLoading, data: users } = useGetStudentsQuery(0);
  
  const handleOpenModal = (id: string) => {
    setOpen(true);
    setDetailsId(id);
  };

  const [currentPage, setCurrentPage] = useState(0);
  const studentsPerPage = 10;
  const startIndex = currentPage * studentsPerPage;
  const endIndex = startIndex + studentsPerPage;
  const currentStudents = users?.slice(startIndex, endIndex);

  const handlePageChange = (selectedPage: number) => {
    setCurrentPage(selectedPage);
  };

  return (
    <>
      <div className="relative">
        <div className="border p-2">
          <h4 className="font-semibold text-xl mb-4">Students List</h4>
          {isLoading ? (
            Array.from({ length: 20 }, (_, index) => (
              <div
                key={index}
                className="flex items-center justify-between shadow-md p-3 rounded-md"
              >
                <div className="h-[32px] w-[32px] animate-pulse bg-gray-500 rounded-md" />
                <span className="h-[14px] w-[90px] animate-pulse bg-gray-500 rounded-md">
                  {""}
                </span>
                <span className="animate-pulse rounded-md h-[28px] w-[20px] bg-gray-500 " />
              </div>
            ))
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
              {currentStudents?.length > 0 ? (
                <>
                <AnimatePresence initial={false} >
                  {currentStudents.map((user: UserListProps) => (
                    <div key={user._id} className="border flex">
                      <img src={userImg} alt="" />
                      <div className="flex items-center justify-between w-full">
                        <div className="ml-3 ">
                          <h4>{user.first_name}</h4>
                        </div>
                        <VisibilityIcon
                          sx={{ mr: 2, cursor: "pointer" }}
                          onClick={() => handleOpenModal(user._id)}
                        />
                      </div>
                      
                    </div>
                    
                  ))}
                      </AnimatePresence>
                </>
                
              ) : (
                <p>No Data</p>
              )}
            </div>
          )}
        </div>
      </div>
      {open && (
        <div
          className="absolute top-0 bottom-0 left-0 right-0 flex items-center justify-center z-50"
          style={{ backgroundColor: "rgba(0,0,0,.25)" }}
          onClick={() => setOpen(false)}
        >
          <div className="w-[50%] h-[30%] bg-white rounded shadow-xl p-3">
            <p className="font-semibold text-xl">Student Details</p>
            <StudentDetails detailsId={detailsId} />
          </div>
          
        </div>
        
      )}
      {!isLoading && users && (
        <Pagination
          members={users}
          count={studentsPerPage}
          currentPage={currentPage}
          handlePageChange={handlePageChange}
        />
      )}
    </>
  );
}
