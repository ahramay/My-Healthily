import React from 'react';
import { useHistory } from 'react-router-dom';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Divider from '@material-ui/core/Divider';
import Typography from '@material-ui/core/Typography';
import SinglePage from 'styleguide/layout/SinglePage';
import ButtonIcon from 'styleguide/ButtonIcon';

const LogoutDisplay: React.FC = () => {
    const history = useHistory();
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

export default LogoutDisplay;