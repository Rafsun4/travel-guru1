import React, { createContext, useState }  from 'react';
import './App.css';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import Home from './Components/Home/Home';
import Book from './Components/Booking/Booking';
import NotFound from './Components/NotFound/NotFound';
import PrivateRoute from './Components/Private Route/PrivateRoute';
import Destination from './Components/Destination/Destination';
import LoginHandler from './Components/Login/LoginHandler';

export const UserContext = createContext();

function App() {

  const [loggedInUser, setLoggedInUser] = useState({});

  return (
    <UserContext.Provider value={[loggedInUser, setLoggedInUser]}>
      <Router>
        <Switch>
          <Route exact path="/home">
            <Home />
          </Route>
          <Route path="/booking/:placename">
            <Book />
          </Route>
          <Route path="/user">
            <LoginHandler />
          </Route>
          <PrivateRoute path="/destination">
            <Destination />
          </PrivateRoute>
          <Route exact path="/">
            <Home />
          </Route>
          <Route path="*">
            <NotFound />
          </Route>
        </Switch>
      </Router>
    </UserContext.Provider>
  );
}

export default App;