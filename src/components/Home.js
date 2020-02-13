import React from 'react';
import Container from '@material-ui/core/Container';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles'; 
import Button from '@material-ui/core/Button';
import Box from '@material-ui/core/Box';
import { createMuiTheme } from '@material-ui/core/styles';
import { ThemeProvider } from '@material-ui/styles';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/AddRounded';
import StarIcon from '@material-ui/icons/StarRounded';
import SearchIcon from '@material-ui/icons/SearchRounded';

const useStyles = makeStyles(theme => ({
    //for AppBar
    root: {
        flexGrow: 1,
    },
    appBarTitle: {
        marginLeft: theme.spacing(1),
        flexGrow: 1,
        fontWeight: 700,
        letterSpacing: '2px',
    },

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
            margin: theme.spacing(8), 
        },
    },
    btn: {
        background: 'white',
        color: 'black',
        /* size: 'large', */
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

const btnTheme = createMuiTheme({
    palette: {
        primary: {
            main: '#ffffff',
        },
    }
})

export default function Home() {
    const style = useStyles();

    return (
        <Container maxWidth="lg" >
            <div className= {style.root} >
                <AppBar position="static" style={{ background: 'transparent', boxShadow: 'none'}}>
                    <Toolbar justifyContent="center">
                    <Typography variant="h6" className= {style.appBarTitle} justifyContent="center">
                        PLAYLAB
                    </Typography>
                    <Button color="inherit">Login</Button>
                    </Toolbar>
                </AppBar>
            </div>
            <Box height={700}>
                <div className= {style.title}>
                    PlayLab
                </div>
                <div className= {style.subTitle}>
                    당신만의 재생목록을 모두와 공유해 보세요.
                </div>
                <div className={style.btn_root}>
                    <ThemeProvider theme={btnTheme}>
                    <Fab className={style.btn} variant="outlined">
                        <StarIcon />인기</Fab>
                    <Fab className={style.btn} variant="outlined">
                        <SearchIcon />검색</Fab>
                    <Fab className={style.btn} variant="outlined">
                        <AddIcon />추가</Fab>
                    </ThemeProvider>
                </div>
            </Box>
        </Container>
    )
}