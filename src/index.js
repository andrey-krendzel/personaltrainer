import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import Trainings from './Trainings';
import { BrowserRouter as Router, 
  Switch, Route, Link} from "react-router-dom";
import Trainings_customer from './Trainings_customer';
import { Nav, Navbar, Form, FormControl, Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';



ReactDOM.render(
  <React.StrictMode>
     <Router>
    <div>
      
    <Navbar bg="primary" variant="dark">
    <Navbar.Brand href="#home">PersonalTrainer</Navbar.Brand>
    <Nav className="mr-auto">
    
      <Nav.Link>  <Link to="/" class="nav-link">All customers</Link></Nav.Link>
      <Nav.Link> <Link to="/trainings" class="nav-link">All trainings</Link></Nav.Link>
      <Nav.Link> <Link to="/pricing" class="nav-link">Pricing</Link></Nav.Link>
    </Nav>
    <Form inline>
      <FormControl type="text" placeholder="Search" className="mr-sm-2" />
      <Button variant="outline-light">Search</Button>
    </Form>
  </Navbar>

    
    <Switch>
    <Route exact path="/"  component={App}/>
    <Route path = "/trainings" component={Trainings}/>
    <Route path = "/customer/:customerId" component={Trainings_customer}/>
    <Route path = "/pricing" component={Trainings}/>
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
