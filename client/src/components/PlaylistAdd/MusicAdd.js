import React, {useState, useEffect} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import Divider from '@material-ui/core/Divider';
import TextField from '@material-ui/core/TextField';
import Fab from '@material-ui/core/Fab';
import { post } from 'axios';

const useStyles = makeStyles(theme => ({
    card: {
        marginTop: '2rem',
        fontSize: '1.7rem',
    },
    title: {
        fontSize: '2.2rem',
        fontWeight: '700',
        margin: '1.5rem',
        textAlign: 'center',
    },
    form: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        marginTop: '1.5rem',
        marginBottom: '3rem',
    },
    btn: {
        marginTop: '3rem',
        fontSize:'2rem',
        background: '#018DFF',
        color: 'white',
        transition: '0.7s',
        '&:hover': {
            background: '#018DFF',
            transform: 'scale(1.1)',
            transition: '0.7s',
        }
    },
}));

export default function MusicAdd() {
    var [form, setForm] = useState({
        title : "",
        artist: "",
        genre: "",
        category: "",
        transmedia: "",
    });

function colorByMedia (state) {
        switch(state) {
            case 1:
                return '#018DFF';
            case 2:
                return '#FF4444';
            case 3:
                return '#1ABF80';
        }
    }

    const InputProps = { style: {fontSize: '2rem'}};
    const InputLabelProps = { style: {fontSize: '1.7rem', color: 'primary'} }

    const classes = useStyles();

    return (
        <Card className={classes.card}>
            <div className={classes.title}>
                음악을 추가합니다.
            </div>
            <Divider/>
            <form noValidate autoComplete="off" className={classes.form}>
                <TextField id="standard-basic" label="제목" 
                inputProps={InputProps} InputLabelProps={InputLabelProps}/><br />
                <TextField id="standard-basic" label="아티스트" 
                inputProps={InputProps} InputLabelProps={InputLabelProps}/><br />
                <TextField id="standard-basic" label="장르" 
                inputProps={InputProps} InputLabelProps={InputLabelProps}/><br />
                <Fab variant="extended" className={classes.btn} type="submit">추가하기</Fab>
            </form>
        </Card>
    )
}