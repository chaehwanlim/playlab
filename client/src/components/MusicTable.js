import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import musicData from './musicSample.json';

const useStyles = makeStyles({
    tableAttribute: {
        fontFamily: "Roboto",
        fontSize: "0.8em",
        textTransform: "uppercase",
        fontWeight: "900",
        position: "sticky",
    },
    tableData: {
        fontFamily: "Noto Sans KR",
        fontSize: "0.8em",
    },
    tableScroll: {
        width: "100%",
        height: "500px",
        overflow:'auto',
    }
});

export default function MusicTable() {
    const classes = useStyles();

    return (
        <div className={classes.tableScroll}>
        <TableContainer component={Paper}>
            <Table className={classes.table} aria-label="simple table">
                <TableHead>
                <TableRow>
                    <TableCell className={classes.tableAttribute}>Title</TableCell>
                    <TableCell className={classes.tableAttribute}>Artist</TableCell>
                    <TableCell className={classes.tableAttribute}>Genre</TableCell>
                    <TableCell className={classes.tableAttribute}>AdderID</TableCell>
                    <TableCell className={classes.tableAttribute}>CategoryID</TableCell>
                </TableRow>
                </TableHead>
                <TableBody>
                {musicData.map(row => (
                    <TableRow key={row.title}>
                    <TableCell className={classes.tableData} component="th" scope="row">
                        {row.title}
                    </TableCell>
                    <TableCell className={classes.tableData}>{row.artist}</TableCell>
                    <TableCell className={classes.tableData}>{row.genre}</TableCell>
                    <TableCell className={classes.tableData}>{row.adderID}</TableCell>
                    <TableCell className={classes.tableData}>{row.categoryID}</TableCell>
                    </TableRow>
                ))}
                </TableBody>
            </Table>
        </TableContainer>
        </div>
    )
}