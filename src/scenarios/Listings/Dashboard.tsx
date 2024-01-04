import React, { useState } from 'react';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import { Palette } from 'utility/Colors/Palette';

import FormLabel from 'styleguide/form/Text/FormLabel';
import TextField from 'styleguide/form/Text/Field';
import ChoiceGroup from 'styleguide/form/ChoiceGroup/ChoiceGroup';
import RatingLinks from 'styleguide/RatingLinks';
import HorizonChartSlider from 'styleguide/HorizonChartSlider';
import { ratingData, userRatingData, scenarioCountList, scenarioBrandsList, 
    scenarioQuaterlySeries, scenarioTypes, assetClass
} from 'staticData/portfolioFilters';
import ListingResults from './ListingResults';
import { subscriptionTypesList } from 'staticData/scenariosList';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
        flexGrow: theme.spacing(1),
        height: '100vh',
        position: 'fixed',
    },
    sidebar: {
        backgroundColor: Palette.Grey.LightBg,
    },
    sideBarContent: {
        maxHeight: '86vh',
        overflowY: 'scroll',
        overflowX: 'hidden',
        paddingRight: 5,
        "&::-webkit-scrollbar-track": {
            WebkitBoxShadow: "inset 0 0 spx rgba(0,0,0,0.3)",
            borderRadius: "5px",
            backgroundColor: "#F5F5F5"
        },
        "&::-webkit-scrollbar": { width: "6px", backgroundColor: "#F5F5F5" },
        "&::-webkit-scrollbar-thumb": {
            borderRadius: "5px",
            WebkitBoxShadow: "inset 0 0 6px rgba(0,0,0,.1)",
            backgroundColor: "#3e3e3e"
        },
    },
    boxHeading: {
        fontWeight: 'bold',
        fontSize: 16,
    },
    borderBox: {
        borderBottom: `solid 1px ${Palette.Grey.Light}`,
    },
  }),
);

const ScenariosListingsDashboard:React.FC = () => {
    const classes = useStyles();
    const [filterParams, setFilterParams] = useState<any>({
        scenarioCount: '',
        scenarioType: [],
        assetClass: [],
        brandSearch: '',
        subscriptionType: '',
    });
    
    const handleRating = (key: string, value: number | null) => {
        setFilterParams({
            ...filterParams,
            [key]: value
        })
    };

    const handleParamFields = (value: any, name: string) => {
        setFilterParams({
            ...filterParams,
            [name]: value,
        });
    }

    const handleScenarios = (values: any) => {
        setFilterParams({
            ...filterParams,
            'scenarioType': [values],
        });
    }

    const handleAssetClasses = (values: any) => {
        setFilterParams({
            ...filterParams,
            'assetClass': [values],
        });
    }
    return (
            <Grid container spacing={0} className={classes.root}>
                <Grid item xs={12} md={3} xl={2}>
                    <Box width={1} height={1} p={1} className={classes.sidebar}>
                        <Box width={1} height={1} className={classes.sideBarContent}>
                            <Box width={1} height={'auto'} mb={1}>
                                <RatingLinks title="Rating" type="star" list={ratingData} onChange={handleRating} />
                            </Box>
                            
                            <Box width={1} height={'auto'} mb={1}>
                                <RatingLinks title="User Rating" type="square" list={userRatingData} onChange={handleRating} />
                            </Box>
                            
                            <Box p={1} width={1} height={'auto'} mb={1}>
                                <Box width={1} height={1} className={classes.borderBox}>
                                    <Box width={1} height={350}>
                                        <HorizonChartSlider seriesData={scenarioQuaterlySeries} />
                                    </Box>
                                    <FormLabel label="">
                                        <Box width={1} height={1} mb={0.5}>
                                        <TextField 
                                            name="scenarioCount" value={filterParams.scenarioCount} error={false} required={true} tabIndex={1}
                                            type="select" selectOptions={scenarioCountList} selectLabel="Forecast Count" hideLabel={true} fullWidth={true} 
                                            onChange={handleParamFields}
                                        />
                                        </Box>
                                    </FormLabel>
                                </Box>
                            </Box>
                            
                            <Box>
                                <ChoiceGroup title="Scenario Type" list={scenarioTypes} limit={5} onChange={handleScenarios} sortOrder="DESC" />
                            </Box>

                            <Box width={1} height={'auto'} p={1} mb={1}>
                                <Box width={1} height={1} className={classes.borderBox}>
                                    <FormLabel label="Brand" bold={true} collapsable={true}>
                                        <Box width={1} height={1} mb={0.5}>
                                            <TextField 
                                                name="brandSearch" value={filterParams.brandSearch} error={false} required={true} tabIndex={1}
                                                type="autoComplete" selectOptions={scenarioBrandsList} fullWidth={true} icon="search"
                                                onChange={handleParamFields}
                                            />
                                        </Box>
                                    </FormLabel>
                                </Box>
                            </Box>

                            <Box>
                                <ChoiceGroup title="Asset Class" list={assetClass} limit={6} onChange={handleAssetClasses} sortOrder="DESC" />
                            </Box>

                            <Box p={1} width={1} height={'auto'} mb={1}>
                                <Box width={1} height={1}>
                                    <FormLabel label="Subscription Type" bold={true} collapsable={true}>
                                        <Box width={1} height={1} mb={0.5}>
                                        <TextField 
                                            name="subscriptionType" value={filterParams.subscriptionType} error={false} required={true} tabIndex={1}
                                            type="select" selectOptions={subscriptionTypesList} selectLabel="All" hideLabel={true} fullWidth={true} 
                                            onChange={handleParamFields}
                                        />
                                        </Box>
                                    </FormLabel>
                                </Box>
                            </Box>
                            {filterParams && 
                                <></>
                            }
                        </Box>
                    </Box>
                </Grid>
                <Grid item xs={12} md={9} xl={10}>
                    <Box width={'100%'} height={1} m={2} maxWidth={'95%'} marginTop={4}>
                        <ListingResults />
                    </Box>
                </Grid>
            </Grid>
    )
}

export default ScenariosListingsDashboard;