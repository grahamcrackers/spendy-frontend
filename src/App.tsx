import { useAuth0 } from '@auth0/auth0-react';
import React, { useEffect, useState } from 'react';
import { Switch } from 'react-router';
import { HomePage } from './components/home-page/home-page';
import { PrivateRoute } from './components/private-route/private-route';
import { TestPage } from './components/test-page/test-page';

export const App = () => {
    const [token, setToken] = useState('');
    const { isAuthenticated, isLoading, loginWithRedirect, getAccessTokenSilently } = useAuth0();

    useEffect(() => {
        // i'm really not sure if this is the best place to put this but we don't want to render the screen until we know
        // we are authenticated with auth0, AND that we have a token set for the api calls.
        if (!isAuthenticated) {
            // don't need right now
            // getAccessTokenSilently().then((token) => {
            //     fetchWrapper.setDefaultHeaders({ Authorization: `Bearer ${token}` });
            //     setToken(token);
            // });
        }

        // we only want the redirect to run if we aren't authenticated or if `isLoading` comes back as true,
        // which auth0 is making calls in the background to check if we are authenticated or not
        if (isLoading || isAuthenticated) {
            return;
        }

        (async () => {
            await loginWithRedirect({
                appState: { targetUrl: window.location.pathname },
            });
        })();
    }, [isLoading, isAuthenticated, token, loginWithRedirect, getAccessTokenSilently, setToken]);

    return (
        <Switch>
            <PrivateRoute exact path="/" component={HomePage} />
            <PrivateRoute exact path="/test" component={TestPage} />
        </Switch>
    );
};
