import React, { Component } from 'react';
import './App.css';
import Home from './components/Home';

class App extends Component {
  render() {
    return (
      <div className="App">
        <div className="Background">
          <Home />
        </div>
        <div className="Developer">DEVELOPED BY LCH</div>
        
      </div>
    )
  }
}

export default App;
