import React from 'react';
import './App.css';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Home from './Components/Home/Home';
import Book from './Components/Booking/Booking';
import LogIn from './Components/LogIn/LogIn';
import NotFound from './Components/NotFound/NotFound';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  return (
    <Router>
      <Switch>
        <Route path="/home">
          <Home />
        </Route>
        <Route path="/booking/:placename">
          <Book />
        </Route>
        <Route path="/login">
          <LogIn />
        </Route>
        <Route exact path="/">
          <Home />
        </Route>
        <Route path="*">
          <NotFound />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;