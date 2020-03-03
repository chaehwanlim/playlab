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
    color: '#1ABF80',
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
        transform: 'scale(1.03)',
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
});

export default function BookPopular() {
  var [bookDB, setBookDB] = useState([]);
  var [category, setCategory] = useState([]);
  var [selectedCat, setSelectedCat] = useState("");

  useEffect(() => {
    fetch('/api/bookDB')
      .then(res => res.json())
      .then(res => setBookDB(res))
      .catch(err => console.log(err))
    fetch('/api/categoryDB')
      .then(res => res.json())
      .then(res => setCategory(res))
      .catch(err => console.log(err))
  }, []);

  const removeBTags = (str) => {
    str = str.replace(/<b>/g, "");
    return str.replace(/<\/b>/g, "");
  }

  const filterData = (data) => {
    data = data.filter((datum) => {
      return (
        (datum.categoryName.indexOf(selectedCat) > -1)
      );
    });
    return data.map((datum, index) => {
      return (
        <Grid item xs={12}>
          <div className={classes.book}>
            <Grid item xs={4} md={2}>
            <div className={classes.bookCoverAlign}>
                <img className={classes.bookCover} src={datum.imageURL} />
            </div>
            </Grid>
            <Grid item xs={8} md={4}>
                <div className={classes.bookTitle}>
                    {removeBTags(datum.title)}
                    </div>
                <div className={classes.bookSubtitle}>
                    작가 | {datum.author}<br />
                </div>
                <div className={classes.bookInfo}>
                </div>
            </Grid>
            <Grid item xs={12} md={6}>
                <div className={classes.bookDesc}>
                    {removeBTags(datum.description)}
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
              style={{fontSize: '1.7rem', fontWeight: '500', color: '#1ABF80'}}>
              {category ? category.map(cat => {
                return (
                  <MenuItem value={cat.categoryName} className={classes.menuItem}>
                    {cat.categoryName}</MenuItem>
                )
              }) : "error occured"}
        </Select>
      &nbsp; 책의 인기 차트</div></Card>
      <Grid container spacing={4}>
        {bookDB ? filterData(bookDB) : <div>error ocurred</div>}
      </Grid>
    </div>
  )
}
