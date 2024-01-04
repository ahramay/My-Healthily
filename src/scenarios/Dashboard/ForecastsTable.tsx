import React, { useState, useCallback, useMemo, useEffect, SyntheticEvent } from 'react';
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

import { forecastTypes } from 'staticData/scenariosList';

import ButtonLinks from 'styleguide/ButtonLinks';
// import RangeSlider from 'styleguide/form/RangeSlider';
// import { calculateStaticValues } from 'utility/common';
import { historicColumnHeaders, scenariosColumnsData, getBlankScenarioColumnData } from 'staticData/scenariosList';


const useStyles = makeStyles({

	customInput: {
		width: 56,
		height: 56,
		border: 'none',
		textAlign: 'center',
		margin: 0,
	},

    tableNoSpaces: {
        minWidth: 650,
        // maxWidth: 1000,
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

type Props = {
	disabledMode: boolean;
	scenarioDate: string;
    forecasts: any;
    onForecastChange: (data: any) => void;
	onDeleteRow: (index: number) => void;
}

const ForecastsTable: React.FC<Props> = ({ scenarioDate, forecasts, disabledMode, onForecastChange, onDeleteRow }) => {
    const classes = useStyles();
    const [rowsData, setRowsData] = useState<any>(null);
    const [rowsDataList, setRowsDataList] = useState<any>({
        data: []
    });
	const [showPlaceHolder, setShowPlaceHolder] = useState<boolean>(true);


    useMemo(() => {
        const assetListRows = forecasts.data.map((item: any, index: number) => { // parse data from parent *shudder*
			let l = item.forecastData.length
            let o = { 
				id: item.forecastIndex, 
				name: item.forecastAssetName, 
				data: (l > 0) ? item.forecastData : getBlankScenarioColumnData(), 
				type: item.forecastType,
				dbID: item.forecastID,
				tag: item.forecastTagID
			};
			return o;
        }); 
        setRowsData(assetListRows);
    }, [forecasts]);

	useEffect(() => {
		setRowsDataList({ data: rowsData })

		for (let i = 0; i < forecasts.data.length; i += 1) {
			let f = forecasts.data[i];
			for (let j = 0; j < f.forecastData.length; j += 1) {
				let c = f.forecastData[j];
				if (c.value) {
					setShowPlaceHolder(false);
				}
			}
		}

	}, [rowsData, forecasts.data]);

    const updateFinalData = useCallback((rowsData: any) => { // this _terribly_ named function propogates the data to the parent component
        onForecastChange?.({data: rowsData});
    }, [onForecastChange]);

    const handleForcastDataInput = useCallback((i: number, e: SyntheticEvent) => {
    }, []);

    const handleForecastDelete = useCallback((index: number, e: SyntheticEvent) => { 
		rowsDataList.data.splice(index, 1);
		setRowsDataList(rowsDataList);
		updateFinalData(rowsData);
		onDeleteRow(index);
    }, [rowsDataList, rowsData, updateFinalData, onDeleteRow]);

	const handleValueChange = useCallback((ev, row, numb, subRow, index) => {
		subRow.value = ev.target.value; // note - this is a string.
		setShowPlaceHolder(false);
		setRowsDataList(rowsDataList); // force state change
		updateFinalData(rowsData);

	}, [rowsDataList, rowsData, updateFinalData]);

	const lookUpForecastTypeLabel = (num: any) => {
		for (let i = 0; i < forecastTypes.length; i += 1) {
			let r = forecastTypes[i];
			if (r.value === parseInt(num)) {
				return r.label;
			}
		}
		return '';
	}

	return (
		<TableContainer className={classes.tableNoSpaces} component={Paper}>
			<Table width="100%" aria-label="scenarios table">
				<TableHead>
					<TableRow>
						<TableCell width="24%" align="left"></TableCell>
						
						<TableCell width="65%" align="right">
							<Box>
								{historicColumnHeaders.map((row, i) => (
									<Box onClick={(e) => handleForcastDataInput(i, e)} className={classes.TableHeadingColumn} display="inline-flex" key={i}>
										{row}
									</Box>
								))}
							</Box>
						</TableCell>
						<TableCell width="6%" align="right"></TableCell>
					</TableRow>
				</TableHead>
				<TableBody >
					{rowsDataList?.data?.map((row: any, numb: number) => (
						<TableRow key={numb}>
							<TableCell align="left">
								<Box className={classes.cellStyle}>{ lookUpForecastTypeLabel(row.type) } - { row.name }</Box> 
							</TableCell>
							
							<TableCell component="th" scope="row" align="right">
								<Box padding={0}>
									{row?.data?.map((subRow: any, i: any) => (

										<input type="number" key={i} value={subRow.value || ''} disabled={disabledMode}
										placeholder={ ((showPlaceHolder && '' + scenariosColumnsData[i].value) || '')} 
										onChange={(e) => {handleValueChange(e, row, numb, subRow, i) }} className={classes.customInput}
										/>
									))} 
								</Box>
							</TableCell>
							
							<TableCell className={classes.cellStyle} component="th" scope="row" align="right">
								{!disabledMode &&
								<Box className={classes.cellStyle}>
									<Box onClick={(e) => handleForecastDelete(numb, e)}>
										<ButtonLinks label="Remove" icon="delete" circleIcon={true} color={Palette.Red.Main} bgColor={Palette.deepMaroon.BgLight} />
									</Box>
								</Box>
								}
							</TableCell>
						</TableRow>
					))}
				</TableBody>
			</Table>
		</TableContainer>
	)
}

export default React.memo(ForecastsTable);