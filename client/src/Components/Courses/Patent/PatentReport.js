import React, { useState, useEffect, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';
import Context from '../../../Context';
import Loading from '../../Loading';

const PatentReport = () => {
  const context = useContext(Context.Context);
  let patentDetail = useState('');
  const [patent, setPatentDetail] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  const { id } = useParams();
  let navigate = useNavigate();

  useEffect(() => {
    // Fetch a patent from the database
    const controller = new AbortController();
    context.data.getPatent(id)
      .then(response => {
        if (response.id) {
          setPatentDetail(response);
        } else {
          // If there is no patent ID, direct to Not Found
          navigate('/notfound');
        }
      })
      .catch((error) => {
        console.error('Error fetching and parsing patent', error);
        navigate('/error');
      })
      .finally(() => {
        setIsLoading(false);
      });
    // Clean up to prevent memory leak
    return () => controller?.abort();
  }, [id, navigate, context.data]);

  // if (patent.id) {
  //   patentDetail = (
  //     <div className="wrap">
  //       <h2>Patent Detail</h2>
  //       <div className="main--flex">
  //         <div>
  //           <h3 className="course--detail--title">Patent</h3>
  //           <h4 className="course--name">{patent.title}</h4>
  //           {patent.User
  //             ? (<p>By {patent.User.firstName} {patent.User.lastName}</p>)
  //             : null
  //           }
  //           <ReactMarkdown>{patent.description}</ReactMarkdown>
  //         </div>
  //         <div>
  //           <h3 className="course--detail--title">Inventors</h3>
  //           <p>{patent.inventors}</p>
  
  //           <h3 className="course--detail--title">Country</h3>
  //           <p>{patent.country}</p>
  
  //           <h3 className="course--detail--title">Date</h3>
  //           <p>{patent.date}</p>
  
  //           <h3 className="course--detail--title">Patent Number</h3>
  //           <p>{patent.patentNumber}</p>
  //         </div>
  //       </div>
  //     </div>
  //   );
  // }
  

  return (
    isLoading ?
      <Loading />
      : patent ? <div>
        <div className="actions--bar">
          <div className="wrap">
            {/* {authUser && (authUser.id === patent.User.id) ?
              <Link to={`/patents/${id}/update`} className="button">Update Patent</Link>
              : null
            }
            {authUser && (authUser.id === patent.User.id) ?
              <button className="button" onClick={handleDelete}>Delete Patent</button>
              : null
            }
            <Link to={`/patents/${id}/report`} className="button">Print Patent</Link>
            <Link to='/' className="button">Return to List</Link> */}
          </div>
        </div>
        <div className="wrap">
          <h2>Patent Detail</h2>
          <div className="main--flex">
            <div>
              <h3 className="course--detail--title">Patent</h3>
              <h4 className="course--name">{patent.title}</h4>
              {patent.User
                ? (<p>By {patent.User.firstName} {patent.User.lastName}</p>)
                : null
              }
              <ReactMarkdown>{patent.description}</ReactMarkdown>
            </div>
            <div>
              <h3 className="course--detail--title">Inventors</h3>
              <p>{patent.inventors}</p>

              <h3 className="course--detail--title">Country</h3>
              <p>{patent.country}</p>

              <h3 className="course--detail--title">Date</h3>
              <p>{patent.date}</p>

              <h3 className="course--detail--title">Patent Number</h3>
              <p>{patent.patentNumber}</p>
            </div>
          </div>
        </div>
        {patentDetail}
      </div>
        : null
  )
}

export default PatentReport;
