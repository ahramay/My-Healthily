import React, { useState, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import { Context } from 'account/Context';
import Container from '@material-ui/core/Container';
import Box from '@material-ui/core/Box';
import Form from 'styleguide/layout/Form';
import TextField from 'styleguide/form/Text/Field';
import { Palette } from 'utility/Colors/Palette';
import logo from 'assets/SapiatLogo.svg';
import preloader from 'assets/loader.svg';
import {
    INPUT_PATTERN_EMAIL,
    VALIDATION_PATTERN_EMAIL,
    INPUT_PATTERN_WORDS
} from 'utility/constants';

import { NOTIFICATION_MESSAGES } from 'services/utils';
import { createJWTSession } from 'utility/sessions';
import { hasRecord, filterMapRecords } from 'utility/common';
import { usersList } from 'staticData/usersList';
import ButtonLinks from 'styleguide/ButtonLinks';
import Notification from 'styleguide/form/Notification';

const Register:React.FC = () => {
    const history = useHistory();
    const [required, setRequired] = useState<boolean>(false);
    const [loader, setLoader] = useState<boolean>(false);
    const [notification, setNotification] = useState<any>(null);
    const [accountLogin, setAccountLogin] = useState<any>({
        accountEmail : '',
        accountKey : '',
        message: '',
    });
    const {dispatch} = useContext(Context);

    const setAccountValues = (value: any, name: string) => {
        setAccountLogin({
        ...accountLogin,
            [name]: value,
        })
    }

    const registerUser = () => {
        const loginStatus = () => {
            setLoader(true);
            if (accountLogin.accountEmail !== '') {
                setNotification([NOTIFICATION_MESSAGES.ALERT.INFO, NOTIFICATION_MESSAGES.LOGIN_AUTHENTICATE]);

                const userCheck = filterMapRecords(accountLogin.accountEmail, usersList, 'email', 'exact');
                const emailCheck = hasRecord(userCheck);
                const keyCheck = hasRecord(filterMapRecords(accountLogin.accountKey, usersList, 'code', 'exact'));
                
                // Temporary - Tokens woth static username and password
                if (emailCheck && keyCheck) {
                    const result = {
                        data : {
                            accessToken: 'jask2ajq23w=94_84=535sd45_kl45js=5dj454k=kdjksjd',
                            refreshToken: 'eoiqw873wdjdhs',
                            userData: [
                            {
                                id: userCheck?.[0]?.id,
                                username: userCheck?.[0]?.username,
                                email: userCheck?.[0]?.email,
                                status: userCheck?.[0]?.status,
                                role: userCheck?.[0]?.role,
                                company: userCheck?.[0]?.company,
                            }
                            ],
                        }
                    }
                    createJWTSession([
                        {'bearer' : result?.data?.accessToken},
                        {'refresh': result?.data?.refreshToken},
                        {'username': result?.data?.userData?.[0]?.username},
                        {'status': result?.data?.userData?.[0]?.status},
                        {'role': result?.data?.userData?.[0]?.role},
                    ]);
                    setNotification(NOTIFICATION_MESSAGES.LOGIN_SUCCESS);
                    dispatch({
                        type: 'setUser',
                        value: {
                            bearer: result?.data?.accessToken,
                            refresh: result?.data?.refreshToken,
                            userData: result?.data?.userData,
                        },
                    }); 
                    setLoader(false);
                    history.push('account');
                } else {
                    setNotification([NOTIFICATION_MESSAGES.ALERT.ERROR, NOTIFICATION_MESSAGES.REGISTER_ERROR]);
                    setLoader(false);
                }

            } else {
                setNotification([NOTIFICATION_MESSAGES.ALERT.ERROR, NOTIFICATION_MESSAGES.REGISTER_ERROR]);
                setLoader(false);
                setRequired(true);
            }
        }
        loginStatus();
    }

    return (
        <Container maxWidth={false}>
            <Container maxWidth="xs">
                <Form>
                <Box
                    display="flex"
                    flexDirection="column"
                    justifyContent="center"
                    alignItems="center"
                    minHeight="90vh"
                    width={1}
                    height={1}
                >
                    <Box textAlign="center" width={1} height={90} bgcolor={Palette.deepPurple.DarkBg} color={Palette.Base.White}>
                        <Box width={1} height={1} pt={2.5}>
                            <img src={logo} alt="SAPIAT" title="SAPIAT" />
                        </Box>
                    </Box>
                    <Box boxShadow={2} width={1} height={1} bgcolor={Palette.Base.White} color={Palette.Base.Grey}>
                        <Box px={3.5} py={3}>
                        <Box py={2}>
                            <TextField 
                                name="accountEmail" label="Email" value={accountLogin.accountEmail} error={required} required={true} 
                                inputPattern={INPUT_PATTERN_EMAIL} validationPattern={VALIDATION_PATTERN_EMAIL} tabIndex={1}
                                onChange={setAccountValues}
                            />
                        </Box>
                        <Box py={2}>
                            <TextField 
                                name="accountKey" label="Activation Key" value={accountLogin.accountKey} error={required} required={true} 
                                inputPattern={INPUT_PATTERN_WORDS} tabIndex={1}
                                onChange={setAccountValues}
                            />
                        </Box>

                        <Box textAlign="center" py={2}>
                            <ButtonLinks variant="contained" size="large" icon="person_add" label="Continue Registration" color="primary" onClickAction={registerUser} />
                        </Box>

                        {loader && 
                            <Box textAlign="center">
                                <img height="32" width="32" src={preloader} alt="SAPIAT Loader" />
                            </Box>
                        }

                        {notification && notification?.length && 
                            <Box>
                                <Notification severity={notification?.[0]} message={notification?.[1]} />
                            </Box>
                        }

                        <Box textAlign="center">
                            <ButtonLinks variant="text" textTransform="none" label="Back to Login" color="primary" onClickAction={() => history.push('/')} size="small" />
                        </Box>
                        </Box>
                    </Box>
                </Box>
                </Form>
            </Container>
        </Container>
    )
};

export default Register;