import React, {Component} from 'react';
import FormInput from '../../ui/FormInput';
import axios from 'axios';
import { connect } from 'react-redux';

import * as siteActions from '../../store/actions/siteActions';
import { url } from '../../../config';

class SiteForm extends Component {

    constructor(props){
        super(props);
        this.state ={
            delete: false,
            site: {
                id: '',
                name: '',
                address: '',
                phone_number: ''
            }
        }

        this.handleInputChangeEvent = this.handleInputChangeEvent.bind(this);
        this.handleCancelDeleteEvent = this.handleCancelDeleteEvent.bind(this);
        this.handleSaveEvent = this.handleSaveEvent.bind(this);
        this.handleDeleteToggleEvent = this.handleDeleteToggleEvent.bind(this);
    }

    componentDidMount(){
        if(this.props.site){
            this.setState({
                ...this.state,
                site: {
                    ...this.state.site,
                    name: this.props.site.name,
                    address: this.props.site.address,
                    phone_number: this.props.site.phone_number
                },
                new: this.props.new? true : false
            })
        }
    }

    componentWillReceiveProps(nextProps){
        if(nextProps.site){
            this.setState({
                ...this.state,
                site: {
                    ...this.state.site,
                    name: nextProps.site.name,
                    address: nextProps.site.address,
                    phone_number: nextProps.site.phone_number
                }
            })
        }
    }


    handleInputChangeEvent(event){
        const name = event.target.name;
        const value = event.target.value;

        this.setState({
            ...this.state,
            site: {
                ...this.state.site,
                [name]: value
            }
        })

    }

    handleEditEvent(event){
        event.preventDefault();
        this.setState({
            ...this.state,
            edit:true
        })
    }

    handleSaveEvent(event){
        if(this.props.edit){      
            this.props.onUpdateSite(this.state.site, this.props.site.id)
        }

        if(this.props.new){
            this.props.onCreateSite(this.state.site);
        }

    }

    handleCancelDeleteEvent(event){
        this.setState({
            ...this.state,
            delete: false
        })
    }

    handleDeleteToggleEvent(event){
        this.setState({
            ...this.state,
            delete: true
        })
    }

    render(){


        let formControl = ''

        if(this.props.edit || this.props.new){
            formControl =  <div className='form__control'>
                              <button   className='button' 
                                        onClick={this.handleSaveEvent} >Save</button>
                              <button   className='button' 
                                        onClick={this.props.onCancel} >Cancel</button>
                            </div>
        }else if(this.state.delete){
            formControl =  <div className='form__control'>
                                <span>Are your sure you want to delete? </span>
                                <button     className='button' 
                                            onClick={() => this.props.onDeleteSite(this.props.site.id)} >Yes</button>
                                <button     className='button' 
                                            onClick={this.handleCancelDeleteEvent} >No</button>
                            </div>
        }else {
            formControl =  <div className='form__control'>
                                 <button className='button' 
                                    onClick={this.props.onEditToggle} >Create New</button>
                                <button className='button' 
                                    onClick={this.props.onEditToggle} >Edit</button>
                                <button className='button' 
                                    onClick={(this.handleDeleteToggleEvent)} >Delete</button>
                            </div>
        }

        return(
            <div className='form' >
                <div className='form__row'>
                <FormInput  label='Site Name' 
                            edit={this.props.edit || this.props.new} 
                            name='name' 
                            value={this.state.site.name } 
                            onChange={this.handleInputChangeEvent} />
                </div>
                <div className='form__row'>
                <FormInput  label='Address' 
                            edit={this.props.edit || this.props.new} 
                            name='address' 
                            value={this.state.site.address} 
                            onChange={this.handleInputChangeEvent} />
                </div>
                <div className='form__row'>
                <FormInput  label='Phone Number' 
                            edit={this.props.edit || this.props.new} 
                            name='phone_number' 
                            value={this.state.site.phone_number} 
                            onChange={this.handleInputChangeEvent} />
                </div>
                { formControl }
            </div>
        )
    }

}

// const mapStateToProps = state => {
//     return{
//         message: state.message
//     }
// }

// const mapDispatchToProps = dispatch => {
//     return{
//         onDeleteSite: (id) => dispatch(siteActions.deleteSite(id))
//     }
// }

// export default connect(null, mapDispatchToProps)(SiteForm);

export default SiteForm;