import AnimationContainer from '../../SharedModule/components/UI/AnimationContainer';
import  PaginationButtons  from '../../SharedModule/components/UI/Pagination';
import Button from '../../SharedModule/components/UI/Buttons';
import { useQuizzesResultsQuery } from '../../../redux/Results/resultsSlice';
import moment from 'moment';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import CookieServices from '../../../utils/Cookies';
interface IResultsResponse {
  participants: [],
  quiz: {
    closed_at: string
    code: string
    createdAt: string
    description: string
    difficulty: string
    duration: number
    group: string
    instructor: string
    participants: number
    questions: []
    questions_number: number
    schadule: string
    score_per_question: number
    status: string
    title: string
    type: string
    updatedAt: string
    __v: number
    _id: string
  },
}
const Results = () => {

//Get QuizzesResults 
  const { isLoading, data: quizzesResults } = useQuizzesResultsQuery(0);

//Pagination 
  const [currentPage, setCurrentPage] = useState(0);
  const handlePageChange = (selectedPage: number) => {
    setCurrentPage(selectedPage);
  };
  const ResultsPerPage = 5;
  const startIndex = currentPage * ResultsPerPage;
  const endIndex = startIndex + ResultsPerPage;
  const currentResults = quizzesResults?.slice(startIndex, endIndex);

//Navigate To ResultsDetails  
  const navigate = useNavigate();

  const handleResultDetails = (data: IResultsResponse) => {
    navigate('/dashboard/results/results-details', { state: data });
  };

  return (
    <AnimationContainer>
      <div className="container mx-auto p-6 bg-white rounded-lg shadow-md border border-gray-300">
        <h2 className="font-semibold text-xl mb-4">Completed Quizzes</h2>
        <div className="categories-body">
          <ul className="responsive-table-categories">
            <li className="table-header">
              <div className="col col-1">Title</div>
              <div className="col col-2">Number of Questions</div>
              <div className="col col-3">Difficulty</div>
              <div className="col col-4">Type</div>
              <div className="col col-5">Closed At</div>
              {CookieServices.get('userInfo').role === "Student" ? null : 
              <div className="col col-6">Details</div>
              }
            </li>
          </ul>

          {isLoading ? (
            <ul className="responsive-table-categories">
              {Array.from({ length: 7 }, (_, idx) => (
                <li key={idx} className="table-row">
                  <div className="col col-1" data-label="Title"><span className='inline-block h-[14px] w-[80px] animate-pulse bg-gray-500 rounded-md'>{""}</span></div>
                  <div className="col col-2" data-label="Number of Questions"><span className='inline-block h-[14px] w-[80px] animate-pulse bg-gray-500 rounded-md'>{""}</span></div>
                  <div className="col col-3" data-label="Difficulty"><span className='inline-block h-[14px] w-[80px] animate-pulse bg-gray-500 rounded-md'>{""}</span></div>
                  <div className="col col-4" data-label="Type"><span className='inline-block h-[14px] w-[80px] animate-pulse bg-gray-500 rounded-md'>{""}</span></div>
                  <div className="col col-5" data-label="Closed At"><span className='inline-block h-[14px] w-[80px] animate-pulse bg-gray-500 rounded-md'>{""}</span></div>
                  {CookieServices.get('userInfo').userInfo === "Student" ? null :
                   <div className="col col-6" data-label="Details"><span className='inline-block h-[14px] w-[80px] animate-pulse bg-gray-500 rounded-md'>{""}</span></div>
                   } 
                </li>
              ))}
            </ul>
          ) : (
            <ul className="responsive-table-categories">
              {currentResults?.map(({ quiz, participants }: IResultsResponse) => (
                <li key={quiz?._id} className="table-row">
                  <div className="col col-1" data-label="Title">{quiz?.title}</div>
                  <div className="col col-2" data-label="Number of Questions">{quiz?.questions_number}</div>
                  <div className="col col-3" data-label="Difficulty">{quiz?.difficulty}</div>
                  <div className="col col-4" data-label="Type">{quiz?.type}</div>
                  <div className="col col-5" data-label="Closed At">{moment(quiz?.closed_at).format("DD / MM / YYYY")}</div>
                  {CookieServices.get('userInfo').role === "Student" ? null : (
                    <div className="col col-6" data-label="Details">
                      <Button onClick={() => handleResultDetails({ quiz, participants })} variant={"secondary"} size={"sm"} rounded={"full"}>View</Button>
                    </div>
                   )} 
                </li>
              ))}
            </ul>
          )}
        </div>
        {!isLoading && <PaginationButtons members={quizzesResults} count={ResultsPerPage} {...{ currentPage, handlePageChange }} />}
      </div>
    </AnimationContainer>
  );
};

export default Results;
