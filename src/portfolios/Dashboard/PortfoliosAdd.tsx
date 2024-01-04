import React, { useState, useMemo } from 'react';
import { useHistory } from 'react-router-dom';
import Box from '@material-ui/core/Box';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import Button from  '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';

import { API_PORTFOLIOS, API_NOTIFICATION_MESSAGES } from 'services/api/config';
import { serviceQuery } from 'services/query';
import Notification from 'styleguide/form/Notification';
import Loader from 'styleguide/Loader';
import { v4 as uuidv4 } from 'uuid';
import { randomCodeByLength } from 'utility/common'; // , convertToCode, trimCodeByLength

import ForecastsCardBasic from './ForecastsCardBasic';
import Form from 'styleguide/layout/Form';
import FormLabel from 'styleguide/form/Text/FormLabel';
import TextField from 'styleguide/form/Text/Field';
import ButtonIcon from 'styleguide/ButtonIcon';


const PortfoliosAdd: React.FC = () => {
    const history = useHistory();
    const [notification, setNotification] = useState<any>(null);
    const [showLoader, setShowLoader] = useState<boolean>(false);
    const [hideForm, setHideForm] = useState<boolean>(false);
    
    const [savePortfolioActive, setSavePortfolioActive] = useState<boolean>(false);
    const [portfolioFields, setPortfolioFields] = useState<any>({
        portfolioName : '',
        portfolioDescription : '',
        portfolioDate: '',
        portfolioBaseCurrency: '',
		portfolioTags: '',
    });

	const [useDefaultQuestion, setUseDefaultQuestion] = useState<boolean>(true);
	const [manualEdit, setManualEdit] = useState<boolean>(false);
	const [cardPreviousData, setCardPreviousData] = useState<any>(null);
	
    const [fetchRecords, setFetchRecords] = useState<boolean>(true);

    const [assets, setAssets] = useState<any>([]);
    const [assetNames, setAssetNames] = useState<any>([]);
	const [filteredAssetNames, setFilteredAssetNames] = useState<any>([]);
	const [assetNameMap, setAssetNameMap] = useState<any>(new Map());

	const [assetClasses, setAssetClasses] = useState<any>([]);
	const [geographies, setGeographies] = useState<any>([]);
	const [currencies, setCurrencies] = useState<any>([]);
	const [filterMap] = useState<any>(new Map());

	const [addAssetID, setAddAssetId] = useState<string>();

    useMemo(() => {
        if (!fetchRecords) return;
        
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
		setFilteredAssetNames(d);

		s = window.sessionStorage.getItem('assetClasses') || '[]';
		d = JSON.parse(s);
		setAssetClasses(d);

		s = window.sessionStorage.getItem('geographies') || '[]';
		d = JSON.parse(s);
		setGeographies(d);

		s = window.sessionStorage.getItem('currencies') || '[]';
		d = JSON.parse(s);
		setCurrencies(d);

        setFetchRecords(false);
    }, [fetchRecords]);


    const handleportfolioFields = (value: any, name: string) => {
        setPortfolioFields({
            ...portfolioFields,
            [name]: value,
        });
    }

	const handleUseDefaultLoad = () => {
		setUseDefaultQuestion(false);
	};
	const handleEditLoad = () => {
		setUseDefaultQuestion(false);
		setManualEdit(true);
		setCardPreviousData({ holdings: [] });
	};

	const addAssetToFolio = () => {

		let r = { assetID: addAssetID, quantity: 0 }
		let a = { holdings: cardPreviousData.holdings }
		a.holdings.push(r);
		setCardPreviousData(a);
	};

	const handleFilterFields = (field: string, value: string) => {
console.log(field, value)		
		if (field === 'assetName') {
			return setAddAssetId(value);
		}
		filterMap.set(field, value);
		let a = assets.filter((record: any, index: Number) => {
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

	const folioChanged = (data: any) => {
		
		let h = [];

		for (let i = 0; i < data?.dataList.length; i += 1) {
			let r = data.dataList[i];
			h.push({ assetID: r['id'], quantity: r['weight'], hedgeRatio: r['weight'], description: r['description'] });
		}
		setCardPreviousData({ holdings: h });
	}

    const handleSaveForcast = (data: any) => {
		
        setSavePortfolioActive(true);
        let holdings: any = [];
        const portfolioListData = data?.portfolioList;
        portfolioListData.forEach((item: any) => {

            holdings.push(
                {
                   quantity: (parseFloat(item.weight) / 100),
                   hedgeRatio: 0,
                   assetID: item.id, 
				   description: item.description
                }
            );
        });

        const finalData: any = {
            "name": portfolioFields.portfolioName,
			"description": portfolioFields.portfolioDescription,
            "usageType": 1,
            "holdingsType": 1,
            "id": 0,
            "holdings": holdings,
            "tagID": portfolioFields.portfolioTags || randomCodeByLength(uuidv4(), 8),
        }
console.log('saving', finalData);

		serviceQuery(API_PORTFOLIOS).create(finalData).then(async (result) => {
			const portfolio = await result.data;
			if (portfolio) {
				setNotification([API_NOTIFICATION_MESSAGES.ALERT.SUCCESS, API_NOTIFICATION_MESSAGES.RECORD_CREATED_SUCCESS]);
				setHideForm(true);
			}
		}).catch(err => {
			if(!err) return;
			setNotification([API_NOTIFICATION_MESSAGES.ALERT.ERROR, err.message]);
		});
		setShowLoader(false);
	
    }

    return (
        <>
            <Card>
                <Box p={2.5}>
                    <CardContent>

                        <Box display="flex">
                            <Box p={1} width="100%">
                                <Typography variant="h5" component="h2">Add Portfolios</Typography>
                            </Box>
                        </Box>

                        <Divider />

                        {!hideForm && 
						<Box mb={2}>
							<Form>

								<Grid container spacing={2}>
									<Grid item xs={12} sm={12} xl={12}>
										<FormLabel label="Portfolio Name">
											<TextField 
												name="portfolioName" value={portfolioFields.portfolioName} error={false} required={true}
												onChange={handleportfolioFields}
											/>
										</FormLabel>
									</Grid>
									<Grid item xs={12} sm={12} xl={12}>
										<FormLabel label="Description">
											<TextField 
												name="portfolioDescription" type="textArea" value={portfolioFields.portfolioDescription} error={false} required={true}
												onChange={handleportfolioFields}
											/>
										</FormLabel>
									</Grid>
								</Grid>

							</Form>
						</Box>
                        }

						<Divider/>

						{useDefaultQuestion &&
						<div style={{ marginTop: "24px" }}>
						<Grid container spacing={2}>
							<Grid item xs={12} sm={6} xl={6}>
							<p>Would you like to use the example portfolio to begin?</p>
							</Grid>

							<Grid item xs={12} sm={3} xl={3}>
								<Button variant="contained" color="primary" size="large" disableElevation={true} onClick={ handleUseDefaultLoad }>
									<ButtonIcon icon="done" label="Yes" />
								</Button>
							</Grid>
							<Grid item xs={12} sm={3} xl={3}>
								<Button variant="contained" color="primary" size="large" disableElevation={true} onClick={ handleEditLoad } >
									<ButtonIcon icon="edit" label="No" />
								</Button>
							</Grid>
						</Grid>
						</div>
						}

						{!useDefaultQuestion && manualEdit && !savePortfolioActive &&
						<Box mb={2}>
							<Form>
								<Grid container spacing={2}>
									<Grid item xs={12} sm={2} xl={2}>
										<FormLabel label="Class">
											<TextField 
												name="filter_portfolioClass" value={ filterMap.get('assetClass') } required={false}
												type="select" selectOptions={assetClasses}
												fullWidth={true} icon="search"
												onChange={(e) => { handleFilterFields('assetClass', e) }}
											/>
										</FormLabel>
									</Grid>
									<Grid item xs={12} sm={2} xl={2}>
										<FormLabel label="Geography">
											<TextField 
												name="filter_geography" value={ filterMap.get('region') } required={false}
												type="select" selectOptions={geographies}
												fullWidth={true} icon="search"
												onChange={(e) => { handleFilterFields('region', e) }}
											/>
										</FormLabel>
									</Grid>
									<Grid item xs={12} sm={2} xl={1}>
										<FormLabel label="Currency">
											<TextField 
												name="filter_currency" value={ filterMap.get('priceCurrency') } required={false}
												type="select" selectOptions={currencies}
												fullWidth={true} icon="search"
												onChange={(e) => { handleFilterFields('priceCurrency', e) }}
											/>
										</FormLabel>
									</Grid>
									<Grid item xs={12} sm={4} xl={4}>
										<FormLabel label="Asset">
											<TextField 
												name="filter_name" value={ filterMap.get('assetName') } required={false}
												type="autoComplete" selectOptions={filteredAssetNames} fullWidth={true}
												onChange={(e) => { handleFilterFields('assetName', e) }} icon="search"
											/>
										</FormLabel>
									</Grid>
									<Grid item xs={12} sm={1} xl={1}>
										<div style={{ marginTop: "58px" }}>
											<Button size="small" variant="outlined" color="primary" onClick={addAssetToFolio} >
												<ButtonIcon icon="add" label="ADD" />
											</Button>
										</div>
									</Grid>
								</Grid>
							</Form>
						</Box>
						}

						{!useDefaultQuestion &&
						<Box my={2.5}>
							<ForecastsCardBasic canSave={portfolioFields.portfolioName} onSave={handleSaveForcast} onChange={folioChanged} previousData={cardPreviousData} hideForm={hideForm} assetData={assets} assetNames={assetNames} assetNameMap={assetNameMap} />
						</Box>
						}

						{showLoader && 
						<Loader margin={2} /> }
                        	{notification && notification?.length && 
                            <Box my={1}>
                                <Notification severity={notification?.[0]} message={notification?.[1]} />
                            </Box>
                        }

                        {savePortfolioActive &&
						<>
							<Divider />
							<Box display="flex" flexDirection="row" mt={2}>
								<Box mr={2}>
									<Button variant="contained" color="primary" size="large" disableElevation={true} 
									onClick={() => { history.push('/portfolios') }} >
										<ButtonIcon icon="check_circle" label="Back to portfolios" />
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

export default React.memo(PortfoliosAdd);