import logo from './logo.svg';
import './App.css';
import { useState } from "react";
import React from "react";
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import TableSortLabel from '@material-ui/core/TableSortLabel';
import Toolbar from '@material-ui/core/Toolbar';

import { AgGridColumn, AgGridReact } from 'ag-grid-react';

import 'ag-grid-enterprise';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine.css';

function FilterCustomer(props) {
  return (
    <div className="filterCustomer">
      <h1> Filter customer </h1>
      By first name:{" "}
      <input
        onChange={props.firstnameFilterChanged}
        value={props.filter.firstname}
      ></input>{" "}
      <br />
      By last name:{" "}
      <input
        onChange={props.lastnameFilterChanged}
        value={props.filter.lastname}
      ></input>{" "}
      <br />
      By street address:{" "}
      <input
        onChange={props.streetaddressFilterChanged}
        value={props.filter.streetaddress}
      ></input>{" "}
      <br />
      By postcode:{" "}
      <input
        onChange={props.postcodeFilterChanged}
        value={props.filter.postcode}
      ></input>{" "}
      <br />
      By city{" "}
      <input
        onChange={props.cityFilterChanged}
        value={props.filter.city}
      ></input>{" "}
      <br />
      By email:{" "}
      <input
        onChange={props.emailFilterChanged}
        value={props.filter.email}
      ></input>{" "}
            <br />
      By phone:{" "}
      <input
        onChange={props.phoneFilterChanged}
        value={props.filter.phone}
      ></input>{" "}
      &nbsp;
      <hr></hr>
    </div>
  );
}

function App(props) {
  const [update, setUpdate] = useState();
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

  const [gridApi, setGridApi] = useState(null);
  const [gridColumnApi, setGridColumnApi] = useState(null);

  const onGridReady = params => {
    setGridApi(params.api);
    setGridColumnApi(params.columnApi);
}


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
    setFilter({ ...filter, city: event.target.value });
  };


  const phoneFilterChanged = (event) => {
    setFilter({ ...filter, phone: event.target.value });
  };




  return (
    <div className="App">


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
      <hr ></hr>

<table>
          <thead>
              <tr>
                 <th> ID:</th>
                 
                  <th>First name: &nbsp;
              <button
                type="button"
                onClick={() => {
                  setSortedField("firstname");
                  setDirection("asc");
                }}
              >
                Asc
              </button>

              <button
                type="button"
                onClick={() => {
                  setSortedField("firstname");
                  setDirection("desc");
                }}
              >
                Desc
              </button>
              </th>
                  <th>Last name: &nbsp;
              <button
                type="button"
                onClick={() => {
                  setSortedField("lastname");
                  setDirection("asc");
                }}
              >
                Asc
              </button>

              <button
                type="button"
                onClick={() => {
                  setSortedField("lastname");
                  setDirection("desc");
                }}
              >
                Desc
              </button>

                  </th>


                  <th>Street address:  &nbsp;
              <button
                type="button"
                onClick={() => {
                  setSortedField("streetaddress");
                  setDirection("asc");
                }}
              >
                Asc
              </button>

              <button
                type="button"
                onClick={() => {
                  setSortedField("streetaddress");
                  setDirection("desc");
                }}
              >
                Desc
              </button></th>
                  <th>Postcode: &nbsp;

                  <button
                type="button"
                onClick={() => {
                  setSortedField("postcode");
                  setDirection("asc");
                }}
              >
                Asc
              </button>

              <button
                type="button"
                onClick={() => {
                  setSortedField("postcode");
                  setDirection("desc");
                }}
              >
                Desc
              </button>
                    
                  </th>
                  <th>City:  &nbsp;
                
                 <button
                type="button"
                onClick={() => {
                  setSortedField("city");
                  setDirection("asc");
                }}
              >
                Asc
              </button>

              <button
                type="button"
                onClick={() => {
                  setSortedField("city");
                  setDirection("desc");
                }}
              >
                Desc
              </button></th>
                  <th>Email: &nbsp;
                
                <button
               type="button"
               onClick={() => {
                 setSortedField("email");
                 setDirection("asc");
               }}
             >
               Asc
             </button>

             <button
               type="button"
               onClick={() => {
                 setSortedField("email");
                 setDirection("desc");
               }}
             >
               Desc
             </button></th>
                  <th>Phone: &nbsp;
                
                <button
               type="button"
               onClick={() => {
                 setSortedField("phone");
                 setDirection("asc");
               }}
             >
               Asc
             </button>

             <button
               type="button"
               onClick={() => {
                 setSortedField("phone");
                 setDirection("desc");
               }}
             >
               Desc
             </button></th>
                 <th></th>
                 <th></th>
              </tr>
              </thead>
          {customers
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
          <td><button>Delete</button></td>
          <td><button>Edit</button></td>
          <td><button> <Link
                      to={{
                        pathname: "/edit/" + car._links.self.href.split("/")[4],
                        carId: car._links.self.href.split("/")[4],
                      }}
                    >
                      View
                    </Link>{" "}</button></td>
          </tr>
          </tbody>)}
          </table> 

        
    
    </div>
  );
}

export default App;
