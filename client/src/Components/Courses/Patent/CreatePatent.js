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

const CreatePatent = () => {
  const context = useContext(Context.Context);
  const [patentTitle, setPatentTitle] = useState('');
  const [patentDescription, setPatentDescription] = useState('');
  const [inventors, setInventors] = useState('');
  const [country, setCountry] = useState('');
  const [date, setDate] = useState('');
  const [patentNumber, setPatentNumber] = useState('');
  const [errors, setErrors] = useState([]);
  const authUser = context.authenticatedUser;

  let navigate = useNavigate();

  const onChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;

    if (name === 'patentTitle') {
        setPatentTitle(value);
    } else if (name === 'patentDescription') {
        setPatentDescription(value);
    } else if (name === 'inventors') {
        setInventors(value);
    } else if (name === 'country') {
        setCountry(value);
    } else if (name === 'date') {
        setDate(value);
    } else if (name === 'patentNumber') {
        setPatentNumber(value);
    }
  };

  const submit = (event) => {
    event.preventDefault();
    // Patent object to create a patent
    const patent = {
      title: patentTitle,
      description: patentDescription,
      inventors,
      country,
      date,
      patentNumber,
      userId: authUser.id,
    };

    context.data.createPatent(patent, authUser.emailAddress, authUser.password)
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
      <h2>Create Patent</h2>
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
            <label htmlFor="patentTitle">Patent Title</label>
            <input id="patentTitle" name="patentTitle" type="text" value={patentTitle} onChange={onChange} />

            {/* Use current authenticated user's first name and last name as course author */}
            {/* <p>By {authUser.firstName} {authUser.lastName}</p> */}

            <label htmlFor="patentDescription">Patent Description</label>
            <textarea id="patentDescription" name="patentDescription" value={patentDescription} onChange={onChange}></textarea>
          </div>
          <div>
            <label htmlFor="inventors">Inventors</label>
            <input id="inventors" name="inventors" type="text" value={inventors} onChange={onChange} />

            <label htmlFor="country">Country</label>
            <input id="country" name="country" type="text" value={country} onChange={onChange} />

            <label htmlFor="patentNumber">Patent Number</label>
            <input id="patentNumber" name="patentNumber" type="text" value={patentNumber} onChange={onChange}></input>

            <label htmlFor="date">Date</label>
            <input id="date" name="date" type="date" value={date} onChange={onChange}></input>
          </div>
        </div>
        <button className="button" type="submit" onClick={submit}>Create Patent</button>
        <button className="button button-secondary" onClick={cancel}>Cancel</button>
      </form>
    </div>
  );
};

export default CreatePatent;
