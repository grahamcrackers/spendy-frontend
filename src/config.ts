import { Auth0ProviderOptions } from '@auth0/auth0-react';

// These config options will need to be provided at build time.

interface Config {
    auth0: Auth0ProviderOptions;
}

export const config: Config = {
    auth0: {
        domain: process.env.REACT_APP_AUTH0_DOMAIN || '',
        clientId: process.env.REACT_APP_AUTH0_CLIENT_ID || '',
        audience: process.env.REACT_APP_AUTH0_AUDIENCE,
        scope: process.env.REACT_APP_AUTH0_SCOPE,
    },
};
