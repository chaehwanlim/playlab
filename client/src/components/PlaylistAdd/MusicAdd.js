import React, {useState, useEffect} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import Divider from '@material-ui/core/Divider';
import TextField from '@material-ui/core/TextField';
import Fab from '@material-ui/core/Fab';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Axios, { post } from 'axios';

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
    select: {
        fontSize: '1.7rem',
        textAlign: 'left',
        color: 'black',
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
    menuItem: {
        fontSize: '1.7rem',
        textAlign: 'center',
    }
}));

export default function MusicAdd() {
    var [category, setCategory] = useState([]);
    var [transmedia, setTransmedia] = useState([]);

    useEffect(() => {
        fetch('/api/categoryDB')
            .then(res => res.json())
            .then(res => setCategory(res))
            .catch(err => console.log(err))
        fetch('/api/transmediaDB')
            .then(res => res.json())
            .then(res => setTransmedia(res))
            .catch(err => console.log(err))
    }, []);

    var [form, setForm] = useState({
        title : "",
        artist: "",
        genre: "",
        category: 100,
        transmedia: 10000,
    });

    const handleInput = (e) => {
        e.preventDefault();
        let nextState = form;
        nextState[e.target.name] = e.target.value;
        setForm(nextState);
    }
    const handleCategory = (e) => {
        e.preventDefault();
        setForm({
            ...form,
            category : e.target.value
        });
    }
    const handleTransmedia = (e) => {
        e.preventDefault();
        setForm({
            ...form,
            transmedia : e.target.value
        });
    }
    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(form);
        addMusic()
    }  

    const addMusic = () => {
        Axios({
            method: 'post',
            url:'/api/musicAdd',
            data: {
                title : form.title,
                artist: form.artist,
                genre : form.genre,
                categoryID : form.category,
                trnasmediaID : form.transmediaID
            }
        })
        .then((res) => console.log(res))
        .catch((err) => console.log(err));

        initializeForm();
    }
    const initializeForm = () => {
        setForm({
            title : "",
            artist: "",
            genre: "",
            category: 100,
            transmedia: 10000,
        });
        console.log('cleared');
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
            <form noValidate autoComplete="off" className={classes.form} onSubmit={handleSubmit}>
                <TextField id="standard-basic" label="제목" name="title"
                    inputProps={InputProps} InputLabelProps={InputLabelProps}
                    required="true" onChange={handleInput} /><br />
                <TextField id="standard-basic" label="아티스트" name="artist"
                    inputProps={InputProps} InputLabelProps={InputLabelProps}
                    required="true" onChange={handleInput} /><br />
                <TextField id="standard-basic" label="장르" name="genre"
                    inputProps={InputProps} InputLabelProps={InputLabelProps}
                    onChange={handleInput} /><br />

                <InputLabel id="demo-simple-select-label">느낌</InputLabel>
                <Select labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={form.category}
                    onChange={handleCategory}
                    classes={classes.select}
                    inputProps={InputProps}
                    name="category"
                    style={{fontSize: '1.7rem'}}>
                    {category ? category.map(cat => {
                        return (
                            <MenuItem value={cat.categoryID} className={classes.menuItem}>
                                {cat.categoryName}</MenuItem>
                        )
                    }) : "error occured"}
                </Select>

                <InputLabel id="demo-simple-select-label">트랜스미디어</InputLabel>
                <Select labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={form.transmedia}
                    onChange={handleTransmedia}
                    classes={classes.select}
                    inputProps={InputProps}
                    name="transmedia">
                    {transmedia ? transmedia.map(trans => {
                        return (
                            <MenuItem value={trans.transmediaID} className={classes.menuItem}>
                                {trans.transmediaName}</MenuItem>
                        )
                    }) : "error occured"}
                </Select>

                <Fab variant="extended" className={classes.btn} type="submit">추가하기</Fab>
            </form>
        </Card>
    )
}