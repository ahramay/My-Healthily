import React, { useState, useEffect, useCallback } from 'react';
import { useHistory } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import { Palette } from 'utility/Colors/Palette';
import Box from '@material-ui/core/Box';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import Button from  '@material-ui/core/Button';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

import { API_SCENARIOS, API_FORECASTS, API_NOTIFICATION_MESSAGES } from 'services/api/config';
import { serviceQuery, deleteResource } from 'services/query';
import Notification from 'styleguide/form/Notification';
import Loader from 'styleguide/Loader';

import ButtonIcon from 'styleguide/ButtonIcon';
import ButtonLinks from 'styleguide/ButtonLinks';
import MessageModal from 'styleguide/MessageModal';

const useStyles = makeStyles({
  table: {
    minWidth: 650,
    maxWidth: 900,
    border: `solid 1px ${Palette.Grey.Light}`,
    boxShadow: 'none',
    borderRadius: 1,
    '& .MuiTableBody-root .MuiTableCell-root': {
        padding: '8px 16px',
    }
  },
});

const ScenariosListing: React.FC = () => {
    const classes = useStyles();
    const history = useHistory();
    const [notification, setNotification] = useState<any>(null);
    const [showLoader, setShowLoader] = useState<boolean>(true);
    const [fetchRecords, setFetchRecords] = useState<boolean>(true);

    const [openMessageModal, setOpenMessageModal] = useState<boolean>(false);
    const [selectedModalValue, setSelectedModalValue] = useState<string>('');
    const [selectedModalData, setSelectedModalData] = useState<string>('');

    const handleMessageModalOpen = (data: any) => {
        setSelectedModalValue(`Are you sure, you want to delete ${data?.name}?`);
        setSelectedModalData(data);
        setOpenMessageModal(true);
    };

    const handleMessageModalClose = (value: boolean = false) => {
        if (value === true) {
            deleteScenario(selectedModalData);
        } else {
            setSelectedModalData('');
        }
        setOpenMessageModal(false);
    };

    const navigateToPath = (url: string) => {
        history.push(url);
    }

    const [scenariosData, setScenariosData] = useState<any>([]);
    useEffect(() => {
        if (!fetchRecords) return;
        const url = API_SCENARIOS;
        if (url) {
            serviceQuery(url).fetchAll().then((result) => {
                setScenariosData(result.data);
console.log(result.data);
                setShowLoader(false);
            }).catch(err => {
                if(!err) return;
                setNotification([API_NOTIFICATION_MESSAGES.ALERT.ERROR, err.message]);
                setShowLoader(false);
            });
            setFetchRecords(false);
        }
    }, [fetchRecords]);

    const deleteForecasts = useCallback(async (data: any) => {
        const url = `${API_SCENARIOS}`;
        if (url) {
            const getScenarioData = await serviceQuery(url).fetchById(data.id).then((result) => {
                return result?.data;
            }).catch(err => {
                if (err) return null;
            });

            if(getScenarioData && getScenarioData?.components?.length > 0) {
                const list = getScenarioData?.components;
                for(let item of list) {
                    deleteResource(API_FORECASTS, item.id);
                }
            }
        }
    }, []);

    const deleteScenario = useCallback((scenario: any) => {
        if(!scenario?.id) return;
        deleteForecasts(scenario);
        const url = `${API_SCENARIOS}`;
        if (url) {
            serviceQuery(url).delete(scenario.id).then(async (result) => {
                const portfolio = await result.data;
                if (portfolio) {
                    setNotification([API_NOTIFICATION_MESSAGES.ALERT.SUCCESS, API_NOTIFICATION_MESSAGES.RECORD_DELETED_SUCCESS]);
                }
            }).catch(err => {
                if(!err) return;
                setNotification([API_NOTIFICATION_MESSAGES.ALERT.ERROR, err.message]);
            });
			setTimeout(() => {
				setFetchRecords(true);
			}, 300);
        }
    }, [deleteForecasts]);

    return (
        <>
            <Card>
                <Box p={2.5}>
                    <CardContent>
                        {notification && notification?.length && 
                            <Box my={1}>
                                <Notification severity={notification?.[0]} message={notification?.[1]} />
                            </Box>
                        }
                        <Box display="flex">
                            <Box p={1} width="100%">
                                <Typography variant="h5" component="h2">Scenarios</Typography>
                            </Box>
                            <Box p={1} flexShrink={1}>
                                <Button size="small" variant="outlined" color="primary" onClick={() => navigateToPath('/scenarios/add')} >
                                    <ButtonIcon icon="add" label="ADD" />
                                </Button>
                            </Box>
                        </Box>
                        <Divider />

                        {showLoader && <Loader margin={2} /> }

                        <Box alignItems="center" py={2}>
                            <TableContainer className={classes.table} component={Paper}>
                                <Table aria-label="scenarios table">
                                    <TableHead>
                                        <TableRow>
                                            <TableCell align="left"><b>Name</b></TableCell>
                                            <TableCell align="right"></TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {!showLoader && scenariosData && scenariosData?.length === 0  &&  
                                            <TableRow>
                                                <TableCell component="th" scope="row" align="left">Sorry, no scenarios yet.</TableCell>
                                            </TableRow>
                                        }
                                        {scenariosData?.map((row: any) => (
                                            <TableRow key={row.id}>
                                                <TableCell component="th" scope="row" align="left">{row.name}</TableCell>
                                                <TableCell component="th" scope="row" align="right">
                                                    <ButtonLinks label="VIEW" icon="visibility" bgColor={Palette.deepPurple.Main}  onClickAction={() => navigateToPath('/scenarios/edit/' + row.id + '&d=1')}  />
                                                    <ButtonLinks label="EDIT" icon="edit" bgColor={Palette.deepPurple.Dark}  onClickAction={() => navigateToPath(`/scenarios/edit/${row.id}`)}  />
                                                    <ButtonLinks label="COPY" icon="file_copy" bgColor={Palette.deepGreen.Dark}  onClickAction={() => navigateToPath('/scenarios/edit/' + row.id + '&c=1')}  />
                                                    <ButtonLinks label="" icon="delete" circleIcon={true} color={Palette.Red.Main} bgColor={Palette.deepMaroon.BgLight} onClickAction={() => handleMessageModalOpen(row)} />
                                                </TableCell>
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                            </TableContainer>
                        </Box>
                    </CardContent>

                </Box>
                <MessageModal title="Confirm" message={selectedModalValue} open={openMessageModal} onClose={handleMessageModalClose} />
            </Card>
        </>
    )
};

export default ScenariosListing;