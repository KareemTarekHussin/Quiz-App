import "./App.css";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Login from "./Modules/AuthenticationModule/components/Login/Login";
import ResetPass from "./Modules/AuthenticationModule/components/ResetPass/ResetPass";
import ChangePass from "./Modules/AuthenticationModule/components/ChangePass/ChangePass";
import Register from "./Modules/AuthenticationModule/components/Register/Register";
import ForgetPass from "./Modules/AuthenticationModule/components/ForgetPass/ForgetPass";
import Dashboard from "./Modules/DashboardModule/components/Dashboard";
import Groups from "./Modules/GroupsModule/components/Groups";
import Questions from "./Modules/QuestionsModule/components/Questions";
import Quizes from "./Modules/QuizesModule/components/Quizes";
import ResultsTutor from "./Modules/ResultsModule/components/ResultsTutor";
import StudentsList from "./Modules/StudentsModule/components/StudentsList";
import NotFound from "./Modules/SharedModule/components/NotFound";
import AuthLayout from "./Modules/SharedModule/components/AuthLayout";
import MasterLayout from "./Modules/SharedModule/components/MasterLayout";
import { ToastContainer } from "react-toastify";
import ProtectedRoute from "./Modules/SharedModule/components/ProtectedRoute";

function App() {
  const routes = createBrowserRouter([
    {
      path: "/",
      element: <AuthLayout />,
      errorElement: <NotFound />,
      children: [
        { path: "", element: <Login /> },
        { path: "login", element: <Login /> },
        { path: "register", element: <Register /> },
        { path: "forgetpass", element: <ForgetPass /> },
        { path: "resetpass", element: <ResetPass /> },
        { path: "changepass", element: <ChangePass /> },
      ],
    },
    {
      path: "DashBoard",
      element: 

      <MasterLayout />
      
      ,
      errorElement: <NotFound />,
      children: [
        { path: "", element: <Dashboard /> },
        { path: "groups", element: <Groups /> },
        { path: "questions", element: <Questions /> },
        { path: "quizes", element: <Quizes /> },
        { path: "students", element: <StudentsList /> },
        { path: "results", element: <ResultsTutor /> },
      ],
    },
  ]);
  return (
    <>
      <div className="App">
        <ToastContainer />
        <RouterProvider router={routes} />
      </div>
    </>
  );
}

export default App;
