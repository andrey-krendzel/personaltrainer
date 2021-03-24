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
        value={props.customerId}
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


function Trainings(props) {
  const [update, setUpdate] = useState();
  const [trainings, setTrainings] = useState([]);
  const [sortedField, setSortedField] = React.useState();
  const [direction, setDirection] = React.useState();
  const [tabValue, setTabValue] = useState("one");
  const [newTraining, setNewTraining] = useState({
    duration: "",
    activity: "",
    date: "",
  });

    //Errors for fetch
    function handleErrors(response) {
      if (!response.ok) {
        throw Error(response.statusText);
      }
      return response;
    }

  React.useEffect(() => {
    fetch("https://customerrest.herokuapp.com/api/customers/" + props.location.customerId + "/trainings")
      .then(handleErrors)
      .then((response) => response.json())
      .then((responseData) => {
        console.log(responseData.content);
        setTrainings(responseData.content);

        console.log(trainings);
      })
      .catch((error) => console.log(error));
  }, [update]);

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
      customer: "https://customerrest.herokuapp.com/api/customers/" + props.location.customerId,
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

    setUpdate(Math.random())
  setNewTraining({
    duration: "",
    activity: "",
    date: ""
  });
};


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

   // Tabs
   const handleTabChange = (event, tabValue) => {
    setTabValue(tabValue);
  };




  return (
    <div className="Trainings">
      <h2>Customer id: <i>{props.location.customerId}</i></h2>
      <AppBar position="static">
          <Tabs value={tabValue} onChange={handleTabChange}>
            <Tab value="one" label="View trainings" />
            <Tab value="two" label="Add trainings" />
            <Tab value="three" label="Export trainings" />
          </Tabs>
        </AppBar>
        {tabValue === "one" && (
          <p>Filter placeolder</p> 
        )}
         {tabValue === "two" && ( <AddTrainings newTraining={newTraining} addTrainingInputChanged={addTrainingInputChanged} addTraining={addTraining} />)}
         {tabValue === "three" && ( <p>Export customer placeolder</p> )}
     <Table striped bordered hover>
          <thead>
              <tr>
                <th>Training ID &nbsp;</th>
                  <th>Date &nbsp;
              <Button
                variant="outline-primary"
                size="sm"
                onClick={() => {
                  setSortedField("date");
                  setDirection("asc");
                }}
              >
                Asc
              </Button>
              <Button
                variant="outline-primary"
                size="sm"
                onClick={() => {
                  setSortedField("date");
                  setDirection("desc");
                }}
              >
                Desc
              </Button></th>
                  <th>Duration &nbsp;
              <Button
                variant="outline-primary"
                size="sm"
                onClick={() => {
                  setSortedField("duration");
                  setDirection("asc");
                }}
              >
                Asc
              </Button>
              <Button
                variant="outline-primary"
                size="sm"
                onClick={() => {
                  setSortedField("duration");
                  setDirection("desc");
                }}
              >
                Desc
              </Button></th>
                  <th>Activity &nbsp;
              <Button
                variant="outline-primary"
                size="sm"
                onClick={() => {
                  setSortedField("activity");
                  setDirection("asc");
                }}
              >
                Asc
              </Button>
              <Button
                variant="outline-primary"
                size="sm"
                onClick={() => {
                  setSortedField("activity");
                  setDirection("desc");
                }}
              >
                Desc
              </Button></th>
                  <th></th>
                  <th></th>
              </tr>
              </thead>
          {trainings
           .filter(i => (i.date !== null) && (i.duration != null) && (i.activity != null))
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
          </tbody>)}
          </Table> 
    </div>
  );
}

export default Trainings;
