import React, {Component} from 'react';
import axios from 'axios';

import SiteForm from './SiteForm';
import { url, headers } from '../../../config';

class NewSite extends Component {

    constructor(props){
        super(props);
        this.state = {
            site:{
                name: '',
                address: '',
                phone_number: '',
            }
        }

        this.handleCancelEvent = this.handleCancelEvent.bind(this);
        this.handleCreateSiteEvent = this.handleCreateSiteEvent.bind(this);
    }


    handleCancelEvent(){
        this.props.history.goBack();
    }

    handleCreateSiteEvent(newSite){
        const api = `${url}/sites`;

        axios.post(api, JSON.stringify(newSite), {headers: headers}).then(res => {
            const siteId = res.data.data.id;
            
            this.props.history.push(`/sites/${siteId}`);
        });
    }




    render(){

        console.log(this.props.history);

        return(
            <div className='show-page' >
                <div className='show-page__row' >
                    <div className='show-page__section'>
                        <SiteForm   site={this.state.site} 
                                    onCancel={this.handleCancelEvent}
                                    onCreateSite={this.handleCreateSiteEvent}
                                    new />
                    </div>
                </div>
                
            </div>
        )
    }

}


export default NewSite;