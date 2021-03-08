import logo from './logo.svg';
import './App.css';
import { useState } from "react";
import React from "react";


function Trainings(props) {
  const [update, setUpdate] = useState();
  const [trainings, setTrainings] = useState([]);
  const [sortedField, setSortedField] = React.useState();
  const [direction, setDirection] = React.useState();

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

    //Sort magic
  //Dont execute the function if sortedField isn't modified
  if (sortedField != null) {
    if (direction == "asc") {
      //Asc
      trainings.sort((a, b) => {
        if (a[sortedField] < b[sortedField]) {
          return -1;
        }
        if (a[sortedField] > b[sortedField]) {
          return 1;
        }
        return 0;
      });
    } else {
      // Desc
      trainings.sort((a, b) => {
        if (a[sortedField] < b[sortedField]) {
          return 1;
        }
        if (a[sortedField] > b[sortedField]) {
          return -1;
        }
        return 0;
      });
    }
  }


  return (
    <div className="Trainings">
     <table>
          <thead>
              <tr>
                  <th>Training ID </th>
                  <th>Customer ID </th>
                  <th>Date &nbsp;
              <button
                type="button"
                onClick={() => {
                  setSortedField("date");
                  setDirection("asc");
                }}
              >
                Asc
              </button>
              <button
                type="button"
                onClick={() => {
                  setSortedField("date");
                  setDirection("desc");
                }}
              >
                Desc
              </button></th>
                  <th>Duration &nbsp;
              <button
                type="button"
                onClick={() => {
                  setSortedField("duration");
                  setDirection("asc");
                }}
              >
                Asc
              </button>
              <button
                type="button"
                onClick={() => {
                  setSortedField("duration");
                  setDirection("desc");
                }}
              >
                Desc
              </button></th>
                  <th>Activity &nbsp;
              <button
                type="button"
                onClick={() => {
                  setSortedField("activity");
                  setDirection("asc");
                }}
              >
                Asc
              </button>
              <button
                type="button"
                onClick={() => {
                  setSortedField("activity");
                  setDirection("desc");
                }}
              >
                Desc
              </button></th>
                  <th></th>
                  <th></th>
              </tr>
              </thead>
          {trainings.map((training, index) =>  
        <tbody>
        <tr key={index}>
          <td>{training.links[0].href.split("/")[5]}</td>
          <td>{training.links[2].href.split("/")[5]}</td>
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
