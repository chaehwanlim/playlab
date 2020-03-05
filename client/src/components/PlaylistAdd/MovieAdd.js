import React, {useState, useEffect} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import Paper from '@material-ui/core/Paper';
import Divider from '@material-ui/core/Divider';
import SearchIcon from '@material-ui/icons/SearchRounded';
import InputBase from '@material-ui/core/InputBase';
import IconButton from '@material-ui/core/IconButton';
import Grid from '@material-ui/core/Grid';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import Fab from '@material-ui/core/Fab';
import Axios from 'axios';

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
    fontWeight: '300',
  },
  form2: {
    display: 'relative',
    fontWeight: '300',
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
  menuItem: {
    fontSize: '1.7rem',
    fontWeight: '500',
  },

  guide: {
    fontSize: '1.8rem', 
    textAlign: 'center', 
    fontWeight: '500', 
    marginBottom: '4rem'
  },
  btn: {
    marginTop: '3rem',
    fontSize: '2rem',
    background: '#FF4444',
    color: 'white',
    transition: '0.7s',
    '&:hover': {
        background: '#FF4444',
        transform: 'scale(1.06)',
        transition: '0.7s',
    }
  },
}));

export default function MovieAdd() {
  var [search, setSearch] = useState("");
  var [isSearched, setIsSearched] = useState(false);
  var [searchResult, setSearchResult] = useState([]);
  var [selectedMovie, setSelectedMovie] = useState({
    index: -1,
    title: ''
  });
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
    })
    .then(response => console.log(response))
    .catch(error => console.log(error));
    
    getMovieSearchResult();
  }

  const getMovieSearchResult = () => {
    Axios.get('/api/movieSearch')
    .then(response => setSearchResult(response.data.items))
    .catch(err => console.log(err));
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

  const handleMovieSelect = (index, title) => {
    setSelectedMovie({index: index, title: title});
    console.log(index);
    if (searchResult) {
      setForm({
        ...form,
        title: removeBTags(searchResult[index].title),
        director: searchResult[index].director,
        imageURL: searchResult[index].image,
        actor: searchResult[index].actor,
        userRating: searchResult[index].userRating,
        year: searchResult[index].pubDate
      });
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(form);
    if(sessionStorage.userName) {
      addMovie();
    } else if (sessionStorage.userName === undefined) {
      alert('로그인이 필요합니다!');
      window.location.assign('/MyPage');
    }
  }

  const addMovie = () => {
    Axios({
      method: 'post',
      url: 'api/movieAdd',
      data: {
        title: form.title,
        director: form.director,
        adderID : sessionStorage.getItem('userID'),
        categoryID: form.category,
        transmediaID: form.transmedia,
        imageURL: form.imageURL,
        actor: form.actor,
        userRating: form.userRating,
        year: form.year
      }
    })
    .then((res) => console.log(res))
    .then((res) => alert("영화를 정상적으로 추가했습니다!"))
    .catch((err) => console.log(err));
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
            <Grid item xs={12} md={6}>
              <div className={classes.movie} key={index} onClick={() => handleMovieSelect(index, removeBTags(movie.title))}>
                <Grid item xs={4}>
                  <div className={classes.moviePosterAlign}>
                    <img className={classes.moviePoster} src={movie.image} title={removeBTags(movie.title)} alt="영화 포스터 이미지를 불러오는 데 오류가 발생했습니다."/>
                  </div>
                </Grid>
                <Grid item xs={8}>
                  <div className={classes.movieTitle}>
                    <span style={{color: 'grey'}}>{index + 1}&nbsp;&nbsp;</span>
                    {removeBTags(movie.title)}
                    <span className={classes.movieYear}>{movie.year}</span>
                  </div>
                  <div className={classes.movieSubtitle}>
                    <b>감독</b> {movie.director}<br />
                    <b>출연</b> {movie.actor}<br />
                    <b>평점</b> {movie.userRating}
                  </div>
                </Grid>
              </div>
            </Grid>
          )}) : ""}
      </Grid>
      
      {isSearched ? 
        <form noValidate autoComplete="off" className={classes.form} onSubmit={handleSubmit}>
          <div className={classes.form2}><br/><br/>
            선택한 영화 : &nbsp;{selectedMovie.index + 1}번 &nbsp;{selectedMovie.title}
          </div>
          <div className={classes.form2}><br/>이 영화는 &nbsp;
            <Select labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={form.category}
              onChange={handleCategory}
              name="category"
              style={{fontSize: '1.7rem', fontWeight: '500'}}>
              {category ? category.map(cat => {
                return (
                  <MenuItem value={cat.categoryID} className={classes.menuItem}>
                    {cat.categoryName}</MenuItem>
                )
              }) : "error occured"}
            </Select>
          &nbsp;영화입니다.</div><br />

          <div >트랜스미디어</div>
          <Select labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={form.transmedia}
            onChange={handleTransmedia}
            name="transmedia"
            style={{fontSize: '1.7rem', fontWeight: '500'}}>
            {transmedia ? transmedia.map(trans => {
              return (
                <MenuItem value={trans.transmediaID} className={classes.menuItem}>
                  {trans.transmediaName}</MenuItem>
              )
            }) : "error occured"}
          </Select>

          <Fab variant="extended" className={classes.btn} type="submit">추가하기</Fab>
        </form>
      : ""}

    </Card>
  )
}