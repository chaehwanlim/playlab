import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Paper from '@material-ui/core/Paper';
import IconButton from '@material-ui/core/IconButton';
import InputBase from '@material-ui/core/InputBase';
import SearchIcon from '@material-ui/icons/SearchRounded';
import Divider from '@material-ui/core/Divider';
import Grid from '@material-ui/core/Grid';
import Fab from '@material-ui/core/Fab';

import { post } from 'axios';
import MusicAdd from './MusicAdd';
import MovieAdd from './MovieAdd';

const useStyles = makeStyles(theme => ({
    background: {
        transitionDuration : '0.8s',
        paddingTop: '7rem',
        paddingBottom: '3rem',
    },
    header: {
        textAlign: 'left',
    },
    title: {
/*         paddingBottom: '2rem', */
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
        
        marginTop: '2rem',
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

export default function PlaylistAdd() {
    var [media, setMedia] = useState("영화");
    var [titles, setTitles] = useState({
        title: "내가 감상한 영화 추가하기",
        subtitle: "네이버 영화에서 검색하여 추가하세요."
    });
    var [mediaAdd, setMediaAdd] = useState(<div />);

    const handleMusic = (e) => {
        e.preventDefault();
        setTitles({title: "내가 들은 음악 추가하기", subtitle: "직접 음악 정보를 입력하세요."});
        setMediaAdd(<MusicAdd />);
    }
    const handleMovie = (e) => {
        e.preventDefault();
        setTitles({title: "내가 감상한 영화 추가하기", subtitle: "네이버 영화에서 검색하여 추가하세요."});
        setMediaAdd(<MovieAdd />)
    }
    const handleBook = (e) => {
        e.preventDefault();
        setTitles({title: "내가 읽은 책 추가하기", subtitle: "네이버 책에서 검색하여 추가하세요."})
        setMediaAdd(<div />)
    }

    const classes = useStyles();

    return (
        <div className={classes.background}>
        <Container maxWidth="lg" className={classes.header}>
            <Grid container spacing={1}>
                <Grid item xs={9}>
                    <header className={classes.title}>{titles.title}</header>
                    <p className={classes.subtitle}>{titles.subtitle}</p>
                </Grid>
                <Grid item xs={3}>
                    <div className={classes.gridAlign}>
                    <Fab variant="extended" size="medium" className={classes.mediaBtn} style={{backgroundColor: '#018DFF'}}
                    onClick = {handleMusic}>
                        음악
                    </Fab>
                    <Fab variant="extended" size="medium" className={classes.mediaBtn} style={{backgroundColor: '#FF4444'}}
                    onClick = {handleMovie}>
                        영화
                    </Fab>
                    <Fab variant="extended" size="medium" className={classes.mediaBtn} style={{backgroundColor: '#1ABF80'}}
                    onClick = {handleBook}>
                        도서
                    </Fab>
                    </div>
                </Grid>
            </Grid>
        </Container>
        <Divider className={classes._divider}/>
        <Container maxWidth="lg">
            {mediaAdd}
        </Container>
            
        </div>
    )
}