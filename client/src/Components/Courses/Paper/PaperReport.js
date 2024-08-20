import React, { useState, useEffect, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';
import Context from '../../../Context';
import Loading from '../../Loading';

const PaperReport = () => {
  const context = useContext(Context.Context);
  let paperDetail = useState('');
  const [paper, setPaperDetail] = useState({});
  const [isLoading, setIsLoading] = useState(true);

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

  return (
    isLoading ?
      <Loading />
      : paper ? <div>
        <div className="actions--bar">
          <div className="wrap">
            {/* {authUser && (authUser.id === paper.User.id) ?
              <Link to={`/papers/${id}/update`} className="button">Update Paper</Link>
              : null
            }
            {authUser && (authUser.id === paper.User.id) ?
              <button className="button" onClick={handleDelete}>Delete Paper</button>
              : null
            }
            <Link to='/' className="button button-secondary">Return to List</Link> */}
          </div>
        </div>
        {paperDetail}
      </div>
        : null
  )
}

export default PaperReport;
