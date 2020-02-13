import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';

const useStyles = makeStyles(theme => ({
    root: {
        display: 'flex',
        flexWrap: 'wrap', 
        '& > *': {
            margin: theme.spacing(3),
            marginTop: theme.spacing(90),
            width: '100%',
            height: theme.spacing(100),
            textAlign: 'center',
        },
    },
}));

export default function Paper1() {
    const classes = useStyles();

    return (
        <div className={classes.root}>
            <Paper elevation={24}></Paper>
        </div>
    )
}