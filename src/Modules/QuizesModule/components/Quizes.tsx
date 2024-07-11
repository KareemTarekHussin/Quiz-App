import { Link } from "react-router-dom";
import { AlarmClockPlus, NotebookText } from "lucide-react";
import img from "../../../assets/images/6ec7bad8c01e2e82c8767d214a6c6e2c.png";
import { useState } from "react";
import Select from "react-select";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";

import { Controller, useForm } from "react-hook-form";


export default function Quizes() {
  const [showModal, setShowModal] = useState(false);

  const onSubmit = () => {};

  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
  } = useForm();
  return (
    <>
      {showModal && (
        <>
          <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
            <div className="relative my-6 mx-auto">
              <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full  bg-white ">
                <div className="flex justify-between p-5 border-b border-solid border-blueGray-200 rounded-t">
                  <h3 className="text-3xl font-semibold">Set up a new Quiz</h3>
                  <button
                    className="text-black text-3xl font-semibold"
                    onClick={() => setShowModal(false)}
                  >
                    <i className="fa-solid fa-close text-black w-6 block"></i>
                  </button>
                </div>
                <div className="p-[50px] ">
                  <h1>Details</h1>
                  <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="flex border-[2px] rounded-2xl md:w-full md:flex">
                      <h1 className="bg-[#FFEDDF] inline-flex justify-center items-center rounded-lg py-1 md:w-44 w-28">
                        Tilte
                      </h1>
                      <input
                        type="text"
                        className="w-full outline-none focus:outline-none px-3"
                        {...register("title", {
                          required: "title is required",
                        })}
                      />
                    </div>
                    {errors.title && (
                      <p className="text-[#ff0000]">{errors.title.message}</p>
                    )}
                    <div className="w-full lg:flex gap-3">
                      <div className="flex my-2 md:w-56">
                        <h1 className="bg-[#FFEDDF] border inline-flex justify-center items-center rounded-lg py-1 px-3 ">
                          Duration
                        </h1>
                        <Select
                          className=" w-full text-black"
                          placeholder="in minutes"
                        />
                      </div>
                      <div className="flex my-2 md:w-72 ">
                        <h1 className="bg-[#FFEDDF] border rounded-lg text-center text-sm">
                          No. of questions
                        </h1>
                        <Select className="w-full text-black" placeholder="" />
                      </div>
                      <div className="flex  my-2 md:w-72">
                        <h1 className="bg-[#FFEDDF] border rounded-lg text-center text-sm ">
                          Score per question
                        </h1>
                        <Select className="w-full text-black" placeholder="" />
                      </div>
                    </div>
                    <div className="my-2 flex border-2 rounded-lg">
                      <h1 className="bg-[#FFEDDF] inline-flex justify-center items-center rounded-lg py-1 px-3">
                        Description
                      </h1>
                      <textarea className="w-full rounded-lg p-3 outline-none"></textarea>
                    </div>
                    <div className="flex md:w-full md:flex my-2">
                      <h1 className="bg-[#FFEDDF] inline-flex justify-center items-center rounded-lg border px-2 text-sm h-12 my-auto">
                        Schedule
                      </h1>
                      <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DemoContainer components={["DateTimePicker"]}>
                          <DateTimePicker label="Date & Time" />
                        </DemoContainer>
                      </LocalizationProvider>
                      {/* // className="w-full outline-none focus:outline-none px-3" */}
                    </div>
                    <div className="w-full lg:flex gap-3">
                      <div className="flex my-2 md:w-72">
                        <h1 className="bg-[#FFEDDF] border inline-flex justify-center items-center rounded-lg  px-5 text-sm">
                          Difficulty level
                        </h1>
                        <Select
                          className=" w-full text-black"
                          placeholder=""
                        />
                      </div>
                      <div className="flex my-2 md:w-72 ">
                        <h1 className="bg-[#FFEDDF] border rounded-lg text-center text-sm">
                          Category type
                        </h1>
                        <Select className="w-full text-black" placeholder="" />
                      </div>
                      <div className="flex  my-2 md:w-72">
                        <h1 className="bg-[#FFEDDF] border rounded-lg text-center text-sm ">
                          Group name
                        </h1>
                        <Select isMulti={true} className="w-full text-black" placeholder="" />
                      </div>
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
      <div className="container">
        <div className="md:flex justify-between">
          <div className=" md:flex  gap-5 items-start ">
            <div className="border text-center p-5 ">
              <button onClick={() => setShowModal(true)}>
                <AlarmClockPlus  size="80px" className=" inline-flex" />

                <h1 className="font-semibold text-[25px]">set a new quiz</h1>
              </button>
            </div>
            <div className="border text-center p-5">
              <button>
                <NotebookText size="80px" className=" inline-flex" />

                <h1 className="font-semibold text-[25px]">Question Bank</h1>
              </button>
            </div>
          </div>
          <div className="md:w-[50%]">
            <div className="border rounded-md w-full p-3">
              <h1 className="font-semibold text-[25px] ">Upcoming quizzes</h1>
              <div className="border rounded-md my-2 w-full flex">
                <div className="bg-[#FFEDDF] w-28  rounded-md ">
                  <img src={img} alt="quiz-img" className="" />
                </div>
                <div className="p-3">
                  <h1 className="font-semibold">
                    Introduction to computer programming
                  </h1>
                  <h1>12 / 03 / 2023 | 09:00 AM</h1>
                  <h1 className="font-semibold mt-5">
                    No. of student’s enrolled: 32
                  </h1>
                </div>
              </div>
              <div className="border rounded-md my-2 w-full flex">
                <div className="bg-[#FFEDDF] w-28  rounded-md ">
                  <img src={img} alt="quiz-img" className="" />
                </div>
                <div className="p-3">
                  <h1 className="font-semibold">
                    Introduction to computer programming
                  </h1>
                  <h1>12 / 03 / 2023 | 09:00 AM</h1>
                  <h1 className="font-semibold mt-5">
                    No. of student’s enrolled: 32
                  </h1>
                </div>
              </div>
            </div>
            <div className="border my-10 px-5 py-2 rounded-md">
              <h1 className="font-semibold text-[25px]  ">Completed Quizzes</h1>
              <table>
                <thead className="bg-[#0D1321] border rounded-md">
                  <th className="text-white px-5 py-2 border border-white ">
                    Title
                  </th>
                  <th className="text-white px-5 py-2 border border-white">
                    Group name
                  </th>
                  <th className="text-white px-5 py-2 border border-white">
                    No. of persons in group
                  </th>
                  <th className="text-white px-5 py-2 border border-white">
                    Date
                  </th>
                </thead>
                <tbody>
                  <tr>
                    <td className="border text-black px-3 ">Test</td>
                    <td className="border text-black px-3">Test</td>
                    <td className="border text-black px-3">Test</td>
                    <td className="border text-black px-3">Test</td>
                  </tr>
                  <tr>
                    <td className="border text-black px-3 ">Test</td>
                    <td className="border text-black px-3">Test</td>
                    <td className="border text-black px-3">Test</td>
                    <td className="border text-black px-3">Test</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
