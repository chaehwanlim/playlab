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
    fontWeight: '300'
  },
  form2: {
    display: 'relative',
    fontWeight: '300',
  },

  //for movies
  book: {
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

  bookCover: {
    width: '80%',
    height: 'auto',
    maxWidth: '15rem',
    boxShadow: '0 8px 38px rgba(133, 133, 133, 0.3), 0 5px 12px rgba(133, 133, 133,0.22)',
    marginTop: '-1.5rem',       
  },
  bookCoverAlign: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  bookTitle: {
    fontSize: '2.2rem',
    fontWeight: '700',
    marginTop: '1rem',
  },
  bookSubtitle: {
    fontSize: '1.6rem',
    fontWeight: '500',
    color: 'slategray',
    marginTop: '0.7rem',
  },
  bookInfo: {
    fontSize: '1.5rem',
    fontWeight: '400',
    marginTop: '0.7rem',
    marginBottom: '0.7rem',
  },
  bookDesc: {
    fontSize: '1.5rem',
    fontWeight: '400',
    margin: '1rem 1rem 1rem 1rem',
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
    fontSize:'2rem',
    background: '#1ABF80',
    color: 'white',
    transition: '0.7s',
    '&:hover': {
        background: '#1ABF80',
        transform: 'scale(1.1)',
        transition: '0.7s',
    }
  },
}));

export default function BookAdd() {
  var [search, setSearch] = useState("");
  var [isSearched, setIsSearched] = useState(false);
  var [searchResult, setSearchResult] = useState([]);
  var [selectedBook, setSelectedBook] = useState({
    index: -1,
    title: ''
  });
  var [form, setForm] = useState({
    title: "",
    author: "",
    category: 100,
    transmedia: 10000,
    imageURL: "",
    description: "",
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
    searchBook();
  }

  const searchBook = () => {
    Axios.post('/api/bookSearchKeyword', {
      keyword : search
    }).then(response => console.log(response))
      .catch(error => console.log(error));
    
    getBookSearchResult();
  }

  const getBookSearchResult = () => {
    Axios.get('/api/bookSearch')
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

  const handleBookSelect = (index, title) => {
    console.log(index);
    setSelectedBook({index: index, title: title});
    if (searchResult) {
      setForm({
        ...form,
        title: removeBTags(searchResult[index].title),
        author: searchResult[index].author,
        imageURL: searchResult[index].image,
        description : removeBTags(searchResult[index].description)
      });
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(form);
    if(sessionStorage.userName) {
      addBook();
    } else if (sessionStorage.userName === undefined) {
      alert('로그인이 필요합니다!');
      window.location.assign('/MyPage');
    }
  }

  const addBook = () => {
    Axios({
      method: 'post',
      url: 'api/bookAdd',
      data: {
        title: form.title,
        author: form.author,
        adderID : sessionStorage.getItem('userID'),
        categoryID: form.category,
        transmediaID: form.transmedia,
        imageURL: form.image,
        description: form.description,
      }
    })
    .then((res) => console.log(res))
    .then((res) => alert('책을 정상적으로 추가했습니다!'))
    .catch((err) => console.log(err));
  }

  const removeBTags = (str) => {
    str = str.replace(/<b>/g, "");
    return str.replace(/<\/b>/g, "");
  }

  return (
    <Card className={classes.card}>
      <div className={classes.title}>
        책을 추가합니다.
      </div>
      <Divider />
      <form noValidate autoComplete="off" className={classes.form} onSubmit={handleSearch}>
        <Paper component="form" className={classes.search} variant="outlined">
          <InputBase
          className={classes.input}
          placeholder="책 제목을 입력하세요."
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
        네이버 책 검색 결과입니다.<br />
        책을 선택하고 하단의 양식을 완성해주세요.</div> 
      : ""}

      <Grid container spacing={4}>
        {searchResult ?
          searchResult.map((book, index) => {
            return (
            <Grid item xs={12}>
              <div className={classes.book} key={index} onClick={() => handleBookSelect(index, removeBTags(book.title))}>
                <Grid item xs={4} md={2}>
                <div className={classes.bookCoverAlign}>
                    <img className={classes.bookCover} src={book.image} alt={book.title}/>
                </div>
                </Grid>
                <Grid item xs={8} md={4}>
                    <div className={classes.bookTitle}>
                        <span style={{color: 'grey'}}>{index + 1}&nbsp;&nbsp;</span>
                        {removeBTags(book.title)}
                        </div>
                    <div className={classes.bookSubtitle}>
                        작가 | {book.author}<br />
                    </div>
                    <div className={classes.bookInfo}>
                    </div>
                </Grid>
                <Grid item xs={12} md={6}>
                    <div className={classes.bookDesc}>
                        {removeBTags(book.description)}
                    </div>
                </Grid>
                
              </div>
            </Grid>
          )}) : <div>error occurred</div>}
      </Grid>

      {isSearched ? 
        <form noValidate autoComplete="off" className={classes.form} onSubmit={handleSubmit}>
          <div className={classes.form2}><br/><br/>
            선택한 책 : &nbsp;{selectedBook.index + 1}번 &nbsp;{selectedBook.title}
          </div>
          <div className={classes.form2}><br/>이 책은 &nbsp;
          <Select labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={form.category}
            onChange={handleCategory}
            name="category"
            style={{fontSize: '1.7rem'}}>
            {category ? category.map(cat => {
              return (
                <MenuItem value={cat.categoryID} className={classes.menuItem}>
                  {cat.categoryName}</MenuItem>
              )
            }) : "error occured"}
          </Select>
          &nbsp;책입니다.</div><br />

          <div>트랜스미디어</div>
          <Select labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={form.transmedia}
            onChange={handleTransmedia}
            name="transmedia"
            style={{fontSize: '1.7rem'}}>
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