import React, {Component} from 'react';
import ControlTable from '../../../ui/ControlTable';
import DocumentTabForm from './DocumentTabForm';


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


    render(){

        return  <div>
                    <DocumentTabForm  />
                    <ControlTable   headers={columns} 
                                    data={this.props.data} />
                </div>
    }


}


export default DocumentTab;