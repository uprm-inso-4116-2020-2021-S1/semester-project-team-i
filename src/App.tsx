import React from 'react';
import './App.css';
import { ExplorePage } from './components/ExplorePage/ExplorePage';
import { Item } from './components/Item/Item';
import {CreateDish} from './components/CreateDish/CreateDish'; 
import {CreateRestaurant} from './components/CreateRestaurant/CreateRestaurant';
import { Link } from 'react-router-dom';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Register from './components/Register/Register';
import Login from './components/Login/Login';
import Restaurant from './components/Restaurant/Restaurant';
import RestManager from './components/RestManager/RestManager';
import {Profile} from './components/ProfilePopUp/ProfilePopup';


function App() {

  return (
      <Router>
        <div className="navbar">
          <Link className="title" to="/" style={{ textDecoration: 'inherit' }}>Find &amp; Eat</Link>
          <Link className="explore" to="/explore" />
          <Profile/>
        </div>

        <Switch>
          <Route exact path="/" component={Login} />
          <Route exact path="/explore" component={ExplorePage} />
          <Route exact path="/item" component={Item} />
          <Route exact path="/createDish" component={CreateDish} />
          <Route exact path="/createRestaurant" component={CreateRestaurant} />
          <Route exact path="/register" component={Register}/>
          <Route exact path="/login" component={Login}/>
          <Route exact path="/restaurant/:eid" component={Restaurant}/>
          <Route exact path="/restaurantManager/:eid" component={RestManager}/>

        </Switch>
      </Router>

  );
}

export default App;
