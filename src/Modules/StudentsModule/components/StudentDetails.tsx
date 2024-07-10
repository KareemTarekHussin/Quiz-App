import { useStudentDetailsQuery } from "../../../redux/students/studentsSlice";
import { LineWave } from "react-loader-spinner";

export default function StudentDetails({ detailsId, setOpen }: { detailsId: string, setOpen: (arg: boolean)=> void }) {
  const { data: userDetail, isLoading: isLoadingDetails } =
    useStudentDetailsQuery(detailsId);

  console.log(userDetail, "details");
  return (
    <>
      {isLoadingDetails ? (
        <div className=" flex justify-center items-center">
          <LineWave
            visible={true}
            height="150"
            width="150"
            color="#000"
            ariaLabel="line-wave-loading"
            wrapperStyle={{}}
            wrapperClass=""
            firstLineColor=""
            middleLineColor=""
            lastLineColor=""
          />
        </div>
      ) : <>
      
      <p>{userDetail?.first_name}</p>
      <p>{userDetail?.last_name}</p>
      <p>{userDetail?.group?.name}</p>
      <p>{userDetail?.email}</p>
      <p>{userDetail?.status}</p>
      <button onClick={() => setOpen(false)}>Cancle</button>
      </>}
    </>
  );
}
