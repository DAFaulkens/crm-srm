import React, {Component} from 'react';
import VendorForm from './VendorForm';
import * as vendorActions from '../../store/actions/vendorActions';
import * as systemActions from '../../store/actions/systemActions';
import { connect } from 'react-redux';


class NewVendor extends Component {

    constructor(props){
        super(props);
        this.state = {
            new:true
        }

        this.handleCreateVendorEvent = this.handleCreateVendorEvent.bind(this);

    }

    componentDidMount(){
        if(!this.props.systems || this.props.systems.length <= 0 ){
            this.props.onListSystems();
        }
    }

    componentWillReceiveProps(nextProps){
        if(nextProps.vendor.id){
            this.props.history.push(`/vendors/${nextProps.vendor.id}`);
        }
    }


    handleCreateVendorEvent(newVendor){
        this.props.onCreateVendor(newVendor);
    }

    render(){


        return(
            <div className='show-page' >
                <div className='show-page__row' >
                    <div className='show-page__section'>
                    <VendorForm vendor={this.props.vendor} 
                                onDeleteSite={this.props.onDeleteSite}
                                onCreate={this.handleCreateVendorEvent}
                                onEditToggle={this.handleEditToggleEvent}
                                onCancel={this.handleCancelEvent} new={this.state.new} 
                                options={this.props.systems} />
                    </div>
                </div>            
            </div>
        )
    }

}

const mapStateToProps = state => {
    return{
        vendor: state.vendor,
        systems: state.system.collection
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onListSystems: () => dispatch(systemActions.listSystem()),
        onCreateVendor: (newVendor) => dispatch(vendorActions.createVendor(newVendor))
    }
}

export default  connect(mapStateToProps, mapDispatchToProps)(NewVendor);