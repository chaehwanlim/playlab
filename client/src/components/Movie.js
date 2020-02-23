import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Paper from '@material-ui/core/Paper';
import Card from '@material-ui/core/Card'; 
import LinesEllipsis from 'react-lines-ellipsis';
import Grid from '@material-ui/core/Grid';


const useStyles = makeStyles({
    searchTitle: {
        transitionDuration: '0.8s',
        marginTop: '20px',
        fontSize: '2.5em',
        fontWeight: '900',
        color: '#FF4444',
    },
    movie: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        flexWrap: 'wrap',
        marginTop: '25px',
        marginBottom: '25px',
        padding: '25px',
        textOverflow: 'ellipsis',
        boxShadow: '0 8px 38px rgba(133, 133, 133, 0.3), 0 5px 12px rgba(133, 133, 133,0.22)',

        fontSize: '1.2rem',
    },
    moviePoster: {
        width: 'auto',
        height: 'auto',
        maxWidth: '200px',
        minWidth: '100px',
        maxHeight: '200px',
        minHeight: '100px',
    },
    movieDesc: {

    },
})

function moviePoster(props) {
    return (
        <img src={props.poster} alt={props.alt} title={props.alt} className="moviePoster" />
    )
}

export default function Movie() {
    var [movieDB, setMovieDB] = useState([]);

    useEffect(() => {
        fetch('/api/movie')
            .then(res => res.json())
            .then(res => setMovieDB(res))
            .catch(err => console.log(err))
    }, []);

    const classes = useStyles();

    return (
        <div>
            <div className={classes.searchTitle}>영화</div>
            <Grid container spacing={3}>
            {movieDB ? movieDB.map(movie => {
                return (
                    <Grid item xs={12} md={6}>
                    <div className={classes.movie}>
                        <img className={classes.moviePoster} src={movie.imageURL} />
                        {movie.title}
                    </div>
                    </Grid>
            )}) : <span>error occured</span>}
            </Grid>
        </div>
    )
}

