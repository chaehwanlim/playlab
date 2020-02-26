import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Paper from '@material-ui/core/Paper';
import IconButton from '@material-ui/core/IconButton';
import InputBase from '@material-ui/core/InputBase';
import SearchIcon from '@material-ui/icons/SearchRounded';
import Divider from '@material-ui/core/Divider';
import Grid from '@material-ui/core/Grid';
import Fab from '@material-ui/core/Fab';
import Music from './Music';
import Movie from './Movie';
import Book from './Book';
import { TransitionGroup } from 'react-transition-group';

const useStyles = makeStyles(theme => ({
    background: {
        transitionDuration : '0.8s',
        paddingTop: '7rem',
        paddingBottom: '3rem',
    },
    header: {
    },
    title: {
        paddingBottom: '2rem',
        textAlign: 'left',
        fontSize: '2.5rem',
        fontWeight: '900',
        letterSpacing: '0.1rem',
    },

    //for search bar
    search: {
        marginTop: '1.5rem',
        position: 'center',
        display: 'flex',
        alignItems: 'center',
        width: 'auto',
        transition: '0.5s',
        '&:hover': {
            transform: 'scale(1.01)',
            transition: '0.7s',
        } 
    },
    input: {
        marginLeft: theme.spacing(1),
        padding: '0.5rem',
        flex: 1,
        fontSize: '1.8rem',
        fontWeight: '700',
    },
    iconButton: {
        padding: 10,
    },

    _divider:{
        marginTop: '3rem',
    },

    //for media buttons
    gridAlign: {       
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-end',
    },
    mediaBtn: {
        transitionDuration : '0.8s',
        textAlign: 'right',
        fontSize: '1.7rem',
        fontWeight: '700',
        marginBottom: '1rem',
        color: 'white',
        transition: '0.5s',
        '&:hover': {
            transform: 'scale(1.1)',
            transition: '0.7s',
        } 
    },
}));

export default function Search() {
    //1: 음악, 2: 영화, 3: 책
    var [content, setContent] = useState(<Movie />);
    var [searchKeyword, setSearchKeyword] = useState("");
    var [info, setInfo] = useState([]);


    /* function colorByMedia (state) {
        switch(state) {
            case 1:
                return '#018DFF';
            case 2:
                return '#FF4444';
            case 3:
                return '#1ABF80';
        }
    }*/

    const handleValueChange = (e) => {
        let nextState = {};
        nextState[e.target.name] = e.target.value;
        setSearchKeyword(nextState);
    }

    const filteredComponents = (data) => {
        data = data.filter((u) => {
            return u.name.indexOf()
        })
    }

    const classes = useStyles();

    return (
        <div className={classes.background}>
        <Container maxWidth="lg" className={classes.header}>
            <Grid container spacing={1}>
                <Grid item xs={9}>
                    <span className={classes.title}>검색하기</span>
                    <Paper component="form" className={classes.search}>
                        <InputBase
                            className={classes.input}
                            placeholder="검색할 내용을 입력하세요"
                            inputProps={{ 'aria-label': 'search' }}
                            value={searchKeyword}
                            onChange={handleValueChange}
                        />
                        <IconButton type="submit" className={classes.iconButton} aria-label="search">
                            <SearchIcon />
                        </IconButton>
                    </Paper>
                </Grid>
                <Grid item xs={3}>
                    <div className={classes.gridAlign}>
                    <Fab variant="extended" size="medium" className={classes.mediaBtn} style={{backgroundColor: '#018DFF'}}
                    onClick = {() => {setContent(<Music />)}}>
                        음악
                    </Fab>
                    <Fab variant="extended" size="medium" className={classes.mediaBtn} style={{backgroundColor: '#FF4444'}}
                    onClick = {() => {setContent(<Movie />)}}>
                        영화
                    </Fab>
                    <Fab variant="extended" size="medium" className={classes.mediaBtn} style={{backgroundColor: '#1ABF80'}}
                    onClick = {() => {setContent(<Book />)}}>
                        도서
                    </Fab>
                    </div>
                </Grid>
            </Grid>
        </Container>
        <Divider className={classes._divider}/>
        <Container maxWidth="lg">
            {content}
        </Container>
        </div>

    )
}