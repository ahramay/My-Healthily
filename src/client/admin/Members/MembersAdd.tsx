import React, { useState } from 'react';
import Box from '@material-ui/core/Box';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import Button from  '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import Chip from '@material-ui/core/Chip';
import Business from '@material-ui/icons/Business';

import {
    INPUT_PATTERN_WORDS,
    INPUT_PATTERN_EMAIL,
} from 'utility/constants';
import Form from 'styleguide/layout/Form';
import FormLabel from 'styleguide/form/Text/FormLabel';
import TextField from 'styleguide/form/Text/Field';
import ButtonIcon from 'styleguide/ButtonIcon';
import Notification from 'styleguide/form/Notification';
import { NOTIFICATION_MESSAGES } from 'services/utils';
import { filterMapRecords, caseFormat } from 'utility/common';
import { checkJWTUserData } from 'utility/sessions';
import { usersList } from 'staticData/usersList';
import MemberPermissions from './MemberPermissions';
import { useParams } from 'react-router-dom';


const MembersAdd:React.FC = () => {
    const params:any = useParams()

    const companyUserAccount = filterMapRecords(`${params.id}`, usersList, 'id', 'exact', 'int')?.[0] || null;
    const companyAccount = companyUserAccount?.role === 'client_admin' ? companyUserAccount : null;

    const loggedInUser: any = checkJWTUserData();
    const userData = filterMapRecords(loggedInUser?.username, usersList, 'username', 'exact');

    const companyData = companyAccount ? companyAccount : userData?.[0];

    const [memberFields, setMemberFields] = useState<any>({
        memberUsername : '',
        memberPassword : '',
        memberEmail:'',
        memberStatus: companyData?.company?.logo || '',
        memberRole: '',
        memberCompany: companyData?.company?.country || '',
    });

    const [notification, setNotification] = useState<any>(null);
    const handlememberFields = (value: any, name: string) => {
        setMemberFields({
            ...memberFields,
            [name]: value,
        })
    }

    const handleSaveAccountInfo = () => {
        setNotification([NOTIFICATION_MESSAGES.ALERT.SUCCESS, NOTIFICATION_MESSAGES.RECORD_CREATED_SUCCESS]);
    }

    return (
        <>
            <Card>
                <Box p={2.5}>
                    <CardContent>
                        <Box display="flex">
                            <Box p={1} width="100%">
                                <Typography variant="h5" component="h2">Add Members</Typography>
                            </Box>
                        </Box>

                        <Divider />

                        <Box>
                            <Form>

                                <Grid container spacing={2}>
                                    <Grid item xs={12} sm={3} xl={2}>
                                        <FormLabel label="Company">
                                            <Chip
                                                icon={<Business />}
                                                label={caseFormat(companyData?.company?.name, 'title')}
                                                color="primary"
                                                variant="default"
                                            />
                                        </FormLabel>
                                    </Grid>
                                </Grid>

                                <Grid container spacing={2}>
                                    <Grid item xs={12} sm={3} xl={2}>
                                        <FormLabel label="Username">
                                            <TextField 
                                                name="memberUsername" value={memberFields.memberUsername} error={false} required={true} tabIndex={1}
                                                onChange={handlememberFields} inputPattern={INPUT_PATTERN_WORDS}
                                            />
                                        </FormLabel>
                                    </Grid>
                                </Grid>

                                <Grid container spacing={2}>
                                    <Grid item xs={12} sm={3} xl={2}>
                                        <FormLabel label="Email">
                                            <TextField 
                                                name="memberEmail" value={memberFields.memberEmail} error={false} required={true} tabIndex={1}
                                                onChange={handlememberFields} inputPattern={INPUT_PATTERN_EMAIL}
                                            />
                                        </FormLabel>
                                    </Grid>
                                </Grid> 

                                <Grid container spacing={2}>
                                    <Grid item xs={12} sm={3} xl={2}>
                                        <FormLabel label="Password">
                                            <TextField 
                                                name="memberPassword" value={memberFields.memberPassword} error={false} required={true} tabIndex={1}
                                                type="password"
                                                onChange={handlememberFields} inputPattern={INPUT_PATTERN_WORDS}
                                            />
                                        </FormLabel>
                                    </Grid>
                                </Grid>

                                <Grid container spacing={2}>
                                    <Grid item xs={12} sm={5}>
                                        <FormLabel label="Permissions">
                                            <MemberPermissions row={{id: 0}} />
                                        </FormLabel>
                                    </Grid>
                                </Grid>
                               
                            </Form>
                        </Box>

                        <Box display="flex" flexDirection="row" mt={2}>
                            <Box>
                                <Button variant="contained" color="primary" size="large" disableElevation={true} onClick={handleSaveAccountInfo} >
                                    <ButtonIcon icon="person_add" label="Create Member" />
                                </Button>
                            </Box>
                        </Box>

                        {notification && notification?.length && 
                            <Box my={2}>
                                <Notification severity={notification?.[0]} message={notification?.[1]} />
                            </Box>
                        }
                    </CardContent>

                </Box>
            </Card>
        </>
    )
};

export default React.memo(MembersAdd);