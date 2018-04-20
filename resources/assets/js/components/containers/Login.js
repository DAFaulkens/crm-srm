import React, {Component} from 'react';

import FormInput from '../ui/FormInput';

class Login extends Component  {

    constructor(props){
        super(props);
        this.state = {
            username: '',
            password: ''
        }

        this.handleInputChangeEvent = this.handleInputChangeEvent.bind(this);
    }

    handleInputChangeEvent(event){

    }

    render(){
        return  <div className='show-page'>
                    <div className='show-page__row' >
                        <div className='show-page__section'>
                            <div className='show-page__title'>
                                <h1 className='h1'>Login</h1>
                            </div>
                            <div className='form' >
                                <div className='form__row'>
                                    <FormInput  label='User Name' 
                                                edit
                                                name='username' 
                                                value={this.state.username } 
                                                onChange={this.handleInputChangeEvent} />
                                </div>
                                <div className='form__row'>
                                    <FormInput  label='Passport' 
                                                edit
                                                name='passport' 
                                                value={this.state.password} 
                                                onChange={this.handleInputChangeEvent} />
                                </div>
                                <div className='form__control'>
                                    <button   className='button' 
                                                onClick={this.handleSaveEvent} >Login </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
    }
}

export default Login;