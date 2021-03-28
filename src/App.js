import logo from './logo.svg';
import './App.css';
import { useState } from "react";
import React from "react";

import { Link } from "react-router-dom";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import AppBar from "@material-ui/core/AppBar";
import TextField from "@material-ui/core/TextField"
import { Button, Table, Card, Accordion } from 'react-bootstrap';


function AddCustomer(props) {
  return (
    <div className="addCustomer">
      <br />
      <h2> Add new customer </h2>
      <TextField
        name="firstname"
        label="First name"
        onChange={props.addCustomerInputChanged}
        value={props.newCustomer.firstname}
      />
      <br />
      <TextField
        name="lastname"
        label="Last name"
        onChange={props.addCustomerInputChanged}
        value={props.newCustomer.lastname}
      />
      <br />
      <TextField
        name="streetaddress"
        label="Street address"
        onChange={props.addCustomerInputChanged}
        value={props.newCustomer.streetaddress}
      />
       <br />
      <TextField
        name="postcode"
        label="Post code"
        onChange={props.addCustomerInputChanged}
        value={props.newCustomer.postcode}
      />
       <br />
      <TextField
        name="city"
        label="City"
        onChange={props.addCustomerInputChanged}
        value={props.newCustomer.city}
      />
       <br />
      <TextField
        name="email"
        label="Email"
        onChange={props.addCustomerInputChanged}
        value={props.newCustomer.email}
      />
       <br />
            <TextField
        name="phone"
        label="Phone"
        onChange={props.addCustomerInputChanged}
        value={props.newCustomer.phone}
      />
      <br />
      <br />
      <Button onClick={props.addCustomer} variant="primary" >
        Add customer
      </Button>
      <hr></hr>
    </div>
  );
}


function FilterCustomer(props) {
  return (
    <div class="filterCustomer">
    <Accordion>
  <Card>
    <Card.Header>
      <Accordion.Toggle as={Button} variant="link" eventKey="0">
        Filter customers
      </Accordion.Toggle>
    </Card.Header>
    <Accordion.Collapse eventKey="0">
      <Card.Body>      <h2> Filter customers </h2><br />
      <table>
        <tr>
      <td>By first name:{" "}</td>
      <td><input
        onChange={props.firstnameFilterChanged}
        value={props.filter.firstname}
      ></input>{" "}</td></tr>
      <br />
      <tr>
      <td> By last name:{" "}</td>
      <td><input
        onChange={props.lastnameFilterChanged}
        value={props.filter.lastname}
      ></input>{" "}</td></tr>
      <br />
      <tr>
      <td>By street address:&nbsp;{" "}</td>
      <td><input
        onChange={props.streetaddressFilterChanged}
        value={props.filter.streetaddress}
      ></input>{" "}</td>
      </tr>
      <br />
      <tr>
      <td>By postcode:{" "}</td>
      <td><input
        onChange={props.postcodeFilterChanged}
        value={props.filter.postcode}
      ></input>{" "}</td> </tr>
      <br />
      <tr>
      <td>By city:{" "}</td>
      <td><input
        onChange={props.cityFilterChanged}
        value={props.filter.city}
      ></input>{" "}</td></tr>
      <br />
      <tr><td>
      By email:{" "}</td>
      <td><input
        onChange={props.emailFilterChanged}
        value={props.filter.email}
      ></input>{" "}</td></tr>
            <br />
            <tr>  <td>By phone:{" "}</td>
            <td><input
        onChange={props.phoneFilterChanged}
        value={props.filter.phone}
      ></input>{" "}</td></tr>
      </table>
      &nbsp;</Card.Body>
    </Accordion.Collapse>
  </Card>
 
</Accordion>
   
    </div>
  );
}

function App(props) {
  const [update, setUpdate] = useState(0);
  const [customers, setCustomers] = useState([]);
  const [sortedField, setSortedField] = React.useState();
  const [direction, setDirection] = React.useState();
  const [filter, setFilter] = React.useState({
    firstname: "",
    lastname: "",
    streetaddress: "",
    postcode: "",
    city: "",
    email: "",
    phone: "",
  });
  const [tabValue, setTabValue] = useState("one");
  const [newCustomer, setNewCustomer] = useState({
    firstname: "",
    lastname: "",
    streetaddress: "",
    postcode: "",
    city: "",
    email: "",
    phone: ""
  });


    //Errors for fetch
    function handleErrors(response) {
      if (!response.ok) {
        throw Error(response.statusText);
      }
      return response;
    }

  React.useEffect(() => {
    fetch("https://customerrest.herokuapp.com/api/customers")
      .then(handleErrors)
      .then((response) => response.json())
      .then((responseData) => {
        console.log(responseData.content);
        setCustomers(responseData.content);

      })
      .catch((error) => console.log(error));
  }, [update]);
  

    //Sort magic
  //Dont execute the function if sortedField isn't modified
  if (sortedField != null) {
    if (direction == "asc") {
      //Asc
       customers.sort((a, b) => {
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
      customers.sort((a, b) => {
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

  // Filters

  const firstnameFilterChanged = (event) => {
    setFilter({ ...filter, firstname: event.target.value });
  };

  const lastnameFilterChanged = (event) => {
    setFilter({ ...filter, lastname: event.target.value });
  };

  const streetaddressFilterChanged = (event) => {
    setFilter({ ...filter, streetaddress: event.target.value });
  };

  const postcodeFilterChanged = (event) => {
    setFilter({ ...filter, postcode: event.target.value });
  };

  const cityFilterChanged = (event) => {
    setFilter({ ...filter, city: event.target.value });
  };

  const emailFilterChanged = (event) => {
    setFilter({ ...filter, cemail: event.target.value });
  };


  const phoneFilterChanged = (event) => {
    setFilter({ ...filter, phone: event.target.value });
  };

  // Tabs
  const handleTabChange = (event, tabValue) => {
    setTabValue(tabValue);
  };

  // Add new customer: handle input changed
  const addCustomerInputChanged = (event) => {
    setNewCustomer({ ...newCustomer, [event.target.name]: event.target.value });
  };

  // ADD CUSTOMER
  const addCustomer = (event) => {
    event.preventDefault();

    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        firstname: newCustomer.firstname,
        lastname: newCustomer.lastname,
        streetaddress: newCustomer.streetaddress,
        postcode: newCustomer.postcode,
        city: newCustomer.city,
        email: newCustomer.email,
        phone: newCustomer.phone
      }),
    };
    fetch("https://customerrest.herokuapp.com/api/customers", requestOptions)
      .then(handleErrors)
      .then((response) => response.json())
      .then((data) => console.log(data))
      .catch((error) => console.log(error));

    setUpdate(1)
    setNewCustomer({
      firstname: "",
      lastname: "",
      streetaddress: "",
      postcode: "",
      city: "",
      email: "",
      phone: ""
    });
  };



  return (
    <div className="App">

<AppBar position="static">
          <Tabs value={tabValue} onChange={handleTabChange}>
            <Tab value="one" label="View customers" />
            <Tab value="two" label="Add customers" />
            <Tab value="three" label="Export customers" />
          </Tabs>
        </AppBar>
        {tabValue === "one" && (
          <FilterCustomer
          firstnameFilterChanged={firstnameFilterChanged}
          lastnameFilterChanged={lastnameFilterChanged}
          streetaddressFilterChanged={streetaddressFilterChanged}
          postcodeFilterChanged={postcodeFilterChanged}
          cityFilterChanged={cityFilterChanged}
          emailFilterChanged={emailFilterChanged}
          phoneFilterChanged={phoneFilterChanged}
          filter={filter}
        />
        )}
         {tabValue === "two" && ( <AddCustomer newCustomer={newCustomer} addCustomerInputChanged={addCustomerInputChanged} addCustomer={addCustomer} />)}
         {tabValue === "three" && ( <p>Export customer placeolder</p> )}

  

      <Table striped bordered hover>
          <thead>
              <tr>
                 <th> ID</th>
                 
                  <th>First name &nbsp;
              <Button
                variant="outline-primary"
                size="sm"
                onClick={() => {
                  setSortedField("firstname");
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
                  setSortedField("firstname");
                  setDirection("desc");
                }}
              >
                Desc
              </Button>
              </th>
                  <th>Last name &nbsp;
              <Button
                variant="outline-primary"
                size="sm"
                onClick={() => {
                  setSortedField("lastname");
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
                  setSortedField("lastname");
                  setDirection("desc");
                }}
              >
                Desc
              </Button>

                  </th>


                  <th>Street address  &nbsp;
                  <Button
                variant="outline-primary"
                size="sm"
                onClick={() => {
                  setSortedField("streetaddress");
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
                  setSortedField("streetaddress");
                  setDirection("desc");
                }}
              >
                Desc
              </Button></th>
                  <th>Postcode &nbsp;

                  <Button
                variant="outline-primary"
                size="sm"
                onClick={() => {
                  setSortedField("postcode");
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
                  setSortedField("postcode");
                  setDirection("desc");
                }}
              >
                Desc
                </Button>
                    
                  </th>
                  <th>City  &nbsp;
                
                  <Button
                variant="outline-primary"
                size="sm"
                onClick={() => {
                  setSortedField("city");
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
                  setSortedField("city");
                  setDirection("desc");
                }}
              >
                Desc
                </Button></th>
                  <th>Email &nbsp;
                
                  <Button
                variant="outline-primary"
                size="sm"
               onClick={() => {
                 setSortedField("email");
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
                 setSortedField("email");
                 setDirection("desc");
               }}
             >
               Desc
               </Button></th>
                  <th>Phone &nbsp;
                  
                  <Button
                variant="outline-primary"
                size="sm"
               onClick={() => {
                 setSortedField("phone");
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
                 setSortedField("phone");
                 setDirection("desc");
               }}
             >
               Desc
               </Button></th>
                 <th></th>
                 <th></th>
              </tr>
              </thead>
          {customers
            .filter(i => (i.firstname !== null) && (i.lastname != null) && (i.streetaddress != null) && (i.postcode != null) && (i.city != null) && (i.email != null))
          .filter((customer) => customer.firstname.toLowerCase().includes(filter.firstname.toLowerCase()))
          .filter((customer) => customer.lastname.toLowerCase().includes(filter.lastname.toLowerCase()))
          .filter((customer) => customer.streetaddress.toLowerCase().includes(filter.streetaddress.toLowerCase()))
          .filter((customer) => customer.postcode.toLowerCase().includes(filter.postcode.toLowerCase()))
          .filter((customer) => customer.city.toLowerCase().includes(filter.city.toLowerCase()))
          .filter((customer) => customer.email.toLowerCase().includes(filter.email.toLowerCase()))
          .map((customer, index) =>  
        <tbody>
        <tr key={index}>
          <td>{customer.links[0].href.split("/")[5]}</td>
          <td>{customer.firstname}</td>
          <td>{customer.lastname}</td>
          <td>{customer.streetaddress}</td>
          <td>{customer.postcode}</td>
          <td>{customer.city}</td>
          <td>{customer.email}</td>
          <td>{customer.phone}</td>
          <td><Button variant="danger">Delete</Button></td>
          <td><Button variant="secondary">
          <Link class="link"
                      to={{
                        pathname: "/edit/" + customer.links[0].href.split("/")[5],
                      }}
                    >
                      Edit
                    </Link>{" "}</Button></td>
          <td><Button variant="primary"> <Link class="link"
                      to={{
                        pathname: "/customer/" + customer.links[0].href.split("/")[5],
                        customerId: customer.links[0].href.split("/")[5],
                      }}
                    >
                      View Trainings
                    </Link>{" "}</Button></td>
          </tr>
          </tbody>)}
          </Table> 

        
    
    </div>
  );
}

export default App;
