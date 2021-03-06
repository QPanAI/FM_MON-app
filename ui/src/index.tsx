import 'bootstrap/dist/css/bootstrap.min.css'
import './index.css'
import mixpanel from 'mixpanel-browser';

import React, {ReactElement, useCallback} from 'react'
import ReactDOM from 'react-dom'
import {BrowserRouter as Router, useHistory} from "react-router-dom"

import * as Sentry from '@sentry/react'
import {Integrations} from '@sentry/tracing'
import {Auth0Provider} from "@auth0/auth0-react"
import './App.scss';
import './neumorphism.scss'

import {Alert} from "react-bootstrap";
import {ErrorBoundary} from "react-error-boundary"

import AppContainer from './screens/app_container'

mixpanel.init("7e19de9c3c68ba5a897f19837042a826")


if (process.env.REACT_APP_SENTRY_DSN) {
    Sentry.init({
        dsn: process.env.REACT_APP_SENTRY_DSN,
        integrations: [
            new Integrations.BrowserTracing(),
        ],
        tracesSampleRate: 1.0,
    });
}


interface ProviderProps {
    children: ReactElement
}

const Auth0ProviderWithHistory = (props: ProviderProps) => {
    const authODomain: string = process.env.REACT_APP_AUTHO_DOMAIN !
    const authOClientID: string = process.env.REACT_APP_AUTHO_CLIENT_ID !

    const history = useHistory()

    const onRedirectCallback = useCallback((appState: any) => {
        history.push(appState?.returnTo || window.location.pathname);
    }, [history])

    return (
        <Auth0Provider
            domain={authODomain}
            clientId={authOClientID}
            redirectUri={window.location.origin + '/login'}
            onRedirectCallback={onRedirectCallback}
        >
            {props.children}
        </Auth0Provider>
    );
};


function ErrorFallback({error}: any) {
    return <div>
        <Alert variant={'danger'}>{error.message}</Alert>
    </div>
}


ReactDOM.render(
    <React.StrictMode>
        <ErrorBoundary FallbackComponent={ErrorFallback}>
            <Router>
                <Auth0ProviderWithHistory>
                    <AppContainer/>
                </Auth0ProviderWithHistory>,
            </Router>
        </ErrorBoundary>
    </React.StrictMode>,
    document.getElementById('root')
);
