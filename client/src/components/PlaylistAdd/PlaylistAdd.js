import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Divider from '@material-ui/core/Divider';
import Grid from '@material-ui/core/Grid';
import Fab from '@material-ui/core/Fab';

import MusicAdd from './MusicAdd';
import MovieAdd from './MovieAdd';
import BookAdd from './BookAdd';
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

export default function PlaylistAdd() {
    var [content, setContent] = useState({
        title: "내가 감상한 영화 추가하기",
        component: <MovieAdd />,
        subtitle: "영화의 제목, 출연 배우, 등록한 유저 이름으로 검색하세요."
    });

    const handleMusic = (e) => {
        e.preventDefault();
        setContent({
            title: "내가 들은 음악 추가하기",
            component: <MusicAdd />,
            subtitle: "직접 음악 정보를 입력하여 추가하세요."
        })
    }
    const handleMovie = (e) => {
        e.preventDefault();
        setContent({
            title: "내가 감상한 영화 추가하기",
            component: <MovieAdd />,
            subtitle: "네이버 영화에서 검색하여 추가하세요."
        })
    }
    const handleBook = (e) => {
        e.preventDefault();
        setContent({
            title: "내가 읽은 책 추가하기",
            component: <BookAdd />,
            subtitle: "네이버 책에서 검색하여 추가하세요."
        })
    }

    const classes = useStyles();

    return (
        <div className={classes.background}>
        <Container maxWidth="lg">
            <Grid container spacing={1}>
                <Grid item xs={9}>
                    <header className={classes.title}>{content.title}</header>
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