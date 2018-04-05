import React from 'react';
import {Switch, Route} from 'react-router-dom';

import Login from './containers/Login';
import Dashboard from './containers/Dashboard';

const Main = () => {

    return (
        <Switch>
            <Route path="/login" component={Login} />
            <Route path="/" component={Dashboard} />
        </Switch>
    )

}

export default Main;