import React, {Component} from 'react';
import {connect} from 'react-redux';
import jwt from 'jsonwebtoken';

import * as authAction from '../store/actions/authActions';
import FormInput from '../ui/FormInput';

class Login extends Component  {

    constructor(props){
        super(props);
        this.state = {
            username: '',
            password: ''
        }

        this.handleInputChangeEvent = this.handleInputChangeEvent.bind(this);
        this.handleLoginEvent = this.handleLoginEvent.bind(this);
    }

    componentDidMount(){
        console.log('Login');
        const token = sessionStorage.getItem('token');
        const decode = jwt.decode(token);

        if(decode){
            if(decode.exp >= (Date.now()/1000)){
                this.props.onGetToken();
                this.props.history.push('/home');
            }
        }

    }

    componentWillReceiveProps(nextProps){
        if(nextProps.authenticated){
            this.props.history.push('/home');
        }
    }

    handleInputChangeEvent(event){
        const name = event.target.name;
        const value = event.target.value;

        this.setState({
            ...this.state,
            [name]: value
        })
    }

    handleLoginEvent(){

        const user = {
            email: this.state.username,
            password: this.state.password
        }

        this.props.onLogin(user);


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
                                    <FormInput  label='Password' 
                                                edit
                                                name='password' 
                                                value={this.state.password} 
                                                onChange={this.handleInputChangeEvent} />
                                </div>
                                <div className='form__control'>
                                    <button   className='button' 
                                                onClick={this.handleLoginEvent} >Login </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
    }
}

const mapStateToProps = state => {
    return{
        authenticated: state.user.authenticated
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onLogin: (user) => dispatch(authAction.userLogin(user)),
        onGetToken: () => dispatch(authAction.getToken())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Login);