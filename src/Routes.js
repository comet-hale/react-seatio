import React from 'react';
import { Route, Link } from 'react-router-dom';

import Container from '@material-ui/core/Container';
import Toolbar from '@material-ui/core/Toolbar';
import AppBar from '@material-ui/core/AppBar';

import Home from './components/Home';
import Reserving from './components/Reserving';
import AdminConsole from './components/AdminConsole';

const navStyle = { padding: '10px 20px 10px 0px' };

const Routes = () => {
    return (
        <Container fixed>
            <AppBar position="static">
                <Toolbar>
                    <div style={navStyle}><Link to="/">Home</Link></div>
                    <div style={navStyle}><Link to="/reserving">Reserving</Link></div>
                    <div style={navStyle}><Link to="/adminConsole">Admin Console</Link></div>
                </Toolbar>
            </AppBar>

            <Route path="/" component={Home} />
            <Route path="/reserving" component={Reserving} />
            <Route path="/adminConsole" component={AdminConsole} />
            <Route path="*" />
        </Container>
    );
}

export default Routes;