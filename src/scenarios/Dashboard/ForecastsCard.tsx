import React, { useState, useCallback, useMemo, useEffect } from 'react';
import { Palette } from 'utility/Colors/Palette';
import Box from '@material-ui/core/Box';
import Divider from '@material-ui/core/Divider';
import Button from  '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';

import Form from 'styleguide/layout/Form';
import FormLabel from 'styleguide/form/Text/FormLabel';
import TextField from 'styleguide/form/Text/Field';
import ButtonIcon from 'styleguide/ButtonIcon';

import { API_NOTIFICATION_MESSAGES } from 'services/api/config';

import Notification from 'styleguide/form/Notification';
import ForecastsTable from 'scenarios/Dashboard/ForecastsTable';
import { forecastTypes } from 'staticData/scenariosList';
import { copyObject } from 'utility/common';

export type Props = {
    onChange?: (data: any) => void;
	disabledMode: boolean;
	forecastDBData?: any;
    scenarioDate: string;
	assetData?: any; 
    assetNames: any;
	assetNameMap: any;
	assetClasses: any;
	geographies: any;
	currencies: any;
    formData?: any;
}
const ForecastsCard: React.FC<Props> = ({ 
		forecastDBData,
		disabledMode,
		scenarioDate, 
		formData,
		assetData,
		assetNames,
		assetNameMap,
		assetClasses,
		geographies,
		currencies,
		onChange
	}) => {
    const [notification, setNotification] = useState<any>(null);
	const [filterMap] = useState<any>(new Map());
	const [filteredAssetNames, setFilteredAssetNames] = useState<any>([]);
	const [fetchRecords, setFetchRecords] = useState<boolean>(true);

    const [scenarioForecastFields, setScenarioForecastFields] = useState<any>({
        forecastType : '1',
        forecastIndex : '',
		forecastAssetName: '',
		forecastData: [],
    });

    const [scenarioForecastInputs, setScenarioForecastInputs] = useState<any>([]);

	useMemo(() => {
        if (!fetchRecords) return;
		setFilteredAssetNames(assetNames);
		setFetchRecords(false);
	}, [fetchRecords, assetNames]);

	const handleFilterFields = (field: string, value: string) => {
		if (field === 'assetName') {
			handleScenarioForecastFields(value, field);
			return;
		}
		filterMap.set(field, value);
		let a = assetData.filter((record: any, index: Number) => {
			for (let key of filterMap.keys()) {
				let fv = filterMap.get(key)
				if (fv === '') {
					continue;
				}
				if (record[key] !== fv) {
					return false;
				}
			}
			return true;
		});
		let names: any[] = [];
		for (let i = 0; i < a.length; i += 1) {
			let r = a[i];
			names.push({ value: r.id, label: r.name })
		}
		setFilteredAssetNames(names);
	};

    const handleScenarioForecastFields = useCallback((value: any, name: string) => {
		const getNameFromAssetId = (id: string) => {
			for (let i = 0; i < assetNames.length; i += 1) {
				let r = assetNames[i];
				if (r.value === id) {
					return r.label;
				}
			}
		};

		const dumbFieldTranslationMap = new Map();
		dumbFieldTranslationMap.set('assetClass', 'forecastClass');
		dumbFieldTranslationMap.set('region', 'forecastGeography');
		dumbFieldTranslationMap.set('priceCurrency', 'forecastCurrencies');
		dumbFieldTranslationMap.set('assetName', 'forecastIndex');

		const fname = dumbFieldTranslationMap.get(name) || name;
        scenarioForecastFields[fname] = value;

		if (fname === 'forecastIndex') {
			scenarioForecastFields['forecastAssetName'] = getNameFromAssetId(value);
		}
		setScenarioForecastFields(scenarioForecastFields);
	}, [scenarioForecastFields, assetNames]);

    const handleAddForcecast = useCallback(() => {
		if (!scenarioDate) {
            setNotification([API_NOTIFICATION_MESSAGES.ALERT.ERROR, "Date Cannot be empty"]);
            return;
        }
		setNotification(null);
        let list = scenarioForecastInputs?.data || [];
		list.push(copyObject(scenarioForecastFields));

        setScenarioForecastInputs({
            data: list,
        });
    }, [scenarioForecastInputs, scenarioForecastFields, scenarioDate]);

    const handleUpdateForecastData = useCallback((newData) => { // Parse data from child *shudder*
		let l = [];
		for (let i = 0; i < newData.data.length; i += 1) {
			let r = newData.data[i];
			l.push({ forecastAssetName: r.name, forecastIndex: r.id, forecastType: r.type, forecastData: r.data, forecastID: r.dbID, forecastTagID: r.tag });
		}
        setScenarioForecastInputs({ data: l });
		onChange?.({ scenarioForecastFields, scenarioForecastInputs: l });
    }, [scenarioForecastFields, onChange]);

	const monthsToSymbols = (m: any) => {
		m = '' + m;
		if (m === '3') return '3M';
		if (m === '6') return '6M';
		if (m === '12') return '12M';
		if (m === '18') return '18M';
		if (m === '24') return '2Y';
		if (m === '36') return '3Y';
		if (m === '60') return '5Y';
		if (m === '120') return '10Y';
	};

	const getIndex = (c: any) => {
		if (c.title === '3M') return 0;
		if (c.title === '6M') return 1;
		if (c.title === '12M') return 2;
		if (c.title === '18M') return 3;
		if (c.title === '2Y') return 4;
		if (c.title === '3Y') return 5;
		if (c.title === '5Y') return 6;
		if (c.title === '10Y') return 7;
	}

	const getTitle = (i: any) => {
		if (i === 0) return '3M';
		if (i === 1) return '6M';
		if (i === 2) return '12M';
		if (i === 3) return '18M';
		if (i === 4) return '2Y';
		if (i === 5) return '3Y';
		if (i === 6) return '5Y';
		if (i === 7) return '10Y';
	}

	useEffect(() => { // Load from Database once render has complete
        if (!forecastDBData) {
			return;
		}
		let list = [];
		for (let i = 0; i < forecastDBData.length; i += 1) {
			let fi = forecastDBData[i];
			let o:any = {
				forecastTagID: fi.tagID,
				forecastID: fi.id,
				forecastAssetName: fi.name,
				forecastData: [] as any
			};
			if (fi.components[0]) {
				o['forecastIndex'] = fi.components[0].singleIndexID;
				o['forecastType'] = fi.components[0].componentType;
			}
			for (let j = 0; j < fi.components.length; j += 1) {
				let ci = fi.components[j];
				let co = { // transmogrify into a format the dumb child component can deal with.
					value: ci.value,
					type: '%',
					title: monthsToSymbols(ci.targetDate)
				}
				let idx = getIndex(co);
				if (!idx && idx !== 0) {
					idx = -1;
				}
				o.forecastData[idx] = co;
			}
			for (let k = 0; k < 8; k += 1) {
				if (!o.forecastData[k]) {
					o.forecastData[k] = { value: '', type: '%', title: getTitle(k) }
				}
			}
			list.push(o);
		}
		setScenarioForecastInputs({
			data: list,
		});

	}, [forecastDBData]);

	const handleDeleteRow = (index: number) => { // TODO: push the update to parent, make sure state is set correctly
		scenarioForecastInputs.data.splice(index, 1);
		setScenarioForecastInputs(copyObject(scenarioForecastInputs));
	}


    return (
	<Card>
		<Box bgcolor={Palette.Grey.Lighter} p={1}>
			<CardContent>
				<Box display="flex">
					<Box p={1} width="100%">
						<Typography variant="h5" component="h2">Scenario Forecasts</Typography>
					</Box>
				</Box>
				<Divider />

				{!disabledMode &&
					<Box alignItems="center" py={2}>
						<Form>

							<Grid container spacing={2}>
								<Grid item xs={12} sm={2} xl={2}>
									<FormLabel label="Type">
										<TextField 
											name="forecastType" value={scenarioForecastFields.forecastType} error={false} required={true} tabIndex={1}
											type="select" selectOptions={forecastTypes} fullWidth={true}
											onChange={handleScenarioForecastFields}
										/>
									</FormLabel>
								</Grid>
								<Grid item xs={12} sm={2} xl={2}>
									<FormLabel label="Class">
										<TextField 
											name="filter_portfolioClass" value={''} required={false} tabIndex={1}
											type="select" selectOptions={assetClasses}
											fullWidth={true} icon="search"
											onChange={(e) => { handleFilterFields('assetClass', e) }}
										/>
									</FormLabel>
								</Grid>
								<Grid item xs={12} sm={2} xl={2}>
									<FormLabel label="Geography">
										<TextField 
											name="filter_geography" value={''} required={false} tabIndex={1}
											type="select" selectOptions={geographies}
											fullWidth={true} icon="search"
											onChange={(e) => { handleFilterFields('region', e) }}
										/>
									</FormLabel>
								</Grid>
								<Grid item xs={12} sm={2} xl={1}>
									<FormLabel label="Currency">
										<TextField 
											name="filter_currency" value={''} required={false} tabIndex={1}
											type="select" selectOptions={currencies}
											fullWidth={true} icon="search"
											onChange={(e) => { handleFilterFields('priceCurrency', e) }}
										/>
									</FormLabel>
								</Grid>
								<Grid item xs={12} sm={4} xl={4}>
									<FormLabel label="Asset">
										<TextField 
											name="filter_name" value={''} required={false} tabIndex={1}
											type="autoComplete" selectOptions={filteredAssetNames} fullWidth={true}
											onChange={(e) => { handleFilterFields('assetName', e) }} icon="search"
										/>
									</FormLabel>
								</Grid>
								
								<Grid item xs={12} sm={1} xl={1}>
									<Box width={1} height={1} pb={1} display="flex" alignItems="flex-end" justifyContent="flex-start">
										<Button size="small" variant="outlined" color="primary" onClick={() => handleAddForcecast()} >
											<ButtonIcon icon="add" label="ADD" />
										</Button>
									</Box>
								</Grid>
							</Grid>

							<Grid container spacing={2}>
								
							</Grid>

						</Form>
					</Box>
				}

                {scenarioForecastInputs?.data?.length > 0 && 
                    <Box alignItems="center" py={2}>
                        <FormLabel label="Set Forecast Inputs" />
						<Box mb={2}>
							<ForecastsTable onForecastChange={handleUpdateForecastData} onDeleteRow={handleDeleteRow} disabledMode={disabledMode} scenarioDate={scenarioDate} forecasts={scenarioForecastInputs} />
						</Box>
                    </Box>
                }

                {notification && notification?.length && 
                    <Box my={1}>
                        <Notification severity={notification?.[0]} message={notification?.[1]} />
                    </Box>
                }
            </CardContent>
        </Box>
    </Card>
    )
}

export default React.memo(ForecastsCard);