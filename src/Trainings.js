import logo from './logo.svg';
import './App.css';
import { useState } from "react";
import React from "react";


function Trainings(props) {
  const [update, setUpdate] = useState();
  const [trainings, setTrainings] = useState([]);

    //Errors for fetch
    function handleErrors(response) {
      if (!response.ok) {
        throw Error(response.statusText);
      }
      return response;
    }

  React.useEffect(() => {
    fetch("https://customerrest.herokuapp.com/api/trainings")
      .then(handleErrors)
      .then((response) => response.json())
      .then((responseData) => {
        console.log(responseData.content);
        setTrainings(responseData.content);

        console.log(trainings);
      })
      .catch((error) => console.log(error));
  }, [update]);

  return (
    <div className="Trainings">
     <table>
          <thead>
              <tr>
                  <th>ID </th>
                  <th>Date</th>
                  <th>Duration</th>
                  <th>Activity</th>
                  <th></th>
                  <th></th>
              </tr>
              </thead>
          {trainings.map((training, index) =>  
        <tbody>
        <tr key={index}>
          <td>{training.links[0].href.split("/")[5]}</td>
          <td>{training.date}</td>
          <td>{training.duration}</td>
          <td>{training.activity}</td>
          <td><button>Delete</button></td>
          <td><button>Edit</button></td>
          </tr>
          </tbody>)}
          </table> 
    </div>
  );
}

export default Trainings;
