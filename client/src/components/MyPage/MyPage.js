import React, { useState, useEffect } from 'react';
import { makeStyles} from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Divider from '@material-ui/core/Divider';
import Grid from '@material-ui/core/Grid';
import Fab from '@material-ui/core/Fab';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import AccountCircleRoundedIcon from '@material-ui/icons/AccountCircleRounded';
import Login from '../Login';
import Axios from 'axios';
import MyMusic from './MyMusic';
import MyMovie from './MyMovie';
import MyBook from './MyBook';
import Footer from '../footer';
import '../styles/Content.scss';

const useStyles = makeStyles(theme => ({
  card: {
    fontSize: '1.7rem',
    marginTop: '10rem',
    paddingLeft: '1rem',
    paddingRight: '1rem',
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
  subtitle2: {
    fontSize: '2.2rem',
    fontWeight: '700',
    margin: '1.5rem',
  },
  myPlaylist : {
    display: 'flex',
    alignItems: 'center',
    margin: '1rem',
    fontSize: '1.7rem',
    fontWeight: '400',
  },
  btnAlign: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  deletion : {
    fontSize: '1.7rem',
    fontWeight: '400',
  },
  btnGroup: {
    padding: '1.5rem',
    fontSize: '2.2rem',
    fontWeight: '700',
  }
}));

export default function MyPage() {
  const classes = useStyles();

  var [user, setUser] = useState('');
  var [userInfo, setUserInfo] = useState({});
  var [content, setContent] = useState({
    component: <MyMovie />,
    subtitle: <div className={classes.subtitle2} style={{color: '#FF4444'}}>내가 추가한 영화 관리하기</div>
  });

  useEffect(() => {
    if(sessionStorage.userName){
      setUser(sessionStorage.userName);
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
  }, []);

  const handleLogout = () => {
    sessionStorage.removeItem('userName');
    sessionStorage.removeItem('userID');
    setUser('');
    Axios({
      method:'get',
      url: '/api/logout',
      data: {'logout' : true}
    })
    .then(alert('로그아웃 했습니다.'))
    .then(setUser(''))
    .catch(err => console.log(err));
  }
  
  const myPage = () => {
    return (
      <div className="header">
        <Container maxWidth="lg">
          <Grid container spacing={1}>
            <Grid item xs={6}>
              <div className="title">마이 페이지</div>
            </Grid>
            <Grid item xs={6}>
              <div className="btnAlign">
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

            <Button className={classes.btnGroup} onClick={() => {setContent({
              component: <MyMusic />, 
              subtitle: <div className={classes.subtitle2} style={{color: '#018DFF'}}>내가 추가한 음악 관리하기</div>
              })}}>
              음악</Button>
            <Button className={classes.btnGroup} onClick={() => {setContent({
              component: <MyMovie />, 
              subtitle: <div className={classes.subtitle2} style={{color: '#FF4444'}}>내가 추가한 영화 관리하기</div>
              })}}>
              영화</Button>
            <Button className={classes.btnGroup} onClick={() => {setContent({
              component: <MyBook />, 
              subtitle: <div className={classes.subtitle2} style={{color: '#1ABF80'}}>내가 추가한 책 관리하기</div>
              })}}>
              책</Button>
            
            <Divider />
            {content.subtitle}
            {content.component}
            </Paper>
        </Container>
      </div>
    )
  }

  return (
    <div>
      {(user === '') ? <Login /> : myPage()}
      <Footer />
    </div>
    
  )
}