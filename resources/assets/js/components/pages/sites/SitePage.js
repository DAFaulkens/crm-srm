import React from 'react';
import {Switch, Route, Redirect} from 'react-router-dom';
import ListSites from './ListSites';
import ShowSite from './ShowSite';
import NewSite from './NewSite';
import Loading from '../../ui/spinner/Loading';


const SitePage = () => {

    return(
        <div className='site-page' >
            <Switch>
                <Route path='/sites/all' component={ListSites} />
                <Route path='/sites/new' component={NewSite} />
                <Route path='/sites/:id' component={ShowSite} />
                <Redirect from='/sites' to='/sites/all'  />
            </Switch>
        </div>
    )

}

export default SitePage;