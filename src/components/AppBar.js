import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
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

const useStyles = makeStyles(theme => ({
  //for AppBar
  root: {
    flexGrow: 1,
  },
  appBarTitle: {
    marginLeft: theme.spacing(1),
    flexGrow: 1,
    fontSize: '1em',
    fontWeight: '700',
    letterSpacing: '2px',
  },
  btn_desc: {
    fontFamily: 'Noto Sans KR',
    fontSize: '1em',
    fontWeight: '700',
    letterSpacing: '2px',
  },
  link: {
    textDecoration: 'none',
    color: 'black',
    '&:visited': {
      color: 'black',
    }
  },
  /* '&:hover': {
    color: 'black',
  } */
}));

/* function _Color() {
  return ({
    backgroundColor: homeClicked ? 'black' : 'white',
    color: homeClicked ? 'white' : 'black',
    boxShadow: 'none'
  })
} */

function LinkStyle() {
  return ({
    '&visited': {
      textDecoration: 'none',
    },
    textDecoration: 'none',
    backgroundColor: 'linear-gradient(45deg, #2196F3 30%, #21CBF3 90%)',
  })
}

export default function _AppBar() {
  const _style = useStyles();
  var [homeClicked, setHomeClicked] = useState(true);

  console.log('AppBar rendered');
  return (
    
      <div className={_style.root}>
        <AppBar position="static" style={{ backgroundColor: 'white',}}>
        <Container maxWidth="lg">
          <Toolbar>
              <Typography variant="h6" className={_style.appBarTitle}>
              <Link to="/" className={_style.link} onClick={() => (setHomeClicked(true))} >
                PLAYLAB
              </Link>
              </Typography>
            
              {/* <IconButton className={_style.btn} color="inherit">검색</Button>
              <IconButton className={_style.btn} color="inherit">인기목록</Button>
              <IconButton className={_style.btn} color="inherit">만들기</Button> */}
              <Link to="/Search" className={_style.link}>
                <IconButton color="inherit" onClick={() => (setHomeClicked(false))}><SearchIcon /></IconButton>
              </Link>
              <Link to="/Popular" className={_style.link}>
                <IconButton color="inherit" onClick={() => (setHomeClicked(false))}><StarIcon /></IconButton>
              </Link>
              <Link to="/PlaylistAdd" className={_style.link}>
                <IconButton color="inherit" onClick={() => (setHomeClicked(false))}><AddIcon /></IconButton>
              </Link>
              <Link to="/Login" className={_style.link}>
                <IconButton color="inherit" onClick={() => (setHomeClicked(false))}><AccountCircle /></IconButton>
              </Link>
          </Toolbar>
          </Container>
        </AppBar>
      </div>
    
  );
}
