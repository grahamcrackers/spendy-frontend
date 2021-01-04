import { Auth0Provider } from '@auth0/auth0-react';
import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { App } from './App';
import { config } from './config';
import './index.css';
import reportWebVitals from './reportWebVitals';

ReactDOM.render(
    <Auth0Provider
        domain={config.auth0.domain}
        clientId={config.auth0.clientId}
        redirectUri={window.location.origin}
        audience={config.auth0.audience}
        scope={config.auth0.scope}
        // useRefreshTokens={true}
    >
        <BrowserRouter>
            <App />
        </BrowserRouter>
    </Auth0Provider>,
    document.getElementById('root'),
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
