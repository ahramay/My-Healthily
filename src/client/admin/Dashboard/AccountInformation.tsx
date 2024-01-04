import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import Box from '@material-ui/core/Box';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import Button from  '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';

import {
    INPUT_PATTERN_EMAIL,
    INPUT_PATTERN_ONSET_NUMBER,
    INPUT_PATTERN_WORDS,
} from 'utility/constants';
import Form from 'styleguide/layout/Form';
import FormLabel from 'styleguide/form/Text/FormLabel';
import TextField from 'styleguide/form/Text/Field';
import ButtonIcon from 'styleguide/ButtonIcon';
import Notification from 'styleguide/form/Notification';
import { NOTIFICATION_MESSAGES } from 'services/utils';
import { filterMapRecords } from 'utility/common';
import { checkJWTUserData } from 'utility/sessions';
import { usersList, terms } from 'staticData/usersList';

const AccountInformation:React.FC = () => {
    const history = useHistory();
    const loggedInUser: any = checkJWTUserData();
    const userData = filterMapRecords(loggedInUser?.username, usersList, 'username', 'exact');
    const [companyFields, setCompanyFields] = useState<any>({
        companyName : userData?.[0]?.company?.name,
        companyEmail: userData?.[0]?.company?.email || '',
        companyPhone : userData?.[0]?.company?.phone || '',
        companyLogo: userData?.[0]?.company?.logo || '',
    });

    const [termsAgree, setTermsAgree] = useState<boolean>(false);
    const [notification, setNotification] = useState<any>(null);

    const handleCompanyFields = (value: any, name: string) => {
        setCompanyFields({
            ...companyFields,
            [name]: value,
        })
    }

    const handleSaveAccountInfo = () => {
        setNotification([NOTIFICATION_MESSAGES.ALERT.SUCCESS, NOTIFICATION_MESSAGES.RECORD_SAVING_SUCCESS]);
    }

    const handleTermsAgree = () => {
        setTermsAgree(!termsAgree);
    }
   
    return (
        <>
            <Card>
                <Box p={2.5}>
                    <CardContent>
                        <Box display="flex">
                            <Box p={1} width="100%">
                                <Typography variant="h5" component="h2">Account Information</Typography>
                            </Box>
                        </Box>

                        <Divider />

                        <Box>
                            <Form>

                                <Grid container spacing={2}>
                                    <Grid item xs={12} sm={3} xl={2}>
                                        <FormLabel label="Company Name">
                                            <TextField 
                                                name="companyName" value={companyFields.companyName} error={false} required={true} tabIndex={1}
                                                onChange={handleCompanyFields} inputPattern={INPUT_PATTERN_WORDS}
                                            />
                                        </FormLabel>
                                    </Grid>
                                </Grid>
                                
                                <Grid container spacing={2}>
                                    <Grid item xs={12} sm={3} xl={2}>
                                        <FormLabel label="Company Email">
                                            <TextField 
                                                name="companyEmail" value={companyFields.companyEmail} error={false} required={true} tabIndex={1}
                                                onChange={handleCompanyFields} inputPattern={INPUT_PATTERN_EMAIL}
                                            />
                                        </FormLabel>
                                    </Grid>
                                </Grid> 

                                <Grid container spacing={2}>
                                    <Grid item xs={12} sm={3} xl={2}>
                                        <FormLabel label="Company Phone">
                                            <TextField 
                                                name="companyPhone" value={companyFields.companyPhone} error={false} required={true} tabIndex={1}
                                                onChange={handleCompanyFields} inputPattern={INPUT_PATTERN_ONSET_NUMBER}
                                            />
                                        </FormLabel>
                                    </Grid>
                                </Grid>

                                <Grid container spacing={2}>
                                    <Grid item xs={12} sm={3} xl={2}>
                                        <FormLabel label="Company Logo">
                                            <Box>
                                                <Button variant="outlined" color="primary" size="large" disableElevation={true} onClick={() => { history.push('/') }} >
                                                    <ButtonIcon icon="cloud_upload" label="Upload" />
                                                </Button>
                                            </Box>
                                        </FormLabel>
                                    </Grid>
                                </Grid>

                                <Grid container spacing={2}>
                                    <Grid item xs={12} sm={8}>
                                        <FormLabel label="Terms & Conditions">
                                            <Box p={1} maxHeight={100} border={1} borderColor="primary" style={{overflowY: 'scroll'}}>
                                                {terms}
                                            </Box>
                                            
                                            <Box my={1}>
                                                <FormControlLabel
                                                    control={
                                                    <Checkbox
                                                        checked={termsAgree}
                                                        onChange={handleTermsAgree}
                                                        name="agreed"
                                                        color="primary"
                                                    />
                                                    }
                                                    label="I Agree"
                                                />
                                            </Box>

                                        </FormLabel>
                                    </Grid>
                                </Grid>
                               
                            </Form>
                        </Box>

                        <Box display="flex" flexDirection="row" mt={2}>
                            <Box>
                                <Button disabled={!termsAgree} variant="contained" color="primary" size="large" disableElevation={true} onClick={handleSaveAccountInfo} >
                                    <ButtonIcon icon="save" label="Save" />
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

export default React.memo(AccountInformation);