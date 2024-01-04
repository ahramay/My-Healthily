import React, { useContext, useMemo } from 'react';
import { useHistory } from 'react-router-dom';
import { Context } from 'account/Context';
import { getSession, clearAllSessions } from 'utility/sessions';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Divider from '@material-ui/core/Divider';
import Typography from '@material-ui/core/Typography';
import SinglePage from 'styleguide/layout/SinglePage';
import ButtonIcon from 'styleguide/ButtonIcon';

import { API_ACCOUNT_LOGOUT } from 'services/api/config';
import { serviceQuery } from 'services/query';
import { useAuth0 } from "@auth0/auth0-react";

const Logout: React.FC = () => {
    const history = useHistory();
    const {dispatch} = useContext(Context);
    const { logout } = useAuth0();

    useMemo(async () => {
        logout();
        const accessToken = getSession('bearer');
        const url = API_ACCOUNT_LOGOUT;
        if (accessToken && accessToken !== null) {
            serviceQuery(url).push({},
            {
                headers: {
                    'Authorization': `Bearer ${accessToken}` 
                }
            }).then((result) => {
                clearAllSessions();
            }).catch(err => {
                if(!err) return;
            });
        }
        clearAllSessions();
        dispatch({
            type: 'setUser',
            value: {
                bearer: null,
                refresh: null,
                navigateTo: 'exit'
            },
        });
        
    }, [dispatch, logout]);

    return (
        <SinglePage>
            <Card>
                <Box p={2.5}>
                    <CardContent>
                        <Box display="flex">
                            <Box p={1} width="100%">
                                <Typography variant="h5" component="h2">Logout</Typography>
                            </Box>
                        </Box>
                        <Divider />
                        <Box alignItems="center" py={2}>
                            You have successfully logged out of your account.
                        </Box>
                        <Button variant="outlined" color="primary" onClick={() => { history.push('/') }} >
                            <ButtonIcon icon="lock" label="Log In Again" />
                        </Button>
                    </CardContent>
                </Box>
            </Card>
        </SinglePage>
    );
}

export default Logout;