import React from 'react';
import { Route, Routes, Navigate } from 'react-router-dom';
import { useLocation } from 'react-router-dom';


import Header from './Components/Header';
import Courses from './Components/Courses/Course/Courses';
import Dashboard from './Components/Courses/Course/Dashboard';

import CourseDetail from './Components/Courses/Course/CourseDetail';
import PaperDetail from './Components/Courses/Paper/PaperDetail';
import PatentDetail from './Components/Courses/Patent/PatentDetail';

import UpdateCourse from './Components/Courses/Course/UpdateCourse';
import UpdatePaper from './Components/Courses/Paper/UpdatePaper';
import UpdatePatent from './Components/Courses/Patent/UpdatePatent';

import UserSignIn from './Components/User/UserSignIn';
import UserSignUp from './Components/User/UserSignUp';
import UserSignOut from './Components/User/UserSignOut';

import CreateCourse from './Components/Courses/Course/CreateCourse';
import CreatePaper from './Components/Courses/Paper/CreatePaper';
import CreatePatent from './Components/Courses/Patent/CreatePatent';

import NotFound from './Components/Errors/NotFound';
import Forbidden from './Components/Errors/Forbidden';
import UnhandledError from './Components/Errors/UnhandledError';
import PaperReport from './Components/Courses/Paper/PaperReport';
import CourseReport from './Components/Courses/Course/CourseReport';
import PatentReport from './Components/Courses/Patent/PatentReport';
import PrivateRoute from './PrivateRoute';

function App() {
  const location = useLocation();
  const showHeader = !location.pathname.includes('report');
  return (
    <div id="root">
      {showHeader && <Header />}
      <main>
        <Routes>
          <Route path="/" element={<Navigate replace to="/courses" />} />
          <Route path="/" element={<Dashboard />} />
          <Route path="/courses" element={<PrivateRoute />}>
            <Route path="/courses" element={<Courses />} />
          </Route>
          <Route path="/courses/:id" element={<CourseDetail />} />
          <Route path="/papers/:id" element={<PaperDetail />} />
          <Route path="/patents/:id" element={<PatentDetail />} />
          <Route path="/courses/:id/report" element={<CourseReport />} />
          <Route path="/papers/:id/report" element={<PaperReport />} />
          <Route path="/patents/:id/report" element={<PatentReport />} />
          <Route path="/courses/:id/update" element={<PrivateRoute />}>
            <Route path="/courses/:id/update" element={<UpdateCourse />} />
          </Route>
          <Route path="/papers/:id/update" element={<PrivateRoute />}>
            <Route path="/papers/:id/update" element={<UpdatePaper />} />
          </Route>
          <Route path="/patents/:id/update" element={<PrivateRoute />}>
            <Route path="/patents/:id/update" element={<UpdatePatent />} />
          </Route>
          <Route path="/signin" element={<UserSignIn />} />
          <Route path="/signup" element={<UserSignUp />} />
          <Route path="/signout" element={<UserSignOut />} />
          <Route path="/courses/create" element={<PrivateRoute />}>
            <Route path="/courses/create" element={<CreateCourse />} />
          </Route>
          <Route path="/papers/create" element={<PrivateRoute />}>
            <Route path="/papers/create" element={<CreatePaper />} />
          </Route>
          <Route path="/patents/create" element={<PrivateRoute />}>
            <Route path="/patents/create" element={<CreatePatent />} />
          </Route>
          <Route path="/notfound" element={<NotFound />} />
          <Route path="/forbidden" element={<Forbidden />} />
          <Route path="/error" element={<UnhandledError />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;
