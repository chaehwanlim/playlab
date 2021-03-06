import React, { useState } from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import AddIcon from '@material-ui/icons/AddRounded';
import StarIcon from '@material-ui/icons/StarRounded';
import SearchIcon from '@material-ui/icons/SearchRounded';
import AccountCircle from '@material-ui/icons/AccountCircle';
import Container from '@material-ui/core/Container';
import { Link } from "react-router-dom";
import './styles/AppBar.scss';


export default function _AppBar() {
  const HomeColor = {color : 'white'};
  const ContentColor = {color : 'black', textShadow: '-1px 0 #F2F1F6, 0 1px #F2F1F6, 1px 0 #F2F1F6, 0 -1px #F2F1F6'};
  const [color, setColor] = useState((window.location.pathname === "/") ? HomeColor : ContentColor);

  console.log('appBar rendered');
  return (
    <div className="appBar">
      <AppBar position="static" className="appBarBackground">
        <Container maxWidth="lg">
          <Toolbar style={{padding: '0rem'}}>
            <Typography className="title">
              <Link to="/" className="link" onClick={() => {setColor({color : 'white'})}}
                style={color}>
                PlayLab
              </Link>
            </Typography>
            
            <Link to="/Search" onClick={() => {setColor(ContentColor)}}>
              <IconButton style={color}><SearchIcon style={{fontSize: '2.2rem'}}/></IconButton>
            </Link>
            <Link to="/Popular" onClick={() => {setColor(ContentColor)}}>
              <IconButton style={color}><StarIcon style={{fontSize: '2.2rem'}}/></IconButton>
            </Link>
            <Link to="/PlaylistAdd" onClick={() => {setColor(ContentColor)}}>
              <IconButton style={color}><AddIcon style={{fontSize: '2.2rem'}}/></IconButton>
            </Link>
            <Link to="/MyPage" onClick={() => {setColor(ContentColor)}}>
              <IconButton style={color}><AccountCircle style={{fontSize: '2.2rem'}}/></IconButton>
            </Link>

          </Toolbar>
        </Container>
      </AppBar>
    </div> 
  );
}
