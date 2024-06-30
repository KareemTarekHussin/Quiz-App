import { useEffect, useState } from "react";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import axios from "axios";
import { Group } from "../../../interfaces/interfaces";
import { useForm } from "react-hook-form";
import AsyncSelect from "react-select/async";

export default function Groups() {
  const [groups, setGroups] = useState<Group[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedOption, setSelectedOption] = useState([]);
  const [students, setStudents] = useState([]);
  const [value, setValue] = useState("");
  const getgroupslist = async () => {
    try {
      let response = await axios.get(
        "https://upskilling-egypt.com:3005/api/group",
        {
          /// TODO: replace with auth instance
          // headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
          headers: {
            Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI2NjdkNWE0N2M4NWYxZWNkYmMyNmY1ZDIiLCJlbWFpbCI6ImthcmVlbXRhcmVrMzIxOTUyMUBnbWFpbC5jb20iLCJyb2xlIjoiSW5zdHJ1Y3RvciIsImlhdCI6MTcxOTcwMTI1NywiZXhwIjoxNzIzMzAxMjU3fQ.kZj7UyaCdjgO22BOTy6x3a2vLjyq4x03t8Y9uNyciGg`,
          },
        }
      );
      console.log(response.data);
      setGroups(response.data);
    } catch (error) {
      console.log(error);
    }
  };
  const getStudunts = async () => {
    try {
      const response = await axios.get(
        "https://upskilling-egypt.com:3005/api/student",
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        }
      );
      // console.log(response.data);
      setStudents(response.data);
    } catch (error) {
      console.log(error);
    }
  };
  const onSubmit = async (data) => {
    console.log(data);

    // try {
    //   const response
    // } catch (error) {

    // }
  };
  let {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm();

  const handleInputChange = (value) => {
    setValue(value);
  };
  const handleChange = (selectedOption: any) => {
    setSelectedOption(selectedOption);
    console.log(selectedOption);
  };
  useEffect(() => {
    getgroupslist();
    getStudunts();
  }, []);
  return (
    <>
      <div className="flex justify-end my-2">
        
        <button
          className=" text-sm px-3 py-1 rounded-[50px] border-solid border-[1px]"
          type="button"
          onClick={() => setShowModal(true)}
        >
          <i className="fa-solid fa-plus p-1 mx-1 text-white bg-black rounded-full"></i>
          Add Group
        </button>
        {showModal ? (
          <>
            <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
              <div className="relative w-auto my-6 mx-auto max-w-3xl">
                <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white">
                  <div className="flex  justify-between p-5 border-b border-solid border-blueGray-200 rounded-t">
                    <h3 className="text-3xl font-semibold">
                      Set up a new Group
                    </h3>
                    <div>
                      <button
                        className="  text-black text-3xl font-semibold  "
                        onClick={() => setShowModal(false)}
                      >
                        <i className=" fa-solid fa-close text-black w-6  block "></i>
                      </button>
                    </div>
                  </div>
                  <div className="p-[50px]">
                    <form onSubmit={handleSubmit(onSubmit)}>
                      <div className="flex border rounded-2xl">
                        <h1 className="bg-[#FFEDDF] inline-flex justify-center items-center rounded-lg py-1 w-44   ">
                          Group Name
                        </h1>
                        <input
                          type="text"
                          className="w-full outline-none focus:outline-none"
                          {...register("name", {
                            required: "name is required",
                          })}
                        />
                      </div>
                      {errors.name && (
                        <p className="text-[#ff0000]">{errors.name.message}</p>
                      )}
                      <div className="my-7 flex border-2 rounded-lg">
                        <h1 className="bg-[#FFEDDF] inline-flex justify-center items-center rounded-lg py-1 w-44 ">
                          List Students
                        </h1>

                        <AsyncSelect
                          isMulti={true}
                          className="w-full text-black"
                          cacheOptions
                          defaultOptions={false}
                          getOptionLabel={(e) => e.first_name}
                          getOptionValue={(e) => e._id}
                          value={selectedOption}
                          onInputChange={handleInputChange}
                          {...register("students", {
                            required: "Students is required",
                          })}
                          loadOptions={getStudunts}
                          onChange={handleChange}
                        />
                        {/* <select
                        multiple={true}
                        
                        className="px-2 rounded-r-md outline-none flex-1 border-none  bg-transparent py-1.5 pl-1 text-black placeholder:text-gray-400  sm:text-sm sm:leading-6"
                        {...register("students", {
                          required: "Students is required",
                        })}
                        onChange={handleChange}
                      >
                        {students.map((student) => (
                          <option  value={student._id} key={student._id}>
                            {student.first_name}
                          </option>
                        ))}
                      </select> */}
                      </div>
                      {errors.students && (
                        <p className="text-[#ff0000]">
                          {errors.students.message}
                        </p>
                      )}

                      <button
                        className=" px-2 py-1  text-black rounded-lg border text-[20px] "
                        type="submit"
                      >
                        Save
                      </button>
                    </form>
                  </div>
                </div>
              </div>
            </div>
            <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
          </>
        ) : null}
      </div>
      <div className="w-full  h-screen p-5 border-2 rounded-md font-nunito shadow-lg">
        <h1 className="text-2xl font-semibold">Groups list</h1>
        <div className="mt-5 flex flex-wrap">
          {groups.map((group) => (
            <div
              key={group._id}
              className="flex items-center justify-between p-5 border-2 rounded-md w-full md:w-[48%] mb-6 md:mb-0"
            >
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
    </>
  );
}

{
  /* <div className="flex items-center justify-between p-5 border-2 rounded-md  mt-5 w-2/4">
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
</div> */
}
