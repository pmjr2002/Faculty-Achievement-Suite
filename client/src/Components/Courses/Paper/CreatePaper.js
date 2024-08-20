// import React, { useState, useContext } from 'react';
// import { useNavigate } from 'react-router-dom';
// import Context from '../../../Context';

// const CreatePaper = () => {
//   const context = useContext(Context.Context);
//   const [paperTitle, setPaperTitle] = useState('');
//   const [paperDescription, setPaperDescription] = useState('');
//   const [authors, setAuthors] = useState('');
//   const [conference, setConference] = useState('');
//   const [date, setDate] = useState('');
//   const [errors, setErrors] = useState([]);
//   const authUser = context.authenticatedUser;

//   let navigate = useNavigate();

//   const onChange = (event) => {
//     const name = event.target.name;
//     const value = event.target.value;

//     if (name === 'paperTitle') {
//       setPaperTitle(value);
//     }

//     if (name === 'paperDescription') {
//       setPaperDescription(value);
//     }

//     if (name === 'authors') {
//       setAuthors(value);
//     }

//     if (name === 'conference') {
//       setConference(value);
//     }

//     if (name === 'date') {
//         setDate(value);
//     }
//   }

//   const submit = (event) => {
//     event.preventDefault();
//     // Course object to create a course
//     const paper = {
//       title: paperTitle,
//       description: paperDescription,
//       authors,
//       conference,
//       date,
//       userId: authUser.id,
//     };

//     context.data.CreatePaper(paper, authUser.emailAddress, authUser.password)
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
//     <div className="wrap">
//       <h2>Create Paper</h2>
//       {errors.length ?
//         <div className="validation--errors">
//           <h3>Validation Errors</h3>
//           <ul>
//             {errors.map((error, i) => <li key={i}>{error}</li>)}
//           </ul>
//         </div>
//         : null
//       }
//       <form>
//         <div className="main--flex">
//           <div>
//             <label htmlFor="courseTitle">Paper Title</label>
//             <input id="courseTitle" name="courseTitle" type="text" value={paperTitle} onChange={onChange} />

//             {/* Use current authenticated user's first name and last name as course author */}
//             <p>By {authUser.firstName} {authUser.lastName}</p>

//             <label htmlFor="courseDescription">Paper Description</label>
//             <textarea id="courseDescription" name="courseDescription" value={paperDescription} onChange={onChange}></textarea>
//           </div>
//           <div>
//             <label htmlFor="estimatedTime">Authors</label>
//             <input id="estimatedTime" name="estimatedTime" type="text" value={authors} onChange={onChange} />

//             <label htmlFor="materialsNeeded">Conference</label>
//             <input id="materialsNeeded" name="materialsNeeded" type="text" value={conference} onChange={onChange}></input>

//             <label htmlFor="estimatedTime">Date</label>
//             <input id="estimatedTime" name="materialsNeeded" type="date" value={date} onChange={onChange}></input>
//           </div>
//         </div>
//         <button className="button" type="submit" onClick={submit}>Create Paper</button>
//         <button className="button button-secondary" onClick={cancel}>Cancel</button>
//       </form>
//     </div >

//   );
// }

// export default CreatePaper;


import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import Context from '../../../Context';

const CreatePaper = () => {
  const context = useContext(Context.Context);
  const [paperTitle, setPaperTitle] = useState('');
  const [paperDescription, setPaperDescription] = useState('');
  const [authors, setAuthors] = useState('');
  const [conference, setConference] = useState('');
  const [date, setDate] = useState('');
  const [errors, setErrors] = useState([]);
  const authUser = context.authenticatedUser;

  let navigate = useNavigate();

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
    // Paper object to create a paper
    const paper = {
      title: paperTitle,
      description: paperDescription,
      authors,
      conference,
      date,
      userId: authUser.id,
    };

    context.data.createPaper(paper, authUser.emailAddress, authUser.password)
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
  };

  const cancel = (event) => {
    event.preventDefault();
    navigate('/');
  };

  return (
    <div className="wrap">
      <h2>Create Paper</h2>
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

            {/* Use current authenticated user's first name and last name as course author */}
            <p>By {authUser.firstName} {authUser.lastName}</p>

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
        <button className="button" type="submit" onClick={submit}>Create Paper</button>
        <button className="button button-secondary" onClick={cancel}>Cancel</button>
      </form>
    </div>
  );
};

export default CreatePaper;
