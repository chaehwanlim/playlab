import React, { useState } from 'react';
import Container from '@material-ui/core/Container';
import Divider from '@material-ui/core/Divider';
import { Grid, Card, TextField } from '@material-ui/core';
import Fab from '@material-ui/core/Fab';
import Axios from 'axios';
import store from './store';
import './styles/Content.scss';
import './styles/Login.scss';


export default function Login() {
    const [login, setLogin] = useState({
        userName: "",
        userPassword: "",
    })
    const [register, setRegister] = useState({
        userName: "",
        userPassword: "",
    });

    const InputProps = { style: { fontSize: '2rem' } };
    const InputLabelProps = { style: { fontSize: '1.7rem', color: 'primary' } }
    const InputLabelProps2 = { style: { fontSize: '1.7rem', color: "secondary" } }

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
            alert('로그인을 성공했습니다!');
            if (res.data.code === 200) {
                console.log(res.data)
                store.dispatch({ type: 'LOGINED', userName: login.userName });
                sessionStorage.setItem('userName', login.userName);
                sessionStorage.setItem('userID', res.data.userID);
            }
            window.location.assign('/MyPage');
        })
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
        .catch((err) => console.log(err));
    }

    return (
        <div>
            <Container maxWidth="lg" className="header">
                <div className="title">함께하기</div>
            </Container>
            <Divider className="divider" />
            <Container maxWidth="lg">
                <Grid container spacing={3}>
                    <Grid item xs={12} md={6}>
                        <Card className="loginCard">
                            <div className="subtitle">
                                가입한 계정이 있으신가요?
                            </div>
                            <Divider className="loginDivider" />
                            <form noValidate autoComplete="off" className="loginForm" onSubmit={handleLoginSubmit}>
                                <TextField id="outlined-basic" label="아이디" name="userName"
                                    InputProps={InputProps}
                                    InputLabelProps={InputLabelProps}
                                    onChange={handleLoginInput} 
                                /><br />
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
                                <Fab variant="extended" className="submitButton" type="submit" id="login">
                                    로그인</Fab>
                            </form>
                        </Card>
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <Card className="loginCard">
                            <div className="subtitle">
                                <span style={{ fontFamily: 'Samsung' }}>PlayLab</span>에 처음 오셨나요?
                            </div>
                            <Divider className="loginDivider" />

                            <form noValidate autoComplete="off" className="loginForm" onSubmit={handleRegisterSubmit}>
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
                                <Fab variant="extended" className="submitButton" type="submit" id="register">
                                    회원가입</Fab>
                            </form>
                        </Card>
                    </Grid>
                </Grid>
            </Container>

        </div>

    )
}