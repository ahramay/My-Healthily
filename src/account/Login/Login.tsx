import React, { useState, useMemo, useEffect } from 'react';
import queryString from 'query-string';
import { useHistory, useLocation } from 'react-router-dom';
import Container from '@material-ui/core/Container';
import Box from '@material-ui/core/Box';

import { Palette } from 'utility/Colors/Palette';
import Form from 'styleguide/layout/Form';
import Notification from 'styleguide/form/Notification';
import { NOTIFICATION_MESSAGES } from 'services/utils';
import logo from 'assets/SapiatLogo.svg';
import preloader from 'assets/loader.svg';

import { useAuth0 } from "@auth0/auth0-react";
import { createJWTSession } from 'utility/sessions';
import ButtonLinks from 'styleguide/ButtonLinks';

export interface Props {
  onChange?: (val: any) => void | undefined;
}

const Login: React.FC<Props> = () => {
  const history = useHistory();
  const { user, loginWithRedirect, getAccessTokenSilently } = useAuth0();
  const domain = process.env.REACT_APP_AUTH0_DOMAIN;
  const clientId = process.env.REACT_APP_AUTH0_CLIENT_ID;
  const redirectUrl = process.env.REACT_APP_HOST;
  const getLocation = useLocation();
  const queryData = queryString.parse(getLocation?.hash ? getLocation.hash : getLocation.search);
  const [loader, setLoader] = useState<boolean>(false);
  const [notification, setNotification] = useState<any>(null);

  const loginSsoApi = async () => {
    loginWithRedirect();
  }

 useEffect(() => {
    const getUserMetadata = async (user: any) => {
      try {
        const accessToken = await getAccessTokenSilently({
          audience: `https://${domain}/api/v2/`,
          scope: "read:current_user",
        });
        if (accessToken) {
          const result = {
            data : {
              accessToken,
              refreshToken: user.sub,
              userData: [
                {
                  id: user.email,
                  username: user.nickname,
                  email: user.email,
                  status: user.status ? user.status : 'active',
                  role: 'client_user',
                  company: 'SAPIAT',
                }
              ],
            }
          }
          createJWTSession([
            {'username': result?.data?.userData?.[0]?.username || ''},
            {'status': result?.data?.userData?.[0]?.status},
            {'role': result?.data?.userData?.[0]?.role},
          ]);
          if (domain !== '' && clientId !== '' && redirectUrl !== '') {
            window.location.href = `https://${domain}/authorize?response_type=token&client_id=${clientId}&redirect_uri=${redirectUrl}`;
          }
          return;
        }

      } catch (e) {
        setNotification([NOTIFICATION_MESSAGES.ALERT.ERROR, (e as Error).message]);
        setLoader(false);
      }
    };
    if (!user) return;
    setLoader(true);
    getUserMetadata(user);
  }, [user, domain, clientId, redirectUrl, getAccessTokenSilently]);

  const [loginRedirection, setLoginRedirection] = useState<boolean>(false);
  useMemo(() => {
    if (!queryData || loginRedirection) return;
    const { access_token } = queryData;
    if (access_token) {
      setLoader(true);
      const result = {
        data : {
          accessToken: access_token,
          refreshToken: '',
          userData: [
            {
              id: '',
              username: '',
              email: '',
              status: '',
              role: '',
              company: '',
            }
          ],
        }
      }

      createJWTSession([
        {'bearer' : result?.data?.accessToken}, 
        {'refresh': result?.data?.refreshToken}, 
      ]);

      setNotification([NOTIFICATION_MESSAGES.ALERT.SUCCESS, NOTIFICATION_MESSAGES.LOGIN_SUCCESS]);
      setLoginRedirection(true);
      window.location.href = "/";
      return;
    }
  }, [queryData, loginRedirection]);
  
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
                    
                    {!notification && !loader && 
                      <Box textAlign="center" py={2}>
                        <ButtonLinks variant="contained" size="large" icon="vpn_key" label="SSO LOGIN" color="primary" onClickAction={loginSsoApi} />
                      </Box>
                    }

                    {loader && 
                      <Box textAlign="center"><img height="32" width="32" src={preloader} alt="SAPIAT Loader" /></Box>
                    }

                    {notification && notification?.length && 
                        <Box>
                            <Notification severity={notification?.[0]} message={notification?.[1]} />
                        </Box>
                    }

                    <Box textAlign="center">
                      <ButtonLinks variant="text" textTransform="capitalize" label="Activate Registration?" color="primary" onClickAction={() => history.push('/register')} size="small" />
                    </Box>

                  </Box>
              </Box>
            </Box>
          </Form>
        </Container>
      </Container>
  )
}

export default Login;