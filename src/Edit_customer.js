import logo from "./logo.svg";
import "./App.css";
import React from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import { useState } from "react";
import { Redirect } from "react-router-dom";
import { Link } from "react-router-dom";

function Edit_customer(props) {
  const [customer, setCustomer] = useState({
    firstname: "",
    lastname: "",
    streetaddress: "",
    postcode: "",
    city: "",
    email: "",
    phone: ""
  });
  const id = window.location.pathname.split("/")[2]; 

    //Errors for fetch
    function handleErrors(response) {
      if (!response.ok) {
        throw Error(response.statusText);
      }
      return response;
    }

  React.useEffect(() => {
    fetch("https://customerrest.herokuapp.com/api/customers/" + id)
    .then(handleErrors)
      .then((response) => response.json())
      .then((responseData) => {
        console.log(responseData);
        setCustomer(responseData);
      })
      .catch((err) => console.error(err));
  }, []);

  const inputChanged = (event) => {
    setCustomer({ ...customer, [event.target.name]: event.target.value });
  };

  const editCustomer = (event) => {
    event.preventDefault();


    const requestOptions = {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        firstname: customer.firstname,
        lastname: customer.lastname,
        streetaddress: customer.streetaddress,
        postcode: customer.postcode,
        city: customer.city,
        email: customer.email,
        phone: customer.phone,
      }),
    };
    fetch(
      "https://customerrest.herokuapp.com/api/customers/" + id,
      requestOptions
    )
    .then(handleErrors)
      .then((response) => response.json())
      .then((data) => console.log(data))
      .catch((err) => console.error(err));

    alert("Car edited");
    props.history.push("/");
  };

  return (
    <div>
      <h1>Edit car</h1>

      <h2>
        <Link to="/">Go back </Link>
      </h2>
      <div className="editCustomer">
        <TextField
          name="brand"
          label="Brand"
          onChange={inputChanged}
          value={customer.firstname}
        />
        <br />
        <br />
        <TextField
          name="model"
          label="Model"
          onChange={inputChanged}
          value={customer.lastname}
        />
        <TextField
          name="color"
          label="Color"
          onChange={inputChanged}
          value={customer.streetaddress}
        />
        <TextField
          name="fuel"
          label="Fuel"
          onChange={inputChanged}
          value={customer.postcode}
        />
        <TextField
          name="price"
          label="Price"
          onChange={inputChanged}
          value={customer.city}
        />
        <TextField
          name="year"
          label="Year"
          onChange={inputChanged}
          value={customer.email}
        />

<TextField
          name="year"
          label="Year"
          onChange={inputChanged}
          value={customer.phone}
        />

        <Button onClick={editCustomer} variant="contained" color="primary">
          Edit
        </Button>
        <hr></hr>
      </div>
    </div>
  );
}

export default Edit_customer;
