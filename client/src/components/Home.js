import React from 'react';
import Container from '@material-ui/core/Container';
import { makeStyles } from '@material-ui/core/styles';
import './styles/style.css';


const useStyles = makeStyles(theme => ({
    //for MainTitle
    title: {
        color: 'white',
        textAlign: 'center', 
        position: 'relative',
        top: '30rem',
        fontSize: '8rem',
        fontFamily: 'Product Sans',
    }, 
    subTitle: {
        color: 'white',
        textAlign: 'center', 
        position: 'relative',
        top:'35rem',
        fontSize: '1.8rem',
        fontWeight: '500',
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

function footer() {
    return (
        <footer style={{backgroundColor: 'whitesmoke', color: 'grey', fontSize: '1.4rem', fontWeight: '500', textAlign: 'center', position: 'absolute', top: '100%'}}>
            <p>Copyright © 2020 PlayLab</p>
            <p>Contact webmaster for more information. <a href="mailto: chlim428@gmail.com" color="black">chlim428@gmail.com</a></p>
            <p><a href="https://github.com/chaehwanlim/playlab" color="black" target="_blank" rel="noopener noreferrer">GitHub</a></p>
        </footer>
    )
}

export default function Home() {
    const classes = useStyles();

    return (
        <div className="Background">
            <Container maxWidth="lg">
                <div className={classes.title}>
                    PlayLab
                </div>
                <div className={classes.subTitle}>
                    나만의 재생목록을 모두와 함께.
                </div>
            </Container>
            {footer()}
        </div>
    )
}