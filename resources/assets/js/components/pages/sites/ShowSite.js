import React, {Component} from 'react';
import axios from 'axios';
import { connect } from 'react-redux';

import { url } from '../../../config';
import SiteForm from './SiteForm';
import SimpleTable from '../../ui/SimpleTable';
import Tabs from '../../ui/Tabs';

import * as siteActions from '../../store/actions/siteActions';

const vendorColumns = [
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

const documentColumns = [
    {
        id: 1,
        displayName: 'Document Name',
        name: 'name'
    }
]

const tabs = [
    {
        id: 0,
        name: 'Vendors'
    },
    {
        id: 1,
        name: 'Documents'
    }
]

class ShowSite extends Component {

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

        this.props.onShowSite(id);        

    }

    componentWillReceiveProps(nextProps){
        if(!nextProps.site){
            this.props.history.push('/sites');
        }else {
            this.setState({
                ...this.state,
                edit: false
            })
        }
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

        let showPage = ''

        if(this.props.site){
            showPage = (
                            <div className='show-page' >
                                <div className='show-page__row' >
                                    <div className='show-page__section'>
                                        <SiteForm   site={this.props.site} 
                                                    onDeleteSite={this.props.onDeleteSite}
                                                    onUpdateSite={this.props.onUpdateSite}
                                                    onEditToggle={this.handleEditToggleEvent}
                                                    onCancel={this.handleCancelEvent}
                                                    edit={this.state.edit} />
                                    </div>
                                        <Tabs tabs={tabs} >
                                        <SimpleTable    data={this.props.site.vendors} 
                                                        columns={vendorColumns} />

                                        <SimpleTable    data={this.props.site.documents} 
                                                        columns={documentColumns} />
                                        </Tabs>
                                </div>
                                
                            </div>
                        )
        }

        return showPage;
    }

}

const mapStateToProps = state => {
    return{
        site: state.site.site,
        message: state.message
    }
}

const mapDispatchToProps = dispatch => {
    return{
        onShowSite: (id) => dispatch(siteActions.showSite(id)),
        onDeleteSite: (id) => dispatch(siteActions.deleteSite(id)),
        onUpdateSite: (updatedSite, id) => dispatch(siteActions.updateSite(updatedSite, id))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ShowSite);