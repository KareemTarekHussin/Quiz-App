import { SubmitHandler, useForm } from "react-hook-form";
import { useUpdateGroupMutation } from "../../../redux/Groups/groupSlice";
import { useGetStudentsQuery } from "../../../redux/students/studentsSlice";
import { StudentProps } from "../../../interfaces/interfaces";
import { useEffect } from "react";


interface GroupForm {
  groupEdit: { _id: string; name: string; students: string[] };
  setShowEditModal: (arg: boolean) => void;
}
interface Input {
  name: string;
  students: string[];
}
const UpdateGroupForm = ({ groupEdit, setShowEditModal }: GroupForm) => {
  const { data: allStudents } = useGetStudentsQuery(0);
  const [updateGroup, { isLoading: loadingUpdate }] = useUpdateGroupMutation();


  const onSubmit: SubmitHandler<{ name: string; students: string[] }> = async (
    data
  ) => {
    await updateGroup({ data, groupId: groupEdit._id });
    setShowEditModal(false);
  };
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<Input>();

  useEffect(() => {
    setValue("students", groupEdit.students);
  }, []);
  
  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
          <>
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
                defaultValue={groupEdit.name}
              />
            </div>
            {errors.name && (
              <p className="text-[#ff0000]">{errors.name.message}</p>
            )}
            <div className="my-7 flex border-2 rounded-lg flex-col items-center">
              <h1 className="bg-[#FFEDDF] inline-flex  justify-start items-center rounded-lg py-1 w-full mb-1 ">
                List Students
              </h1>

              <select
                className="outline-none w-full"
                {...register("students", {
                  required: "students is required",
                })}
                multiple
                
              >
                {allStudents?.map((student: StudentProps) => (
                  <option value={student._id}>
                    {student.first_name} {student.last_name}
                  </option>
                ))}
              </select>
            </div>

            <button
              className=" px-2 py-1  text-black rounded-lg border text-[20px] "
              type="submit"
              disabled={loadingUpdate}
            >
              {loadingUpdate ? "Saving..." : "Save"}
            </button>
          </>

      </form>
    </>
  );
};

export default UpdateGroupForm;
