import { Controller, useForm } from "react-hook-form";
import Select from "react-select";

interface GroupForm{
    name: string;
    first_name: string;
    last_name: string;
    _id: string;
    students:string[]
    groupName:string
    onEditSubmit:any
  }
interface Input {

    name: string;
    students:string[]
  
  }
const UpdateGroupForm = ({ groupName, students, onEditSubmit }:GroupForm) => {
  let {
    register,
    handleSubmit,
    formState: { errors },
    control,
    
  } = useForm<Input>();

  return (
    <>
      <form onSubmit={handleSubmit(onEditSubmit)}>
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
            defaultValue={groupName}
          />
        </div>
        {errors.name && <p className="text-[#ff0000]">{errors.name.message}</p>}
        <div className="my-7 flex border-2 rounded-lg">
          <h1 className="bg-[#FFEDDF] inline-flex justify-center items-center rounded-lg py-1 w-44 ">
            List Students
          </h1>

          <Controller
            control={control}
            name={"students"}
            
            render={({ field: { onChange, value } }) => {
              return (
                <Select
                  isMulti
                  className="w-full text-black"
                  options={students}
                  value={students.find(
                    (student:any) => student._id === value
                  )}
                  
                  onChange={(val:any) => onChange(val.map((e:any) => e.value))}
                />
              );
            }}
          />
        </div>

        <button
          className=" px-2 py-1  text-black rounded-lg border text-[20px] "
          type="submit"
        >
          Save
        </button>
      </form>
    </>
  );
};

export default UpdateGroupForm;
