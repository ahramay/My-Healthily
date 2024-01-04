import React from 'react';
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

import ButtonIcon from 'styleguide/ButtonIcon';
import ButtonLinks from 'styleguide/ButtonLinks';
import { usersList } from 'staticData/usersList';

const useStyles = makeStyles({
  table: {
    minWidth: 650,
    maxWidth: 1000,
    border: `solid 1px ${Palette.Grey.Light}`,
    boxShadow: 'none',
    borderRadius: 1,
    '& .MuiTableBody-root .MuiTableCell-root': {
        padding: '8px 16px',
    },
    '& .MuiTableRow-root:nth-of-type(even)': {
        backgroundColor: Palette.Grey.LightBg,
    },
    '& .MuiTableHead-root .MuiTableRow-root .MuiTableCell-root': {
        backgroundColor: Palette.Grey.LightBg,
    },
  },
});

const ClientsList:React.FC = () => {
    const classes = useStyles();
    const history = useHistory();

    const getClients = (dataList: any) => {
        let list = [];
        for(let item of dataList) {
            const result = [item]?.filter((subItem: any) => subItem.role === 'client_admin');
            if (result?.length > 0) {
                list.push(result?.[0]);
            }
        }
        return list;
        
    } 

    const getMembers = (dataList: any) => {
        let list = [];
        for(let item of dataList) {
            const result = [item]?.filter((subItem: any) => subItem.role === 'client_user');
            if (result?.length > 0) {
                list.push(result?.[0]);
            }
        }
        return list;
        
    }
    const memberRows = getMembers(usersList);
    const clientRows = getClients(usersList);

    const membersDropDown = (id: string) => {
        let list = [];
        for(let item of memberRows) {
            if (item?.company?.id === parseInt(id)) {
                list.push({
                    label: `${item.username}`, value: `${item.id}`
                });
            }
        }
        return list;
    };

    const navigateToPath = (url: string) => {
        history.push(url);
    }

    return(
        <Card>
            <Box p={2.5}>
                <CardContent>
                    <Box display="flex">
                        <Box p={1} width="100%">
                            <Typography variant="h5" component="h2">Manage Sapiat Clients</Typography>
                        </Box>
                        <Box p={1} flexShrink={1}>
                            <Button size="small" variant="outlined" color="primary" onClick={() => navigateToPath('/clients/add')} >
                                <ButtonIcon icon="add" label="ADD" />
                            </Button>
                        </Box>
                    </Box>
                    <Divider />

                    <Box alignItems="center" py={2}>
                        <TableContainer className={classes.table} component={Paper}>
                            <Table aria-label="clients table">
                                <TableHead>
                                    <TableRow>
                                        <TableCell align="left"><b>Username</b></TableCell>
                                        <TableCell align="left"><b>Company</b></TableCell>
                                        <TableCell align="center"><b>Status</b></TableCell>
                                        <TableCell align="center"><b>Members</b></TableCell>
                                        <TableCell align="right"></TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {clientRows.map((row: any, index: number) => (
                                        <TableRow key={index}>
                                            <TableCell component="th" scope="row" align="left">{row.username}</TableCell>
                                            <TableCell component="th" scope="row" align="left">{row.company.name}</TableCell>
                                            <TableCell component="th" scope="row" align="center">{row.status}</TableCell>
                                            <TableCell component="th" scope="row" align="center">{membersDropDown(row?.company?.id)?.length}</TableCell>
                                            <TableCell component="th" scope="row" align="right">
                                                <ButtonLinks label="EDIT" icon="edit" bgColor={Palette.deepPurple.Dark}  onClickAction={() => navigateToPath(`/clients/edit/${row.id}`)}  />
                                                <ButtonLinks label="ADD MEMBERS" icon="group" bgColor={Palette.deepGreen.Dark}  onClickAction={() => navigateToPath(`/clients/members/${row.id}`)}  />
                                                <ButtonLinks label="" icon="delete" circleIcon={true} color={Palette.Red.Main} bgColor={Palette.deepMaroon.BgLight} onClickAction={() => {void(0) }} />
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </TableContainer>
                    </Box>

                </CardContent>
            </Box>
        </Card>
    )
};

export default React.memo(ClientsList)