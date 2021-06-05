import './App.css';

import React, {useState} from 'react';
import Auth from '../auth';
import Header from '../header';

import {BrowserRouter as Router, Switch, Route } from 'react-router-dom';


const App = () => {
  const [, rerender] = useState(null);

  const setToken = (token) => {
    localStorage.setItem('token', token);
    updateScreen();
  }
  const updateScreen = () => {
    rerender(Math.random());
  }

  
  return (
    <Router>
        <Switch>
            <Route exact path="/">
              <Auth setToken={setToken}>
                <Header setToken={setToken}/>
                <h1>HELLO!!!</h1>
              </Auth> 
            </Route>
        </Switch>
    </Router>
    
  );
}

export default App;
