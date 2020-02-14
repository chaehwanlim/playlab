import React, { useState, useEffect } from 'react';
import Container from '@material-ui/core/Container';
import AppBar from './AppBar';
import { makeStyles } from '@material-ui/core/styles'; 
import Button from '@material-ui/core/Button';
import Box from '@material-ui/core/Box';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/AddRounded';
import StarIcon from '@material-ui/icons/StarRounded';
import SearchIcon from '@material-ui/icons/SearchRounded';
import './Home.css';
import { Link, Route, BrowserRouter as Router} from "react-router-dom";

const useStyles = makeStyles(theme => ({

    //for MainTitle
    title: {
        textAlign: 'center', 
        position: 'relative',
        marginTop: '20%',
        fontSize: '100px',
        fontFamily: 'Product Sans',
    }, 
    subTitle: {
        textAlign: 'center', 
        position: 'relative',
        marginTop: '15px',
        fontSize: '25px',
        fontWeight: '700',
    },

    // for Buttons
    btn_root: {
        position: 'relative',
        marginTop: '10%',
        textAlign: 'center',
        '& > *': {
            margin: theme.spacing(4), 
        },
    },
    btn: {
        background: 'white',
        color: 'black',
        fontFamily: 'Noto Sans KR',
        fontSize: '20px',
        fontWeight: '900',  
        letterSpacing: '5px',
        transition: '0.5s',
        '&:hover': {
            background: 'white',
            transform: 'scale(1.1)',
            transition: '0.5s',
        } 
    },
}));

export default function Home() {
    const style = useStyles();
    var [searchClicked, setSearchClicked] = useState(false);

    useEffect(() => {
        if(searchClicked === true)
            document.title = searchClicked;
    });

    return (
        <div className="Background">
        <Container maxWidth="lg" >
            <AppBar />
            
            <Box height={700}>
                <div className= {style.title}>
                    PlayLab
                </div>
                <div className= {style.subTitle}>
                    나만의 재생목록을 모두와 공유해 보세요.
                </div>
                <div className={style.btn_root}>
                    {/* <Router>
                            <Fab className={style.btn} variant="outlined">
                            <StarIcon />인기</Fab>
                        <Link to="/search">
                            <Fab className={style.btn} variant="outlined" onClick={() => setSearchClicked(true)}>
                            <SearchIcon />검색</Fab>
                        </Link>
                            <Fab className={style.btn} variant="outlined">
                            <AddIcon />추가</Fab>
                    </Router> */}
                </div>
            </Box>
        </Container>
        </div>
    )
}