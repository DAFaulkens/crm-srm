import React, {Component} from 'react';
import axios from 'axios';

import ControlTable from '../../../ui/ControlTable';
import DocumentTabForm from './DocumentTabForm';
import Modal from '../../../ui/Modal';
import { url } from '../../../../config';
import {headers} from '../../../../config';


const columns = [
    {
        id: 1,
        displayName: 'Document',
        name: 'name'
    },
    {
        id: 2,
        displayName: 'Description',
        name: 'description'
    }
]

class DocumentTab extends Component {

    constructor(props){
        super(props);
        this.state = {
            download: ''
        }
        this.handleDownloadEvent = this.handleDownloadEvent.bind(this);
    }


    handleDownloadEvent(documentId){
        const api = `${url}/documents/${documentId}`;

        this.setState({
            ...this.state,
            download: ''
        })
        axios.get(api, {headers:headers}).then(res => {
             this.setState({
                ...this.state,
                download: api
            });
        });

    }


    render(){

        return  <div>
                    <DocumentTabForm  />
                    <ControlTable   headers={columns} 
                                    data={this.props.data} 
                                    control={this.handleDownloadEvent} />
                    <iframe src={this.state.download} style={{display:'none'}} />
                </div>
    }


}


export default DocumentTab;