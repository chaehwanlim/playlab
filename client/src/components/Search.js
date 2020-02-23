import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Box from '@material-ui/core/Box';
import Paper from '@material-ui/core/Paper';
import IconButton from '@material-ui/core/IconButton';
import InputBase from '@material-ui/core/InputBase';
import SearchIcon from '@material-ui/icons/SearchRounded';
import Divider from '@material-ui/core/Divider';
import MusicTable from './MusicTable';
import Grid from '@material-ui/core/Grid';
import Fab from '@material-ui/core/Fab';
import Movie from './Movie';
import { TransitionGroup } from 'react-transition-group';
import './PageTransition.css';

const useStyles = makeStyles(theme => ({
    background: {
        transitionDuration : '0.8s',
        paddingTop: '70px',
        paddingBottom: '30px',
        paddingLeft: theme.spacing(1),
        paddingRight: theme.spacing(1),
    },
    header: {
        align: 'center',
    },
    title: {
        paddingBottom: '20px',
        textAlign: 'left',
        fontSize: '3em',
        fontWeight: '900',
        letterSpacing: '1px',
    },

    //for search bar
    search: {
        position: 'center',
        padding: '2px 4px',
        display: 'flex',
        alignItems: 'center',
        width: 400,
    },
    input: {
        marginLeft: theme.spacing(1),
        flex: 1,
        fontSize: '1.3rem',
        fontWeight: '700',
    },
    iconButton: {
        padding: 10,
    },

    _divider:{
        marginTop: '30px',
    },

    //for music tables
    card: {
        root: {
            minHeight: 300,
        },

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
        fontSize: '1.2rem',
        fontWeight: '700',
        padding: '5px',
        margin: '5px',
        color: 'white',
    },
}));

export default function Search() {
    //1: 음악, 2: 영화, 3: 책
    var [media, setMedia] = useState(1);

    function colorByMedia (state) {
        switch(state) {
            case 1:
                return '#018DFF';
            case 2:
                return '#FF4444';
            case 3:
                return '#1ABF80';
        }
    }

    var content;
    switch(media) {
        case 1:
            content = <MusicTable />;
            break;
        case 2:
            content = <Movie />;
            break;
        case 3:
            content = <div />;
            break;
    }


    const classes = useStyles();

    console.log(media + 'and rerendered');
    console.log(window.location.pathname);

    return (
        <TransitionGroup timeout={500}>
        <div className={classes.background} /* style={(media === 2) ? {backgroundColor: 'black', color: 'white'} : {backgroundColor : 'whitesmoke', color: 'black'}} */>
        <Container maxWidth="lg" className={classes.header}>
            <Grid container spacing={1}>
                <Grid item xs={9}>
                    <header className={classes.title}>검색하기</header>
                    <Paper component="form" className={classes.search}>
                        <InputBase
                            className={classes.input}
                            placeholder="검색할 내용을 입력하세요"
                            inputProps={{ 'aria-label': 'search' }}
                        />
                        <IconButton type="submit" className={classes.iconButton} aria-label="search">
                            <SearchIcon />
                        </IconButton>
                    </Paper>
                </Grid>
                <Grid item xs={3} sm={3}>
                    <div className={classes.gridAlign}>
                    <Fab variant="extended" size="medium" className={classes.mediaBtn} style={{backgroundColor: '#018DFF'}}
                    onClick = {() => {setMedia(1)}}>
                        음악
                    </Fab>
                    <Fab variant="extended" size="medium" className={classes.mediaBtn} style={{backgroundColor: '#FF4444'}}
                    onClick = {() => {setMedia(2); }}>
                        영화
                    </Fab>
                    <Fab variant="extended" size="medium" className={classes.mediaBtn} style={{backgroundColor: '#1ABF80'}}
                    onClick = {() => {setMedia(3)}}>
                        도서
                    </Fab>
                    </div>
                </Grid>
            </Grid>
            <Divider className={classes._divider}/>
            {content}
        </Container>
        </div>
        </TransitionGroup>
    )
}