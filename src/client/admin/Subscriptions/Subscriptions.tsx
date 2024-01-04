import React, { useState, useMemo, useCallback } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Palette } from 'utility/Colors/Palette';
import Box from '@material-ui/core/Box';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

import { filterMapRecords } from 'utility/common';
import { checkJWTUserData } from 'utility/sessions';
import { usersList } from 'staticData/usersList';

import Form from 'styleguide/layout/Form';
import FormLabel from 'styleguide/form/Text/FormLabel';
import TextField from 'styleguide/form/Text/Field';
import Notification from 'styleguide/form/Notification';
import { NOTIFICATION_MESSAGES } from 'services/utils';
import { scenariosList, subscriptionTypesList } from 'staticData/scenariosList';


const useStyles = makeStyles({
  table: {
    minWidth: 600,
    maxWidth: 600,
    border: `solid 1px ${Palette.Grey.Light}`,
    boxShadow: 'none',
    borderRadius: 1,
    '& .MuiTableBody-root .MuiTableCell-root': {
        padding: '8px 16px',
    }
  },
});

const UserSubscriptions:React.FC = () => {
    const classes = useStyles();
    const loggedInUser: any = checkJWTUserData();
    const userData = filterMapRecords(loggedInUser?.username, usersList, 'username', 'exact');
    const company = userData?.[0]?.company;
    const userRole = userData?.[0]?.role;
    const [subscriptionList, setSubscriptionList] = useState<any>({});
    const [scenarioListing, setScenarioListing] = useState<any>(null);
    
    useMemo(() => {
        if (!company || !scenariosList) return [];
        let searchRecords:any = [];
        if (userRole === 'client_admin') {
            searchRecords = scenariosList?.filter((item: any) => {
                return item?.company === company
            });
        }
        if (userRole === 'super_admin') {
            searchRecords = scenariosList;
        }   

        if (searchRecords?.length === 0) return [];
        let result = {};
        for (let item of searchRecords) {
            result = {
                ...result,
                [`scenario_subscription_${item.id}`]: '',
            }
        }

        setScenarioListing(searchRecords);
        setSubscriptionList(result);
    }, [company, userRole]);

    const handleScenarioSubscriptions = useCallback((name: any, value: string) => {
        const index = name[0];
        const fieldLabel = name[1];
        const fieldKey = `${fieldLabel}_${index}`;
        const result = {
            ...subscriptionList,
            [fieldKey]: value,
        };
        setSubscriptionList(result)
    }, [subscriptionList]);


    return (
        <Card>
            <Box p={2.5}>
                <CardContent>
                    <Box display="flex">
                        <Box p={1} width="100%">
                            <Typography variant="h5" component="h2">Set Subscriptions</Typography>
                        </Box>
                    </Box>

                    <Divider />

                    <Box>
                        <Form>
                            {!scenarioListing &&
                                <Box>
                                    <Notification severity={NOTIFICATION_MESSAGES.ALERT.ERROR} message="No scenarios found" />
                                </Box>
                            }
                            {scenarioListing &&
                                <TableContainer className={classes.table} component={Paper}>
                                    <Table aria-label="scenarios table">
                                        <TableHead>
                                            <TableRow>
                                                <TableCell width="50%" align="left"><b>Scenarios</b></TableCell>
                                                <TableCell width="50%" align="left"><b>Subscription</b></TableCell>
                                            </TableRow>
                                        </TableHead>
                                        <TableBody>
                                            {scenarioListing?.map((row: any) => (
                                                <TableRow key={row.id}>
                                                    <TableCell component="th" scope="row" align="left">{row.name}</TableCell>
                                                    <TableCell component="th" scope="row" align="left">
                                                        <FormLabel>
                                                            <TextField 
                                                                name={`scenario_subscription_${row.id}`} value={subscriptionList?.[`scenario_subscription_${row.id}`]} size="small" error={false} required={true} tabIndex={1}
                                                                type="select" selectOptions={subscriptionTypesList} selectLabel="Select" hideLabel={true} fullWidth={true}  defaultValue={row.subscription}
                                                                onChange={(e) => handleScenarioSubscriptions([`${row.id}`, 'scenario_subscription'], e)}
                                                            />
                                                        </FormLabel>
                                                    </TableCell>
                                                </TableRow>
                                            ))}
                                        </TableBody>
                                    </Table>
                                </TableContainer>
                            }
                        </Form>
                    </Box>

                </CardContent>
            </Box>
        </Card>
    )
}

export default React.memo(UserSubscriptions);