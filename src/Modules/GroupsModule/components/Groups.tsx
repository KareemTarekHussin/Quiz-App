import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import axios from "axios";
import { useEffect, useState } from "react";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import Select from "react-select";
import { Group } from "../../../interfaces/interfaces";
import {
  useAddGroupMutation,
  useDeleteGroupMutation,
  useGetGroupsQuery,
  useUpdateGroupMutation,
} from "../../../redux/Groups/groupSlice";
import UpdateGroupForm from "./UpdateGroupForm";

interface GroupForm {
  name: string;
  first_name: string;
  last_name: string;
  _id: string;
  students: string[];
}

interface Input {
  name: string;
  students: string[];
}

export default function Groups() {
  // const [groups, setGroups] = useState<Group[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false); // New state for delete modal
  const [students, setStudents] = useState([]);
  const [groupIdToDelete, setGroupIdToDelete] = useState(""); // New state to track group ID to delete
  const [groupId, setGroupId] = useState("");
  const [groupName, setGroupName] = useState("");

  const handleEdit = (id: string, name: string) => {
    setShowEditModal(true);
    setGroupId(id);

    setGroupName(name);
  };

  const handleDeleteClick = (id: string) => {
    setShowDeleteModal(true);
    setGroupIdToDelete(id);
  };

  const { data: groups } = useGetGroupsQuery();

  const getStudents = async () => {
    try {
      const response = await axios.get(
        "https://upskilling-egypt.com:3005/api/student",
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        }
      );
      setStudents(
        response.data.map((student: GroupForm) => {
          return {
            value: student._id,
            label: student.first_name + " " + student.last_name,
          };
        })
      );
    } catch (error) {
      console.log(error);
    }
  };
  const [addGroup] = useAddGroupMutation();

  const onSubmit: SubmitHandler<Input> = async (data) => {
    const response = await addGroup(data);
    setShowModal(false);
  };
  const [updateGroup] = useUpdateGroupMutation();
  const onEditSubmit = async (data: GroupForm) => {
    const response = await updateGroup({ data, groupId });
    setShowEditModal(false);
  };
  const [deleteGroup] = useDeleteGroupMutation();
  const handleDelete = async () => {
    const response = await deleteGroup(groupIdToDelete);
    setShowDeleteModal(false);
    console.log(response);
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
  } = useForm<Input>();

  useEffect(() => {
    getStudents();
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
                      <div className="my-7 flex border-2 rounded-lg">
                        <h1 className="bg-[#FFEDDF] inline-flex justify-center items-center rounded-lg py-1 w-44">
                          List Students
                        </h1>

                        <Controller
                          control={control}
                          name={"students"}
                          render={({ field: { onChange, value } }) => (
                            <Select
                              isMulti
                              className="w-full text-black"
                              options={students}
                              value={students.find(
                                (student: any) => student._id === value
                              )}
                              onChange={(val) =>
                                onChange(val.map((e: any) => e.value))
                              }
                            />
                          )}
                        />
                      </div>

                      <button
                        className="px-2 py-1 text-black rounded-lg border text-[20px]"
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
                      groupName={groupName}
                      students={students}
                      onEditSubmit={onEditSubmit}
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
                    <p className="font-semibold text-[20px]">
                      Are you sure you want to delete this group?
                    </p>
                    <div className="flex justify-end my-5">
                      <button
                        className="px-2 py-1 text-black rounded-lg border text-[20px] mr-2"
                        onClick={() => setShowDeleteModal(false)}
                      >
                        Cancel
                      </button>
                      <button
                        className="px-2 py-1 text-white bg-red-600 rounded-lg text-[20px]"
                        onClick={handleDelete}
                      >
                        Delete
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
                    onClick={() => handleEdit(group._id, group.name)}
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
