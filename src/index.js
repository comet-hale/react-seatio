import React from 'react';
import ReactDOM from 'react-dom';

import ChartView from './App';
import * as serviceWorker from './serviceWorker';

import lightBaseTheme from 'material-ui/styles/baseThemes/lightBaseTheme';
import { MuiThemeProvider, getMuiTheme } from 'material-ui/styles';
import { MuiThemeProvider as NewMuiThemeProvider } from '@material-ui/core/styles';
import { darkTheme } from './config/theme';
import './index.css';

ReactDOM.render(
    <NewMuiThemeProvider theme={darkTheme}>
        <MuiThemeProvider muiTheme={getMuiTheme(lightBaseTheme)}>
            <ChartView />
        </MuiThemeProvider>
    </NewMuiThemeProvider>,
    document.getElementById('root'),
);

serviceWorker.unregister();
