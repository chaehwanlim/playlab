import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Container from '@material-ui/core/Container';

const useStyles = makeStyles(theme => ({
  //for AppBar
  root: {
    flexGrow: 1,
  },
  appBarTitle: {
      marginLeft: theme.spacing(1),
      flexGrow: 1,
      fontWeight: '700',
      letterSpacing: '2px',
  },
}));

export default function ButtonAppBar() {
  const _style = useStyles();

  return (
    <div className={_style.root}>
      <AppBar position="static" style={{ background: 'transparent', boxShadow: 'none'}}>
        <Toolbar justifyContent="center">
          {/* <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
            <MenuIcon />
          </IconButton> */}
          <Typography variant="h6" className={_style.appBarTitle} justifyContent="center">
            PLAYLAB
          </Typography>
          <Button color="inherit">Login</Button>
        </Toolbar>
      </AppBar>
    </div>
  );
}
