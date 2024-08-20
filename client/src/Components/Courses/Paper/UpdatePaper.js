// import React, { useState, useEffect, useContext } from 'react';
// import { useNavigate, useParams } from 'react-router-dom';
// import Context from '../../../Context';
// import Loading from '../../Loading';

// const UpdatePaper = () => {
//   const context = useContext(Context.Context);
//   const [isLoading, setIsLoading] = useState(true);
//   const [paperTitle, setPaperTitle] = useState('');
//   const [paperDescription, setPaperDescription] = useState('');
//   const [authors, setAuthors] = useState('');
//   const [conference, setConference] = useState('');
//   const [date, setDate] = useState('');
//   const [paperUserFirstName, setPaperUserFirstName] = useState('');
//   const [paperUserLastName, setPaperUserLastName] = useState('');
//   const [errors, setErrors] = useState([]);
//   const authUser = context.authenticatedUser;

//   const { id } = useParams();
//   let navigate = useNavigate();

//   useEffect(() => {
//     const controller = new AbortController();
//     context.data.getPaper(id)
//       .then((response) => {
//         if (response.error === "Sorry, we couldn't find the paper you were looking for.") {
//           navigate('/notfound');
//         } else {
//           // If the currently authenticated user is the same as the Course author
//           // Allow the user to update the Course
//           if (authUser.id === response.User.id) {
//             setPaperTitle(response.title);
//             setPaperDescription(response.description);
//             setPaperUserFirstName(response.User.firstName);
//             setPaperUserLastName(response.User.lastName);
//             setAuthors(response.authors);
//             setConference(response.conference);
//             setDate(response.date);
//           } else {
//             navigate('/forbidden');
//           }
//         }
//       })
//       .catch(error => {
//         console.error('Error fetching and parsing data', error);
//         navigate('/error');
//       })
//       .finally(() => {
//         setIsLoading(false);
//       });
//     // Clean up to prevent memory leak
//     return () => controller?.abort();
//   }, [authUser.id, id, navigate, context.data]);

//   const onChange = (event) => {
//     const name = event.target.name;
//     const value = event.target.value;

//     if (name === 'paperTitle') {
//       setPaperTitle(value);
//     } else if (name === 'paperDescription') {
//       setPaperDescription(value);
//     } else if (name === 'authors') {
//       setAuthors(value);
//     } else if (name === 'conference') {
//       setConference(value);
//     } else if (name === 'date') {
//       setDate(value);
//     }
//   };

//   const submit = (event) => {
//     event.preventDefault();
//     // Course object to update the course
//     const paper = {
//       title: paperTitle,
//       description: paperDescription,
//       authors,
//       conference,
//       date,
//       userId: authUser.id,
//     };

//     context.data.updatePaper(paper, authUser.emailAddress, authUser.password)
//       .then(errors => {
//         if (errors.length) {
//           setErrors(errors);
//         } else {
//           navigate('/');
//         }
//       })
//       .catch((error) => {
//         console.error(error);
//         navigate('/error');
//       });
//   }

//   const cancel = (event) => {
//     event.preventDefault();
//     navigate('/');
//   }

//   return (
//     isLoading ?
//       <Loading />
//       : <div className="wrap">
//         <h2>Update Paper</h2>
//         {errors.length ?
//           <div className="validation--errors">
//             <h3>Validation Errors</h3>
//             <ul>
//               {errors.map((error, i) => <li key={i}>{error}</li>)}
//             </ul>
//           </div>
//           : null
//         }
//         <form>
//           <div className="main--flex">
//             <div>
//               <label htmlFor="paperTitle">Paper Title</label>
//               <input id="paperTitle" name="paperTitle" type="text" value={paperTitle} onChange={onChange} />

//               <p>By {paperUserFirstName} {paperUserLastName}</p>

//               <label htmlFor="paperDescription">Paper Description</label>
//               <textarea id="paperDescription" name="paperDescription" value={paperDescription} onChange={onChange}></textarea>
//             </div>
//             <div>
//               <label htmlFor="authors">Authors</label>
//               <input id="authors" name="authors" type="text" value={authors} onChange={onChange} />

//               <label htmlFor="conference">Conference</label>
//               <input id="conference" name="conference" type="text" value={conference} onChange={onChange}></input>

//               <label htmlFor="date">Date</label>
//               <input id="date" name="date" type="date" value={date} onChange={onChange}></input>
//             </div>
//           </div>
//           <button className="button" type="submit" onClick={submit}>Update Paper</button>
//           <button className="button button-secondary" onClick={cancel}>Cancel</button>
//         </form>
//       </div>
//   )
// }

// export default UpdatePaper;

import React, { useState, useEffect, useContext } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Context from '../../../Context';
import Loading from '../../Loading';

const UpdatePaper = () => {
  const context = useContext(Context.Context);
  const [isLoading, setIsLoading] = useState(true);
  const [paperTitle, setPaperTitle] = useState('');
  const [paperDescription, setPaperDescription] = useState('');
  const [authors, setAuthors] = useState('');
  const [conference, setConference] = useState('');
  const [date, setDate] = useState('');
  const [paperUserFirstName, setPaperUserFirstName] = useState('');
  const [paperUserLastName, setPaperUserLastName] = useState('');
  const [errors, setErrors] = useState([]);
  const authUser = context.authenticatedUser;

  const { id } = useParams();
  let navigate = useNavigate();

  useEffect(() => {
    const controller = new AbortController();
    context.data.getPaper(id)
      .then((response) => {
        if (response.error === "Sorry, we couldn't find the paper you were looking for.") {
          navigate('/notfound');
        } else {
          if (authUser.id === response.User.id) {
            setPaperTitle(response.title);
            setPaperDescription(response.description);
            setPaperUserFirstName(response.User.firstName);
            setPaperUserLastName(response.User.lastName);
            setAuthors(response.authors);
            setConference(response.conference);
            setDate(response.date);
          } else {
            navigate('/forbidden');
          }
        }
      })
      .catch(error => {
        console.error('Error fetching and parsing data', error);
        navigate('/error');
      })
      .finally(() => {
        setIsLoading(false);
      });
    return () => controller?.abort();
  }, [authUser.id, id, navigate, context.data]);

  const onChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;

    if (name === 'paperTitle') {
      setPaperTitle(value);
    } else if (name === 'paperDescription') {
      setPaperDescription(value);
    } else if (name === 'authors') {
      setAuthors(value);
    } else if (name === 'conference') {
      setConference(value);
    } else if (name === 'date') {
      setDate(value);
    }
  };

  const submit = (event) => {
    event.preventDefault();
    const paper = {
      title: paperTitle,
      description: paperDescription,
      authors,
      conference,
      date,
      userId: authUser.id,
    };

    context.data.updatePaper(id, paper, authUser.emailAddress, authUser.password)
      .then(errors => {
        if (errors.length) {
          setErrors(errors);
        } else {
          navigate('/');
        }
      })
      .catch((error) => {
        console.error(error);
        navigate('/error');
      });
  }

  const cancel = (event) => {
    event.preventDefault();
    navigate('/');
  }

  return (
    isLoading ?
      <Loading />
      : <div className="wrap">
        <h2>Update Paper</h2>
        {errors.length ?
          <div className="validation--errors">
            <h3>Validation Errors</h3>
            <ul>
              {errors.map((error, i) => <li key={i}>{error}</li>)}
            </ul>
          </div>
          : null
        }
        <form>
          <div className="main--flex">
            <div>
              <label htmlFor="paperTitle">Paper Title</label>
              <input id="paperTitle" name="paperTitle" type="text" value={paperTitle} onChange={onChange} />

              <p>By {paperUserFirstName} {paperUserLastName}</p>

              <label htmlFor="paperDescription">Paper Description</label>
              <textarea id="paperDescription" name="paperDescription" value={paperDescription} onChange={onChange}></textarea>
            </div>
            <div>
              <label htmlFor="authors">Authors</label>
              <input id="authors" name="authors" type="text" value={authors} onChange={onChange} />

              <label htmlFor="conference">Conference</label>
              <input id="conference" name="conference" type="text" value={conference} onChange={onChange}></input>

              <label htmlFor="date">Date</label>
              <input id="date" name="date" type="date" value={date} onChange={onChange}></input>
            </div>
          </div>
          <button className="button" type="submit" onClick={submit}>Update Paper</button>
          <button className="button button-secondary" onClick={cancel}>Cancel</button>
        </form>
      </div>
  )
}

export default UpdatePaper;
