import React, {useState, useEffect} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import Paper from '@material-ui/core/Paper';
import Divider from '@material-ui/core/Divider';
import SearchIcon from '@material-ui/icons/SearchRounded';
import InputBase from '@material-ui/core/InputBase';
import IconButton from '@material-ui/core/IconButton';
import TextField from '@material-ui/core/TextField';
import Axios from 'axios';

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
  search: {
    marginTop: '1.5rem',
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
    marginLeft: theme.spacing(1),
    padding: '0.5rem',
    flex: 1,
    fontSize: '2rem',
    fontWeight: '700',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    marginTop: '1.5rem',
    marginBottom: '3rem',
  }
}));

export default function MovieAdd() {
  var [search, setSearch] = useState("");
  var [searchResult, setSearchResult] = useState([]);

  const classes = useStyles();

  const handleValueChange = (e) => {
    e.preventDefault();
    setSearch(e.target.value);
  }

  const handleSearch = (e) => {
    e.preventDefault();
    console.log(search);
    searchMovie();
  }

  function searchMovie(){
    Axios({
      method: 'post',
      url: '/api/movieSearch',
      data: {
        keyword : search
      }
    })
    .then((res) => console.log(res))
    .catch((err) => console.log('error occurred before searching movie' + err));
    
    getMovieSearchResult();
  }

  const getMovieSearchResult = () => {
    fetch('/api/movieSearch')
    .then(res => res.json())
    .then(res => setSearchResult(res.items))
    .then(console.log(searchResult))
    .catch((err) => console.log('error occurred while getting search result' + err));
  }

  return (
    <Card className={classes.card}>
      <div className={classes.title}>
        영화를 추가합니다.
      </div>
      <Divider />
      <form noValidate autoComplete="off" className={classes.form} onSubmit={handleSearch}>
        <Paper component="form" className={classes.search}>
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

          <Divider />

          {searchResult ? searchResult.map(movie => {
            return (
              <div>
                {movie.title}
                감독 | {movie.director}
              </div>
            )
          }) : <div>error occurred</div>}
        </Paper>
      </form>
    </Card>
  )
}