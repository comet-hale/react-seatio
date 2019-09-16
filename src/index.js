import React from 'react';
import ReactDOM from 'react-dom';
import { Router } from 'react-router-dom';

import createBrowserHistory from 'history/createBrowserHistory';

import lightBaseTheme from 'material-ui/styles/baseThemes/lightBaseTheme';
import { MuiThemeProvider, getMuiTheme } from 'material-ui/styles';
import { MuiThemeProvider as NewMuiThemeProvider } from '@material-ui/core/styles';
import { darkTheme } from './config/theme';

import Routes from './Routes';

import * as serviceWorker from './serviceWorker';
import './index.css';

const History = createBrowserHistory();

ReactDOM.render(
    <NewMuiThemeProvider theme={darkTheme}>
        <MuiThemeProvider muiTheme={getMuiTheme(lightBaseTheme)}>
            <Router history={History}>
                <Routes />
            </Router>
        </MuiThemeProvider>
    </NewMuiThemeProvider>,
    document.getElementById('root'),
);

serviceWorker.unregister();
