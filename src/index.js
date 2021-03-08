import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import Trainings from './Trainings';
import { BrowserRouter as Router, 
  Switch, Route, Link} from "react-router-dom";


ReactDOM.render(
  <React.StrictMode>
     <Router>
    <div>
    <nav>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/trainings">Trainings</Link>
            </li>
          </ul>
        </nav>
    
    <Switch>
    <Route exact path="/"  component={App}/>
    <Route path = "/trainings" component={Trainings}/>
    <Route path = "/trainings/:trainingid" component={Trainings_id}/>
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
reportWebVitals();
