import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import { useMediaQuery } from '@material-ui/core';

const useStyles = makeStyles({
    searchTitle: {
        animationDuration: '0.8s',
        marginTop: '20px',
        fontSize: '2.5rem',
        fontWeight: '900',
        color: '#018DFF',
    },
    tableAttribute: {
        fontSize: '1.9rem',
        textTransform: 'uppercase',
        fontWeight: '900',
    },
    tableData: {
        fontSize: '1.7em',
        fontWeight: '400',
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
    musicInfo: {
        display: 'none',
    }
});

const attributes = [
    { id: 'title&artist', label: '제목 및 아티스트', minWidth: 100 },
    /* { id: 'artist', label: '아티스트', minWidth: 200 }, */
    { id: 'category', label: '기분', minWidth: 65 },
    { id: 'transmedia', label: '연관', minWidth: 50 },
    { id: 'genre', label: '장르', minWidth: 50 },
    { id: 'adder', label: '등록', minWidth: 50 },
];

export default function MusicTable() {
    var [musicDB, setMusicDB] = useState([]);

    useEffect(() => {
        fetch('/api/musicDB')
            .then(res => res.json())
            .then(res => setMusicDB(res))
            .catch(err => console.log(err))
    }, []);

    /* _callApi = async () => {
        const response = await fetch('/api/music');
        const body = await response.json();
        return body;
    }
 */
    const classes = useStyles();
    const mediaQuery = useMediaQuery('(min-width:')

    const handleClick = event => {
        event.preventDefault();
    }

    return (
        <div>
            <div className={classes.searchTitle}>음악</div>
            <Paper className={classes.table}>
            <TableContainer className={classes.tableContainer}>
                <Table stickyHeader aria-label="sticky table">
                    <TableHead>
                    <TableRow>
                        {attributes.map(column => (
                            <TableCell
                                key={column.id}
                                style={{ minWidth: column.minWidth }}
                                className={classes.tableAttribute}>
                                {column.label}
                            </TableCell>
                        ))}
                    </TableRow>
                    </TableHead>
                    <TableBody>
                    {musicDB ? musicDB.map(music => {
                        return (
                        <TableRow className={classes.rowEffect} onClick={handleClick}>
                            <TableCell className={classes.tableData} component="th" scope="row">
                                <span className={classes.musicTitle}>{music.title}</span><br></br>{music.artist}
                            <div className={classes.musicInfo} id="musicInfo">
                                {music.userName} 님이 이 음악을 {music.categoryName} 음악으로 평가했습니다.
                            </div>
                            </TableCell>
                            {/* <TableCell className={classes.tableData}>{row.artist}</TableCell> */}
                            <TableCell className={classes.tableData}>{music.categoryName}</TableCell>
                            <TableCell className={classes.tableData}>{music.transmediaName}</TableCell>
                            <TableCell className={classes.tableData}>{music.genre}</TableCell>
                            <TableCell className={classes.tableData}>{music.userName}</TableCell>
                        </TableRow>
                        )}) : <TableRow>error ocurred</TableRow>}
                    </TableBody>
                </Table>
            </TableContainer>
            </Paper>
        </div>
    )
}