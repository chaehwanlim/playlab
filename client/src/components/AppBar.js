import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/MenuRounded';
import AddIcon from '@material-ui/icons/AddRounded';
import StarIcon from '@material-ui/icons/StarRounded';
import SearchIcon from '@material-ui/icons/SearchRounded';
import AccountCircle from '@material-ui/icons/AccountCircle';
import Container from '@material-ui/core/Container';
import { Link } from "react-router-dom";


const useStyles = makeStyles(theme => ({
  //for AppBar
  root: {
    flexGrow: 1,
  },
  appBar: {
    background: 'transparent',
    position: 'fixed',
    boxShadow: 'none',
  },
  appBarTitle: {
    position: 'flex',
    textAlign: 'flex-start',
    fontFamily: 'Roboto',
    flexGrow: 1,
    fontSize: '1.8rem',
    fontWeight: '700',
    letterSpacing: '0.2rem',
  },
  btn_desc: {
    fontWeight: '900',
    letterSpacing: '2px',
  },
  link: {
    fontFamily: 'Roboto',
    textDecoration: 'none',
    fontWeight: '900',
  },
}));

export default function _AppBar() {
  const classes = useStyles();
  var [color, setColor] = useState((window.location.pathname === "/") ? 'white' : 'black');

  var adaptColor = (window.location.pathname === "/") ? 'white' : 'black';

  console.log('rendered');
  return (
    <div className={classes.root}>
    <AppBar position="static" className={classes.appBar} >
    <Container maxWidth="lg">
      <Toolbar style={{padding: '0rem',}}>
        {/* <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
          <MenuIcon />
        </IconButton> */}
        <Typography variant="h6" className={classes.appBarTitle}>
          <Link to="/" className={classes.link} onClick={() => {setColor('white')}}
            style={{color: (window.location.pathname === "/") ? 'white' : 'black'}}>
            PLAYLAB
          </Link>
        </Typography>

        <Link to="/Search" onClick={() => {setColor('black')}}>
          <IconButton style={{color: adaptColor}}><SearchIcon style={{fontSize: '2.2rem'}}/></IconButton>
        </Link>
        <Link to="/Popular" onClick={() => {setColor('black')}}>
          <IconButton style={{color: adaptColor}}><StarIcon style={{fontSize: '2.2rem'}}/></IconButton>
        </Link>
        <Link to="/PlaylistAdd" onClick={() => {setColor('black')}}>
          <IconButton style={{color: adaptColor}}><AddIcon style={{fontSize: '2.2rem'}}/></IconButton>
        </Link>
        <Link to="/Login" onClick={() => {setColor('black')}}>
          <IconButton style={{color: adaptColor, marginRight:'0rem'}}><AccountCircle style={{fontSize: '2.2rem'}}/></IconButton>
        </Link>

      </Toolbar>
      </Container>
    </AppBar>
    </div>
  );
}
