import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Divider from '@material-ui/core/Divider';
import Grid from '@material-ui/core/Grid';
import Fab from '@material-ui/core/Fab';
import Music from './Music';
import Movie from './Movie';
import Book from './Book';
import Footer from '../footer';

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

export default function Search() {
    var [content, setContent] = useState({
        title: "영화 검색하기",
        component: <Movie />,
        subtitle: "영화의 제목, 출연 배우, 등록한 유저 이름으로 검색하세요."
    });

    const handleMusic = (e) => {
        e.preventDefault();
        setContent({
            title: "음악 검색하기",
            component: <Music />,
            subtitle: "음악의 제목, 아티스트, 등록한 유저 이름으로 검색하세요."
        })
    }
    const handleMovie = (e) => {
        e.preventDefault();
        setContent({
            title: "영화 검색하기",
            component: <Movie />,
            subtitle: "영화의 제목, 출연 배우, 등록한 유저 이름으로 검색하세요."
        })
    }
    const handleBook = (e) => {
        e.preventDefault();
        setContent({
            title: "책 검색하기",
            component: <Book />,
            subtitle: "책의 제목, 작가, 등록한 유저 이름으로 검색하세요."
        })
    }

    const classes = useStyles();

    return (
        <div className={classes.background}>
        <Container maxWidth="lg">
            <Grid container spacing={1}>
                <Grid item xs={9}>
                    <div className={classes.title}>{content.title}</div>
                    <p className={classes.subtitle}>{content.subtitle}</p>
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
        <Footer />
        </div>
    )
}