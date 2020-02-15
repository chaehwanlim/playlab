import React, { useState, useEffect } from 'react';
import Container from '@material-ui/core/Container';
import { makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import './Home.css';
import Fab from '@material-ui/core/Fab';
import { Link } from "react-router-dom";

const useStyles = makeStyles(theme => ({
    //for MainTitle
    title: {
        color: 'white',
        textAlign: 'center', 
        position: 'inherit',
        paddingTop: '25%',
        fontSize: '100px',
        fontFamily: 'Product Sans',
    }, 
    subTitle: {
        color: 'white',
        textAlign: 'center', 
        position: 'relative',
        paddingTop: '15px',
        fontSize: '25px',
        fontWeight: '700',
    },

    //for Description
    description: {
        background: 'whitesmoke',
        color: 'black',
        padding: '50px',
        
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
    const _style = useStyles();
    var [searchClicked, setSearchClicked] = useState(false);

    useEffect(() => {
        if(searchClicked === true)
            document.title = searchClicked;
    });

    return (
        <div>
            <div className="Background">
            <Container maxWidth="lg" >
                <Box height={900}>
                    <div className= {_style.title}>
                        PlayLab
                    </div>
                    <div className= {_style.subTitle}>
                        나만의 재생목록을 모두와 공유해 보세요.
                    </div>
                    {/* <div className={_style.btn_root}>
                        <Link to="/Popular" style={{textDecoration:'none'}}>
                            <Fab className={_style.btn} variant="outlined" onClick={() => setSearchClicked(true)}>
                            인기</Fab>
                        </Link>
                        <Link to="/Search" style={{textDecoration:'none'}}>
                            <Fab className={_style.btn} variant="outlined" onClick={() => setSearchClicked(true)}>
                            검색</Fab>
                        </Link>
                        <Link to="/PlaylistAdd" style={{textDecoration:'none'}}>
                            <Fab className={_style.btn} variant="outlined" onClick={() => setSearchClicked(true)}>
                            추가</Fab>
                        </Link>
                    </div> */}
                </Box>
            </Container>
            </div>
            <div className={_style.description}>
            <Container maxWidth="lg">
                <div></div>
                <header>headMaterial</header>
                <p>body</p>
            </Container>
            </div>
        </div>

    )
}