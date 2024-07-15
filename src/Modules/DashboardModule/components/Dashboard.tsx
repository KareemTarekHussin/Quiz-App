import quiz1 from "../../../assets/images/Quiz img.png";
import user from "../../../assets/images/user.png";
import ArrowRightAltIcon from "@mui/icons-material/ArrowRightAlt";
import ArrowCircleRightIcon from "@mui/icons-material/ArrowCircleRight";
export default function Dashboard() {
  return (
    <div className="container">
      <div className="flex flex-col md:flex-row gap-3">
        <div className="border-2 rounded p-2 flex-1">
          <div className="flex items-center justify-between mb-3">
            <p className="text-lg font-semibold">Upcoming 5 quizzes</p>
            <p className="text-sm">
              Quiz directory <ArrowRightAltIcon sx={{ color: "#C5D86D" }} />
            </p>
          </div>
          <div className="border-2 flex items-center w-full my-4">
            <div>
              <img src={quiz1} className="object-cover" alt="" />
            </div>
            <div className="ml-2 w-full">
              <h5 className="font-semibold">
                Introduction to computer programming
              </h5>
              <p className="mb-4">12 / 03 / 2023 | 09:00 AM</p>

              <div className="flex justify-between items-center ">
                <p className="text-md font-semibold">
                  No. of student’s enrolled: 32
                </p>
                <p className="font-semibold">
                  Open <ArrowCircleRightIcon sx={{ color: "#C5D86D" }} />
                </p>
              </div>
            </div>
          </div>
          <div className="border-2 flex items-center w-full">
            <div>
              <img src={quiz1} className="object-cover" alt="" />
            </div>
            <div className="ml-2 w-full">
              <h5>Introduction to computer programming</h5>
              <p>12 / 03 / 2023 | 09:00 AM</p>

              <div className="flex justify-between items-center ">
                <p>No. of student’s enrolled: 32</p>
                <p>
                  Open <ArrowCircleRightIcon sx={{ color: "#C5D86D" }} />
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="border-2 rounded p-2 flex-1">
          <div className="flex items-center justify-between mb-3">
            <p className="text-lg font-semibold">Top 5 Students</p>
            <p className="text-sm">
              All Students <ArrowRightAltIcon sx={{ color: "#C5D86D" }} />
            </p>
          </div>
          <div className="border-2 flex items-center w-full my-4">
            <div>
              <img src={user} className="object-cover" alt="" />
            </div>
            <div className="ml-2 w-full flex justify-between items-center">
              <div>
                <h5 className="font-semibold">Emmanuel James</h5>
                <p>Class rank: 2nd | Average score: 87%</p>
              </div>

              <ArrowCircleRightIcon sx={{ mr: 2 }} />
            </div>
          </div>
          <div className="border-2 flex items-center w-full">
            <div>
              <img src={user} className="object-cover" alt="" />
            </div>
            <div className="ml-2 w-full flex justify-between items-center">
              <div>
                <h5 className="font-semibold">Emmanuel James</h5>
                <p>Class rank: 2nd | Average score: 87%</p>
              </div>

              <ArrowCircleRightIcon sx={{ mr: 2 }} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}