import React, {useState, useEffect} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import Paper from '@material-ui/core/Paper';
import Divider from '@material-ui/core/Divider';
import SearchIcon from '@material-ui/icons/SearchRounded';
import InputBase from '@material-ui/core/InputBase';
import IconButton from '@material-ui/core/IconButton';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import Axios from 'axios';
import LinesEllipsis from 'react-lines-ellipsis';

const useStyles = makeStyles(theme => ({
  card: {
    marginTop: '2rem',
    fontSize: '1.7rem',
    paddingLeft: '1.5rem',
    paddingRight: '1.5rem',
    paddingBottom: '3rem',
  },
  title: {
    fontSize: '2.2rem',
    fontWeight: '700',
    margin: '1.5rem',
    textAlign: 'center',
  },
  search: {
    margin: '3rem',
    position: 'center',
    display: 'flex',
    alignItems: 'center',
    width: 'auto',
    transition: '0.5s',
    '&:hover': {
        transform: 'scale(1.05)',
        transition: '0.7s',
    } 
  },
  input: {
    marginLeft: theme.spacing(1),
    padding: '0.5rem',
    flex: 1,
    fontSize: '2rem',
    fontWeight: '700',    
    /* '#FF4444', */
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
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
        transform: 'scale(1.06)',
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

  guide: {
    fontSize: '1.8rem', 
    textAlign: 'center', 
    fontWeight: '500', 
    marginBottom: '4rem'
  },
  /* guide2: {
    fontSize: '1.8rem', 
    textAlign: 'center', 
    fontWeight: '500', 
    marginTop: '4rem',
  }, */
}));

export default function MovieAdd() {
  var [search, setSearch] = useState("");
  var [isSearched, setIsSearched] = useState(false);
  var [searchResult, setSearchResult] = useState([]);
  var [form, setForm] = useState({
    title: "",
    director: "",
    category: 100,
    transmedia: 10000,
    imageURL: "",
    actor: "",
    userRating: "",
    year: "",
  });
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

  const classes = useStyles();

  const handleValueChange = (e) => {
    e.preventDefault();
    setSearch(e.target.value);
  }

  const handleSearch = (e) => {
    e.preventDefault();
    console.log(search);
    setIsSearched(true);
    searchMovie();
  }

  const searchMovie = () => {
    Axios.post('/api/movieSearchKeyword', {
      keyword : search
    }).then(response => console.log(response))
      .catch(error => console.log(error));
    
    getMovieSearchResult();
  }

  const getMovieSearchResult = () => {
    Axios.get('/api/movieSearch')
    .then(response => setSearchResult(response.data.items))
    .catch(err => console.log(err));
  }

  const handleMovieSelect = (index) => {
    if (searchResult) {
      setForm({
        ...form,
        title: searchResult[index].title,
        director: searchResult[index].director,
        imageURL: searchResult[index].imageURL,
        actor: searchResult[index].actor,
        userRating: searchResult[index].userRating,
        year: searchResult[index].year
      });
    }
    console.log(form);
  }

  const removeBTags = (str) => {
    str = str.replace(/<b>/g, "");
    return str.replace(/<\/b>/g, "");
  }

  return (
    <Card className={classes.card}>
      <div className={classes.title}>
        영화를 추가합니다.
      </div>
      <Divider />
      <form noValidate autoComplete="off" className={classes.form} onSubmit={handleSearch}>
        <Paper component="form" className={classes.search} variant="outlined">
          <InputBase
          className={classes.input}
          placeholder="영화 제목을 입력하세요."
          inputProps={{ 'aria-label': 'search' }}
          value={search}
          onChange={handleValueChange}
          />
          <IconButton type="submit" className={classes.iconButton} aria-label="search">
            <SearchIcon />
          </IconButton>
        </Paper>
      </form>

      {isSearched ? 
      <div className={classes.guide}>
        네이버 영화 검색 결과입니다.<br />
        영화를 선택하고 하단의 양식을 완성해주세요.</div> 
      : ""}

      <Grid container spacing={4}>
        {searchResult ?
          searchResult.map((movie, index) => {
            return (
            <Grid item sm={12}>
              <div className={classes.movie} key={index} onClick={() => handleMovieSelect(index)}>
                <Grid item xs={4} sm={2}>
                  <div className={classes.moviePosterAlign}>
                    <img className={classes.moviePoster} src={movie.image} title={removeBTags(movie.title)}/>
                  </div>
                </Grid>
                <Grid item xs={8} sm={4}>
                  <div className={classes.movieTitle}>
                    {removeBTags(movie.title)}
                    <span className={classes.movieYear}>{movie.year}</span>
                  </div>
                  <div className={classes.movieSubtitle}>
                    <b>감독</b> {movie.director}<br />
                    <b>출연</b> {movie.actor}<br />
                    <b>평점</b> {movie.userRating}
                  </div>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <div className={classes.form}>
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
                    이 영화는 (보는) 영화입니다.
                  </div>
                </Grid>
              </div>
            </Grid>
          )}) : <div>error occurred</div>}
        </Grid>
    </Card>
  )
}