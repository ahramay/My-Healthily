import React, { useState, useMemo } from 'react';
import Box from '@material-ui/core/Box';
import Divider from '@material-ui/core/Divider';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';

import { portfoliosDataList, scenariosList, rulesList } from 'staticData/jobData';
import DraggableLayout from 'styleguide/DragDrop';
import FormLabel from 'styleguide/form/Text/FormLabel';
import TextField from 'styleguide/form/Text/Field';
import ButtonLinks from 'styleguide/ButtonLinks';

import { API_JOBS, API_CALCSETTINGS } from 'services/api/config';
import { serviceQuery } from 'services/query';

const JobSettings: React.FC = () => {

	const [fetchRecords, setFetchRecords] = useState<boolean>(true);

	useMemo(() => {
        if (!fetchRecords) return;
        
		serviceQuery(API_JOBS).fetchAll().then((result) => {
			console.log('jobs', result);
		}).then(() => {
			serviceQuery(API_CALCSETTINGS).fetchAll().then((result) => {
				console.log('calc settings', result);
			});
		});

	
        setFetchRecords(false);
    }, [fetchRecords]);

    const [jobFields, setProfileFields] = useState<any>({
        jobTitle : '',
        jobList : [
            {
                data: [
                    {id: "1", label: "Outlook Scenarios", type: "data2"},
                    {id: "3", label: "Climate Scenarios", type: "data2"},
                    {id: "2", label: "Optimised Model Portfolios", type: "data1" },
                    {id: "1", label: "Rebalancing", type: "data3"},
                ],
                title: 'Q2 2021 Rebalance',
                id: '1',
            },
            {
                data: [
                    {id: "2", label: "Optimised Model Portfolios", type: "data1" },
                    {id: "1", label: "Outlook Scenarios", type: "data2"},
                    {id: "1", label: "Rebalancing", type: "data3"},
                    
                ],
                title: 'Q3 2021 Rebalance',
                id: '2',
            },
        ],
    });

    const handleJobFields = (value: any, name: string) => {
        setProfileFields({
            ...jobFields,
            [name]: value,
        })
    }

    const dropItems: any = [
        {'data1' : ['Portfolios', portfoliosDataList]},
        {'data2' : ['Scenarios', scenariosList]},
        {'data3' : ['Rules', rulesList]},
    ];

    const collectionItems: any = [
        '', jobFields.jobList
    ];

    return (
        <>
            <Card>
                <Box p={2.5}>
                    <CardContent>
                        <Box display="flex">
                            <Box p={1} width="100%">
                                <Typography variant="h5" component="h2">Job Settings</Typography>
                            </Box>
                        </Box>
                        <Divider />

                        <Box marginX={'auto'} maxWidth={1600}>

                            <Box alignItems="center" py={1}>
                                <DraggableLayout dropItems={dropItems} collectionItems={collectionItems} titlePlaceholder="Job Title" />
                            </Box>

                            <Grid container spacing={0}>
                                <Grid item xs={1}></Grid>
                                <Grid item xs={10}>
                                    <Box alignItems="center" py={1}>
                                        <FormLabel label="Diagnostics for the selected Job to be worked out later">
                                            <TextField 
                                                name="jobTitle" value={jobFields.jobTitle} error={false} required={true} tabIndex={1}
                                                type="textArea"
                                                onChange={handleJobFields}
                                            />
                                        </FormLabel>
                                    </Box>

                                    <Box width={1} height={1} alignItems="center">
                                        <ButtonLinks variant="contained" textTransform="none" label="Save" color="primary" onClickAction={() => void(0)} size="large" />
                                        <ButtonLinks variant="contained" textTransform="none" label="Schedule" color="secondary" onClickAction={() => void(0)} size="large" />
                                    </Box>
                                </Grid>
                                <Grid item xs={1}></Grid>
                            </Grid>

                        </Box>
                        

                    </CardContent>
                </Box>
            </Card>
        </>
    )
}

export default React.memo(JobSettings);