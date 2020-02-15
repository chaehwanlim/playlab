import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import './Search.css';

const useStyles = makeStyles(theme => ({
    background: {
        backgroundColor: 'white',
        color: 'black',
    },
    root: {
        flexGrow: 1,
    },
    appBarTitle: {
        marginLeft: theme.spacing(1),
        flexGrow: 1,
        fontWeight: 700,
        letterSpacing: '2px',
    },

}));



export default function Search() {
    const _style = useStyles();

    return (
        <div className={_style.background}>
        <Container maxWidth="lg">
            <div>adfasdfjlakssdafjd;flk;asjdfljsdal;fjdsal;fjdl;sajsa</div>
        </Container>
        </div>
    )
}