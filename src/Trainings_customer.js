import logo from './logo.svg';
import './App.css';
import { useState } from "react";
import React from "react";
import { Button, Table, Card, Accordion } from 'react-bootstrap';
import TextField from "@material-ui/core/TextField";
import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";


function FilterTrainings(props) {
  return (
    <div className="filterTrainings">
          <Accordion>
  <Card>
    <Card.Header>
      <Accordion.Toggle as={Button} variant="link" eventKey="0">
        Filter trainings
      </Accordion.Toggle>
    </Card.Header>
    <Accordion.Collapse eventKey="0">
      <Card.Body>  
      <h2> Filter training </h2>
      <br ></br>
      <table>
      <tr>
      <td>By customer ID:{" "}</td>
      <td><input
        value={props.customerId}
      readonly></input>{" "}</td>
      </tr>
      
        <tr>
      <td>By date:{" "}</td>
      <td><input
        onChange={props.dateFilterChanged}
        value={props.filter.date}
      ></input>{" "}</td>
      </tr>
      <tr>
  
      <td> Min duration: {" "}</td>
      <td>  <input
      onChange={props.minDurationChanged}
      value={props.filter.duration.min}
    ></input>{" "}</td>
    </tr>
    <tr>
    <td>Max duration: {" "}</td>
    <td><input
      onChange={props.maxDurationChanged}
      value={props.filter.duration.max}
    ></input>{" "}</td>
    </tr>
     <tr> <td> By activity:{" "}</td>
     <td><input
        onChange={props.activityFilterChanged}
        value={props.filter.activity}
      ></input>{" "}</td>
      </tr>
      <br />
      </table>
      </Card.Body>
    </Accordion.Collapse>
  </Card>
 
</Accordion>
      </div>
      )
}

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
  const [update, setUpdate] = useState(0);
  const [trainings, setTrainings] = useState([]);
  const [sortedField, setSortedField] = React.useState();
  const [direction, setDirection] = React.useState();
  const [tabValue, setTabValue] = useState("one");
  const [newTraining, setNewTraining] = useState({
    duration: "",
    activity: "",
    date: "",
  });
  const [filter, setFilter] = React.useState({
    date: "",
    duration: { min: 0, max: 1000000 },
    activity: "",
    customerId: "",
    trainingId: ""
  });
  const id = window.location.pathname.split("/")[2]; 
  console.log("id " + id);


    //Errors for fetch
    function handleErrors(response) {
      if (!response.ok) {
        throw Error(response.statusText);
      }
      return response;
    }

  React.useEffect(() => {
    fetch("https://customerrest.herokuapp.com/api/customers/" + id + "/trainings")
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
      customer: "https://customerrest.herokuapp.com/api/customers/" + id,
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


const trainingIdFilterChanged = (event) => {
  setFilter({ ...filter, trainingId: event.target.value });
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
                    trainingIdFilterChanged={trainingIdFilterChanged}
                    filter={filter}
                    customerId={id}
                  />
        )}
         {tabValue === "two" && ( <AddTrainings newTraining={newTraining} addTrainingInputChanged={addTrainingInputChanged} addTraining={addTraining} customerId={id} />)}
         {tabValue === "three" && ( <p>Export customer placeolder</p> )}
         <br />
         <div class="customerInfo">
         <h2>Customer </h2>
         <p>Id: <i>{id}</i></p>
         </div>
         <br />
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
              &nbsp;
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
              &nbsp; 
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
              &nbsp; 
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
           .filter((training) => training.date.toLowerCase().includes(filter.date.toLowerCase()))
           .filter(
             (training) =>
               training.duration > filter.duration.min && training.duration < filter.duration.max
           )
           .filter((training) => training.activity.toLowerCase().includes(filter.activity.toLowerCase()))
          .map((training, index) =>  
        <tbody>
        <tr key={index}>
         <td>{training.links[0].href.split("/")[5]}</td>
          <td>{training.date}</td>
          <td>{training.duration}</td>
          <td>{training.activity}</td>
          <td><Button variant="danger" onClick={() => deleteFunction(training.links[0].href.split("/")[5], index)}>Delete</Button></td>
          <td><Button variant="secondary">Edit</Button></td>
          </tr>
          </tbody>)}
          </Table> 
    </div>
  );
}

export default Trainings;
