import React, { useState, useMemo } from 'react';
import { useHistory } from 'react-router-dom';
import Box from '@material-ui/core/Box';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import Grid from '@material-ui/core/Grid';
import Chip from '@material-ui/core/Chip';
import Icon from '@material-ui/core/Icon';
import Form from 'styleguide/layout/Form';
import FormLabel from 'styleguide/form/Text/FormLabel';
import TextField from 'styleguide/form/Text/Field';
import Button from  '@material-ui/core/Button';
import ButtonIcon from 'styleguide/ButtonIcon';

import { API_SCENARIOS, API_FORECASTS, API_NOTIFICATION_MESSAGES } from 'services/api/config';
import { serviceQuery } from 'services/query';
import Notification from 'styleguide/form/Notification';
import Loader from 'styleguide/Loader';

import { scenarioTypes } from 'staticData/portfolioFilters';
import ForecastsCard from './ForecastsCard';

const ScenariosAdd: React.FC = () => {
    const history = useHistory();
    const [notification, setNotification] = useState<any>(null);
    const [showLoader, setShowLoader] = useState<boolean>(false);
    const [hideForm, setHideForm] = useState<boolean>(false);

    const [fetchRecords, setFetchRecords] = useState<boolean>(true);
	const [isSaved, setIsSaved] = useState<boolean>(false);

    const [assets, setAssets] = useState<any>([]);
    const [assetNames, setAssetNames] = useState<any>([]);
	const [assetNameMap, setAssetNameMap] = useState<any>(new Map());
	const [assetClasses, setAssetClasses] = useState<any>([]);
	const [geographies, setGeographies] = useState<any>([]);
	const [currencies, setCurrencies] = useState<any>([]);

	const [forecastData, setForecastData] = useState<any>({});

	const canPublish = false;

	const [scenarioFields, setScenarioFields] = useState<any>({
        scenarioName : '',
        scenarioDescription : '',
        scenarioType: 0,
        scenarioDate: '',
		scenarioTags: '',
    });

	const parseDateSymbols = (s: string) => {
		if (s === '3M') return 3;
		if (s === '6M') return 6;
		if (s === '12M') return 12;
		if (s === '18M') return 18;
		if (s === '2Y') return 24;
		if (s === '3Y') return 36;
		if (s === '5Y') return 60;
		if (s === '10Y') return 120;
	};

    useMemo(() => {
        if (!fetchRecords) return;
        let err;
        try {
            let s: string = window.sessionStorage.getItem('assets') || '[]';
            let d = JSON.parse(s);
            setAssets(d);
            let namesMap = new Map();

            for (let i = 0; i < d.length; i += 1) {
                let r = d[i];
                namesMap.set(r.id, r.name);
            }
            setAssetNameMap(namesMap);

            s = window.sessionStorage.getItem('assetNames') || '[]';
            d = JSON.parse(s);
            setAssetNames(d);

            s = window.sessionStorage.getItem('assetClasses') || '[]';
            d = JSON.parse(s);
            setAssetClasses(d);

            s = window.sessionStorage.getItem('geographies') || '[]';
            d = JSON.parse(s);
            setGeographies(d);

            s = window.sessionStorage.getItem('currencies') || '[]';
            d = JSON.parse(s);
            setCurrencies(d);
        } catch (e) {
            err = e;        
        }
        if (err) {
            return;
        }
        setFetchRecords(false);
    }, [fetchRecords]);

    const handleScenarioFields = (value: any, name: string) => {
        setScenarioFields({
            ...scenarioFields,
            [name]: value,
        })
    }

    const handleChangeForecast = (data: any) => {
console.log(data)
		setIsSaved(false);
		setForecastData(data);
    }

	const doSave = () => {
		if (isSaved) {
			return;
		}
		setShowLoader(true);

		let forecastPayloads = [];

		if (forecastData.scenarioForecastInputs && forecastData.scenarioForecastInputs.length) {

			for (let forecastIndex = 0; forecastIndex < forecastData.scenarioForecastInputs.length; forecastIndex += 1) {
				let a = forecastData.scenarioForecastInputs[forecastIndex];
				let c:any = [];
				const apiForecastPayload = {
					tagID: '',
					name: a.forecastAssetName,
					forecastDate: scenarioFields.scenarioDate,
					forecasterID: 0,
					components: c
				};
				
				for (let i = 0; i < a.forecastData.length; i += 1) {
					let d = a.forecastData[i];
					let v = parseFloat(d.value);
					if (!v && v !== 0) {
						continue; // skip it
					}
					apiForecastPayload.components.push(
						{
							portfolioSerialID: 0,
							singleIndexID: a.forecastIndex,
							componentType: 1,
							metricType: 1,
							forecastDateType: 0,
							targetDate: parseDateSymbols(d.title),
							shiftType: 1,
							value: v
						}
					);
				}
				forecastPayloads.push(apiForecastPayload);
			}
		}

		const forecastComponents:any = [];
		const saveErrors: any = [];

		Promise.all(forecastPayloads.map(async (apiPayload) => {

			return serviceQuery(API_FORECASTS).create(apiPayload).then(async (result) => {
				forecastComponents.push({ forecastSerialID: result.data, forecastWeight: 1 });
			}).catch(err => {
				console.warn(err)
				saveErrors.push(err);
			});
		})).then(() => {

			if (saveErrors.length) {
				setShowLoader(false);
				setNotification([API_NOTIFICATION_MESSAGES.ALERT.ERROR, saveErrors.join()]);
				return;
			}

			const apiScenarioPayload = {
				name: scenarioFields.scenarioName,
				description: scenarioFields.scenarioDescription,
				scenarioDate: scenarioFields.scenarioDate,
				themeType:  parseInt(scenarioFields.scenarioType),
				visibility: 1,
				tagID: '',
				permissions: [{ permittedClientSerialID: 0, permissions: 0 }],
				components: forecastComponents
			};

			serviceQuery(API_SCENARIOS).create(apiScenarioPayload).then(async (result) => {
				const portfolio = await result.data;
				if (portfolio) {
					setNotification([API_NOTIFICATION_MESSAGES.ALERT.SUCCESS, API_NOTIFICATION_MESSAGES.RECORD_CREATED_SUCCESS]);
					setHideForm(true);
				}
			}).then(() => {
				setHideForm(true);
			}).catch(err => {
				console.warn(err.message);
				saveErrors.push(err);
				setNotification([API_NOTIFICATION_MESSAGES.ALERT.ERROR, saveErrors.join()]);
			}).finally(() => {
				setShowLoader(false);
			});
		});
		
	}

	const canSave = () => {
		return scenarioFields.scenarioDate !== '' && scenarioFields.scenarioName !== ''
	}

    return (
        <>
            <Card>
                <Box p={2.5}>
                    <CardContent>

						<Box display="flex">
							<Box p={1} width="100%">
								<Typography variant="h5" component="h2">Add Scenarios</Typography>
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
										<Grid item xs={12} sm={6} xl={6}>
											<FormLabel label="Scenario Name">
												<TextField 
													name="scenarioName" value={scenarioFields.scenarioName} error={false} required={true}
													onChange={handleScenarioFields}
												/>
											</FormLabel>
										</Grid>
										
										<Grid item xs={12} sm={3} xl={3}>
											<FormLabel label="Scenario Type">
												<TextField 
													name="scenarioType" value={scenarioFields.scenarioType} error={false} required={true}
													type="select" selectOptions={scenarioTypes} fullWidth={true}
													onChange={handleScenarioFields}
												/>
											</FormLabel>
										</Grid>
									
										<Grid item xs={12} sm={3} xl={3}>
											<FormLabel label="Scenario Date">
												<TextField 
													name="scenarioDate" value={scenarioFields.scenarioDate} error={true} required={true}
													onChange={handleScenarioFields} type="date"
												/>
											</FormLabel>
										</Grid>
									
										<Grid item xs={12} sm={12} xl={12}>
											<FormLabel label="Description">
												<TextField 
													name="scenarioDescription" multiline={true} rows={3} value={scenarioFields.scenarioDescription} error={false} required={true}
													onChange={handleScenarioFields}
												/>
											</FormLabel>
										</Grid>

									</Grid>
								</Form>
							</Box>
						}

                        {!hideForm &&
                            <Box my={2.5}>
                                <ForecastsCard onChange={handleChangeForecast} disabledMode={false} scenarioDate={scenarioFields.scenarioDate} assetData={assets} assetNames={assetNames} assetNameMap={assetNameMap} assetClasses={assetClasses} geographies={geographies} currencies={currencies} />
                            </Box>
                        }

						{!hideForm && !isSaved && canSave() &&
						<Box display="flex" flexDirection="row" mt={2}>
							<Box>
								<Button variant="contained" color="secondary" size="large" disableElevation={true} 
								onClick={ doSave } >
									<ButtonIcon icon="check_circle" label="Save Scenario" />
								</Button>
							</Box>
						</Box>
						}

						{ isSaved && 
						<div>
							{ canPublish &&
							<div>
								<Box my={2.5}>
									<FormLabel label="Forecast Publish Type">
										<Box display="flex" flexDirection="row" my={1}>
											<Box pr={1}>
												<Chip label="Private" />
											</Box>
											<Box pr={1}>
												<Chip icon={<Icon>face_icon</Icon>} label="Enterprise" color="primary" />
											</Box>
											<Box pr={1}>
												<Chip label="Subscriptions" />
											</Box>
											<Box pr={1}>
												<Chip label="Public" />
											</Box>
										</Box>
									</FormLabel>
								</Box>
								<Box>
									<p><u>Note:</u></p>
									<ul>
										<li>Private (force excludes everything else)</li>
										<li>Enterprise (includes Private, excludes Public)</li>
										<li>Subscriptions (excludes Enterprise, force excludes Public)</li>
										<li>Public (includes everything)</li>
									</ul>
								</Box>
							</div>
							}
							<Divider />
							<Box display="flex" flexDirection="row" mt={2}>
								<Box>
									<Button variant="contained" color="secondary" size="large" disableElevation={true} 
									onClick={() => { history.push('/') }} >
										<ButtonIcon icon="check_circle" label="Back to Scenarios" />
									</Button>
								</Box>
							</Box>
						</div>
						}

                    </CardContent>

                </Box>
            </Card>
        </>
    )
};

export default React.memo(ScenariosAdd);