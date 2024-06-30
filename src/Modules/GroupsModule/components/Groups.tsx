import  { useEffect, useState } from 'react';
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import axios from 'axios';
import { Group } from '../../../interfaces/interfaces';


export default function Groups() {
  const [groups, setGroups] = useState<Group[]>([]);
  const getgroupslist = async () => {
    try {
      let response = await axios.get(
        "https://upskilling-egypt.com:3005/api/group",
        {
          /// TODO: replace with auth instance
          // headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
          headers: { Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI2NjdkNWE0N2M4NWYxZWNkYmMyNmY1ZDIiLCJlbWFpbCI6ImthcmVlbXRhcmVrMzIxOTUyMUBnbWFpbC5jb20iLCJyb2xlIjoiSW5zdHJ1Y3RvciIsImlhdCI6MTcxOTcwMTI1NywiZXhwIjoxNzIzMzAxMjU3fQ.kZj7UyaCdjgO22BOTy6x3a2vLjyq4x03t8Y9uNyciGg` },
        }
      );
      console.log(response.data);
      setGroups(response.data);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
   getgroupslist();
  }, []);
  return (
    <>
        <div className="container p-5 border-2 rounded-md font-nunito">
      <h1 className="text-2xl font-semibold">Groups list</h1>
     
        <div className="mt-5">
          {groups.map(group => (
            <div key={group._id} className="flex items-center justify-between p-5 border-2 rounded-md w-full md:w-[48%] mb-6 md:mb-0">
              <div className="flex flex-col">
                <h3 className="mb-1 text-xl">{group.name}</h3>
                <p>No of students: {group.students.length}</p>
              </div>
              <div className="flex space-x-3">
                <button className="mr-4" title="Edit">
                  <EditIcon className="text-yellow-400 fill-yellow-500 hover:fill-yellow-700" />
                </button>
                <button className="mr-4" title="Delete">
                  <DeleteIcon className="text-red-600 fill-red-500 hover:fill-red-700" />
                </button>
              </div>
            </div>
          ))}
        </div>
     
    </div>
  );
    </>
  );
}



{/* <div className="flex items-center justify-between p-5 border-2 rounded-md  mt-5 w-2/4">
<div className="flex flex-col">
  <h3 className='mb-2 rounded-md animate-pulse bg-gray-500 h-[16px] w-[160px] '></h3>
  <span className=' h-[12px] w-[120px] bg-gray-500 rounded-md animate-pulse'></span>
  <h3 className="mb-2  text-xl ">asd</h3>
  <p>No of students:</p>
</div>
<div className="flex space-x-3">
  <span className='animate-pulse rounded-md mr-1 h-[28px] w-[20px] bg-gray-500 ' /> <span className=' animate-pulse rounded-md mr-1 h-[28px] w-[20px] bg-gray-500 ' />

  <button className="mr-4" title="Edit">
    <EditIcon className=" text-yellow-400 fill-blue-500 hover:fill-blue-700" />
  </button>
  <button className="mr-4" title="Delete">
    <DeleteIcon className=" text-red-600 fill-red-500 hover:fill-red-700" />
  </button>
</div>
</div> */}