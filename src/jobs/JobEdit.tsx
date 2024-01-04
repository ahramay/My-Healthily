import React, { useState, useEffect } from 'react'; //useMemo
import { useHistory, useParams } from 'react-router-dom';
import Box from '@material-ui/core/Box';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import Button from  '@material-ui/core/Button';
import ButtonIcon from 'styleguide/ButtonIcon';
import Grid from '@material-ui/core/Grid';
import { INPUT_PATTERN_NUMBER } from 'utility/constants';
import Form from 'styleguide/layout/Form';
import FormLabel from 'styleguide/form/Text/FormLabel';
import TextField from 'styleguide/form/Text/Field';
import Notification from 'styleguide/form/Notification';
import Loader from 'styleguide/Loader';
import { API_PORTFOLIOS, API_NOTIFICATION_MESSAGES, API_SCENARIOS, API_CALCSETTINGS } from 'services/api/config';
import { serviceQuery } from 'services/query';
import RunJob from './RunJob';

import ChoiceGroup from 'styleguide/form/ChoiceGroup/ChoiceGroup';

const JobEdit: React.FC = () => {

	const { slug3 }: any = useParams();
    const calcID = slug3;
	const history = useHistory();
    const [notification, setNotification] = useState<any>(null);
    const [showLoader, setShowLoader] = useState<boolean>(true);
    const [hideForm, setHideForm] = useState<boolean>(true);
	const [isSaved, setIsSaved] = useState<boolean>(true);

    const [fetchRecords, setFetchRecords] = useState<boolean>(true);
	const [portfolios, setPortfolios] = useState<any>([]);
	const [scenarios, setScenarios] = useState<any>([]);

	const [jobFields, setJobFields] = useState<any>({
		portfolioSerialID: null,
		name: '',
		forecastHorizon: '',
		modelHorizon: '',
		samplingInterval: '',
		numberOfSamples: '',
	});

	const [scenarioChoices, setScenarioChoices] = useState<any>([]);

	useEffect(() => {
        if (!fetchRecords) return;

		const errors:any = [];
	
		serviceQuery(API_SCENARIOS).fetchAll().then((result) => {
			const selVal = result.data.map((item: any) => {
				return { label: item.name, value: item.id };
			});
			setScenarios(selVal);
		}).catch(err => {
			errors.push(err);
		}).then(() => {
			serviceQuery(API_PORTFOLIOS).fetchAll().then((result) => {
				const selVal = result.data.map((item: any) => {
					return { label: item.name, value: item.id };
				});
				setPortfolios(selVal);
			}).catch(err => {
				errors.push(err);
			}).then(() => {
				serviceQuery(API_CALCSETTINGS).fetchById(calcID).then(async (result) => {
					const calcSettings = await result.data;
					setJobFields({
						name: calcSettings.name,
						portfolioSerialID: calcSettings.portfolioSerialID,
						forecastHorizon: calcSettings.forecastHorizon,
						modelHorizon: calcSettings.modelHorizon,
						samplingInterval: calcSettings.samplingInterval,
						numberOfSamples: calcSettings.numberOfSamples,
					});
					setScenarioChoices(calcSettings.scenarios.map((item: any) => { return item.scenarioSerialID }));
				}).catch((err) => {
					errors.push(err);
				}).finally(() => {
					if (errors.length) {
						setNotification([API_NOTIFICATION_MESSAGES.ALERT.ERROR, errors.join()]);
					}
					setShowLoader(false);
					setHideForm(false);
				});
			});
		});
		setFetchRecords(false);
	
    }, [fetchRecords, calcID]);

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

		serviceQuery(API_CALCSETTINGS + '/' + calcID).put(calcSetAPIData).then(async (result) => {
			console.log(result);
		}).catch(err => {
			console.warn(err)
			setNotification([API_NOTIFICATION_MESSAGES.ALERT.ERROR, err]);
		}).finally(() => {
			setShowLoader(false);
			setIsSaved(true);
		});
	}

	const handleRunError = () => {};

	const handleRunSuccess = () => {};

	const handleRunSave = () => {};

	return (
		<>
			<Card>
				<Box p={2.5}>
					<CardContent>

						<Box display="flex">
							<Box p={1} width="100%">
								<Typography variant="h5" component="h2">Edit Settings</Typography>
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
															name="portfolioSerialID" value={jobFields.portfolioSerialID} required={false}
															type="autoComplete" selectOptions={portfolios} fullWidth={true}
															onChange={handleJobFields} icon="search"
														/>
													</FormLabel>
												</Grid>
											</Grid>
										</Grid>

										<Grid item sm={3} xl={3}>
											<Grid item xs={12} sm={12} xl={12}>
												<ChoiceGroup title="Scenarios" list={scenarios} selected={scenarioChoices} limit={5} onChange={handleChoices} sortOrder="DESC" bottomBorder={false} />
											</Grid>
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
						{!hideForm && isSaved && canSave() &&
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
			<br></br>
			{!hideForm && isSaved && 
				<Grid container spacing={2}>
					<Grid item sm={6} xl={6} xs={12}>
						<RunJob onError={handleRunError} onSuccess={handleRunSuccess} onSaveStart={handleRunSave} calcSettingsID={calcID}></RunJob>
					</Grid>
				</Grid>
			}
		</>
	)

};

export default React.memo(JobEdit);