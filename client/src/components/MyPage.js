import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Divider from '@material-ui/core/Divider';
import Grid from '@material-ui/core/Grid';
import Fab from '@material-ui/core/Fab';
import Card from '@material-ui/core/Card';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import AccountCircleRoundedIcon from '@material-ui/icons/AccountCircleRounded';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Login from './Login';
import Axios from 'axios';
import store from '../store';

const useStyles = makeStyles(theme => ({
  background: {
    transitionDuration : '0.8s',
    paddingTop: '8rem',
    paddingBottom: '3rem',
  },
  title: {
    textAlign: 'left',
    fontSize: '2.5rem',
    fontWeight: '900',
  },
  subtitle: {
    textAlign: 'left',
    fontSize: '1.7rem',
    fontWeight: '700',
    color: 'slategray',
  },

  _divider:{
    marginTop: '1rem',
  },

  card: {
    marginTop: '2rem',
    fontSize: '1.7rem',
    marginTop: '10rem',
    paddingLeft: '1.5rem',
    paddingRight: '1.5rem',
    paddingBottom: '3rem',
  },
  accountIconAlign: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  accountIcon:  {
    marginTop: '-8rem',
    width: '16rem',
    height: '16rem',
  },

  gridAlign: {       
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-end',
  },
  logoutBtn: {
    transitionDuration : '0.8s',
    textAlign: 'right',
    fontSize: '1.7rem',
    fontWeight: '700',
    marginBottom: '1rem',
    transition: '0.5s',
    background: 'white',
    '&:hover': {
      background: 'white',
        transform: 'scale(1.1)',
        transition: '0.7s',
    },
  },
  userName: {
    textAlign: 'center',
    fontSize: '2.1rem',
    fontWeight: '900',
  },
  userDescription: {
    textAlign: 'center',
    fontSize: '1.8rem',
    fontWeight: '300',
  },
  subtitle: {
    fontSize: '2.2rem',
    fontWeight: '700',
    margin: '1.5rem',
},
  myPlaylist : {
    margin: '1rem',
    fontSize: '1.7rem',
    fontWeight: '400',
  }
}));

export default function MyPage() {
  var [user, setUser] = useState(store.getState().userName);
  var [user2, setUser2] = useState('');
  var [userInfo, setUserInfo] = useState({});
  var [myPlaylist, setMyPlaylist] = useState({
    music : [],
    movie : [],
    book : []
  })

  useEffect(() => {
    store.subscribe(() => {
      setUser(store.getState().userName);
    })

    if(sessionStorage.userName){
      setUser2(sessionStorage.userName);
    }

    Axios({
      method: 'post',
      url: '/api/myPage/',
      data: {
        userName: sessionStorage.userName
      }
    })
    .then(res => setUserInfo(res.data[0]))
    .catch(err => console.log(err));
    
    Axios({
      method: 'post',
      url: '/api/myPage/music',
      data: {
        userName: sessionStorage.userName
      }
    })
    .then(res => setMyPlaylist({
      ...myPlaylist,
      music : res.data
    }))
    .catch(err => console.log(err));

  }, []);

  const handleLogout = () => {
    sessionStorage.removeItem('userName');
    setUser2('');
    Axios({
      method:'get',
      url: '/api/logout',
      data: {'logout' : true}
    })
    .then(alert('로그아웃 했습니다. 다시 로그인 해주세요.'))
    .catch(err => console.log(err));
    /* window.location.assign('/MyPage'); */
  }

  const classes = useStyles();

  const deletion = (id) => {
    console.log(id);
    const urlWithID = '/api/myPage/music/delete/' + id;
    Axios({
      method: 'delete',
      url: urlWithID,
    })
    .then(res => console.log(res))
    .catch(err => console.log(err))
  }

  const myPage = () => {
    return (
      <div className={classes.background}>
        <Container maxWidth="lg">
          <Grid container spacing={1}>
            <Grid item xs={6}>
              <div className={classes.title}>마이 페이지</div>
            </Grid>
            <Grid item xs={6}>
              <div className={classes.gridAlign}>
                <Fab variant="extended" className={classes.logoutBtn}
                onClick = {handleLogout}>
                  로그아웃
                </Fab>
              </div>
            </Grid>
          </Grid>

          <Paper className={classes.card} elevation={5}>
            <div className={classes.accountIconAlign}>
              <AccountCircleRoundedIcon className={classes.accountIcon} color='primary'/>
            </div>
            <div className={classes.userName}>
              {userInfo.userName}
            </div>
            <p className={classes.userDescription}>
              {userInfo.description}
            </p>
            <Divider />
            <div className={classes.subtitle}>내가 추가한 음악 관리</div>
            {myPlaylist ? myPlaylist.music.map((datum, index) => {
              return (
                <Card className={classes.myPlaylist}>
                  <b>{datum.title}</b>&nbsp;{datum.artist}&nbsp;
                  <Button className={classes.myPlaylist} color="secondary" onClick={deletion(datum.musicID)}>
                  삭제</Button>
                </Card>
              )
            }) : <div>error</div>}
          </Paper>
        </Container>
      </div>
    )
  }

  return (
    <div>
      {(user2 === '') ? <Login /> : myPage()}
    </div>
    
    
  )
}