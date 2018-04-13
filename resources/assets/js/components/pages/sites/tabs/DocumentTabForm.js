import React, {Component} from 'react';
import {connect} from 'react-redux';
import axios from 'axios';

import { url, headers, uploadHeader } from '../../../../config';
import FormInput from '../../../ui/FormInput';
import * as siteActions from '../../../store/actions/siteActions';
import * as documentActions from '../../../store/actions/documentActions';
import Uploading from '../../../ui/spinner/Uploading';

class DocumentTabForm extends Component {


    constructor(props){
        super(props);
        this.state = {
            document: {
                name: '',
                description: ''
            }
        }

        this.handleInputChangeEvent = this.handleInputChangeEvent.bind(this);
        this.handleFileUploadEvent = this.handleFileUploadEvent.bind(this);

    }

    componentWillReceiveProps(nextProps){
        console.log('Next props recieved');
    }

    handleInputChangeEvent(event){
        const name = event.target.name;
        const value = event.target.value;

        this.setState({
            ...this.state,
            document: {
                ...this.state.document,
                [name]: value
            }
        })
    }

    handleFileUploadEvent(){
        const api = `${url}/documents/upload`;

        const formData = new FormData();
        formData.append('file', document.getElementById('file').files[0]);
        formData.append('name', this.state.document.name);

        this.props.onUploadStart();

        axios.post(api, formData, {headers: uploadHeader}).then(res => {
            
            const document = {
                name: this.state.document.name,
                description: this.state.document.description,
                location: res.data
            }

            this.props.onUploadComplete();

            this.props.onAddDocument(document);

        }).catch(err =>{
            console.log(err);
        })
        
    }

    render(){

        const uploading = this.props.uploading? <Uploading /> : '';
        
        return  <div>
                    <div className='row-form'>
                        <div className='row-form__section row-form__section--45'>
                            <FormInput  edit label='Document Name' 
                                        name='name' value={this.state.document.name}
                                        onChange={this.handleInputChangeEvent} />
                        </div>
                        <div className='row-form__section row-form__section--45'>
                            <FormInput  edit label='Description' 
                                        name='description' value={this.state.document.description}
                                        onChange={this.handleInputChangeEvent} />
                        </div>
                    </div>
                    <div className='row-form'>
                        <div className='row-form__section'>
                            <input type='file' id='file' onChange={this.handleFileSelectEvent}  />
                        </div>
                        <div className='row-form__section'>
                            <button className='button' onClick={this.handleFileUploadEvent} > Upload </button>
                        </div>
                        {uploading}
                    </div>      
                </div>
        

    }

}

const mapStateToProps = state =>{
    return {
        uploading: state.document.uploading
    }

}

const mapDispatchToProps = dispatch => {
    return {
        onAddDocument: (document) => dispatch(siteActions.addDocument(document)),
        onUploadStart: () => dispatch(documentActions.documentUploadStart()),
        onUploadComplete: () => dispatch(documentActions.documentUploadCompleted())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(DocumentTabForm);