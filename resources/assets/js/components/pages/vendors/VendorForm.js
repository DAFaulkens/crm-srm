import React, {Component} from 'react';
import FormInput from '../../ui/FormInput';
import FormControl from '../../ui/FormControl';
import FormSelect from '../../ui/FormSelect';

class VendorForm extends Component {

    constructor(props){
        super(props);
        this.state = {
            vendor: {
                id: '',
                name: '',
                support_number: '',
                support_email: '',
                system: '',
                system_id: ''
            }
        }

        this.handleInputChangeEvent = this.handleInputChangeEvent.bind(this);
        this.handleSaveEvent = this.handleSaveEvent.bind(this);
    }

    componentDidMount(){
        if(this.props.vendor){
            this.setState({
                ...this.state,
                vendor: this.props.vendor
            })
        }
    }


    componentWillReceiveProps(nextProps){
        if(nextProps.vendor){
            this.setState({
                ...this.state,
                vendor: nextProps.vendor
            })
        }
    }

    handleInputChangeEvent(event){
        const name = event.target.name;
        const value = event.target.value;
        
        this.setState({
            ...this.state,
            vendor: {
                ...this.state.vendor,
                [name]: value
            }
        })
    }

    handleSaveEvent(){
        if(this.props.edit){      
            this.props.onUpdate(this.state.vendor, this.state.vendor.id)
        }

        if(this.props.new){
            this.props.onCreate(this.state.vendor);
        }

    }


    render(){

        console.log(this.state.vendor);
        return(
            <div className='form'>
                <FormInput  label='Vendor Name' 
                            edit={this.props.edit || this.props.new} 
                            name='name' 
                            value={this.state.vendor.name } 
                            onChange={this.handleInputChangeEvent} />

                <FormInput  label='Support Number' 
                            edit={this.props.edit || this.props.new} 
                            name='support_number' 
                            value={this.state.vendor.support_number} 
                            onChange={this.handleInputChangeEvent} />
                
                <FormInput  label='Support Email' 
                            edit={this.props.edit || this.props.new} 
                            name='support_email' 
                            value={this.state.vendor.support_email} 
                            onChange={this.handleInputChangeEvent} />
                
                <FormSelect label='System Name' 
                            edit={this.props.edit || this.props.new} 
                            value={this.state.vendor.system_id}
                            name='system_id' options={this.props.options}
                            onChange={this.handleInputChangeEvent} />

                <FormControl    onEditToggle={this.props.onEditToggle} 
                                onSave={this.handleSaveEvent}
                                onCancel={this.props.onCancel} 
                                edit={this.props.edit} new={this.props.new} />
            </div>
        )
    }

}

export default VendorForm;