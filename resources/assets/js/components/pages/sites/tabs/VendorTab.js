import React, {Component} from 'react';
import { connect } from 'react-redux';

import FormInput from '../../../ui/FormInput';
import ControlTable from '../../../ui/ControlTable';
import * as siteActions from '../../../store/actions/siteActions';
import VendorTabForm from './VendorTabForm';

const headers = [
    {
        id: 1,
        displayName: 'Application',
        name: 'system'
    },
    {
        id: 2,
        displayName: 'Vendor',
        name: 'name'
    }
];



class VendorTab extends Component {

    constructor(props){
        super(props);

        this.handleDetachVendorEvent = this.handleDetachVendorEvent.bind(this);
    }

    handleDetachVendorEvent(vendorId){
        this.props.onDetachVendor(this.props.siteId, vendorId);
    }

    render(){
        return <div>
                    <VendorTabForm />
                    <ControlTable   data={this.props.data} 
                                    headers={headers} 
                                    onRemoveItem={this.handleDetachVendorEvent} />
                </div>
    }

}


const mapDispatchToProps = dispatch => {
    return {
        onAttachVendor: (siteId, vendorId) => dispatch(siteActions.attachVendor(siteId, vendorId)),
        onDetachVendor: (siteId, vendorId) => dispatch(siteActions.detachVendor(siteId, vendorId))
    }
}

export default connect(null, mapDispatchToProps)(VendorTab);

