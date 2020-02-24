import React, { useState, useEffect } from 'react';
import Container from '@material-ui/core/Container';
import { makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import '../styles/Home.css';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/AddRounded';
import StarIcon from '@material-ui/icons/StarRounded';
import SearchIcon from '@material-ui/icons/SearchRounded';
import { Link } from "react-router-dom";

const useStyles = makeStyles(theme => ({
    //for MainTitle
    title: {
        color: 'white',
        textAlign: 'center', 
        position: 'inherit',
        paddingTop: '25rem',
        fontSize: '8rem',
        fontFamily: 'Product Sans',
    }, 
    subTitle: {
        color: 'white',
        textAlign: 'center', 
        position: 'relative',
        paddingTop: '3rem',
        fontSize: '1.8rem',
        fontWeight: '500',
    },

    //for Description
    description: {
        background: 'whitesmoke',
        color: 'black',
        padding: '5rem',
    },

    // for Buttons
    btn_root: {
        position: 'relative',
        marginTop: '15%',
        textAlign: 'center',
        '& > *': {
            margin: theme.spacing(4), 
        },
    },
    btn: {
        background: 'white',
        color: 'black',
        fontSize: '2rem',
        fontWeight: '900',  
        letterSpacing: '5px',
        transition: '0.5s',
        '&:hover': {
            background: 'white',
            transform: 'scale(1.1)',
            transition: '0.5s',
        } 
    },
    _icon: {
        marginRight: '6px',
    }

}));

export default function Home() {
    const classes = useStyles();
    var [searchClicked, setSearchClicked] = useState(false);

    useEffect(() => {
        if(searchClicked === true)
            document.title = searchClicked;
    });

    return (
        <div className="Background">
            <Container maxWidth="lg" >
                <Box height={900}>
                    <div className= {classes.title}>
                        PlayLab
                    </div>
                    <div className= {classes.subTitle}>
                        나만의 재생목록을 모두와 공유해 보세요.
                    </div>
                    {/* <div className={classes.btn_root}>
                        <Link to="/Search" style={{textDecoration:'none'}}>
                            <Fab className={classes.btn} variant="outlined" onClick={() => setSearchClicked(true)}>
                            <SearchIcon className={classes._icon}/>검색</Fab>
                        </Link>
                        <Link to="/Popular" style={{textDecoration:'none'}}>
                            <Fab className={classes.btn} variant="outlined" onClick={() => setSearchClicked(true)}>
                            <StarIcon className={classes._icon}/>인기</Fab>
                        </Link>
                        <Link to="/PlaylistAdd" style={{textDecoration:'none'}}>
                            <Fab className={classes.btn} variant="outlined" onClick={() => setSearchClicked(true)}>
                            <AddIcon className={classes._icon}/>추가</Fab>
                        </Link>
                    </div> */}
                </Box>
            </Container>
        </div>
    )
}