import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';

const useStyles = makeStyles({
    title: {
        transitionDuration: '0.8s',
        fontSize: '2.5rem',
        fontWeight: '900',
        marginTop: '2rem',
        marginBottom: '4rem',
        color: '#1ABF80',
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
    bookYear: {
        marginLeft: '0.5rem',
        fontSize: '1.7rem',
        fontWeight: '500',
        color: 'grey',
    },
    bookRating: {
        marginLeft: '8px',
        fontSize: '1.7rem',
        fontWeight: '500',
        color: 'orange',
    }
})



export default function Book() {
    var [bookDB, setBookDB] = useState([]);

    useEffect(function fetchBookDB() {
        fetch('/api/bookDB')
            .then(res => res.json())
            .then(res => setBookDB(res))
            .catch(err => console.log(err));
    });

    const classes = useStyles();

    return (
        <div>
            <div className={classes.title}>도서</div>
            <Grid container spacing={8}>
            {bookDB ? bookDB.map(book => {
                return (
                    <Grid item sm={12}>
                        <div className={classes.book}>
                            <Grid item sm={2} xs={4}>
                            <div className={classes.bookCoverAlign}>
                                <img className={classes.bookCover} src={book.imageURL} />
                            </div>
                            </Grid>
                            <Grid item sm={4} xs={8}>
                                <div className={classes.bookTitle}>
                                    {book.title}
                                    <span className={classes.bookYear}>{book.year}</span>
                                    
                                    </div>
                                <div className={classes.bookSubtitle}>
                                    작가 | {book.author}<br />
                                    트랜스미디어 | {book.transmediaName}<br />
                                </div>
                                <div className={classes.bookInfo}>
                                    <b>{book.userName}</b> 님이 이 도서를<br />
                                    <b>{book.categoryName}</b> 도서로 선택했습니다.<br />
                                </div>
                            </Grid>
                            <Grid item sm={6} xs={12}>
                                <div className={classes.bookDesc}>
                                    {book.description}
                                </div>
                            </Grid>
                        </div>
                    </Grid>
                )
            }) : <span>error occured</span>}
            </Grid>
        </div>
    )
}