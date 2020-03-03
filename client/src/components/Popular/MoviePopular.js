import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';

const useStyles = makeStyles({
  orderFilter: {
    marginTop: '2rem',
    marginBottom: '3rem',
    padding: '1.5rem',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    fontSize: '1.7rem',
    fontWeight: '400',
  },
  menuItem: {
    fontSize: '1.7rem',
    fontWeight: '500',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    fontWeight: '300',
  },
  form2: {
    display: 'relative',
    fontWeight: '300',
    color: '#FF4444',
  },

  //for movies
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
        transform: 'scale(1.04)',
        transition: '0.7s',
    },
    '&:visited': {
      transform:'scale(1.06)',
      color: 'red',
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

});

export default function MoviePopular() {
  var [movieDB, setMovieDB] = useState([]);
  var [category, setCategory] = useState([]);
  var [selectedCat, setSelectedCat] = useState("");

  useEffect(() => {
    fetch('/api/movieDB')
      .then(res => res.json())
      .then(res => setMovieDB(res))
      .catch(err => console.log(err))
    fetch('/api/categoryDB')
      .then(res => res.json())
      .then(res => setCategory(res))
      .catch(err => console.log(err))
  }, []);

  const filterData = (data) => {
    data = data.filter((datum) => {
      return (
        (datum.categoryName.indexOf(selectedCat) > -1)
      );
    });
    return data.map((datum, index) => {
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
                      <span style={{color: 'orange'}}>{index + 1}&nbsp;&nbsp;</span>
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
      )
    });
  }

  const handleCategory = (e) => {
    e.preventDefault();
    console.log(e.target.value);
    setSelectedCat(e.target.value);
  }

  const classes = useStyles();

  return (
    <div>
      <Card className={classes.orderFilter}>
        <div className={classes.form2}>
        <Select labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={selectedCat}
              onChange={handleCategory}
              name="category"
              style={{fontSize: '1.7rem', fontWeight: '500', color: '#FF4444'}}>
              {category ? category.map(cat => {
                return (
                  <MenuItem value={cat.categoryName} className={classes.menuItem}>
                    {cat.categoryName}</MenuItem>
                )
              }) : "error occured"}
        </Select>
      &nbsp; 영화의 인기 차트</div></Card>
      <Grid container spacing={4}>
        {movieDB ? filterData(movieDB) : <div>error ocurred</div>}
      </Grid>
    </div>
  )
}