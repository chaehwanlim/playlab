import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Divider from '@material-ui/core/Divider';
import Grid from '@material-ui/core/Grid';
import Fab from '@material-ui/core/Fab';
import MusicPopular from './MusicPopular';
import MoviePopular from './MoviePopular';
import BookPopular from './BookPopular'; 

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
        },
        width: '6.5rem',
        height: '4rem',
    },
}));

export default function Popular() {
    var [content, setContent] = useState({
        title: "영화 인기 차트",
        component: <MoviePopular />
    });

    const classes = useStyles();

    const handleMusic = (e) => {
        e.preventDefault();
        setContent({
            title: "음악 인기 차트",
            component: <MusicPopular />
        })
    }
    const handleMovie = (e) => {
        e.preventDefault();
        setContent({
            title: "영화 인기 차트",
            component: <MoviePopular />
        })
    }
    const handleBook = (e) => {
        e.preventDefault();
        setContent({
            title: "책 인기 차트",
            component: <BookPopular />
        })
    }

    return (
        <div className={classes.background}>
        <Container maxWidth="lg">
            <Grid container spacing={1}>
                <Grid item xs={9}>
                    <header className={classes.title}>{content.title}</header>
                    <p className={classes.subtitle}>인기 차트를 통해 취향에 맞는 작품을 찾아보세요.</p>
                </Grid>
                <Grid item xs={3}>
                    <div className={classes.gridAlign}>
                    <Fab variant="extended" className={classes.mediaBtn} style={{backgroundColor: '#018DFF'}}
                    onClick = {handleMusic}>
                        음악
                    </Fab>
                    <Fab variant="extended" className={classes.mediaBtn} style={{backgroundColor: '#FF4444'}}
                    onClick = {handleMovie}>
                        영화
                    </Fab>
                    <Fab variant="extended" className={classes.mediaBtn} style={{backgroundColor: '#1ABF80'}}
                    onClick = {handleBook}>
                        책
                    </Fab>
                    </div>
                </Grid>
            </Grid>
        </Container>
        <Divider className={classes._divider}/>
        <Container maxWidth="lg">
            {content.component}
        </Container>
        </div>
    )
}