import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';

const useStyles = makeStyles({
    title: {
        transitionDuration: '0.8s',
        fontSize: '2.5rem',
        fontWeight: '900',
        marginTop: '2rem',
        marginBottom: '4rem',
        color: '#FF4444',
    },
    movie: {
        background: 'white',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        flexWrap: 'wrap',
        boxShadow: '0 8px 38px rgba(133, 133, 133, 0.3), 0 5px 12px rgba(133, 133, 133,0.22)',
        fontSize: '1.7rem',
        paddingRight: '1rem',
        paddingBottom: '1.5rem',
        transition: '0.8s',
        '&:hover': {
            transform: 'scale(1.06)',
            transition: '0.7s',
        }
    },
    
    moviePoster: {
        width: '80%',
        height: 'auto',
        maxWidth: '15rem',
        boxShadow: '0 8px 38px rgba(133, 133, 133, 0.3), 0 5px 12px rgba(133, 133, 133,0.22)',
        marginTop: '-1.5rem',       
    },
    moviePosterAlign: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    movieTitle: {
        fontSize: '2.2rem',
        fontWeight: '700',
        marginTop: '1rem',
    },
    movieSubtitle: {
        fontSize: '1.6rem',
        fontWeight: '500',
        color: 'slategray',
        marginTop: '0.7rem',
    },
    movieInfo: {
        fontSize: '1.7rem',
        fontWeight: '400',
        marginTop: '0.7rem',
        marginBottom: '0.7rem',
    },
    movieYear: {
        marginLeft: '0.5rem',
        fontSize: '1.7rem',
        fontWeight: '500',
        color: 'grey',
    },
    movieRating: {
        marginLeft: '8px',
        fontSize: '1.7rem',
        fontWeight: '500',
        color: 'orange',
    }

})

export default function Movie() {
    var [movieDB, setMovieDB] = useState([]);

    useEffect(() => {
        fetch('/api/movieDB')
            .then(res => res.json())
            .then(res => setMovieDB(res))
            .catch(err => console.log(err))
    }, []);

    const classes = useStyles();

    return (
        <div>
            <div className={classes.title}>영화</div>
            <Grid container spacing={4}>
            {movieDB ? movieDB.map(movie => {
                return (
                    <Grid item xs={12} md={6}>
                        <div className={classes.movie}>
                            <Grid item xs={4}>
                            <div className={classes.moviePosterAlign}>
                                <img className={classes.moviePoster} src={movie.imageURL} title={movie.title} alt="영화 포스터 이미지를 불러오는 데 오류가 발생했습니다."/>
                            </div>
                            </Grid>
                            <Grid item xs={8}>
                                <div className={classes.movieTitle}>
                                    {movie.title}
                                    <span className={classes.movieYear}>{movie.year}</span>
                                </div>
                                <div className={classes.movieSubtitle}>
                                    감독 | {movie.director}<br />
                                    출연 | {movie.actor}<br />
                                    트랜스미디어 | {movie.transmediaName}<br />
                                    평점 | {movie.userRating}
                                </div>
                                <div className={classes.movieInfo}>
                                    <b>{movie.userName}</b> 님이 이 영화를<br />
                                    <b>{movie.categoryName}</b> 영화로 선택했습니다.<br />
                                </div>
                            </Grid>
                        </div>
                    </Grid>
            )}) : <span>error occured</span>}
            </Grid>
        </div>
    )
}

