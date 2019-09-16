import React from 'react';
import { Route, Link } from 'react-router-dom';

import Home from './components/Home';
import Reserving from './components/Reserving';
import AdminConsole from './components/AdminConsole';

const Routes = () => {
    return (
        <div>
            <nav>
                <li><Link to="/">Home</Link></li>
                <li><Link to="/reserving">Reserving</Link></li>
                <li><Link to="/adminConsole">Admin Console</Link></li>
            </nav>

            <Route path="/" component={Home} />
            <Route path="/reserving" component={Reserving} />
            <Route path="/adminConsole" component={AdminConsole} />
        </div>
    );
}

export default Routes;