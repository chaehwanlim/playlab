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

const useStyles = makeStyles(theme => ({
    background: {
        color: 'black',
        paddingTop: '20px',
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

    //for media buttons
    gridAlign: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-end',
    },
    mediaBtn: {
        textAlign:'right',
        fontSize: '1.2rem',
        fontWeight: '700',
        padding: '5px',
        margin: '5px',
        color: 'white',
    },
}));

export default function PlaylistAdd() {
    var [media, setMedia] = useState(0);

    const classes = useStyles();

    return (
        <div className={classes.background}>
        <Container maxWidth="lg" className={classes.header}>
            <Grid container spacing={1}>
                <Grid item xs={9}>
                    <header className={classes.title}>재생목록 만들기</header>
                    <Paper component="form" className={classes.search}>
                        <InputBase
                            className={classes.input}
                            placeholder="추가하고 싶은 미디어를 입력하세요"
                            inputProps={{ 'aria-label': 'search' }}
                        />
                        <IconButton type="submit" className={classes.iconButton} aria-label="search">
                            <SearchIcon />
                        </IconButton>
                    </Paper>
                </Grid>
                <Grid item xs={3} sm={3}>
                    <div className={classes.gridAlign}>
                    <Fab variant="extended" size="medium" className={classes.mediaBtn} style={{backgroundColor: '#018DFF'}}>
                        음악
                    </Fab>
                    <Fab variant="extended" size="medium" className={classes.mediaBtn} style={{backgroundColor: '#FF4444'}}>
                        영화
                    </Fab>
                    <Fab variant="extended" size="medium" className={classes.mediaBtn} style={{backgroundColor: '#1ABF80'}}>
                        도서
                    </Fab>
                    <Fab variant="extended" size="medium" className={classes.mediaBtn} style={{backgroundColor: '#DD22FF'}}>
                        연관
                    </Fab>
                    </div>
                </Grid>
            </Grid>
            
            <Divider className={classes._divider}/>
            

        </Container>
            
        </div>
    )
}