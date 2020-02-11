import React from 'react';
import { makeStyles } from '@material-ui/core/styles'; 
import Container from '@material-ui/core/Container';

const useStyles = makeStyles(theme => ({
    title: {
        textAlign: 'left', 
        position: 'absolute',
        marginTop: theme.spacing(40),
        marginLeft: theme.spacing(10),
        fontSize: '100px',
        fontFamily: 'Product Sans',
    }, 
    subTitle: {
        textAlign: 'left', 
        position: 'absolute',
        marginTop: theme.spacing(58),
        marginLeft: theme.spacing(10),
        fontSize: '25px',
        fontWeight: '300',
    }

}));

export default function MainTitle() {
    const classes = useStyles();

    return (
        <Container>
            <div className={classes.title}>
                PlayLab.
            </div>
            <div className={classes.subTitle}>
                Share your playlists based on your mood.
            </div>
        </Container>
    )
}
