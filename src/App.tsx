import React from 'react';
import './App.css';
import { ExplorePage } from './components/ExplorePage/ExplorePage';
import { Item } from './components/Item/Item';
import { Link } from 'react-router-dom';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { LandingPage } from './components/LandingPage/LandingPage';
import Register from './components/Register/Register';
import Login from './components/Login/Login';

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
          <Route exact path="/profile" component={Item} />
          <Route exact path="/register" component={Register}/>
          <Route exact path="/login" component={Login}/>
        </Switch>
      </Router>

  );
}

export default App;
