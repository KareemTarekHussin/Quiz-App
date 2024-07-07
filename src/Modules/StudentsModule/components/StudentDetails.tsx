import React from "react";
import { useStudentDetailsQuery } from "../../../redux/students/studentsSlice";
import { LineWave } from "react-loader-spinner";

export default function StudentDetails({ detailsId }: { detailsId: string }) {
  const { data: userDetail, isLoading: isLoadingDetails } =
    useStudentDetailsQuery(detailsId);

  console.log(isLoadingDetails, "details");
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
      
      </>}
    </>
  );
}
