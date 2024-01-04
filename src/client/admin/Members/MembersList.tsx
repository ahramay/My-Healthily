import React, { useCallback, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';
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
import Chip from '@material-ui/core/Chip';

import FormLabel from 'styleguide/form/Text/FormLabel';
import TextField from 'styleguide/form/Text/Field';
import ButtonIcon from 'styleguide/ButtonIcon';
import ButtonLinks from 'styleguide/ButtonLinks';
import { filterMapRecords, caseFormat } from 'utility/common';
import { checkJWTUserData } from 'utility/sessions';
import { usersList } from 'staticData/usersList';
import MemberPermissions from './MemberPermissions';

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


const MembersList:React.FC = () => {
    const classes = useStyles();
    const history = useHistory();
    const params:any = useParams()

    const companyUserAccount = filterMapRecords(`${params.id}`, usersList, 'id', 'exact', 'int')?.[0] || null;
    const companyAccount = companyUserAccount?.role === 'client_admin' ? companyUserAccount : null;

    const loggedInUser: any = checkJWTUserData();
    const userData = filterMapRecords(loggedInUser?.username, usersList, 'username', 'exact');

    const companyId = companyAccount ? companyAccount?.company?.id : userData?.[0]?.company?.id;
    const [memberStatus, setMemberStatus] = useState<any>(null);
    const [memberDetails, setMemberDetails] = useState<any>(null);

    const getMembers = (dataList: any) => {
        let list = [];
        for(let item of dataList) {
            const result = [item]?.filter((subItem: any) => subItem.company.id === companyId && subItem.role === 'client_user');
            if (result?.length > 0) {
                list.push(result?.[0]);
            }
        }
        return list;
        
    } 
    const memberRows = getMembers(usersList);

    const membersDropDown = (id: string) => {
        const membersList = getMembers(usersList);
        let list = [{
             label: `Select Member`, value: `0`
        }];
        for(let item of membersList) {
            if (item.id !== parseInt(id)) {
                list.push({
                    label: `${item.username}`, value: `${item.id}`
                });
            }
        }
        if (membersList?.length === 0) {
            list.push({
                label: `Sorry no members yet`, value: `0`
            });
        }
        return list;
    };
    

    const navigateToPath = (url: string) => {
        history.push(url);
    }

    const handleMemberStatus = useCallback((data: any) => {
        const currentValue = memberStatus?.[`user_${data}`];
        const currentStatus = !currentValue ? 'active' : currentValue;
        const newStatus = (currentStatus === 'active') ? 'suspend' : 'active';
        let result = {
            ...memberStatus,
            [`user_${data}`] : newStatus,
        };
        setMemberStatus(result);
    }, [memberStatus]);

    const getMemberStatusValue = (data: any) => {
        const currentValue = memberStatus?.[`user_${data.id}`];
        if(!currentValue) {
            return caseFormat(data.status, 'title');
        }
        return caseFormat(currentValue, 'title');
    }

    const handleMemberDetails = (value: any, name: string) => {
        setMemberDetails({
            ...memberDetails,
            [name]: value,
        })
    }

    return (
        <>
            <Card>
                <Box p={2.5}>
                    <CardContent>
                        <Box display="flex">
                            <Box p={1} width="100%">
                                <Typography variant="h5" component="h2">Manage Members</Typography>
                            </Box>
                            <Box p={1} flexShrink={1}>
                                <Button size="small" variant="outlined" color="primary" 
                                onClick={() => navigateToPath(
                                    companyAccount ? `${params.id}/member` : '/members/add'
                                )} >
                                    <ButtonIcon icon="add" label="ADD" />
                                </Button>
                            </Box>
                        </Box>
                        <Divider />

                        <Box alignItems="center" py={2}>
                            <TableContainer className={classes.table} component={Paper}>
                                <Table aria-label="users table">
                                    <TableHead>
                                        <TableRow>
                                            <TableCell align="left"><b>Username</b></TableCell>
                                            <TableCell align="left"><b>Permissions</b></TableCell>
                                            <TableCell width={100} align="left"></TableCell>
                                            <TableCell align="right"></TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {memberRows.map((row: any, index: number) => (
                                            <TableRow key={index}>
                                                <TableCell component="th" scope="row" align="left">
                                                    <Box textAlign="center" my={0.5}><ButtonIcon icon="person" label={caseFormat(row.username, 'title')} /></Box>
                                                    <Box textAlign="center" my={0.5}><Chip color={getMemberStatusValue(row) === 'Active' ? 'primary':'secondary'} size="small" label={getMemberStatusValue(row)} /></Box>
                                                </TableCell>
                                                <TableCell component="th" scope="row" align="left">
                                                    <MemberPermissions row={row} />
                                                </TableCell>
                                                <TableCell>
                                                    <Box>
                                                        <FormLabel label="Expiry Date" size="small">
                                                            <TextField 
                                                                name={`user_${row.id}_date`} value={memberDetails?.[`user_${row.id}_date`]} error={false} required={true} tabIndex={1}
                                                                onChange={handleMemberDetails} type="date" size="small"
                                                                fullWidth={true}
                                                            />
                                                        </FormLabel>
                                                    </Box>
                                                    <Box>
                                                        <FormLabel label="Reassign To Member" size="small">
                                                            <TextField 
                                                                name={`assign_${row.id}_member`} value={''} error={false} required={true} tabIndex={1}
                                                                type="select" size="small" selectOptions={membersDropDown(row.id)} fullWidth={true} defaultValue={memberDetails?.[`assign_${row.id}_member`]}
                                                                onChange={handleMemberDetails}
                                                            />
                                                        </FormLabel>
                                                    </Box>
                                                </TableCell>
                                                <TableCell component="th" scope="row" align="right">
                                                    <Box my={1}>
                                                        <ButtonLinks label="Delete Member" icon="delete" textTransform="capitalize" bgColor={Palette.Red.Dark} onClickAction={() => {void(0) }} />
                                                    </Box>

                                                    <Box my={1}>
                                                        <ButtonLinks label="Reset Password" icon="rotate_left" textTransform="capitalize" bgColor={Palette.deepGreen.Dark} onClickAction={() => {void(0) }} />
                                                    </Box>
                                                    
                                                    {getMemberStatusValue(row) === 'Active' && 
                                                        <Box my={1}>
                                                            <ButtonLinks label="Suspend" icon="block" textTransform="capitalize" bgColor={Palette.deepMaroon.Main} onClickAction={() => handleMemberStatus(row.id)} />
                                                        </Box>
                                                    }
                                                    {getMemberStatusValue(row) === 'Suspend' && 
                                                        <Box my={1}>
                                                            <ButtonLinks label="Activate" icon="done" textTransform="capitalize" bgColor={Palette.deepPurple.Main} onClickAction={() => handleMemberStatus(row.id)} />
                                                        </Box>
                                                    }
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
        </>
    )
};

export default MembersList;