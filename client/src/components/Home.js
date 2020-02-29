import React, { useState, useEffect } from 'react';
import Container from '@material-ui/core/Container';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import AddIcon from '@material-ui/icons/AddRounded';
import StarIcon from '@material-ui/icons/StarRounded';
import SearchIcon from '@material-ui/icons/SearchRounded';
import Grid from '@material-ui/core/Grid';
import '../styles/Home.css';


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
    },

    paper: {
        position: 'relative',
        fontSize: '1.8rem',
        paddingTop: '10rem',
        paddingLeft: '10rem',
        paddingRight: '10rem',
        paddingBottom: '6rem',
    },
    description: {
        textAlign: 'center',
        fontSize: '1.8rem',
        marginBottom: '4rem',
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
        <div>
            <div className="Background">
                <Container maxWidth="lg">
                    <div className= {classes.title}>
                        PlayLab
                    </div>
                    <div className= {classes.subTitle}>
                        나만의 재생목록을 모두와 함께.
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
                </Container>
            </div>
            <Paper className={classes.paper} elevation={0}>
                <Container maxWidth="lg">
                    <Grid container spacing={1}>
                        <div className={classes.description}>
                            다른 사람들이 우울할 때 어떤 음악을 듣는지,
                            행복할 때 어떤 영화를 보는지 궁금하신가요?
                        </div>
                        <div className={classes.description}>
                            <span style={{fontFamily: 'Product Sans'}}>PlayLab</span>
                            은 기분에 따라 향유하는 나만의 재생목록을 다른 사람들과 공유할 수 있는 플랫폼입니다.
                        </div>
                    </Grid>
                </Container>
            </Paper>
        </div>
        
    )
}