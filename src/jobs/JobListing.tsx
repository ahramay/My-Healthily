import React, { useState, useMemo } from 'react';

import { API_JOBS, API_CALCSETTINGS, API_NOTIFICATION_MESSAGES } from '../services/api/config';
import { serviceQuery } from '../services/query';

import { useHistory } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import { Palette } from '../utility/Colors/Palette';
import Box from '@material-ui/core/Box';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
// import Divider from '@material-ui/core/Divider';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

import Notification from '../styleguide/form/Notification';
import Loader from '../styleguide/Loader';
import ButtonLinks from '../styleguide/ButtonLinks';

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
  });

const JobListing: React.FC = () => {

	const classes = useStyles();
	const history = useHistory();
	const [showLoader, setShowLoader] = useState<boolean>(true);
	const [fetchRecords, setFetchRecords] = useState<boolean>(true);
	const [notification, setNotification] = useState<any>(null);
	const [jobList, setJobList] = useState<any>([]);
	const [calcSetList, setCalcSetList] = useState<any>([]);

	useMemo(() => {
        if (!fetchRecords) return;
        
		serviceQuery(API_JOBS).fetchAll().then((result) => {
			console.log('jobs', result);
			setJobList(result.data);
		}).then(() => {
			serviceQuery(API_CALCSETTINGS).fetchAll().then((result) => {
				console.log('calc settings', result);
				setCalcSetList(result.data);
			});
		}).catch(err => {
			if(!err) return;
			setNotification([API_NOTIFICATION_MESSAGES.ALERT.ERROR, err.message]);
			
		}).finally(() => {
			setShowLoader(false);
		});

	
        setFetchRecords(false);
    }, [fetchRecords]);
	
	const getName = (jobRow: any) => {
		for (let i = 0; i < calcSetList.length; i += 1) {
			let c = calcSetList[i];
			if (c.id === jobRow.simulatorCalcSerialID) {
				return c.name;
			}
		}
		return '';
	}

	const navigateToPath = (url: string) => {
        history.push(url);
    }

	const getStatus = (num: any) => {

		const idx:string = num.toString();
		switch(idx) {
		case "0":
			return 'Pending';
		case "1": 
			return 'Running';
		case "2":
			return 'Suspended';
		case "3":
			return 'Completed';
		default:
			return 'Unknown';
		}
	}

	const getResult = (row: any) => {
		if (row.calcStatus === 0) return '';
		const num = row.calcResult;
		const idx:string = num.toString();
		switch(idx) {
		case "0":
			return 'Failed';
		case "1": 
			return 'Success';
		case "2":
			return 'Cancelled';
		default:
			return 'Unknown';
		}
	};

	return (
		<>
			<Card>
				<Box p={2.5}>
					<CardContent>
						{notification && notification?.length && 
							<Box my={1}>
								<Notification severity={notification?.[0]} message={notification?.[1]} />
							</Box>
						}
						<Box display="flex">
							<Box p={1} width="100%">
								<Typography variant="h5" component="h2">Settings</Typography>
							</Box>
							<Box p={1} flexShrink={1}>
								
							</Box>
						</Box>

						{showLoader && <Loader margin={2} /> }

						{!showLoader && 
							<>
							<Box alignItems="center" py={2}>
								<TableContainer className={classes.table} component={Paper}>
									<Table aria-label="settings table">
										<TableHead>
											<TableRow>
												<TableCell align="left" width="50%"><b>Settings Name</b></TableCell>
												<TableCell align="right" width="50%"><ButtonLinks label="Create" icon="add" bgColor={Palette.deepGreen.Dark} onClickAction={() => navigateToPath('/jobs/add')}  /></TableCell>
											</TableRow>
										</TableHead>
										<TableBody>
											{!showLoader && calcSetList && calcSetList?.length === 0  &&  
												<TableRow>
													<TableCell component="th" scope="row" align="left">No settings have been configured.</TableCell>
												</TableRow>
											}
											{calcSetList?.map((row: any, key: number) => (
												<TableRow key={key}>
													<TableCell component="th" scope="row" align="left">{row.name}</TableCell>
													<TableCell component="th" scope="row" align="right">
														<ButtonLinks label="OPEN" icon="edit" bgColor={Palette.deepPurple.Dark} onClickAction={() => navigateToPath(`/jobs/edit/${row.id}`)}  />
														<ButtonLinks label="DEL" icon="delete" circleIcon={true} color={Palette.Red.Main} bgColor={Palette.deepMaroon.BgLight} onClickAction={() => { return false }} />
													</TableCell>
												</TableRow>
											))}
										</TableBody>
									</Table>
								</TableContainer>
							</Box>

							<Box display="flex">
							<Box p={1} width="100%">
								<Typography variant="h5" component="h2">Jobs</Typography>
							</Box>
							<Box p={1} flexShrink={1}>
								
							</Box>
						</Box>

							<Box alignItems="center" py={2}>
								<TableContainer className={classes.table} component={Paper}>
									<Table aria-label="table">
										<TableHead>
											<TableRow>
												<TableCell align="left" width="30%"><b>Settings Used</b></TableCell>
												<TableCell align="left" width="20%"><b>Valuation Date</b></TableCell>
												<TableCell align="left" width="30%"><b>Run Date</b></TableCell>
												<TableCell align="left" width="10%"><b>Status</b></TableCell>
												<TableCell align="left" width="10%"><b>Result</b></TableCell>
											</TableRow>
										</TableHead>
										<TableBody>
											{!showLoader && jobList && jobList?.length === 0  &&  
												<TableRow>
													<TableCell component="th" scope="row" align="left">There are no jobs to show.</TableCell>
												</TableRow>
											}
											{jobList?.map((row: any, key: number) => (
												<TableRow key={key}>
													<TableCell component="th" scope="row" align="left">{getName(row)}</TableCell>
													<TableCell component="th" scope="row" align="left">{row.valuationDate.split('T')[0]}</TableCell>
													<TableCell component="th" scope="row" align="left">{row.runDate}</TableCell>
													<TableCell component="th" scope="row" align="left">{getStatus(row.calcStatus)}</TableCell>
													<TableCell component="th" scope="row" align="left">{getResult(row)}</TableCell>
												</TableRow>
											))}
										</TableBody>
									</Table>
								</TableContainer>
							</Box>
							</>
						}
					</CardContent>
				</Box>
			</Card>
		</>
	)

};

export default React.memo(JobListing);