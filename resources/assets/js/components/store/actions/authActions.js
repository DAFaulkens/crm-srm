import * as actionTypes from './actionTypes';
import axios from 'axios';
import jwt from 'jsonwebtoken';
import {tokenVerify, url, headers} from '../../../config';

export const userLogin =(user) => {
    console.log(user)
    return dispatch => {
        const api = `${url}/authenticate`;

        axios.post(api, JSON.stringify(user), {headers:headers}).then(res =>{
            dispatch({
                type: actionTypes.USER_LOGIN,
                results: {
                    authenticate: true,
                    token: res.data.access_token
                }
            })
            sessionStorage.setItem('token', res.data.access_token)
        });

    }
}

export const userLogout = () => {
    return dispatch => {
        sessionStorage.clear();
        dispatch({
            type: actionTypes.USER_LOGOUT
        })
    }
}

export const getToken = () => {
   return dispatch => {
        const token = sessionStorage.getItem('token');
        dispatch({
            type: actionTypes.USER_LOGIN,
            results: {
                authenticate: true,
                token: token
            }
        })
   }
}