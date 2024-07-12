import { Link, Outlet, useNavigate } from "react-router-dom";

export default function ResultsTutor() {

  const navigate = useNavigate();

  const handleViewClick = () => {
    navigate('quiz-details');
  };
  return (
    <>
    

    <div className="container mx-auto p-6 bg-white rounded-lg shadow-md border border-gray-300">
      <h2 className="font-semibold text-xl mb-4">Completed Quizzes</h2>
      <div className="categories-body">
        <ul className="responsive-table-categories">
          <li className="table-header">
            <div className="col col-1">Title</div>
            <div className="col col-2">Group Name</div>
            <div className="col col-3">No. of persons in group </div>
            <div className="col col-4">Participants</div>
            <div className="col col-5">Date</div>
            <div className="col col-6"></div>
          </li>
        </ul>

        <ul className="responsive-table-categories">
          <li className="table-row">
            <div className="col col-1" data-label="#">col 1</div>
            <div className="col col-2" data-label="Category Name :">col 2</div>
            <div className="col col-3" data-label="Creation Date :">col 3</div>
            <div className="col col-4" data-label="Last Update :">col 4</div>
            <div className="col col-5" data-label="Actions :">col 5</div>
            <div className="col col-6" data-label="Actions 2 :">
            <button 
              className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-6 rounded-full"
              onClick={handleViewClick}
              >
              View
            </button>
            </div>
          </li>
        </ul>
      </div>
    </div>
                
    </>
  )
}
