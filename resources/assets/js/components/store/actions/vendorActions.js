import axios from 'axios';
import * as actionTypes from './actionTypes';
import { url, headers } from '../../../config';


export const showVendor = (vendorId) => {

    return dispatch => {
        const api = `${url}/vendors/${vendorId}`;

        axios.get(api).then(res => {
            dispatch({
                type: actionTypes.SHOW_VENDOR,
                vendor: res.data.data
            })
        })
    }
}

export const updateVendor = (updatedVendor, vendorId) => {

   return dispatch => {
    const api = `${url}/vendors/${vendorId}`;

    axios.put(api, JSON.stringify(updatedVendor), {headers: headers})
        .then(res => {
            dispatch({
                type: actionTypes.UPDATE_VENDOR,
                vendor: res.data.data
            })
        });
   };

}

export const createVendor = (newVendor) => {
    return dispatch => {
        const api = `${url}/vendors`;
        axios.post(api, JSON.stringify(newVendor), {headers:headers}).then(res =>{
            console.log(res);
            dispatch({
                type: actionTypes.CREATE_VENDOR,
                vendor: res.data.data
            })
        });
    }
}

export const clearSelectedVendor = () => {
    return dispatch => {
       dispatch({
           type: actionTypes.CLEAR_VENDOR
       })
    }
}