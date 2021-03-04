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

      <div className="ag-theme-alpine" style={{ height: 400, width: 1000 }}>
            <AgGridReact
                onGridReady={onGridReady}
                rowData={customers}>
             <AgGridColumn field="firstname" sortable={ true } filter={ true }></AgGridColumn>
             <AgGridColumn field="lastname" sortable={ true } filter={ true }></AgGridColumn>
             <AgGridColumn field="streetaddress" sortable={ true } filter={ true }></AgGridColumn>
             <AgGridColumn field="postcode" sortable={ true } filter={ true }></AgGridColumn> 
             <AgGridColumn field="phone" sortable={ true } filter={ true }></AgGridColumn> 
             <AgGridColumn field="email" sortable={ true } filter={ true }></AgGridColumn> 
            
            </AgGridReact>
        </div>

        
    
    </div>
  );
}

export default App;
