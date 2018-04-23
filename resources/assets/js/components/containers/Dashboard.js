import React, {Component} from 'react';
import {Switch, Route, Redirect} from 'react-router-dom';
import {connect} from 'react-redux';
import jwt from 'jsonwebtoken';

import SitePage from '../pages/sites/SitePage';
import VendorPage from '../pages/vendors/VendorPage';
import DocumentPage from '../pages/documents/DocumentPage';
import HomePage from '../pages/home/HomePage';
import Header from '../ui/Header';
import * as authAction from '../store/actions/authActions';


const navItems = [
    {id: 1, name: 'Home', path: '/home'},
    {id: 2, name: 'Sites', path: '/sites'},
    {id: 3, name: 'Vendors', path: '/vendors'},
    {id: 4, name: 'Documents', path: '/documents'}
]


class Dashboard extends Component {

    constructor(props){
        super(props);
        this.state = {

        }

        this.handleVerifyAuthEvent = this.handleVerifyAuthEvent.bind(this);
        this.handleLogoutEvent = this.handleLogoutEvent.bind(this);
    }

    componentDidMount(){
        if(!this.props.authenticated){
            console.log('Not Authenticated');
           this.handleVerifyAuthEvent();
        }
    }

    componentWillReceiveProps(nextProps){
        if(!nextProps.authenticated){
            this.props.history.push('/login');
        }
    }

    handleLogoutEvent(){

    }


    handleVerifyAuthEvent(){
        const token = sessionStorage.getItem('token');
        const decode = jwt.decode(token);
        console.log(decode);
        if(decode){
            if(decode.exp < (Date.now()/1000)){
                this.props.history.push('/login');
            }else {
                this.props.onGetToken();
            }
        }else {
            this.props.history.push('/login');
        }
    }


 
    render(){

        if(this.props.authenticated){

            return  <div>
                        <Header items={navItems} onLogout={this.props.onLogout} />
                        <Switch>
                            <Route path='/home' component={HomePage} />
                            <Route path='/sites' component={SitePage} />
                            <Route path='/vendors' component={VendorPage} />
                            <Route path='/documents' component={DocumentPage} />
                            <Redirect from='/' to= '/home' />
                        </Switch>
                    </div>

        } else {

            return '';
        }

       
    }
}

const mapStateToProps = state => {
    return {
        authenticated: state.user.authenticated
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onGetToken: () => dispatch(authAction.getToken()),
        onLogout: () => dispatch(authAction.userLogout())
    }

}

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);