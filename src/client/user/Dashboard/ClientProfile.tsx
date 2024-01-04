import React, { useState } from 'react';
import Box from '@material-ui/core/Box';
import Divider from '@material-ui/core/Divider';
import Button from  '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';

import Form from 'styleguide/layout/Form';
import FormLabel from 'styleguide/form/Text/FormLabel';
import TextField from 'styleguide/form/Text/Field';
import ButtonIcon from 'styleguide/ButtonIcon';
import { loggedInUser } from 'utility/sessions';

const ClientProfile: React.FC = () => {
    const username = loggedInUser?.username || '';

    const [pofileFields, setProfileFields] = useState<any>({
        firstName : '',
        lastName : '',
    });

    const handlepofileFields = (value: any, name: string) => {
        setProfileFields({
            ...pofileFields,
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
                                <Typography variant="h5" component="h2">Profile</Typography>
                            </Box>
                        </Box>
                        <Divider />

                        <Box alignItems="center" py={2}>
                            <Form>

                                <Box display="flex">
                                    <Box p={0}>
                                        <Typography variant="body1" component="h2">Welcome, <b>{username}</b></Typography>
                                    </Box>
                                </Box>
                        
                                <Grid container spacing={2}>
                                    <Grid item xs={12} sm={3} xl={2}>
                                        <FormLabel label="First Name">
                                            <TextField 
                                                name="firstName" value={pofileFields.firstName} error={false} required={true} tabIndex={1}
                                                onChange={handlepofileFields}
                                            />
                                        </FormLabel>
                                    </Grid>
                                </Grid>

                                <Grid container spacing={2}>
                                    <Grid item xs={12} sm={3} xl={2}>
                                        <FormLabel label="Last Name">
                                            <TextField 
                                                name="lastName" value={pofileFields.lastName} error={false} required={true} tabIndex={1}
                                                onChange={handlepofileFields}
                                            />
                                        </FormLabel>
                                    </Grid>
                                </Grid>

                                <Box textAlign="left" py={2}>
                                    <Button 
                                        variant="contained" color="primary" size="large" disableElevation={true} 
                                        onClick={() => {}}
                                        tabIndex={3}
                                    ><ButtonIcon icon="save" label="Save" /></Button>
                                </Box>

                            </Form>
                        </Box>
                    </CardContent>
                </Box>
            </Card>
        </>
    )
}

export default React.memo(ClientProfile);