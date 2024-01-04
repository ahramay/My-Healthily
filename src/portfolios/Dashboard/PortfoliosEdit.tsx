import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
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

import ForecastsCardBasic from './ForecastsCardBasic';
import Form from 'styleguide/layout/Form';
import FormLabel from 'styleguide/form/Text/FormLabel';
import TextField from 'styleguide/form/Text/Field';
import ButtonIcon from 'styleguide/ButtonIcon';

const PortfoliosEdit: React.FC = () => {
    const history = useHistory();
    const { slug3 }: any = useParams();
    const portfolioId = slug3;
    const [notification, setNotification] = useState<any>(null);
    const [showLoader, setShowLoader] = useState<boolean>(true);

    const [hideForm, setHideForm] = useState<boolean>(false);
    const [portfolios, setPortfolios] = useState<any>(null);
    const [cardActive, setCardActive] = useState<boolean>(false);
    const [savePortfolioActive, setSavePortfolioActive] = useState<boolean>(false);
    const [portfolioFields, setPortfolioFields] = useState<any>({
        portfolioName : '',
        portfolioDescription : '',
        portfolioDate: '',
        portfolioBaseCurrency: '',
		portfolioTags: '',
    });

	const [fetchRecords, setFetchRecords] = useState<boolean>(true);
    const [assets, setAssets] = useState<any>([]);
    const [assetNames, setAssetNames] = useState<any>([]);
	const [assetNameMap, setAssetNameMap] = useState<any>(new Map());

    useEffect(() => {
        if (!fetchRecords) return;
        
		const s: string = window.sessionStorage.getItem('assets') || '';
		const d = JSON.parse(s);
		let map = new Map();
		let names = [];
		setAssets(d);

		for (let i = 0; i < d.length; i += 1) {
			let r = d[i];
			names.push({ value: r.id, label: r.name })
			map.set(r.id, r.name);
		}
		setAssetNameMap(map);
		setAssetNames(names);
	
        setFetchRecords(false);
    }, [fetchRecords]);

    const handleportfolioFields = (value: any, name: string) => {
        setPortfolioFields({
            ...portfolioFields,
            [name]: value,
        });
    }

    const handleSaveForcast = (data: any) => {
        if (!portfolios) return;
        setSavePortfolioActive(true);
        let holdings: any = [];
        const portfolioListData = data?.portfolioList;
        portfolioListData.forEach((item: any) => {
            holdings.push(
                {
                   quantity: (parseFloat(item.weight) / 100),
                   hedgeRatio: 0,
                   assetID: item.id,
				   description: item.description,
                }
            );
        });

        const finalData: any = {
            "name": portfolioFields.portfolioName,
			"description": portfolioFields.portfolioDescription,
            "usageType": 1,
            "holdingsType": 1,
            "holdings": holdings,
            "id": parseInt(portfolioId),
			"tagID": portfolioFields.portfolioTags
        }
        const url = `${API_PORTFOLIOS}/${portfolioId}`;
        if (url) {
            serviceQuery(url).put(finalData).then(async (result) => {
                const portfolio = await result.data;
                if (portfolio) {
                    setNotification([API_NOTIFICATION_MESSAGES.ALERT.SUCCESS, API_NOTIFICATION_MESSAGES.RECORD_UPDATED_SUCCESS]);
                    setHideForm(true);
                }
            }).catch(err => {
                if(!err) return;
                setNotification([API_NOTIFICATION_MESSAGES.ALERT.ERROR, err.message]);
            });
            setShowLoader(false);
        }
    }

    useEffect(() => {
        if (!portfolioId) return;
        const url = `${API_PORTFOLIOS}/${portfolioId}`;
        if (url) {
            serviceQuery(url).fetchAll().then(async (result) => {
                const portfolio = await result.data;
                if (portfolio) {
                    setPortfolios(portfolio);
                    setPortfolioFields({
                        portfolioName: portfolio?.name,
                        portfolioDescription : portfolio?.description,
                        portfolioDate: '',
                        portfolioBaseCurrency: '',
						portfolioTags: portfolio?.tagID
                    });
                }
                setCardActive(true);
            }).catch(err => {
                if(!err) return;
                setPortfolios(null);
                setNotification([API_NOTIFICATION_MESSAGES.ALERT.ERROR, err.message]);
            });
            setShowLoader(false);
        }

    }, [portfolioId]);
    return (
        <>
            <Card>
                <Box p={2.5}>
                    <CardContent>

                        <Box display="flex">
                            <Box p={1} width="100%">
                                <Typography variant="h5" component="h2">Edit Portfolios</Typography>
                            </Box>
                        </Box>

                        <Divider />

                        {!hideForm && portfolios && 
                            <Box mb={2}>
                                <Form>

                                    <Grid container spacing={2}>
										<Grid item xs={12} sm={12} xl={12}>
											<FormLabel label="Portfolio Name">
												<TextField 
													name="portfolioName" value={portfolios?.name || portfolioFields?.portfolioName} error={false} required={true} 
													onChange={handleportfolioFields}
												/>
											</FormLabel>
										</Grid>

										<Grid item xs={12} sm={12} xl={12}>
                                            <FormLabel label="Description">
                                                <TextField 
                                                    name="portfolioDescription" value={portfolios?.description || portfolioFields?.portfolioDescription} error={false} required={true} type="textArea"
                                                    onChange={handleportfolioFields}
                                                />
                                            </FormLabel>
                                        </Grid>
                                    </Grid>

									{ /*
                                    <Grid container spacing={2}>
                                        <Grid item xs={12} sm={8}>
                                            <FormLabel label="Portfolio Description">
                                                <TextField 
                                                    name="portfolioDesciption" value={portfolioFields?.portfolioDesciption} error={false} required={true}
                                                    onChange={handleportfolioFields} multiline={true} rows={3} inputPattern={INPUT_PATTERN_WORDS}
                                                />
                                            </FormLabel>
                                        </Grid>
                                    </Grid>

                                    <Grid container spacing={2}>
                                        <Grid item xs={12} sm={3} xl={2}>
                                            <FormLabel label="Portfolio Date">
                                                <TextField 
                                                    name="portfolioDate" value={portfolioFields?.portfolioDate} error={false} required={true}
                                                    onChange={handleportfolioFields} type="date"
                                                />
                                            </FormLabel>
                                        </Grid>
                                    </Grid>

                                    <Grid container spacing={2}>
                                        <Grid item xs={12} sm={3} xl={2}>
                                            <FormLabel label="Base Currency">
                                                <TextField 
                                                    name="portfolioBaseCurrency" value={portfolioFields?.portfolioBaseCurrency} error={false} required={true}
                                                    type="select" selectOptions={forecastCurrencyList} hideLabel={true} fullWidth={true}
                                                    onChange={handleportfolioFields}
                                                />
                                            </FormLabel>
                                        </Grid>
                                    </Grid>
                                	*/ }

                                </Form>
                            </Box>
                        }

                        {!hideForm && cardActive && 
                            <Box my={2.5}>
                                <ForecastsCardBasic canSave={portfolioFields.portfolioName} onSave={handleSaveForcast} previousData={portfolios} assetData={assets} assetNames={assetNames} assetNameMap={assetNameMap} />
                            </Box>
                        }

						{showLoader && <Loader margin={2} /> }
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

export default PortfoliosEdit;