import logo from './logo.svg';
import './App.css';
import { useState } from "react";
import React from "react";


function Trainings(props) {
  const [update, setUpdate] = useState();
  const [trainings, setTrainings] = useState([]);
  const [sortedField, setSortedField] = React.useState();
  const [direction, setDirection] = React.useState();
  const [filter, setFilter] = React.useState({
    date: "",
    duration: { min: 0, max: 1000000 },
    activity: "",
  });

  function FilterTraining(props) {
    return (
      <div className="filterTraining">
        <h1> Filter training </h1>
        By date:{" "}
        <input
          onChange={props.dateFilterChanged}
          value={props.filter.date}
        ></input>{" "}
        <br />
        By duration: Min{" "}
      <input
        onChange={props.minDurationChanged}
        value={props.filter.duration.min}
      ></input>{" "}
      Max{" "}
      <input
        onChange={props.maxDurationChanged}
        value={props.filter.duration.max}
      ></input>{" "}
      <br />
        By activity:{" "}
        <input
          onChange={props.activityFilterChanged}
          value={props.filter.activity}
        ></input>{" "}
        <br />
        </div>
        )
  }
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

  const deleteFunction = (trainingId, actualIndex) => {
    

    var r = window.confirm("Are you sure you want to delete this training?");

    if (r == true) {
    const requestOptions = {
      method: "DELETE",
    };

    //Delete from Server
    fetch("https://customerrest.herokuapp.com/api/trainings/" + trainingId, requestOptions);

    // Client-side delete:
    // customerId = Server Id != index
    const newTrainingsList = trainings.filter((item, index) => index !== actualIndex);
    setTrainings(newTrainingsList);
  } else {
    alert("No customer was deleted!")
  }
  };

  // Filters

  const maxDurationChanged = (event) => {
    setFilter({
      ...filter,
      price: { min: filter.duration.min, max: event.target.value },
    });
  };

  const minDurationChanged = (event) => {
    setFilter({
      ...filter,
      price: { max: filter.duration.max, min: event.target.value },
    });
  };

  const activityFilterChanged = (event) => {
    setFilter({ ...filter, activity: event.target.value });
  };

  const dateFilterChanged = (event) => {
    setFilter({ ...filter, date: event.target.value });
  };




  return (
    <div className="Trainings">
      <FilterTraining filter={filter} maxDurationChanged={maxDurationChanged} minDurationChanged={minDurationChanged} activityFilterChanged={activityFilterChanged} dateFilterChanged={dateFilterChanged}/>
<hr></ hr>
     <table>
          <thead>
              <tr>
                  <th>Training ID </th>
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
          {trainings
          .filter((training) => training.date.toLowerCase().includes(filter.date.toLowerCase())
          .filter(
            (training) =>
              training.duration > filter.duration.min && training.duration < filter.duration.max
          )
          .filter((training) => training.activity.toLowerCase().includes(filter.activity.toLowerCase())
          .map((training, index) =>  
        <tbody>
        <tr key={index}>
          <td>{training.links[0].href.split("/")[5]}</td>
          <td>{training.date}</td>
          <td>{training.duration}</td>
          <td>{training.activity}</td>
          <td><button onClick={() => deleteFunction(training.links[0].href.split("/")[5], index)}>Delete</button></td>
          <td><button>Edit</button></td>
          </tr>
          </tbody>)))}
          </table> 
    </div>
  );
}

export default Trainings;
