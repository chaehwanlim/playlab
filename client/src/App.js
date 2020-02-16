import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import AppBar from "./components/AppBar";
import Home from "./components/Home";
import Search from "./components/Search";
import Popular from "./components/Popular";
import PlaylistAdd from "./components/PlaylistAdd";
import Login from "./components/Login";

export default function App() {
  return (
    <Router>
      <AppBar />
      <Route exact path="/" component={Home} />
      <Route path="/Search" component={Search} />
      <Route path="/Popular" component={Popular} />
      <Route path="/PlaylistAdd" component={PlaylistAdd} />
      <Route path="/Login" component={Login} />
    </Router>
  )
}