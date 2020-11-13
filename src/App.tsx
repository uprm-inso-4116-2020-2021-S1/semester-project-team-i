import React from 'react';
import './App.css';
import { ExplorePage } from './components/ExplorePage/ExplorePage';
import { Item } from './components/Item/Item';
import {CreateDish} from './components/CreateDish/CreateDish'; 
import { Link } from 'react-router-dom';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { LandingPage } from './components/LandingPage/LandingPage';
import Register from './components/Register/Register';
import Login from './components/Login/Login';
import Restaurant from './components/Restaurant/Restaurant';

function App() {
  return (
      <Router>
        <div className="navbar">
          <Link className="title" to="/" style={{ textDecoration: 'inherit' }}>Find &amp; Eat</Link>
          <Link className="explore" to="/explore" />
          <Link className="profile" to="/profile" />
        </div>


        <Switch>
          <Route exact path="/" component={LandingPage} />
          <Route exact path="/explore" component={ExplorePage} />
          <Route exact path="/item" component={Item} />
          <Route exact path="/createDish" component={CreateDish} />
          <Route exact path="/register" component={Register}/>
          <Route exact path="/login" component={Login}/>
          <Route exact path="/restaurant/:name" component={Restaurant}/>
        </Switch>
      </Router>

  );
}

export default App;
