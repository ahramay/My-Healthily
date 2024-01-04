import { Auth0Provider } from "@auth0/auth0-react";

const Auth0ProviderWithHistory = ({ children }) => {
  const domain = process.env.REACT_APP_AUTH0_DOMAIN;
  const clientId = process.env.REACT_APP_AUTH0_CLIENT_ID;
  const redirectUrl = process.env.REACT_APP_HOST;
  const audience = `https://${domain}/api/v2/`;

  return (
    <Auth0Provider
      domain={domain}
      clientId={clientId}
      redirectUri={redirectUrl}
      audience={audience}
      scope="read:current_user update:current_user_metadata"
    >
      {children}
    </Auth0Provider>
  );
};

export default Auth0ProviderWithHistory;