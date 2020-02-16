import React from 'react';
import { fade, makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Box from '@material-ui/core/Box';
import Paper from '@material-ui/core/Paper';
import IconButton from '@material-ui/core/IconButton';
import InputBase from '@material-ui/core/InputBase';

import SearchIcon from '@material-ui/icons/SearchRounded';
import './Search.css';

const useStyles = makeStyles(theme => ({
    background: {
        color: 'black',
        paddingTop: '20px',
        paddingBottom: '20px',
        paddingLeft: theme.spacing(1),
        paddingRight: theme.spacing(1),
    },
    header: {
        align: 'center',
    },
    title: {
        paddingBottom: '20px',
        textAlign: 'center',
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
        fontFamily: 'Noto Sans KR',
        fontSize: '1.5rem',
        fontWeight: '500',
    },
    iconButton: {
        padding: 10,
    },
}));

export default function Search() {
    const classes = useStyles();

    return (
        <div className={classes.background}>
            <Container maxWidth="lg" className={classes.header}>
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
            </Container>
            
        </div>
    )
}