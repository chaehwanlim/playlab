import React, { Component } from 'react';
import './App.css';
import Container from '@material-ui/core/Container';
import MainTitle from './components/MainTitle';
import MainAppBar from './components/MainAppBar';
import Paper from '@material-ui/core/Paper';
import Paper1 from './components/Paper1';

class App extends Component {
  render() {
    return (
      <div className="App">
        <div className="Background">
          <Container maxWidth="lg">
            <MainTitle />
            <MainAppBar />
          </Container>
          <Paper1></Paper1>
          <div className="Developer">DEVELOPED BY LCH</div>
        </div>
      </div>
    )
  }
}

export default App;
