import React, { useState, useEffect, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Context from '../../../Context';
import Loading from '../../Loading';

const Courses = () => {
  const context = useContext(Context.Context);
  const [courses, setCourses] = useState([]);
  const [papers, setPapers] = useState([]);
  const [patents, setPatents] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const authUser = context.authenticatedUser;

  let navigate = useNavigate();

  useEffect(() => {
    // Fetch courses
    context.data.getCourses()
      .then((response) => {
        // setCourses(response);
        const filteredCourses = response.filter(course => course.userId === authUser.id);
        setCourses(filteredCourses);
      })
      .catch((error) => {
        console.error('Error fetching courses', error);
        navigate('/error');
      });
  }, [navigate, context.data, authUser.id]);

  useEffect(() => {
    // Fetch papers
    context.data.getPapers()
      .then((response) => {
        // Filter papers by userId
        const filteredPapers = response.filter(paper => paper.User.id === authUser.id);
        setPapers(filteredPapers);
      })
      .catch((error) => {
        console.error('Error fetching papers', error);
        navigate('/error');
      })
      .finally(() => setIsLoading(false));
  }, [navigate, context.data, authUser.id]);

  useEffect(() => {
    // Fetch patents
    context.data.getPatents()
      .then((response) => {
        // Filter papers by userId
        const filteredPatents = response.filter(patent => patent.User.id === authUser.id);
        setPatents(filteredPatents);
      })
      .catch((error) => {
        console.error('Error fetching papers', error);
        navigate('/error');
      })
      .finally(() => setIsLoading(false));
  }, [navigate, context.data, authUser.id]);
  

  return (
    isLoading ?
      <Loading />
      : <div className="wrap main--grid">
        {/* Display Courses */}
        {courses.map((course) => (
          <Link to={`/courses/${course.id}`} className="course--module course--link" key={course.id}>
            <h2 className="course--label">Course</h2>
            <h3 className="course--title">{course.title}</h3>
          </Link>
        ))}
        {/* Display Papers */}
        {papers.map((paper) => (
          <Link to={`/papers/${paper.id}`} className="course--module course--link" key={paper.id}>
            <h2 className="course--label">Paper</h2>
            <h3 className="course--title">{paper.title}</h3>
          </Link>
        ))}
        {/* Display Patents */}
        {patents.map((patent) => (
          <Link to={`/patents/${patent.id}`} className="course--module course--link" key={patent.id}>
            <h2 className="course--label">Patent</h2>
            <h3 className="course--title">{patent.title}</h3>
          </Link>
        ))}

        
        <Link to='/courses/create' className="course--module course--add--module">
          <span className="course--add--title">
            <svg version="1.1" xmlns="http://www.w3.org/2000/svg" x="0px" y="0px"
              viewBox="0 0 13 13" className="add"><polygon points="7,6 7,0 6,0 6,6 0,6 0,7 6,7 6,13 7,13 7,7 13,7 13,6 "></polygon></svg>
            New Course
          </span>
        </Link>
        <Link to='/papers/create' className="course--module course--add--module">
          <span className="course--add--title">
            <svg version="1.1" xmlns="http://www.w3.org/2000/svg" x="0px" y="0px"
              viewBox="0 0 13 13" className="add"><polygon points="7,6 7,0 6,0 6,6 0,6 0,7 6,7 6,13 7,13 7,7 13,7 13,6 "></polygon></svg>
            New Paper
          </span>
        </Link>
        <Link to='/patents/create' className="course--module course--add--module">
        <span className="course--add--title">
          <svg version="1.1" xmlns="http://www.w3.org/2000/svg" x="0px" y="0px"
            viewBox="0 0 13 13" className="add"><polygon points="7,6 7,0 6,0 6,6 0,6 0,7 6,7 6,13 7,13 7,7 13,7 13,6 "></polygon></svg>
          New Patent
        </span>
      </Link>
      </div>
  );
}

export default Courses;


