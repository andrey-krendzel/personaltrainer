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
    phone: ""
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





  return (
    <div className="App">



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
          {customers.map((customer, index) =>  
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
