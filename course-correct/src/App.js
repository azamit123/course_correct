import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import { useState, useEffect } from "react"
import SignUp from './components/SignUp';
import LogIn from "./components/LogIn"
import GlobalState from "./components/GlobalContext"
import Subjects from './components/Subjects';
import AddNewSubject from './components/AddNewSubject';
import EditSubject from "./components/EditSubject"
import LessonList from './components/LessonList';
import ErrorPage from "./components/ErrorPage"
import MyClasses from './components/MyClasses';
import EnrollmentForm from "./components/EnrollmentForm";
import LogOut from "./components/LogOut";
import PaymentContainer from "./components/PaymentContainer";
import EditProfile from "./components/EditProfile";
import TutorProtectedRoute from './components/TutorProtectedRoute';
import StudentProtectedRoute from './components/StudentProtectedRoute';
import AuthProtectedRoute from './components/AuthProtectedRoute';




function App() {
  const [token, setToken] = useState(null);
  const [subjects, setSubjects] = useState([]);



  // useEffect(() => {
  //   const existingToken = localStorage.getItem("token");
  //   if (existingToken) {
  //     const curUser = jwt_decode(existingToken);
  //     setToken(existingToken);
  //   }

  // }, [])


  const deleteSubject = (id) => {
    const currentSubs = [...subjects];
    let index = -1;
    index = currentSubs.findIndex((item) => item._id === id);
    if (index !== -1) {
      currentSubs.splice(index, 1);
      setSubjects([...currentSubs]);
    }
  }

  const logOut = () => {
    localStorage.removeItem("token");
    setToken(null);
  }


  return (
    <>

      <Router>
        <GlobalState.Provider value={{
          subjects, setSubjects, deleteSubject, logOut
        }}>

          <Routes>
            <Route exact path="/" element={<Navigate to="/login" />}></Route>
            <Route path="/signup" element={<SignUp />}></Route>
            <Route path="/login" element={<LogIn />}></Route>
            <Route path="/error" element={<ErrorPage />}></Route>


            {/* LOGGED IN USERS */}
            <Route path="/logout" element={<AuthProtectedRoute redirectTo="/login">
              <LogOut />
            </AuthProtectedRoute>}>
            </Route>

            <Route path="/editProfile" element={<AuthProtectedRoute redirectTo="/login">
              <EditProfile />
            </AuthProtectedRoute>}>
            </Route>

            <Route path="/myclasses" element={<AuthProtectedRoute redirectTo="/login">
              <MyClasses />
            </AuthProtectedRoute>}>
            </Route>





            {/* TUTORS ONLY ROUTE */}

            <Route path="/subjects" element={<TutorProtectedRoute redirectTo="/login">
              <Subjects />
            </TutorProtectedRoute>}>
            </Route>

            <Route path="/addSubject" element={<TutorProtectedRoute redirectTo="/login">
              <AddNewSubject />
            </TutorProtectedRoute>}>
            </Route>

            <Route path="/editSubject/:_id" element={<TutorProtectedRoute redirectTo="/login">
              <EditSubject />
            </TutorProtectedRoute>}>
            </Route>


            {/* STUDENTS ONLY ROUTES */}

            <Route path="/lessonsList" element={<StudentProtectedRoute redirectTo="/login">
              <LessonList />
            </StudentProtectedRoute>}>
            </Route>

            <Route path="//enroll/:subject_id" element={<StudentProtectedRoute redirectTo="/login">
              <EnrollmentForm />
            </StudentProtectedRoute>}>
            </Route>


            <Route path="/pay" element={<PaymentContainer />}></Route>


          </Routes>
        </GlobalState.Provider>
      </Router>

    </>
  );
}

export default App;
