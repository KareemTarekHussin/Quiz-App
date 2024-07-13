import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { Group, StudentProps } from "../../../interfaces/interfaces";
import {
  useAddGroupMutation,
  useDeleteGroupMutation,
  useGetGroupsQuery,
} from "../../../redux/Groups/groupSlice";
import UpdateGroupForm from "./UpdateGroupForm";
import { useGetAllStudentsWithoutGroupQuery } from "../../../redux/students/studentsSlice";

interface Input {
  name: string;
  students: string[];
}

export default function Groups() {
  // const [groups, setGroups] = useState<Group[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState<boolean>(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false); // New state for delete modal
  const [groupIdToDelete, setGroupIdToDelete] = useState(""); // New state to track group ID to delete
  const [groupEdit, setGroupEdit] = useState<{
    _id: string;
    name: string;
    students: string[];
  }>({ _id: "", name: "", students: [] });

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<Input>();

  const handleEdit = (group: {
    _id: string;
    name: string;
    students: string[];
  }) => {
    setShowEditModal(true);
    setGroupEdit(group);
  };

  const handleDeleteClick = (id: string) => {
    setShowDeleteModal(true);
    setGroupIdToDelete(id);
  };

  const { data: groups } = useGetGroupsQuery(0);
  const { data: studentsWithOutGroup } = useGetAllStudentsWithoutGroupQuery(0);

  // console.log(studentsWithOutGroup, "Students");

  const [addGroup, { isLoading }] = useAddGroupMutation();

  const onSubmit: SubmitHandler<Input> = async (data) => {
    await addGroup(data);
    setShowModal(false);
    setValue("name", "");
    setValue("students", []);
  };

  const [deleteGroup, { isLoading: isLoadingDelete }] =
    useDeleteGroupMutation();
  const handleDelete = async () => {
    await deleteGroup(groupIdToDelete);
    setShowDeleteModal(false);
  };

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
        {showModal && (
          <>
            <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
              <div className="relative w-auto my-6 mx-auto max-w-3xl">
                <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white ">
                  <div className="flex justify-between p-5 border-b border-solid border-blueGray-200 rounded-t">
                    <h3 className="text-3xl font-semibold">
                      Set up a new Group
                    </h3>
                    <button
                      className="text-black text-3xl font-semibold"
                      onClick={() => setShowModal(false)}
                    >
                      <i className="fa-solid fa-close text-black w-6 block"></i>
                    </button>
                  </div>
                  <div className="p-[50px]">
                    <form onSubmit={handleSubmit(onSubmit)}>
                      <div className="flex border rounded-2xl">
                        <h1 className="bg-[#FFEDDF] inline-flex justify-center items-center rounded-lg py-1 w-44">
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
                      <div className="my-7 flex border-2 rounded-lg flex-col">
                        <h1 className="bg-[#FFEDDF] inline-flex justify-center items-center rounded-lg py-2 w-44">
                          List Students
                        </h1>

                        <select
                          className="outline-none"
                          {...register("students", {
                            required: "students is required",
                          })}
                          multiple
                        >
                          {studentsWithOutGroup?.map(
                            (student: StudentProps) => (
                              <option value={student._id}>
                                {student.first_name} {student.last_name}
                              </option>
                            )
                          )}
                        </select>
                      </div>
                      {errors.students && (
                        <p className="text-[#ff0000]">
                          {errors.students.message}
                        </p>
                      )}

                      <button
                        className="px-2 py-1 text-black rounded-lg border text-[20px]"
                        type="submit"
                        disabled={isLoading}
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
        )}
        {showEditModal && (
          <>
            <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
              <div className="relative w-auto my-6 mx-auto max-w-3xl">
                <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white">
                  <div className="flex justify-between p-5 border-b border-solid border-blueGray-200 rounded-t">
                    <h3 className="text-3xl font-semibold">Update Group</h3>
                    <button
                      className="text-black text-3xl font-semibold"
                      onClick={() => setShowEditModal(false)}
                    >
                      <i className="fa-solid fa-close text-black w-6 block"></i>
                    </button>
                  </div>
                  <div className="p-[50px]">
                    <UpdateGroupForm
                      groupEdit={groupEdit}
                      setShowEditModal={setShowEditModal}
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
          </>
        )}
        {showDeleteModal && (
          <>
            <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
              <div className="relative w-auto my-6 mx-auto max-w-3xl">
                <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white">
                  <div className="flex justify-between p-5 border-b border-solid border-blueGray-200 rounded-t">
                    <h3 className="text-3xl font-semibold">Delete Group</h3>
                    <button
                      className="text-black text-3xl font-semibold"
                      onClick={() => setShowDeleteModal(false)}
                    >
                      <i className="fa-solid fa-close text-black w-6 block"></i>
                    </button>
                  </div>
                  <div className="p-[50px]">
                    <div className="text-center">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="w-14 fill-red-500 inline"
                        viewBox="0 0 24 24"
                      >
                        <path
                          d="M19 7a1 1 0 0 0-1 1v11.191A1.92 1.92 0 0 1 15.99 21H8.01A1.92 1.92 0 0 1 6 19.191V8a1 1 0 0 0-2 0v11.191A3.918 3.918 0 0 0 8.01 23h7.98A3.918 3.918 0 0 0 20 19.191V8a1 1 0 0 0-1-1Zm1-3h-4V2a1 1 0 0 0-1-1H9a1 1 0 0 0-1 1v2H4a1 1 0 0 0 0 2h16a1 1 0 0 0 0-2ZM10 4V3h4v1Z"
                          data-original="#000000"
                        />
                        <path
                          d="M11 17v-7a1 1 0 0 0-2 0v7a1 1 0 0 0 2 0Zm4 0v-7a1 1 0 0 0-2 0v7a1 1 0 0 0 2 0Z"
                          data-original="#000000"
                        />
                      </svg>
                    </div>
                    <p className="font-semibold text-[20px]">
                      Are you sure you want to delete this group?
                    </p>

                    <div className="flex justify-end my-5">
                      <button
                        className={`px-2 py-1 text-black rounded-lg border text-[20px] mr-2`}
                        onClick={() => setShowDeleteModal(false)}
                      >
                        Cancel
                      </button>
                      <button
                        disabled={isLoadingDelete}
                        className={`px-2 py-1 text-white ${
                          isLoadingDelete ? "bg-red-900" : "bg-red-600"
                        }   rounded-lg text-[20px]`}
                        onClick={handleDelete}
                      >
                        {isLoadingDelete ? "Deleting..." : "Delete"}
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
          </>
        )}
      </div>
      <div className="w-full h-screen p-5 border-2 rounded-md font-nunito shadow-lg">
        <h1 className="text-2xl font-semibold">Groups list</h1>
        <div className="mt-5 flex flex-wrap gap-5">
          {groups?.map((group: Group) => (
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
                  <EditIcon
                    onClick={() => handleEdit(group)}
                    className="text-yellow-400 fill-yellow-500 hover:fill-yellow-700"
                  />
                </button>
                <button
                  className="mr-4"
                  title="Delete"
                  onClick={() => handleDeleteClick(group._id)}
                >
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
