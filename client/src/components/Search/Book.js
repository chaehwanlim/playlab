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
    book: {
        background: 'white',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        flexWrap: 'wrap',
        boxShadow: '0 8px 38px rgba(133, 133, 133, 0.3), 0 5px 12px rgba(133, 133, 133,0.22)',
        fontSize: '1.2rem',
        transition: '0.8s',
        '&:hover': {
            transform: 'scale(1.04)',
            transition: '0.7s',
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
        marginBottom: '1rem',
    },
    bookDesc: {
        fontSize: '1.5rem',
        fontWeight: '400',
        margin: '1rem 1rem 1rem 1rem',
    },
})

export default function Book() {
    var [bookDB, setBookDB] = useState([]);
    var [searchKeyword, setSearchKeyword] = useState("");

    useEffect(function fetchBookDB() {
        fetch('/api/bookDB')
        .then(res => res.json())
        .then(res => setBookDB(res))
        .catch(err => console.log(err));
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
                (datum.author.indexOf(searchKeyword) > -1) ||
                (datum.userName.indexOf(searchKeyword) > -1)
            );
        });
        return data.map(datum => {
            return (
                <Grid item xs={12}>
                        <div className={classes.book}>
                            <Grid item xs={4} md={2}>
                            <div className={classes.bookCoverAlign}>
                                <img className={classes.bookCover} src={datum.imageURL} alt={datum.title}/>
                            </div>
                            </Grid>
                            <Grid item xs={8} md={4}>
                                <div className={classes.bookTitle}>
                                    {datum.title}
                                    <span className={classes.bookYear}>{datum.year}</span>
                                    
                                    </div>
                                <div className={classes.bookSubtitle}>
                                    작가 | {datum.author}<br />
                                    트랜스미디어 | {datum.transmediaName}<br />
                                </div>
                                <div className={classes.bookInfo}>
                                    <b>{datum.userName}</b> 님의<br />
                                    <b>{datum.categoryName}</b> 책입니다.<br />
                                </div>
                            </Grid>
                            <Grid item xs={12} md={6}>
                                <div className={classes.bookDesc}>
                                    {removeTags(datum.description)}
                                </div>
                            </Grid>
                        </div>
                    </Grid>
            );
        });
    }

    const removeTags = (str) => {
        str = str.replace(/<b>/g, "");
        return str.replace(/<\/b>/g, "");
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
            <Grid container spacing={8}>
            {bookDB ? filterData(bookDB) : <span>error occured</span>}
            </Grid>
        </div>
    )
}