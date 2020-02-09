import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';

const useStyles = makeStyles(theme => ({
    root: {
        textAlign: 'center',
        display: 'flex',
        flexWrap: 'wrap',
        
        '& > *': {
            margin: theme.spacing(3),
            marginTop: theme.spacing(90),
            width: theme.spacing(200),
            height: theme.spacing(100),
            
        },
    },
    
}));

export default function Paper1(props) {
    const classes = useStyles();

    return (
        <div className={classes.root}>
            <Paper elevation={24}>{props.content}</Paper>
        </div>
    )
}