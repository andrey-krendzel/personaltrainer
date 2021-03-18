import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import Trainings from './Trainings';
import { BrowserRouter as Router, 
  Switch, Route, Link} from "react-router-dom";
import Trainings_customer from './Trainings_customer';
import { Nav, Navbar, Form, FormControl } from 'react-bootstrap';
import styled from 'styled-components';

const Styles = styled.div`
  .navbar { background-color: #222; }
  a, .navbar-nav, .navbar-light .nav-link {
    color: #9FFFCB;
    &:hover { color: white; }
  }
  .navbar-brand {
    font-size: 1.4em;
    color: #9FFFCB;
    &:hover { color: white; }
  }
  .form-center {
    position: absolute !important;
    left: 25%;
    right: 25%;
  }
`;

ReactDOM.render(
  <React.StrictMode>
     <Router>
    <div>
      
    <Styles>
    <Navbar expand="lg">
      <Navbar.Brand href="/">Tutorial</Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav"/>
      <Form className="form-center">
        <FormControl type="text" placeholder="Search" className="" />
      </Form>
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="ml-auto">
          <Nav.Item><Nav.Link href="/">Home</Nav.Link></Nav.Item> 
          <Nav.Item><Nav.Link href="/about">About</Nav.Link></Nav.Item>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  </Styles>

    
    <Switch>
    <Route exact path="/"  component={App}/>
    <Route path = "/trainings" component={Trainings}/>
    <Route path = "/customer/:customerId" component={Trainings_customer}/>
    <Route render={() => <h1> Page not  found</h1>}/>
    </Switch>
    </div>
    </Router>

  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals

/*     <nav>
          <ul>
            <li>
              <Link to="/">All customers</Link>
            </li>
            <li>
              <Link to="/trainings">All trainings</Link>
            </li>
          </ul>
        </nav> */

reportWebVitals();
