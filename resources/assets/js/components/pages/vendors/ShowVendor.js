import React, {Component} from 'react';
import VendorForm from './VendorForm';
import * as vendorActions from '../../store/actions/vendorActions';
import * as systemActions from '../../store/actions/systemActions';
import { connect } from 'react-redux';
import Spinner from '../../ui/spinner/Spinner';
import Loading from '../../ui/spinner/Loading';


class ShowVendor extends Component {

    constructor(props){
        super(props);
        this.state = {
            edit: false
        }

        this.handleEditToggleEvent = this.handleEditToggleEvent.bind(this);
        this.handleCancelEvent = this.handleCancelEvent.bind(this);
    }


    componentDidMount(){
        const id = this.props.match.params.id;
        this.props.onShowVendor(id);
        this.props.onListSystems();
    }

    componentWillReceiveProps(nextProps){
        if(!nextProps.vendor){
            this.props.history.push('/vendors');
        }else {
            this.setState({
                ...this.state,
                edit: false
            })
        }
    }

    componentWillUnmount(){
        this.props.onClearVendor();
    }

    handleEditToggleEvent(){
        this.setState({
            ...this.state,
            edit: true
        })
    }

    handleCancelEvent(){
        this.setState({
            ...this.state,
            edit: false
        })
    }

    render(){

        // const loading = this.props.vendor.id? '' : <Loading />

        return(
            <div className='show-page' >
                <div className='show-page__row' >
                    <div className='show-page__section'>
                    <VendorForm vendor={this.props.vendor} 
                                onDeleteSite={this.props.onDeleteSite}
                                onUpdate={this.props.onUpdateVendor}
                                onEditToggle={this.handleEditToggleEvent}
                                onCancel={this.handleCancelEvent} edit={this.state.edit} 
                                options={this.props.systems} />
                    </div>
                </div>            
            </div>
        )
    }

}

const mapStateToProps = state => {
    return {
        vendor: {
            id: state.vendor.id,
            name: state.vendor.name,
            support_number: state.vendor.support_number,
            support_email: state.vendor.support_email,
            system: state.vendor.system,
            system_id: state.vendor.system_id
        },
        systems: state.system.collection
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onShowVendor: (id) => dispatch(vendorActions.showVendor(id)),
        onUpdateVendor: (updatedVendor, id) => dispatch(vendorActions.updateVendor(updatedVendor, id)),
        onListSystems: () => dispatch(systemActions.listSystem()),
        onClearVendor: () => dispatch(vendorActions.clearSelectedVendor())
    }
}


// export default ShowVendor;
export default connect(mapStateToProps, mapDispatchToProps)(ShowVendor);