import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import IconButton from '@material-ui/core/IconButton';
import InputBase from '@material-ui/core/InputBase';
import SearchIcon from '@material-ui/icons/SearchRounded';
import Grid from '@material-ui/core/Grid';

const useStyles = makeStyles({
    search: {
        marginTop: '1.5rem',
        marginBottom: '3rem',
        paddingLeft: '1rem',
        position: 'center',
        display: 'flex',
        alignItems: 'center',
        width: 'auto',
        transition: '0.5s',
        '&:hover': {
            transform: 'scale(1.01)',
            transition: '0.7s',
        } 
    },
    input: {
        padding: '0.5rem',
        flex: 1,
        fontSize: '1.8rem',
        fontWeight: '700',
    },
    iconButton: {
        padding: 10,
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
        fontWeight: '400',
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
    var [searchKeyword, setSearchKeyword] = useState("");

    useEffect(() => {
        fetch('/api/movieDB')
            .then(res => res.json())
            .then(res => setMovieDB(res))
            .catch(err => console.log(err))
    }, []);

    const handleValueChange = (e) => {
        setSearchKeyword(e.target.value);
    }

    const handleClick = event => {
        event.preventDefault();
    }

    const filterData = (data) => {
        data = data.filter((datum) => {
            return (
                (datum.title.indexOf(searchKeyword) > -1) ||
                (datum.actor.indexOf(searchKeyword) > -1) ||
                (datum.userName.indexOf(searchKeyword) > -1)
            );
        });
        return data.map(datum => {
            return (
                <Grid item xs={12} md={6}>
                    <div className={classes.movie}>
                        <Grid item xs={4}>
                        <div className={classes.moviePosterAlign}>
                            <img className={classes.moviePoster} src={datum.imageURL} title={datum.title} alt="영화 포스터 이미지를 불러오는 데 오류가 발생했습니다."/>
                        </div>
                        </Grid>
                        <Grid item xs={8}>
                            <div className={classes.movieTitle}>
                                {datum.title}
                                <span className={classes.movieYear}>{datum.year}</span>
                            </div>
                            <div className={classes.movieSubtitle}>
                                <b>감독</b>  {datum.director}<br />
                                <b>출연</b>  {datum.actor}<br />
                                <b>평점</b>  {datum.userRating}<br />
                                <b>트랜스미디어</b>  {datum.transmediaName}
                            </div>
                            <div className={classes.movieInfo}>
                                <b>{datum.userName}</b> 님의<br />
                                <b>{datum.categoryName}</b> 영화입니다.<br />
                            </div>
                        </Grid>
                    </div>
                </Grid>
            );
        });
    }

    const classes = useStyles();

    return (
        <div>
            <Paper component="form" className={classes.search} onSubmit={handleClick}>
                <InputBase
                    className={classes.input}
                    placeholder="검색할 내용을 입력하세요"
                    inputProps={{ 'aria-label': 'searchKeyword' }}
                    value={searchKeyword}
                    onChange={handleValueChange}
                />
                <IconButton type="submit" className={classes.iconButton} aria-label="searchKeyword">
                    <SearchIcon />
                </IconButton>
            </Paper>
            <Grid container spacing={4}>
            {movieDB ? filterData(movieDB) : <span>error occured</span>}
            </Grid>
        </div>
    )
}

