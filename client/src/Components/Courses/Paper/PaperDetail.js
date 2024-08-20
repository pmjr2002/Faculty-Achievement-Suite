import React, { useState, useEffect, useContext } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';
import Context from '../../../Context';
import Loading from '../../Loading';
// import PaperReport from './PaperReport';

const PaperDetail = () => {
  const context = useContext(Context.Context);
  let paperDetail = useState('');
  const [paper, setPaperDetail] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const authUser = context.authenticatedUser;

  const { id } = useParams();
  let navigate = useNavigate();

  useEffect(() => {
    // Fetch a course from the database
    const controller = new AbortController();
    context.data.getPaper(id)
      .then(response => {
        if (response.id) {
          setPaperDetail(response)
        } else {
          // If there is no course ID, direct to Not Found
          navigate('/notfound');
        }
      })
      .catch((error) => {
        console.error('Error fetching and parsing course', error);
        navigate('/error');
      })
      .finally(() => {
        setIsLoading(false);
      });
    // Clean up to prevent memory leak
    return () => controller?.abort();
  }, [id, navigate, context.data]);

  if (paper.id) {
    paperDetail = <div className="wrap">
      <h2>Paper Detail</h2>
      <div className="main--flex">
        <div>
          <h3 className="course--detail--title">Paper</h3>
          <h4 className="course--name">{paper.title}</h4>
          {paper.User
            ? (<p>By {paper.User.firstName} {paper.User.lastName}</p>)
            : null
          }
          <ReactMarkdown>{paper.description}</ReactMarkdown>
        </div>
        <div>
          <h3 className="course--detail--title">Authors</h3>
          <p>{paper.authors}</p>

          <h3 className="course--detail--title">Conference</h3>
          <ul className="course--detail--list">
            <ReactMarkdown>{paper.conference}</ReactMarkdown>
          </ul>

          <h3 className="course--detail--title">Date</h3>
          <p>{paper.date}</p>
        </div>
      </div>
    </div>
  }

  const handleDelete = (event) => {
    event.preventDefault();
    context.data.deletePaper(id, authUser.emailAddress, authUser.password)
      .then((response) => {
        // If course deletion is successful, then there should be no response returned
        if (response.length) {
          navigate('/error');
        } else {
          navigate('/');
        }
      })
      .catch((error) => {
        console.error(error);
        navigate('/error');
      });
  }

  return (
    isLoading ?
      <Loading />
      : paper ? <div>
        <div className="actions--bar">
          <div className="wrap">
            {authUser && (authUser.id === paper.User.id) ?
              <Link to={`/papers/${id}/update`} className="button">Update Paper</Link>
              : null
            }
            {authUser && (authUser.id === paper.User.id) ?
              <button className="button" onClick={handleDelete}>Delete Paper</button>
              : null
            }
            <Link to={`/papers/${id}/report`} className="button">Print Paper</Link>
            <Link to='/' className="button">Return to List</Link>
          </div>
        </div>
        {paperDetail}
      </div>
        : null
  )
}

export default PaperDetail;
