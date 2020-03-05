import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Card from '@material-ui/core/Card';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableRow from '@material-ui/core/TableRow';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import Button from '@material-ui/core/Button';
import ThumbUp from '@material-ui/icons/ThumbUp';
import Axios from 'axios';

const useStyles = makeStyles({
  tableData: {
    fontSize: '1.7em',
    fontWeight: '400',
  },
  tableData2: {
    fontSize: '1.7em',
    fontWeight: '400',
    maxWidth: '10rem',
  },
  table: {
    marginTop: '5px',
    width: '100%',
  },
  tableContainer: {
    maxHeight: 700,
  },
  musicTitle: {
    fontWeight: '700',
  },
  rowEffect: {
    '&:hover': {
      transition: '0.7s',
      backgroundColor: 'aliceblue',
    } 
  },

  btn: {
    margin: '1rem',
    fontSize: '1.7rem',
    fontWeight: '700',
    '&:hover': {
      transform: 'scale(1.05)',
      transition: '0.7s',
    }
  },

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
    color: '#018DFF',
  },
  likes: {
    fontSize: '1.4rem',
    color: 'white',
    paddingTop: '0rem',
    paddingBottom: '0rem',
    paddingLeft: '1rem',
    paddingRight: '1rem',
  }
});

export default function MusicPopular() {
  var [musicDB, setMusicDB] = useState([]);
  var [category, setCategory] = useState([]);
  var [selectedCat, setSelectedCat] = useState("");

  useEffect(() => {
    fetch('/api/musicPopular')
      .then(res => res.json())
      .then(res => setMusicDB(res))
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
        <TableRow className={classes.rowEffect}>
          <TableCell className={classes.tableData} component="th" scope="row" style={{textAlign: 'center', paddingLeft: '1rem', paddingRight: '0rem'}}>{index + 1}</TableCell>
          <TableCell className={classes.tableData} style={{paddingLeft: '1rem'}}>
              <span className={classes.musicTitle}>{datum.title}</span><br></br>{datum.artist}
          </TableCell>
          <TableCell className={classes.tableData} style={{minWidth:"12rem"}}>
              {datum.userName} 님의<br />{datum.categoryName} 음악
          </TableCell>
          <TableCell className={classes.tableData}>
            <Button variant="contained" color='primary' className={classes.likes}
            onClick={() => {handleLikes(datum.musicID)}}
            ><ThumbUp />&nbsp;{datum.likes}</Button>
          </TableCell>
          <TableCell className={classes.tableData2}>{datum.genre}</TableCell>
          <TableCell className={classes.tableData2}>{datum.transmediaName}</TableCell>
        </TableRow>
      )
    });
  }

  const handleCategory = (e) => {
    e.preventDefault();
    console.log(e.target.value);
    setSelectedCat(e.target.value);
  }

  const handleLikes = (id) => {
    const urlWithID = '/api/popular/like/increment/' + id
    Axios({
      method: 'put',
      url: urlWithID,
    })
    .then(res => {
      if(res.status === 200){
        alert('성공적으로 추천했습니다!');
        fetch('/api/musicPopular')
          .then(res => res.json())
          .then(res => setMusicDB(res))
          .catch(err => console.log(err))
      }
    })
    .catch(err => console.log(err));
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
              style={{fontSize: '1.7rem', fontWeight: '500', color: '#018DFF'}}>
              {category ? category.map(cat => {
                return (
                  <MenuItem value={cat.categoryName} className={classes.menuItem}>
                    {cat.categoryName}</MenuItem>
                )
              }) : "error occured"}
        </Select>
      &nbsp; 음악의 인기 차트</div></Card>
      <Paper className={classes.table}>
        <TableContainer className={classes.tableContainer}>
          <Table stickyHeader aria-label="sticky table">
            <TableBody>
            {musicDB ? filterData(musicDB) : <TableRow>error ocurred</TableRow>}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
    </div>
  )
}