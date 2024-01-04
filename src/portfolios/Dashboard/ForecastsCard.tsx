import React, { useCallback, useMemo, useState } from 'react';
import { Palette } from 'utility/Colors/Palette';
import Box from '@material-ui/core/Box';
import Divider from '@material-ui/core/Divider';
import Button from  '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';

import {
    INPUT_PATTERN_WORDS,
} from 'utility/constants';
import Form from 'styleguide/layout/Form';
import FormLabel from 'styleguide/form/Text/FormLabel';
import TextField from 'styleguide/form/Text/Field';
import ButtonIcon from 'styleguide/ButtonIcon';
import ButtonLinks from 'styleguide/ButtonLinks';

import { round, removeIndex, filterMapRecords, sortRecords } from 'utility/common';
import PotrfolioListTable from 'portfolios/Dashboard/PotrfolioListTable';
import { assetAndWeightList, forecastIndexes, forecastClassList, forecastGeographyList, forecastCurrencyList } from 'staticData/scenariosList';

type Props = {
    previousData?: any | null;
    hideForm?: boolean;
    onSave?: (data: any) => void;
}

const filterMap: any = {
    'filter_name' : 'name',
    'filter_asset' : 'asset',
    'filter_portfolioClass': 'portfolioClass',
    'filter_geography': 'geography',
    'filter_currency': 'currency',
    'filter_weight': 'weight',
};

const ForecastsCard: React.FC<Props> = ({
    previousData,
    hideForm,
    onSave,
}) => {
    const [active, setActive] = useState<boolean>(false);
    const [portfolioTableData, setPortfolioTableData] = useState<any>(null);
    const [portfolioList, setPortfolioList] = useState<any>({
        dataList: []
    });
    const [portfolioFilteredList, setPortfolioFilteredList] = useState<any>(null);
    const [rowList, setRowList] = useState<number>(0);
    const [filterFields, setFilterFields] = useState<any>({
        filter_name : '',
        filter_asset : '',
        filter_portfolioClass: '',
        filter_geography: '',
        filter_currency: '',
        filter_weight: '',
    });

    useMemo(() => {
        if(previousData) {
            const holdingsList = previousData?.holdings;
            let data: any = [];
            holdingsList.forEach((item: any) => {
                data.push({
                    id: item?.id, name: item?.id, asset: '',  portfolioClass: '', geography: '', currency: '', weight: item?.quantity, weightType: '%',
                });
            });

            setPortfolioList({
                dataList: data,
            });
            
        } else {
            if (!assetAndWeightList) return;
            setPortfolioList({
                dataList: assetAndWeightList,
            });
        }
    }, [previousData]);

    const handleScenarioForecastFields = useCallback((name: any, value: string) => {
        const index = name[0];
        const fieldLabel = name[1];
        let scenarioList = portfolioList?.dataList;
        scenarioList[index] = {
            ...scenarioList[index],
            [fieldLabel]: value,
        }
        setPortfolioList({
            dataList: scenarioList
        });
        setPortfolioTableData(null);
    }, [portfolioList]);

    const handleSaveForecast = useCallback(() => {
        setActive(true);
        setPortfolioTableData(portfolioList);
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
    }, [rowList, portfolioList]);

    const handleDeletePortfolios = useCallback((value: string) => {
        const total = rowList - 1;
        const newList = removeIndex(portfolioList?.dataList, parseInt(value));
        setRowList(total);
        setPortfolioList({
            dataList: newList
        });
        setPortfolioTableData(null);
        setPortfolioFilteredList(null);
    }, [rowList, portfolioList]);

    const handleFilterFields = useCallback((fieldValue: any, fieldName: string) => {
        setFilterFields({
            ...filterFields,
            [fieldName]: fieldValue,
        })

        if(fieldValue !== '') {
            const searchValue = filterMap?.[fieldName.toLowerCase()];
            const dataSet = portfolioList?.dataList;
            const filteredData = filterMapRecords(fieldValue, dataSet, searchValue, 'filter');
            setPortfolioFilteredList({
                dataList: filteredData
            });
        } else {
            setPortfolioFilteredList(null);
        }

    }, [filterFields, portfolioList]);

    const handleClearFilter = useCallback(() => {
        setPortfolioFilteredList(null);
    }, []);
   
    const finalPortfolioList = portfolioFilteredList ? portfolioFilteredList : portfolioList;

    const [sortFieldValue, setSortFieldValue] = useState<any>({});
    const handleSort = useCallback((value: string) => {
        const getCurrentOrder = sortFieldValue?.[value] || 'DESC';
        const newOrder = getCurrentOrder === 'DESC' ? 'ASC' : 'DESC';
        let sortValueType = 'alphabetic';
        if (value === 'weight') {
            sortValueType = 'number';
        }
        const filteredData = sortRecords(finalPortfolioList?.dataList, value, sortValueType, newOrder);
        setPortfolioFilteredList({
            dataList: filteredData
        });
        setSortFieldValue({
            ...sortFieldValue,
            [value] : newOrder
        })
    }, [finalPortfolioList, sortFieldValue]);

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

                    {/*
                    <Box mt={2} textAlign="left">
                        <ButtonLinks label="Upload" icon="cloud_upload" bgColor={Palette.deepGreen.Dark} 
                        onClickAction={handleUploadPortfolios} size="large" />
                    </Box>
                    */}

                
                    <Box alignItems="center" py={2}>
                        <Form>
                                <Grid container spacing={2}>
                                    <Grid item xs={12} sm={2} xl={3}>
                                        <FormLabel label="Asset Name" onSort={handleSort} sortBy="name" hasFilter={true}>
                                            <Box width={1} height={1} p={1} maxWidth={175}>
                                                <TextField 
                                                    name="filter_name" value={filterFields.filter_name} required={false} tabIndex={1}
                                                    type="text" fullWidth={true} size="small"
                                                    onChange={handleFilterFields}
                                                />
                                            </Box>
                                        </FormLabel>
                                    </Grid>
                                    <Grid item xs={12} sm={2} xl={2}>
                                        <FormLabel label="Asset" onSort={handleSort} sortBy="asset" hasFilter={true}>
                                            <Box width={1} height={1} p={1} minWidth={175}>
                                                <TextField 
                                                    name="filter_asset" value={filterFields.filter_asset} required={false} tabIndex={1}
                                                    type="autoComplete" selectOptions={forecastIndexes}
                                                    fullWidth={true} size="small"
                                                    onChange={handleFilterFields}
                                                />
                                            </Box>
                                        </FormLabel>
                                    </Grid>
                                    <Grid item xs={12} sm={2} xl={2}>
                                        <FormLabel label="Class" onSort={handleSort} sortBy="portfolioClass" hasFilter={true}>
                                            <Box width={1} height={1} p={1} minWidth={175}>
                                                <TextField 
                                                    name="filter_portfolioClass" value={filterFields.filter_portfolioClass} required={false} tabIndex={1}
                                                    type="autoComplete" selectOptions={forecastClassList}
                                                    fullWidth={true} size="small"
                                                    onChange={handleFilterFields}
                                                />
                                            </Box>
                                        </FormLabel>
                                    </Grid>
                                    <Grid item xs={12} sm={2} xl={2}>
                                        <FormLabel label="Geography" onSort={handleSort} sortBy="geography" hasFilter={true}>
                                            <Box width={1} height={1} p={1} minWidth={175}>
                                                <TextField 
                                                    name="filter_geography" value={filterFields.filter_geography} required={false} tabIndex={1}
                                                    type="autoComplete" selectOptions={forecastGeographyList}
                                                    fullWidth={true} size="small"
                                                    onChange={handleFilterFields}
                                                />
                                            </Box>
                                        </FormLabel>
                                    </Grid>
                                    <Grid item xs={12} sm={2} xl={1}>
                                        <FormLabel label="Currency" onSort={handleSort} sortBy="currency" hasFilter={true}>
                                            <Box width={1} height={1} p={1} minWidth={175}>
                                                <TextField 
                                                    name="filter_currency" value={filterFields.filter_currency} required={false} tabIndex={1}
                                                    type="autoComplete" selectOptions={forecastCurrencyList}
                                                    fullWidth={true} size="small"
                                                    onChange={handleFilterFields}
                                                />
                                            </Box>
                                        </FormLabel>
                                    </Grid>
                                    <Grid item xs={12} sm={1} xl={1}>
                                        <FormLabel label="Weight (%)" onSort={handleSort} sortBy="weight"></FormLabel>
                                    </Grid>
                                        <Grid item xs={12} sm={1} xl={1}>
                                            <FormLabel label={""}></FormLabel>
                                    </Grid>
                                </Grid>
                            {finalPortfolioList?.dataList?.map((item: any, itemKey: number) => (
                                <Grid key={itemKey} container spacing={2}>
                                    <Grid item xs={12} sm={2} xl={3}>
                                        <FormLabel>
                                            <TextField 
                                                name={`name_${itemKey}`} value={item.name} error={false} required={true} tabIndex={1}
                                                type="text" defaultValue={item.name} fullWidth={true}
                                                inputPattern={INPUT_PATTERN_WORDS}
                                                onChange={(e) => handleScenarioForecastFields([itemKey, 'name'] , e)}
                                            />
                                        </FormLabel>
                                    </Grid>
                                    <Grid item xs={12} sm={2} xl={2}>
                                        <FormLabel>
                                            <TextField 
                                                name={`asset_${itemKey}`} value={item.asset} error={false} required={true} tabIndex={1}
                                                type="autoComplete" selectOptions={forecastIndexes} fullWidth={true} icon="search"
                                                onChange={(e) => handleScenarioForecastFields([itemKey, 'asset'], e)}
                                            />
                                        </FormLabel>
                                    </Grid>
                                    <Grid item xs={12} sm={2} xl={2}>
                                        <FormLabel>
                                            <TextField 
                                                name={`portfolioClass_${itemKey}`} value={item.portfolioClass} error={false} required={true} tabIndex={1}
                                                type="select" selectOptions={forecastClassList} fullWidth={true} defaultValue={item.portfolioClass}
                                                onChange={(e) => handleScenarioForecastFields([itemKey, 'portfolioClass'], e)}
                                            />
                                        </FormLabel>
                                    </Grid>
                                    <Grid item xs={12} sm={2} xl={2}>
                                        <FormLabel>
                                            <TextField 
                                                name={`geography_${itemKey}`} value={item.geography} error={false} required={true} tabIndex={1}
                                                type="autoComplete" selectOptions={forecastGeographyList} fullWidth={true} icon="search"
                                                onChange={(e) => handleScenarioForecastFields([itemKey, 'geography'], e)} inputPattern={INPUT_PATTERN_WORDS}
                                            />
                                        </FormLabel>
                                    </Grid>
                                    <Grid item xs={12} sm={2} xl={1}>
                                        <FormLabel>
                                            <TextField 
                                                name={`currency_${itemKey}`} value={item.currency} error={false} required={true} tabIndex={1}
                                                type="select" selectOptions={forecastCurrencyList} fullWidth={true} defaultValue={item.currency}
                                                onChange={(e) => handleScenarioForecastFields([itemKey, 'currency'], e)}
                                            />
                                        </FormLabel>
                                    </Grid>
                                    <Grid item xs={12} sm={1} xl={1}>
                                        <FormLabel>
                                            <TextField 
                                                name={`weight_${itemKey}`} value={`${item.weight ? round(parseFloat(item.weight), 2) : 0}`} error={false} required={true} tabIndex={1}
                                                type="text" defaultValue={`${item.weight ? round(parseFloat(item.weight), 2) : 0}`} fullWidth={true}
                                                onChange={(e) => handleScenarioForecastFields([itemKey, 'weight'], e)}
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
                            ))}

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
                                    onClick={handleSaveForecast} tabIndex={3} disabled={weightPercentage !== 100}
                                    ><ButtonIcon icon="save" label="Save" />
                                </Button>
                            </Box>
                        </Form>
                    </Box>
                    
                </CardContent>
            </Box>
        </Card>
        }

        {active && portfolioTableData && 
            <Box my={2.5}>
                <PotrfolioListTable data={portfolioTableData?.dataList} />
            </Box>
        }
    </Box>
    )
}

export default React.memo(ForecastsCard);