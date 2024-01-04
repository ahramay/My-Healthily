import React, { useState, useEffect } from 'react'; //useMemo
import { useHistory } from 'react-router-dom';
import Box from '@material-ui/core/Box';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import Button from  '@material-ui/core/Button';
import ButtonIcon from 'styleguide/ButtonIcon';
import Grid from '@material-ui/core/Grid';
//import Chip from '@material-ui/core/Chip';
//import Icon from '@material-ui/core/Icon';
import { INPUT_PATTERN_NUMBER } from 'utility/constants';
import Form from 'styleguide/layout/Form';
import FormLabel from 'styleguide/form/Text/FormLabel';
import TextField from 'styleguide/form/Text/Field';
//import ButtonIcon from 'styleguide/ButtonIcon';
import Notification from 'styleguide/form/Notification';
import Loader from 'styleguide/Loader';
import { API_PORTFOLIOS, API_NOTIFICATION_MESSAGES, API_SCENARIOS, API_CALCSETTINGS } from 'services/api/config';
import { serviceQuery } from 'services/query';

import ChoiceGroup from 'styleguide/form/ChoiceGroup/ChoiceGroup';

const JobAdd: React.FC = () => {

	const history = useHistory();
    const [notification, setNotification] = useState<any>(null);
    const [showLoader, setShowLoader] = useState<boolean>(false);
    const [hideForm, setHideForm] = useState<boolean>(false);
	const [isSaved, setIsSaved] = useState<boolean>(true);

    const [fetchRecords, setFetchRecords] = useState<boolean>(true);
	const [portfolios, setPortfolios] = useState<any>([]);
	const [scenarios, setScenarios] = useState<any>([]);
	const [calcSetID, setCalcSetID] = useState<any>(null);

	const [jobFields, setJobFields] = useState<any>({
		numberOfSamples: 100000,
		modelHorizon: 7,
		samplingInterval: 26,
		forecastHorizon: 104,
		portfolioSerialID: null
	});

	const [scenarioChoices, setScenarioChoices] = useState<any>([]);

	useEffect(() => {
		setHideForm(false);

        if (!fetchRecords) return;
	
		serviceQuery(API_SCENARIOS).fetchAll().then((result) => {
			const selVal = result.data.map((item: any) => {
				return { label: item.name, value: item.id };
			});
			setScenarios(selVal);
		}).catch(err => {
			if(!err) return;
			setNotification([API_NOTIFICATION_MESSAGES.ALERT.ERROR, err.message]);
			setShowLoader(false);
		}).then(() => {
			serviceQuery(API_PORTFOLIOS).fetchAll().then((result) => {
				const selVal = result.data.map((item: any) => {
					return { label: item.name, value: item.id };
				});
				setPortfolios(selVal);
				setShowLoader(false);
			}).catch(err => {
				if(!err) return;
				setNotification([API_NOTIFICATION_MESSAGES.ALERT.ERROR, err.message]);
				setShowLoader(false);
			});
		});
		setFetchRecords(false);
	
    }, [fetchRecords]);

	const handleJobFields = (value: any, name: string) => {
        setJobFields({
            ...jobFields,
            [name]: value,
        })
		setIsSaved(false);
    }

	const handleChoices = (value: any) => {
		setScenarioChoices(value);
		setIsSaved(false);
	};

	const canSave = () => {
		return jobFields.name && jobFields.name !== '' && jobFields.portfolioSerialID && jobFields.portfolioSerialID !== '';
	};

	const doSave = () => {
		setShowLoader(true);
		console.log('saving');

		const calcSetAPIData: any = {
			name: jobFields.name,
			valuationDate: jobFields.valuationDate,
			portfolioSerialID: parseInt(jobFields.portfolioSerialID),
			scenarios: scenarioChoices.map((id: any) => {
				return { scenarioSerialID: parseInt(id) };
			}),
			modelHorizon: parseInt(jobFields.modelHorizon),
			samplingInterval: parseInt(jobFields.samplingInterval),
			numberOfSamples: parseInt(jobFields.numberOfSamples),
			forecastHorizon: parseInt(jobFields.forecastHorizon),
		};

		serviceQuery(API_CALCSETTINGS).create(calcSetAPIData).then(async (result) => {
			setCalcSetID(result.data);
			console.info(calcSetID);
		}).catch(err => {
			console.warn(err)
			setNotification([API_NOTIFICATION_MESSAGES.ALERT.ERROR, err]);
		}).finally(() => {
			setShowLoader(false);
		});
	}

	return (
		<>
			<Card>
				<Box p={2.5}>
					<CardContent>

						<Box display="flex">
							<Box p={1} width="100%">
								<Typography variant="h5" component="h2">Create Settings</Typography>
							</Box>
						</Box>

						<Divider />

						{showLoader && <Loader margin={2} /> }

						{notification && notification?.length && 
							<Box my={1}>
								<Notification severity={notification?.[0]} message={notification?.[1]} />
							</Box>
						}

						{!hideForm &&
							<Box>
								<Form>
									<Grid container spacing={2}>
										<Grid item sm={9} xl={9}>
											<Grid container spacing={2}>
												<Grid item xs={12} sm={12} xl={12}>
													<FormLabel label="Settings Name">
														<TextField 
															name="name" value={jobFields.name} error={false} required={true}
															onChange={handleJobFields}
														/>
													</FormLabel>
												</Grid>
												
												<Grid item xs={12} sm={12} xl={12}>
													<FormLabel label="Portfolio">
														<TextField 
															name="portfolioSerialID" value={''} required={false}
															type="autoComplete" selectOptions={portfolios} fullWidth={true}
															onChange={handleJobFields} icon="search"
														/>
													</FormLabel>
												</Grid>
											</Grid>
										</Grid>

										<Grid item sm={3} xl={3}>
											<Grid item xs={12} sm={12} xl={12}>
												<ChoiceGroup title="Scenarios" list={scenarios} limit={5} onChange={handleChoices} sortOrder="DESC" bottomBorder={false} />											</Grid>
										</Grid>
									</Grid>

									<Grid container spacing={2}>
										<Grid item sm={3} xl={3}>
											<FormLabel label="Number Of Samples">
												<TextField 
													name="numberOfSamples" value={jobFields.numberOfSamples} error={false}
													onChange={handleJobFields} inputPattern={INPUT_PATTERN_NUMBER} validationPattern={INPUT_PATTERN_NUMBER}
												/>
											</FormLabel>
										</Grid>
										<Grid item sm={3} xl={3}>
											<FormLabel label="Model Horizon">
												<TextField 
													name="modelHorizon" value={jobFields.modelHorizon} error={false}
													onChange={handleJobFields} inputPattern={INPUT_PATTERN_NUMBER} validationPattern={INPUT_PATTERN_NUMBER}
												/>
											</FormLabel>
										</Grid>
										<Grid item sm={3} xl={3}>
										<FormLabel label="Sampling Interval">
												<TextField 
													name="samplingInterval" value={jobFields.samplingInterval} error={false}
													onChange={handleJobFields} inputPattern={INPUT_PATTERN_NUMBER} validationPattern={INPUT_PATTERN_NUMBER}
												/>
											</FormLabel>
										</Grid>
										<Grid item sm={3} xl={3}>
											<FormLabel label="Forecast Horizon">
												<TextField 
													name="forecastHorizon" value={jobFields.forecastHorizon} error={false}
													onChange={handleJobFields} inputPattern={INPUT_PATTERN_NUMBER} validationPattern={INPUT_PATTERN_NUMBER}
												/>
											</FormLabel>
										</Grid>
									</Grid>

									{ !isSaved && canSave() &&
									<Box display="flex" flexDirection="row" mt={2}>
										<Box>
											<Button variant="contained" color="secondary" size="large" disableElevation={true} 
											onClick={ doSave } >
												<ButtonIcon icon="check_circle" label="Save Settings" />
											</Button>
										</Box>
									</Box>
									}
								</Form>
							</Box>
						}
						{isSaved && canSave() &&
							<>
								<Divider />
								<Box display="flex" flexDirection="row" mt={2}>
									<Box mr={2}>
										<Button variant="contained" color="primary" size="large" disableElevation={true} 
										onClick={() => { history.push('/jobs') }} >
											<ButtonIcon icon="check_circle" label="Back to Jobs" />
										</Button>
									</Box>
								</Box>
							</>
						}
					</CardContent>
				</Box>
			</Card>
		</>
	)

};

export default React.memo(JobAdd);