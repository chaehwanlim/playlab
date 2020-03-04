import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableRow from '@material-ui/core/TableRow';
import Button from '@material-ui/core/Button';
import Axios from 'axios';

const useStyles = makeStyles(theme => ({
  subtitle: {
    textAlign: 'left',
    fontSize: '1.7rem',
    fontWeight: '700',
    color: 'slategray',
  },
  myPlaylist : {
    display: 'flex',
    alignItems: 'center',
    margin: '1rem',
    fontSize: '1.7rem',
    fontWeight: '400',
  },
  btnAlign: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  deletion : {
    fontSize: '1.7rem',
    fontWeight: '400',
    
  },
  tableData: {
    fontSize: '1.7rem',
    fontWeight: '400',
  },
  tableData2: {
    fontSize: '1.7rem',
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
  movieTitle: {
    fontWeight: '700',
  },
}));

export default function MyMovie(props) {
  var [myMovie, setMyMovie] = useState([]);

  const getDB = () => {
    Axios({
      method: 'post',
      url: '/api/myPage/movie',
      data: {
        userName: sessionStorage.userName
      }
    })
    .then(res => setMyMovie(res.data))
    .catch(err => console.log(err));
  }

  useEffect(() => {
    getDB();
  }, []);

  const handleDeletion = (id) => {
    console.log(id);
    const urlWithID = '/api/myPage/delete/' + id;
    Axios({
      method: 'DELETE',
      url: urlWithID,
    })
    .then(res => {
      if(res.status === 200){
        alert('정상적으로 삭제되었습니다');
        getDB();
      }
    })
    .catch(err => console.log(err));
  }

  const classes = useStyles();

  return (
    <div>
      <TableContainer className={classes.tableContainer}>
      <Table stickyHeader aria-label="sticky table">
        <TableBody>
        {myMovie ? myMovie.map((datum, index) => {
        return (
          <TableRow>
            <TableCell className={classes.tableData}>
                <span className={classes.movieTitle}>{datum.title}</span><br></br>{datum.director}
                <br></br>{datum.actor}
            </TableCell>
            <TableCell className={classes.tableData}>
              {datum.categoryName} 영화
            </TableCell>
            <TableCell className={classes.tableData} style={{maxWidth:"5rem"}}>
              <div className={classes.btnAlign}>
                <Button className={classes.deletion} color="secondary" 
                onClick={() => {handleDeletion(datum.movieID)}}>
                삭제</Button>
              </div>
            </TableCell>
          </TableRow>
        )
        }) : <div>error</div>}
        </TableBody>
      </Table>
      </TableContainer>
    </div>
    
  )
}