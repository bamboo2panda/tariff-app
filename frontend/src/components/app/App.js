import './App.css';

import React, {useState} from 'react';
import Auth from '../auth';
import Header from '../header';
import Features from '../features';
import PayCheckService from '../../services/payCheckService';
import UserDataService from '../../services/userDataService';

import {BrowserRouter as Router, Switch, Route } from 'react-router-dom';


const App = () => {
  const [, rerender] = useState(null);
  const [planPaid, setPlanPaid] = useState(false);
  const [userData, setUserData] = useState([]);

  const setToken = (token) => {
    localStorage.setItem('token', token);
    updateScreen();
  }

  const payCheckService = new PayCheckService();
  const userDataService = new UserDataService();

  payCheckService.checkPayment()
    .then((result) => {
      if (JSON.stringify(result) !== JSON.stringify(planPaid)){
        setPlanPaid(result.paid);
      }
    });
  
  userDataService.getUserData()
    .then((result) => {
      if (JSON.stringify(result) !== JSON.stringify(userData)){
        setUserData(result);
      }
    });

  const updateScreen = () => {
    rerender(Math.random());
  }

  
  return (
    <Router>
        <Switch>
            <Route exact path="/">
              <Auth setToken={setToken} >
                <Header setToken={setToken}/>
                <h1>My featutes:</h1>
                <Features plan={userData['plan']} paid={planPaid} userData={userData}/>
              </Auth> 
            </Route>
        </Switch>
    </Router>
    
  );
}

export default App;
