import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Palette } from 'utility/Colors/Palette';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

import { round } from 'utility/common';

const useStyles = makeStyles({
  table: {
    minWidth: 650,
    maxWidth: 650,
    border: `solid 1px ${Palette.Grey.Light}`,
    boxShadow: 'none',
    borderRadius: 1,
    '& .MuiTableHead-root .MuiTableRow-root': {
        backgroundColor: Palette.Grey.DarkBg,
        '& .MuiTableCell-root': {
            color: Palette.Base.White,
        }
    },
    '& .MuiTableBody-root .MuiTableCell-root': {
        padding: '8px 16px',
    }
  },
});


type Props = {
    data?: any;
};

const PortfolioDataList: React.FC<Props> = ({
    data
}) => {
    const classes = useStyles();
    const [portfolioList, setportfolioList] = useState<any>([]);
    useEffect(() => {
        setportfolioList(data);
    }, [data]);

    return (
        <TableContainer className={classes.table} component={Paper}>
            <Table aria-label="scenarios table">
                <TableHead>
                    <TableRow>
                        <TableCell width={10} align="left"></TableCell>
                        <TableCell align="left">Asset Name</TableCell>
                        <TableCell align="left">Weight</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {portfolioList?.map((row: any, rowIndex: number) => (
                        <TableRow key={rowIndex}>
                            <TableCell align="left">{row.sno}</TableCell>
                            <TableCell component="th" scope="row" align="left">{row.name}</TableCell>
                            <TableCell component="th" scope="row" align="left">{round(parseFloat(row.weight), 2)}{row.weightType}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    )
}

export default React.memo(PortfolioDataList);