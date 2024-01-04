import React, { useCallback, useMemo, useState } from 'react';
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
import ButtonLinks from 'styleguide/ButtonLinks';

import { round, removeIndex } from 'utility/common'; // , filterMapRecords, sortRecords
import { assetAndWeightList } from 'staticData/scenariosList'; // , forecastIndexes, forecastClassList, forecastGeographyList, forecastCurrencyList

type Props = {
	canSave: any | false;
    previousData?: any | null;
    assetData?: any; 
    assetNames: any;
	assetNameMap: any;
    hideForm?: boolean;
    onSave?: (data: any) => void;
	onChange?: (data: any) => void;
}

const ForecastsCardBasic: React.FC<Props> = ({
    canSave,
	previousData,
    assetData,
    assetNames,
	assetNameMap,
    hideForm,
    onSave,
	onChange,
}) => {

    const [portfolioList, setPortfolioList] = useState<any>({
        dataList: []
    });
    const [portfolioFilteredList, setPortfolioFilteredList] = useState<any>(null);
    const [rowList, setRowList] = useState<number>(0);

    useMemo(() => {
		const getIdFromAssetName = (name: string) => {
			for (let i = 0; i < assetNames.length; i += 1) {
				let r = assetNames[i];
				if (r.label === name) {
					return r.value;
				}
			}
		};
console.log('processing previous', previousData);
        if(previousData) {
            const holdingsList = previousData?.holdings;
            let data: any = [];
            holdingsList.forEach((item: any) => {
                let n:any = {
                    id: item.assetID, 
                    weight: 0,
                    weightType: '%', 
                    description: item.description || assetNameMap.get(item.assetID)
                }
                let q = item.quantity;
                if (item.quantity < 1) {
                    q = q * 100;
                }
                n['weight'] = q;
                data.push(n);
            });
            setPortfolioList({
                dataList: data,
            });
            
        } else { // user selected the example folio
			let initData = [];
			if (assetAndWeightList) {
				for (let i = 0; i < assetAndWeightList.length; i += 1) {
					let r = assetAndWeightList[i];
					initData.push({ description: r.name, id: getIdFromAssetName(r.name), weight: r.weight, weightType: r.weightType });
				}
				setPortfolioList({
					dataList: initData,
				});
			}
        }
    }, [assetNames, assetNameMap, previousData]);

    const handleScenarioForecastFields = useCallback((index: any, name: string, value: string) => {
		
		const fieldLabel = name;
        let scenarioList = portfolioList?.dataList;
        scenarioList[index] = {
            ...scenarioList[index],
            [fieldLabel]: value,
        }

        setPortfolioList({
            dataList: scenarioList
        });
		onChange?.(portfolioList);
    }, [onChange, portfolioList]);

    const handleSaveForecast = useCallback(() => {

        onSave?.({ portfolioList: portfolioList?.dataList });
    }, [onSave, portfolioList])

    const handleAddPortfolios = useCallback(() => {
        const total = rowList + 1;
        const index = portfolioList?.dataList?.length - 1;
        let list: any = portfolioList?.dataList;
        list.push(
            {
                id: `${index + total}`,
                name: '',
                asset: '',
                portfolioClass: '',
                geography: '',
                currency: '',
                weight: 0,
                weightType: '%'
            }
        );
        setRowList(total);
        setPortfolioFilteredList(null);
		onChange?.(portfolioList);
    }, [onChange, rowList, portfolioList]);

    const handleDeletePortfolios = useCallback((value: string) => {

        const total = rowList - 1;
        const newList = removeIndex(portfolioList?.dataList, parseInt(value));

		setRowList(total);
        setPortfolioList({
            dataList: newList
        });
        setPortfolioFilteredList(null);

		onChange?.(portfolioList);
    }, [onChange, rowList, portfolioList]);

    const handleClearFilter = useCallback(() => {
        setPortfolioFilteredList(null);
    }, []);
   
    const finalPortfolioList = portfolioFilteredList ? portfolioFilteredList : portfolioList;

    const weightPercentage = useMemo(() => {
        const list = finalPortfolioList?.dataList;
        if (!list) return 0;
        let count = 0;
        for(let item of list) {
            count += parseFloat(item.weight);
        }
        return round(count, 2);
        
    }, [finalPortfolioList]) || 0;

    return (
    <Box>
        {!hideForm && 
        <Card>
            <Box bgcolor={Palette.Grey.Lighter} p={1}>
                <CardContent>
                    <Box display="flex">
                        <Box p={1} width="100%">
                            <Typography variant="h5" component="h2">Portfolio</Typography>
                        </Box>
                    </Box>
                    <Divider />

                    <Box alignItems="center" py={2}>
                        <Form>
							<Grid container spacing={2}>
								<Grid item xs={12} sm={5} xl={5}>
									<FormLabel label="Label"></FormLabel>
								</Grid>
								<Grid item xs={12} sm={4} xl={4}>
									<FormLabel label="Asset"></FormLabel>
								</Grid>
								
								<Grid item xs={12} sm={3} xl={3}>
									<FormLabel label="Weight (%)"></FormLabel>
								</Grid>
								
							</Grid>
                            {
							finalPortfolioList?.dataList?.map((item: any, itemKey: number) => (
                                <Grid key={itemKey} container spacing={2}>
                                    
									<Grid item xs={12} sm={5} xl={5}>
										<FormLabel>
                                            <TextField 
                                                name={`name_${itemKey}`} value={item.description} error={false} required={true}
                                                type="text" defaultValue={item.description} fullWidth={true} 
                                                onChange={(e) => handleScenarioForecastFields(itemKey, 'description' , e)}
                                            />
                                        </FormLabel>
									</Grid>

									<Grid item xs={12} sm={4} xl={4}>	
										<FormLabel>
                                            <TextField 
                                                name={`id_${itemKey}`} value={item.id} error={false} required={true} 
                                                type="autoComplete" defaultValue={item.id} fullWidth={true} 
                                                selectOptions={assetNames} icon="search" 
                                                onChange={(e) => handleScenarioForecastFields(itemKey, 'id' , e)}
                                            />
                                        </FormLabel>
                                    </Grid>
                                   
                                    <Grid item xs={12} sm={2} xl={2}>
                                        <FormLabel>
                                            <TextField 
                                                name={`weight_${itemKey}`} value={`${item.weight ? round(parseFloat(item.weight), 2) : 0}`} error={false} required={true}
                                                type="text" defaultValue={`${item.weight ? round(parseFloat(item.weight), 2) : 0}`} fullWidth={true}
                                                onChange={(e) => handleScenarioForecastFields(itemKey, 'weight', e)}
                                            />
                                        </FormLabel>
                                    </Grid>
                                        <Grid item xs={12} sm={1} xl={1}>
                                            <FormLabel label={""}>
                                                <Box pt={1} width={1} height={1} display="flex" alignItems="flex-center" justifyContent="flex-start">
                                                <ButtonLinks label="" icon="delete" circleIcon={true} color={Palette.Red.Main} bgColor={Palette.deepMaroon.BgLight} 
                                                onClickAction={() => handleDeletePortfolios(`${itemKey}`)}
                                                />
                                            </Box>
                                        </FormLabel>
                                    </Grid>
                                </Grid>
                            ))
							}

                            <Grid container spacing={2}>
                                <Grid item xs={12} sm={10}>
                                    {finalPortfolioList?.dataList?.length === 0 && 
                                        <Box p={1} width="100%">
                                            <Typography variant="body1" component="span">No records found </Typography>
                                        </Box>
                                    }
                                    {portfolioFilteredList && 
                                        <Button size="small" variant="contained" color="secondary"  disableElevation={true} onClick={handleClearFilter} >
                                            <ButtonIcon icon="filter_none" label="Clear Filters" />
                                        </Button>
                                    }
                                </Grid>
                                <Grid item xs={12} sm={1}>
                                    <Box width={1} height={1} pt={0.5} pl={1.5}><Typography variant="body1" component="span" style={{fontWeight: 'bold'}}>{weightPercentage}</Typography></Box>
                                </Grid>
                                <Grid item xs={12} sm={1}>
                                    <Box width={1} height={1}>
                                        <Button size="small" variant="outlined" color="primary" onClick={handleAddPortfolios} >
                                            <ButtonIcon icon="add" label="ADD" />
                                        </Button>
                                    </Box>
                                </Grid>
                            </Grid>

                            <Box textAlign="left">
                                <Button 
                                    variant="contained" color="primary" size="large" disableElevation={true} 
                                    onClick={handleSaveForecast} disabled={weightPercentage !== 100 || !canSave}
                                    ><ButtonIcon icon="save" label="Save" />
                                </Button>
                            </Box>
                        </Form>
                    </Box>
                    
                </CardContent>
            </Box>
        </Card>
        }

    </Box>
    )
};

export default React.memo(ForecastsCardBasic);