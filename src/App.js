import React, { Component } from 'react';
import './App.css';
import Home from './components/Home';
import { Link, Route, BrowserRouter as Router} from "react-router-dom";
import Search from './components/Search';

class App extends Component {
  render() {
    return (
      <div>
      <Home>
      </Home>
      </div>
      /* {/* <Router>
        <Route exact path="/" component={Home} />
        <Route path="/search" component={Search} />
        <footer>DEVELOPED BY LCH</footer>
      </Router> */ 
    )
  }
}

export default App;
