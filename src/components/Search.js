import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';

const useStyles = makeStyles(theme => ({
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
    return (
        <Container maxWidth="sm">
            <div>adfasdfjlakssdafjd;flk;asjdfljsdal;fjdsal;fjdl;sajsa</div>
        </Container>
    )
}