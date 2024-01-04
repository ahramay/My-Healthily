import React, { useState, useEffect} from 'react'; //useMemo
import Box from '@material-ui/core/Box';
import Divider from '@material-ui/core/Divider';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import Plotly from "plotly.js-basic-dist";
import createPlotlyComponent from "react-plotly.js/factory";
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import { Palette } from 'utility/Colors/Palette';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import ButtonLinks from 'styleguide/ButtonLinks';

import { API_SIMS, API_CHARTS } from 'services/api/config';
import { serviceQuery } from 'services/query';

const useStyles = makeStyles({
	table: {
	  minWidth: 650,
	  maxWidth: 1600,
	  border: `solid 1px ${Palette.Grey.Light}`,
	  boxShadow: 'none',
	  borderRadius: 1,
	  '& .MuiTableBody-root .MuiTableCell-root': {
		  padding: '8px 16px',
	  }
	},
	box: {
		padding: '20px'
	}
  });
 

const Plot = createPlotlyComponent(Plotly);

const Plots: React.FC = () => {

	const classes = useStyles();
    const [fetchRecords, setFetchRecords] = useState<boolean>(true);
	const records = [1,2,3,4,5,6,7,8];
	const [plotylData, setPlotlyData] = useState<any>(null);
	const [plotylLayout, setPlotlyLayout] = useState<any>(null);
	const [hideList, setHideList] = useState<any>(false);
	const [hideChart, setHideChart] = useState<any>(true);
	const [list, setList] = useState<any>([]);


	useEffect(() => {
        if (!fetchRecords) return;
        
		serviceQuery(API_SIMS).fetchAll().then((result) => {
			console.log('sims', result);
			setList(result.data);
		});
        setFetchRecords(false);
    }, [fetchRecords, records.length, list]);

	const getChart = (id: string, type: string) => {

		serviceQuery(API_CHARTS).fetchById(id, 'type', type).then((result) => {
			console.log(result);
			setPlotlyData(result.data.data);
			setPlotlyLayout(result.data.layout);
			setHideChart(false);
			setHideList(true);
		});

	}

    return (
        <>
			{!hideList && list.length &&
				<Card>
					<Box alignItems="center" py={2} className={classes.box}>
						<TableContainer className={classes.table} component={Paper}>
							<Table aria-label="scenarios table">
								<TableHead>
									<TableRow>
										<TableCell align="left" width="25%"><b>ID</b></TableCell>
										<TableCell align="left" width="25%"><b>Run Date</b></TableCell>
										<TableCell align="left" width="25%"><b>Valuation Date</b></TableCell>
										<TableCell align="right" width="25%"><b>Plot</b></TableCell>
									</TableRow>
								</TableHead>
								<TableBody>
									{list?.map((row: any, key: number) => (
										<TableRow key={key}>
											<TableCell component="th" scope="row" align="left">{ row?.id }</TableCell>
											<TableCell component="th" scope="row" align="left">{ row.runDate.split('T')[0] }</TableCell>
											<TableCell component="th" scope="row" align="left">{ row.valuationDate.split('T')[0] }</TableCell>
											<TableCell component="th" scope="row" align="right">
												<ButtonLinks label="RIDGE" icon="visibility" bgColor={Palette.deepPurple.Dark} onClickAction={() => getChart(row?.id, 'ridge')} />
												<ButtonLinks label="FAN" icon="visibility" bgColor={Palette.deepPurple.Dark} onClickAction={() => getChart(row?.id, 'fan')} />
											</TableCell>
											

										</TableRow>
									))}
								</TableBody>
							</Table>
						</TableContainer>
					</Box>
				</Card>
			}
			{!hideChart &&
				<Card>
					<Box p={2.5} className={classes.box}>
						<CardContent>
							<Box display="flex">
								<Box p={1} width="100%">
									<Typography variant="h5" component="h2">Plots</Typography>
								</Box>
							</Box>
							<Divider />
							<Box maxWidth={1600}>
								<Plot
									data={
										plotylData
									}

									layout={
										plotylLayout
									}
								/>
							</Box>
						</CardContent>
					</Box>
            	</Card>
			}
            
        </>
    )
}

export default React.memo(Plots);