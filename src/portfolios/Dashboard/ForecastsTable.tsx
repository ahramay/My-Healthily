import React, { useState, useCallback, useMemo, SyntheticEvent } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Palette } from 'utility/Colors/Palette';
import Box from '@material-ui/core/Box';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

import ButtonLinks from 'styleguide/ButtonLinks';
import RangeSlider from 'styleguide/form/RangeSlider';
import { calculateStaticValues } from 'utility/common';
import { historicColumnHeaders, scenariosData } from 'staticData/scenariosList';

const useStyles = makeStyles({
    tableNoSpaces: {
        minWidth: 650,
        maxWidth: 1000,
        border: `solid 1px ${Palette.Grey.Light}`,
        boxShadow: 'none',
        borderRadius: 1,
        '& .MuiTableBody-root .MuiTableCell-root': {
            padding: '8px 16px',
        },
        '& .MuiTableRow-root:nth-of-type(even)': {
            backgroundColor: Palette.Grey.LightBg,
        },
        '& .MuiTableHead-root .MuiTableRow-root .MuiTableCell-root': {
            padding: 0,
            backgroundColor: Palette.Grey.LightBg,
        },
        '& .MuiTableBody-root .MuiTableRow-root .MuiTableCell-root': {
            padding: 0,
        },
    },
    TableHeadingColumn : {
        cursor: 'pointer',
        backgroundColor: Palette.deepPurple.DarkBg,
        color: Palette.Base.White,
        padding: '9px 12px',
        fontSize: 14,
        minWidth: 56,
        lineHeight: 2.5,
        minHeight: 54,
        textAlign: 'center',
        verticalAlign: 'middle',
        display: 'inline-block',
        borderRight: `solid 1px ${Palette.deepMaroon.Border}`,
        '&:nth-child(1)': {
            borderLeft: `solid 1px ${Palette.Grey.RowLightBg}`,
        }
    },
    TableDataColumn: {
        padding: '9px 4px',
        fontSize: 14,
        minWidth: 56,
        lineHeight: 2.5,
        minHeight: 54,
        textAlign: 'center',
        verticalAlign: 'middle',
        display: 'inline-block',
        borderRight: `solid 1px ${Palette.Grey.RowLightBg}`,
        '&:nth-child(1)': {
            borderLeft: `solid 1px ${Palette.Grey.RowLightBg}`,
        }
    },
    cellStyle: {
        padding: '8px 16px',
    },
});

const ForecastsTable: React.FC = () => {
    const classes = useStyles();
    const [forcastDataSets, setForcastDataSets] = useState<any>({});
    const [rowsData, setRowsData] = useState<any>(null);

    const createData = (id: string, name: string, data: any, input: any) => {
        return { id, name, data, input };
    }

    useMemo(() => {
        const rows = scenariosData.map(item => {
            return createData(item.id, item.name, item.data, item.input);
        });
        setRowsData(rows);
        let data: any = [];
        for (let i=0;i<rows.length;i++) {
            const newId = `id-${i}`;
            const value = rows[i];
            data[newId] = value?.input || 0;
        }
        setForcastDataSets(data);
    }, []);

    const handleRangeSelector = useCallback((value: number | number[], reference: number) => {
        const newValue = parseInt(value.toString());
        const newId = `id-${reference}`;
        const data = {
            ...forcastDataSets,
            [newId]: newValue,
        };
        setForcastDataSets(data);
    }, [forcastDataSets]);

    const handleForcastDataInput = useCallback((i: number, e: SyntheticEvent) => {
    }, []);

    return (
        <TableContainer className={classes.tableNoSpaces} component={Paper}>
            <Table width="100%" aria-label="scenarios table">
                <TableHead>
                    <TableRow>
                        <TableCell width="18%" align="left"></TableCell>
                        <TableCell width="5%" align="right"></TableCell>
                        <TableCell width="65%" align="right">
                            <Box>
                                {historicColumnHeaders.map((row, i) => (
                                    <Box onClick={(e) => handleForcastDataInput(i, e)} className={classes.TableHeadingColumn} display="inline-flex" key={i}>
                                        {row}
                                    </Box>
                                ))}
                            </Box>
                        </TableCell>
                        <TableCell width="5%" align="right"></TableCell>
                    </TableRow>
                </TableHead>
                <TableBody >
                    {rowsData?.map((row: any, numb: number) => (
                        <TableRow key={row.id}>
                            <TableCell align="left">
                                <Box className={classes.cellStyle}>{row.name}</Box>
                            </TableCell>
                            <TableCell component="th" scope="row" align="right">
                                <Box className={classes.cellStyle}>
                                    <RangeSlider reference={numb} units="%" inputDefault={forcastDataSets?.[`id-${numb}`]} onChange={handleRangeSelector} />
                                </Box>
                            </TableCell>
                            <TableCell component="th" scope="row" align="right">
                                <Box padding={0}>
                                    {row?.data?.map((subRow: any, i: any) => (
                                        <Box className={classes.TableDataColumn} display="inline-flex"  key={i}>
                                            {calculateStaticValues(subRow.value, forcastDataSets?.[`id-${numb}`] || 0)}
                                        </Box>
                                    ))}
                                </Box>
                            </TableCell>
                            <TableCell className={classes.cellStyle} component="th" scope="row" align="right">
                                <Box className={classes.cellStyle}>
                                    <ButtonLinks label="" icon="delete" circleIcon={true} color={Palette.Red.Main} bgColor={Palette.deepMaroon.BgLight} onClickAction={() => {void(0) }} />
                                </Box>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    )
}

export default React.memo(ForecastsTable);