import React from 'react';
import { makeStyles } from '@material-ui/core/styles'; 
import Container from '@material-ui/core/Container';
import Paper from '@material-ui/core/Paper';
import Box from '@material-ui/core/Box';

const useStyles = makeStyles(theme => ({
    

}));

export default function MainTitle() {
    const classes = useStyles();

    return (
        <Box height={700}>
            <div className={classes.title}>
                PlayLab
            </div>
            <div className={classes.subTitle}>
                당신만의 재생목록을 모두와 공유해 보세요.
            </div>
        </Box>
    )
}
