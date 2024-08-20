import React, { useState, useEffect, useContext } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Context from '../../../Context';
import Loading from '../../Loading';

const UpdatePatent = () => {
  const context = useContext(Context.Context);
  const [isLoading, setIsLoading] = useState(true);
  const [patentTitle, setPatentTitle] = useState('');
  const [patentDescription, setPatentDescription] = useState('');
  const [inventors, setInventors] = useState('');
  const [country, setCountry] = useState('');
  const [date, setDate] = useState('');
  const [patentNumber, setPatentNumber] = useState('');
  const [patentUserFirstName, setPatentUserFirstName] = useState('');
  const [patentUserLastName, setPatentUserLastName] = useState('');
  const [errors, setErrors] = useState([]);
  const authUser = context.authenticatedUser;

  const { id } = useParams();
  let navigate = useNavigate();

  useEffect(() => {
    const controller = new AbortController();
    context.data.getPatent(id)
      .then((response) => {
        if (response.error === "Sorry, we couldn't find the patent you were looking for.") {
          navigate('/notfound');
        } else {
          if (authUser.id === response.User.id) {
            setPatentTitle(response.title);
            setPatentDescription(response.description);
            setPatentUserFirstName(response.User.firstName);
            setPatentUserLastName(response.User.lastName);
            setInventors(response.inventors);
            setCountry(response.country);
            setDate(response.date);
            setPatentNumber(response.patentNumber);
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
    const patent = {
      title: patentTitle,
      description: patentDescription,
      inventors,
      country,
      date,
      patentNumber,
      userId: authUser.id,
    };

    context.data.updatePatent(id, patent, authUser.emailAddress, authUser.password)
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
        <h2>Update Patent</h2>
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

              <p>By {patentUserFirstName} {patentUserLastName}</p>

              <label htmlFor="patentDescription">Patent Description</label>
              <textarea id="patentDescription" name="patentDescription" value={patentDescription} onChange={onChange}></textarea>
            </div>
            <div>
              <label htmlFor="inventors">Inventors</label>
              <input id="inventors" name="inventors" type="text" value={inventors} onChange={onChange} />

              <label htmlFor="country">Country</label>
              <input id="country" name="country" type="text" value={country} onChange={onChange}></input>

              <label htmlFor="date">Date</label>
              <input id="date" name="date" type="date" value={date} onChange={onChange}></input>

              <label htmlFor="patentNumber">Patent Number</label>
              <input id="patentNumber" name="patentNumber" type="text" value={patentNumber} onChange={onChange}></input>
            </div>
          </div>
          <button className="button" type="submit" onClick={submit}>Update Patent</button>
          <button className="button button-secondary" onClick={cancel}>Cancel</button>
        </form>
      </div>
  )
}

export default UpdatePatent;
