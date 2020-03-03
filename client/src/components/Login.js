import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Divider from '@material-ui/core/Divider';
import { Grid, Card, TextField } from '@material-ui/core';
import Fab from '@material-ui/core/Fab';
import Axios from 'axios';
import store from '../store';

const useStyles = makeStyles(theme => ({
    background: {
        transitionDuration: '0.8s',
        paddingTop: '8rem',
        paddingBottom: '3rem',
    },
    header: {
        align: 'center',
    },
    title: {
        paddingBottom: '2rem',
        textAlign: 'left',
        fontSize: '2.5rem',
        fontWeight: '900',
        letterSpacing: '0.1rem',
    },
    subtitle: {
        fontSize: '2.2rem',
        fontWeight: '700',
        margin: '1.5rem',
        textAlign: 'center',
    },
    card: {
        marginTop: '2rem',
        fontSize: '1.7rem',
    },
    login: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        marginTop: '1.5rem',
        marginBottom: '3rem',
    },
    loginInput: {
        fontSize: '2rem',
    },
    btn: {
        marginTop: '3rem',
        fontSize: '2rem',
        background: 'transparent',
        color: 'white',
        transition: '0.7s',
        '&:hover': {
            transform: 'scale(1.1)',
            transition: '0.7s',
        }
    },
    _divider: {
        marginTop: '3rem',
    },
    loginDivider: {

    },
    inputFocused: {
        color: 'black'
    }
}))

export default function Login() {
    var [login, setLogin] = useState({
        userName: "",
        userPassword: "",
    })
    var [register, setRegister] = useState({
        userName: "",
        userPassword: "",
    });
    var [isLogined, setIsLogined] = useState(false);

    const InputProps = { style: { fontSize: '2rem' } };
    const InputLabelProps = { style: { fontSize: '1.7rem', color: 'primary' } }
    const InputLabelProps2 = { style: { fontSize: '1.7rem', color: "secondary" } }

    const classes = useStyles();
    const primary = "#2196F3";

    const handleLoginInput = (e) => {
        e.preventDefault();
        let nextState = login;
        nextState[e.target.name] = e.target.value;
        setLogin(nextState);
    }
    const handleLoginSubmit = (e) => {
        e.preventDefault();
        loginProcess();
    }
    const loginProcess = () => {
        Axios({
            method: 'post',
            url: '/api/login_process',
            data: {
                userName: login.userName,
                userPassword: login.userPassword
            }
        })
        .then((res) => {
            alert(res.data.success);
            if (res.data.code == 200) {
                store.dispatch({ type: 'LOGINED', userName: login.userName });
                sessionStorage.setItem('userName', login.userName);
            }
            window.location.assign('/MyPage');
        })
        .then(() => setIsLogined(true))
        .catch((err) => console.log(err));
    }

    //////Register
    const handleRegisterInput = (e) => {
        e.preventDefault();
        let nextState = register;
        nextState[e.target.name] = e.target.value;
        setRegister(nextState);
    }

    const handleRegisterSubmit = (e) => {
        e.preventDefault();
        registerProcess();
    }

    const registerProcess = () => {
        Axios({
            method: 'post',
            url: '/api/register',
            data: {
                userName: register.userName,
                userPassword: register.userPassword
            }
        })
        .then((res) => alert('회원가입을 축하드립니다!'))
        .then(() => setIsLogined(true))
        .catch((err) => console.log(err));
    }

    return (
        <div className={classes.background}>
            <Container maxWidth="lg" className={classes.Header}>
                <div className={classes.title}>로그인</div>
            </Container>
            <Divider className={classes._divider} />
            <Container maxWidth="lg">
                <Grid container spacing={10}>
                    <Grid item xs={12} md={6}>
                        <Card className={classes.card}>
                            <div className={classes.subtitle}>
                                이미 가입한 계정이 있으신가요?
                        </div>
                            <Divider className={classes.loginDivider} />
                            <form noValidate autoComplete="off" className={classes.login} onSubmit={handleLoginSubmit}>
                                <TextField id="outlined-basic" label="아이디" name="userName"
                                    InputProps={InputProps}
                                    InputLabelProps={InputLabelProps}
                                    onChange={handleLoginInput} /><br />
                                <TextField
                                    id="standard-password-input"
                                    label="패스워드"
                                    name="userPassword"
                                    type="password"
                                    autoComplete="current-password"
                                    inputProps={InputProps}
                                    InputLabelProps={InputLabelProps}
                                    onChange={handleLoginInput}
                                />
                                <Fab variant="extended" className={classes.btn} type="submit"
                                    style={{
                                        background: 'linear-gradient(45deg, #2196F3 30%, #21CBF3 90%)',
                                        boxShadow: '0 3px 5px 2px rgba(33, 203, 243, .3)',
                                    }}>
                                    로그인</Fab>
                            </form>

                        </Card>

                    </Grid>
                    <Grid item xs={12} md={6}>
                        <Card className={classes.card}>
                            <div className={classes.subtitle}>
                                <span style={{ fontFamily: 'Product Sans' }}>PlayLab</span>에 처음 오셨나요?
                        </div>
                            <Divider className={classes.loginDivider} />

                            <form noValidate autoComplete="off" className={classes.login} onSubmit={handleRegisterSubmit}>
                                <TextField id="outlined-basic" label="아이디" name="userName"
                                    InputProps={InputProps}
                                    InputLabelProps={InputLabelProps2}
                                    onChange={handleRegisterInput}
                                /><br />
                                <TextField
                                    id="standard-password-input"
                                    label="패스워드"
                                    name="userPassword"
                                    type="password"
                                    autoComplete="current-password"
                                    inputProps={InputProps}
                                    InputLabelProps={InputLabelProps2}
                                    onChange={handleRegisterInput}
                                />
                                <Fab variant="extended" className={classes.btn} type="submit"
                                    style={{
                                        background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
                                        boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
                                    }}>
                                    회원가입</Fab>
                            </form>

                        </Card>

                    </Grid>
                </Grid>
            </Container>

        </div>

    )
}