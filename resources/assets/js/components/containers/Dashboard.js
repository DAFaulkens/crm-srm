import React from 'react';
import {Switch, Route, Redirect} from 'react-router-dom';
import SitePage from '../pages/sites/SitePage';
import VendorPage from '../pages/vendors/VendorPage';
import DocumentPage from '../pages/documents/DocumentPage';
import HomePage from '../pages/home/HomePage';
import Header from '../ui/Header';

const Dashboard = () => {

    const navItems = [
        {id: 1, name: 'Home', path: '/home'},
        {id: 2, name: 'Sites', path: '/sites'},
        {id: 3, name: 'Vendors', path: '/vendors'},
        {id: 4, name: 'Documents', path: '/documents'}
    ]

    return(
        <div>
            <Header items={navItems} />
            <Switch>
                <Route path='/home' component={HomePage} />
                <Route path='/sites' component={SitePage} />
                <Route path='/vendors' component={VendorPage} />
                <Route path='/documents' component={DocumentPage} />
                <Redirect from='/' to= '/home' />
            </Switch>
        </div>
    )
}

export default Dashboard;