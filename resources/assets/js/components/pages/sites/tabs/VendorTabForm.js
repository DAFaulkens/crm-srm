import React, {Component} from 'react';
import {connect} from 'react-redux';
import axios from 'axios';
import FormSelect from '../../../ui/FormSelect';
import * as systemActions from '../../../store/actions/systemActions';
import * as siteActions from '../../../store/actions/siteActions';
import { url, headers } from '../../../../config';

const options =[
    {
        id: 1,
        name: 'Option 1'
    },
    {
        id: 2,
        name: 'Option 2'
    },
    {
        id: 3,
        name: 'Option 3'
    }
]

class VendorTabForm extends Component {

    constructor(props){
        super(props);

        this.state = {
            vendors: [],
            selectedVendor: 0
        }

        this.handleSelectSystemChange = this.handleSelectSystemChange.bind(this);
        this.handleSelectVendor = this.handleSelectVendor.bind(this);
        this.handleAttachVendorEvent = this.handleAttachVendorEvent.bind(this);

    }

    componentDidMount(){
        if(!this.props.systems || this.props.systems.length <= 0 ){
            this.props.onListSystems();
        }
    }

    handleSelectSystemChange(event){
        const name = event.target.name;
        const value = event.target.value;

        const api = `${url}/systems/${value}/vendors`;
        
        axios.get(api,{headers: headers}).then(res => {
            this.setState({
                ...this.state,
                vendors: res.data
            })
        })

    }

    handleSelectVendor(event){
        const value = event.target.value;

        this.setState({
            ...this.state,
            selectedVendor: value
        })
    }

    handleAttachVendorEvent(){
        this.props.onAttachVendor(this.props.siteId, this.state.selectedVendor);
    }

    render(){

        return(
            <div className='row-form'>
                <div className='row-form__section row-form__section--45'>
                    <FormSelect label='Application' name='system' onChange={this.handleSelectSystemChange}
                                options={this.props.systems} edit />
                </div>
                <div className='row-form__section row-form__section--45'>
                    <FormSelect label='Vendor' name='vendor' onChange={this.handleSelectVendor}
                                options={this.state.vendors} edit />
                </div>
                <button className='button' onClick={this.handleAttachVendorEvent} >+</button>
            </div>
        )
    }

}

const mapStateToProps = state => {

    return{
        siteId: state.site.site.id,
        systems: state.system.collection
    }

}

const mapDispatchToProps = dispatch => {

    return{
        onListSystems: () => dispatch(systemActions.listSystem()),
        onAttachVendor: (siteId, vendorId) => dispatch(siteActions.attachVendor(siteId, vendorId))
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(VendorTabForm);
