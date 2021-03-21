import logo from './logo.svg';
import './App.css';
import { useState } from "react";
import React from "react";
import { Button, Table, Card, Accordion } from 'react-bootstrap';
import TextField from "@material-ui/core/TextField";
import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";

function AddTrainings(props) {
  return (
    <div className="addTrainings">
      <br />
      <h2> Add new training </h2>
      <TextField
        name="customerId"
        label="Customer ID"
        onChange={props.addTrainingInputChanged}
        value={props.newTraining.customerId}
      />
      <br />
      <TextField
        name="duration"
        label="Duration of training"
        onChange={props.addTrainingInputChanged}
        value={props.newTraining.duration}
      />
      <br />
      <TextField
        name="activity"
        label="Activity"
        onChange={props.addTrainingInputChanged}
        value={props.newTraining.activity}
      />
       <br />
      <TextField
        name="date"
        label="Date"
        onChange={props.addTrainingInputChanged}
        value={props.newTraining.date}
      />
      <br />
      <br />
      <Button onClick={props.addTraining} variant="primary" >
        Add training
      </Button>
      <hr></hr>
    </div>
  );
}

function FilterTrainings(props) {
  return (
    <div className="filterTrainings">
          <Accordion>
  <Card>
    <Card.Header>
      <Accordion.Toggle as={Button} variant="link" eventKey="0">
        Filter customers
      </Accordion.Toggle>
    </Card.Header>
    <Accordion.Collapse eventKey="0">
      <Card.Body>  
      <h1> Filter training </h1>
      <table>
        <tr>
      <td>By date:{" "}</td>
      <td><input
        onChange={props.dateFilterChanged}
        value={props.filter.date}
      ></input>{" "}</td>
      </tr>
      <br />
      <tr>
      <td>  By duration: Min{" "}</td>
      <td>  <input
      onChange={props.minDurationChanged}
      value={props.filter.duration.min}
    ></input>{" "}</td>
    </tr>
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
      </table>
      </Card.Body>
    </Accordion.Collapse>
  </Card>
 
</Accordion>
      </div>
      )
}

function Trainings(props) {
  const [update, setUpdate] = useState(0);
  const [trainings, setTrainings] = useState([]);
  const [sortedField, setSortedField] = React.useState();
  const [newTraining, setNewTraining] = useState({
    customerId: "",
    duration: "",
    activity: "",
    date: "",
  });
  const [tabValue, setTabValue] = useState("one");
  const [direction, setDirection] = React.useState();
  const [filter, setFilter] = React.useState({
    date: "",
    duration: { min: 0, max: 1000000 },
    activity: "",
  });


    //Errors for fetch
    function handleErrors(response) {
      if (!response.ok) {
        throw Error(response.statusText);
      }
      return response;
    }

  React.useEffect(() => {
    fetch("https://customerrest.herokuapp.com/gettrainings")
      .then(handleErrors)
      .then((response) => response.json())
      .then((responseData) => {
        console.log(responseData);
        setTrainings(responseData);

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

// Add new training: handle input changed
const addTrainingInputChanged = (event) => {
  setNewTraining({ ...newTraining, [event.target.name]: event.target.value });
};

// ADD TRAINING
const addTraining = (event) => {
  event.preventDefault();

  const requestOptions = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      customer: "https://customerrest.herokuapp.com/api/customers" + newTraining.customerId,
      duration: newTraining.duration,
      activity: newTraining.activity,
      date: newTraining.date
    }),
  };
  fetch("https://customerrest.herokuapp.com/api/trainings", requestOptions)
    .then(handleErrors)
    .then((response) => response.json())
    .then((data) => console.log(data))
    .catch((error) => console.log(error));

  setUpdate(1)
  setNewTraining({
    customerId: "",
    duration: "",
    activity: "",
    date: ""
  });
};

  // Tabs
  const handleTabChange = (event, tabValue) => {
    setTabValue(tabValue);
  };

  // Filters

  const maxDurationChanged = (event) => {
    setFilter({
      ...filter,
      duration: { min: filter.duration.min, max: event.target.value },
    });
  };

  const minDurationChanged = (event) => {
    setFilter({
      ...filter,
      duration: { max: filter.duration.max, min: event.target.value },
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
      <AppBar position="static">
          <Tabs value={tabValue} onChange={handleTabChange}>
            <Tab value="one" label="View trainings" />
            <Tab value="two" label="Add trainings" />
            <Tab value="three" label="Export trainings" />
          </Tabs>
        </AppBar>
        {tabValue === "one" && (
          <FilterTrainings
          maxDurationChanged={maxDurationChanged}
          minDurationChanged={minDurationChanged}
          activityFilterChanged={activityFilterChanged}
          dateFilterChanged={dateFilterChanged}
          filter={filter}
        />
        )}
         {tabValue === "two" && ( <AddTrainings newTraining={newTraining} addTrainingInputChanged={addTrainingInputChanged} addTraining={addTraining} />)}
         {tabValue === "three" && ( <p>Export customer placeolder</p> )}
      
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
          {trainings
          .filter((training) => training.date.toLowerCase().includes(filter.date.toLowerCase()))
          .filter(
            (training) =>
              training.duration > filter.duration.min && training.duration < filter.duration.max
          )
          .filter((training) => training.activity.toLowerCase().includes(filter.activity.toLowerCase()))
          .map((training, index) =>  
        <tbody>
        <tr key={index}>
          <td>{training.id}</td>
          <td>{training.customer.id}</td>
          <td>{training.date}</td>
          <td>{training.duration}</td>
          <td>{training.activity}</td>
          <td><button onClick={() => deleteFunction(training.links[0].href.split("/")[5], index)}>Delete</button></td>
          <td><button>Edit</button></td>
          </tr>
          </tbody>)}
          </table> 
    </div>
  );
}

export default Trainings;
