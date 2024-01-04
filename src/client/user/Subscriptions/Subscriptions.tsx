import React, { useState, useMemo, useCallback } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Palette } from 'utility/Colors/Palette';
import Box from '@material-ui/core/Box';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Chip from '@material-ui/core/Chip';

import ButtonLinks from 'styleguide/ButtonLinks';
import Notification from 'styleguide/form/Notification';
import { NOTIFICATION_MESSAGES } from 'services/utils';
import { scenariosList, subscriptionTypesList } from 'staticData/scenariosList';
import { filterMapRecords } from 'utility/common';


const useStyles = makeStyles({
  table: {
    minWidth: 900,
    maxWidth: 1600,
    border: `solid 1px ${Palette.Grey.Light}`,
    boxShadow: 'none',
    borderRadius: 1,
    '& .MuiTableBody-root .MuiTableCell-root': {
        padding: '8px 16px',
    }
  },
});

type Props = {
    company?: any | undefined; 
}

const UserSubscriptions:React.FC<Props> = ({
    company
}) => {
    const classes = useStyles();
    const [subscriptionList, setSubscriptionList] = useState<any>({});
    const [scenarioListing, setScenarioListing] = useState<any>(null);
    
    useMemo(() => {
        if (!company || !scenariosList) return [];
        const searchRecords = scenariosList?.filter((item: any) => {
            return item?.company === company
        });

        if (searchRecords?.length === 0) return [];
        let result = {};
        for (let item of searchRecords) {
            result = {
                ...result,
                [item.id]: 'none',
            }
        }

        setScenarioListing(searchRecords);
        setSubscriptionList(result);
    }, [company]);

    const handleSubscribe = useCallback((data: any) => {
        const value = data?.value || 'none';
        setSubscriptionList({
            ...subscriptionList,
            [`${data.id}`]: value,
        })

    }, [subscriptionList]);

    const getSubscriptionLabel = (value: string) => {
        const subscriptionData = filterMapRecords(value, subscriptionTypesList, 'value', 'exact', 'string');
        return subscriptionData?.[0]?.label || 'none';
    }

    return (
        <>
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
                                <TableCell width="35%" align="left"><b>Scenarios</b></TableCell>
                                <TableCell width="22%" align="left"><b>Subscription</b></TableCell>
                                <TableCell width="43%" align="left"></TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {scenarioListing?.map((row: any) => (
                                <TableRow key={row.id}>
                                    <TableCell component="th" scope="row" align="left">{row.name}</TableCell>
                                    <TableCell component="th" scope="row" align="left">
                                        {subscriptionList?.[row.id] === 'none' && 
                                            <ButtonLinks label="Subscribe" textTransform="uppercase" icon="add_circle" bgColor={Palette.deepPurple.Main}  onClickAction={() => handleSubscribe({ id: row.id, value: 'subscribed'})}  />
                                        }
                                        {subscriptionList?.[row.id] === 'subscribed' &&
                                            <ButtonLinks label="Un Subscribe" textTransform="uppercase" icon="remove_circle" bgColor={Palette.deepMaroon.Main}  onClickAction={() => handleSubscribe({ id: row.id, value: 'none'})}  />
                                        }
                                    </TableCell>
                                    <TableCell>
                                        <Box py={1} px={1.5}>
                                            {subscriptionList?.[row.id] === 'subscribed' ? 
                                                (row.subscription !== '' ? <Chip label={getSubscriptionLabel(row.subscription)} /> : '')
                                                : ''}
                                        </Box>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            }
        </>
    )
}

export default React.memo(UserSubscriptions);