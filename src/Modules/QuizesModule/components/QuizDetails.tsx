import { CalendarDays, Clock4, Pencil, SquareCheck } from "lucide-react";
import React from "react";

function QuizDetails() {
  return (
    <>
      <div className="border rounded-lg md:w-[50%] p-5 mx-3">
        <h1 className="text-[20px] font-semibold">Data Structures Quiz One</h1>
        <CalendarDays fill="black" className="inline-flex text-white" />

        <h1 className="inline-flex">12 / 03 / 2023</h1>
        <Clock4 fill="black" className="inline-flex text-white mx-2" />

        <h1 className="inline-flex">09 : 00</h1>
        <form>
          <div className="flex border-[2px] rounded-lg my-3 md:w-[60%]">
            <h1 className="bg-[#FFEDDF] inline-flex justify-center items-center rounded-lg py-1 px-5 ">
              Duration
            </h1>
            <input
              type="text"
              className=" outline-none focus:outline-none px-3"
            />
          </div>
          <div className="flex border-[2px] rounded-lg my-3 md:w-[60%]">
            <h1 className="bg-[#FFEDDF] inline-flex justify-center items-center rounded-lg py-1 px-5 ">
              Number of questions
            </h1>
            <input
              type="text"
              className=" outline-none focus:outline-none px-3"
            />
          </div>
          <div className="flex border-[2px] rounded-lg my-3 md:w-[60%]">
            <h1 className="bg-[#FFEDDF] inline-flex justify-center items-center rounded-lg py-1 px-5 ">
              Score per question
            </h1>
            <input
              type="text"
              className=" outline-none focus:outline-none px-3"
            />
          </div>
          <div className="flex border-[2px] rounded-lg my-3 md:w-[60%]">
            <h1 className="bg-[#FFEDDF] inline-flex justify-center items-center rounded-lg py-1 px-5 ">
              Description{" "}
            </h1>
            <textarea className=" outline-none focus:outline-none px-3"></textarea>
          </div>
          <div className="flex border-[2px] rounded-lg my-3 md:w-[60%]">
            <h1 className="bg-[#FFEDDF] inline-flex justify-center items-center rounded-lg py-1 px-5 ">
              Question bank used
            </h1>
            <input
              type="text"
              className=" outline-none focus:outline-none px-3"
            />
          </div>
          <div className="flex">
            <SquareCheck fill="black" className="text-white" />

            <h1>Randomize questions</h1>
          </div>
          <div className="flex justify-end my-1 text-[16px] ">

            <button
             className="bg-[#0D1321] text-white px-4 py-2 rounded-xl ">
                    <Pencil className="text-white inline-flex mx-1 " />

              Edit
            </button>
          </div>
        </form>
      </div>
    </>
  );
}

export default QuizDetails;
