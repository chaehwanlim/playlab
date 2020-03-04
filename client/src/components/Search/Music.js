import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import IconButton from '@material-ui/core/IconButton';
import InputBase from '@material-ui/core/InputBase';
import SearchIcon from '@material-ui/icons/SearchRounded';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableRow from '@material-ui/core/TableRow';
import '../styles/media.css';


const useStyles = makeStyles({
    search: {
        marginTop: '1.5rem',
        marginBottom: '1.5rem',
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
    tableAttribute: {
        fontSize: '1.9rem',
        textTransform: 'uppercase',
        fontWeight: '900',
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

export default function MusicTable() {
    var [musicDB, setMusicDB] = useState([]);
    var [searchKeyword, setSearchKeyword] = useState("");

    useEffect(() => {
        fetch('/api/musicDB')
            .then(res => res.json())
            .then(res => setMusicDB(res))
            .catch(err => console.log(err))
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
                (datum.artist.indexOf(searchKeyword) > -1) ||
                (datum.userName.indexOf(searchKeyword) > -1)
            );
        });
        return data.map(datum => {
            return (
                <TableRow className={classes.rowEffect} onClick={handleClick}>
                    <TableCell className={classes.tableData}>
                        <span className={classes.musicTitle}>{datum.title}</span><br></br>{datum.artist}
                    </TableCell>
                    <TableCell className={classes.tableData}>
                        {datum.userName} 님의 {datum.categoryName} 음악입니다.
                    </TableCell>
                    <TableCell className={classes.tableData2} id="music">{datum.genre}</TableCell>
                    <TableCell className={classes.tableData2} id="music">{datum.transmediaName}</TableCell>
                </TableRow>
            )
        });
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
            <Paper className={classes.table}>
            <TableContainer className={classes.tableContainer}>
                <Table stickyHeader aria-label="sticky table">
                    {/* <TableHead>
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
                    </TableHead> */}
                    <TableBody>
                    {musicDB ? filterData(musicDB) : <TableRow>error ocurred</TableRow>}
                    </TableBody>
                </Table>
            </TableContainer>
            </Paper>
        </div>
    )
}