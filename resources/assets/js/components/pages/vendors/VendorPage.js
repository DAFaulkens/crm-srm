import React from 'react';
import {Switch, Route, Redirect} from 'react-router-dom';
import ListVendors from './ListVendors';
import NewVendor from './NewVendor';
import ShowVendor from './ShowVendor';

const VendorPage = () => {

    return(
        <div className='page' >
            <Switch>
                <Route path='/vendors/all' component={ListVendors} />
                <Route path='/vendors/new' component={NewVendor} />
                <Route path='/vendors/:id' component={ShowVendor} />
                <Redirect from='/vendors' to='/vendors/all'  />
            </Switch>
        </div>
    )

}

export default VendorPage;