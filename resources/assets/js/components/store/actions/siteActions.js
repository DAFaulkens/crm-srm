import axios from 'axios';
import * as actionTypes from './actionTypes';
import { url, headers } from '../../../config';




export const showSite = (siteId) => {
    
    return dispatch => {
        const api = `${url}/sites/${siteId}`;
        axios.get(api).then(res => {
            dispatch({
                type: actionTypes.SHOW_SITE,
                site: res.data.data
            })
        })
    }
}

export const deleteSite = (siteId) => {
    return dispatch => {
        const api = `${url}/sites/${siteId}`;

        axios.delete(api, {headers: headers}).then(res => {
            const message = { type: 'success', message: 'Site Deleted'}
            dispatch({
                type: actionTypes.DELETE_SITE,
                message: message,
            });
        });
    }
}

export const updateSite = (updatedSite, id) => {
   return dispatch => {

        const api = `${url}/sites/${id}`;
                
        axios.put(api, JSON.stringify(updatedSite), {headers: headers })
            .then(res => {
                dispatch({
                    type: actionTypes.UPDATE_SITE,
                    updatedSite: res.data.data
                })
            });
    }
}

export const attachVendor = (siteId, vendorId) => {
    return dispatch => {

        const api = `${url}/sites/${siteId}/vendors/${vendorId}`;

        axios.post(api, {headers: headers}).then(res => {
            dispatch({
                type: actionTypes.ATTACH_VENDOR,
                site: res.data.data
            })
        })

    }
}

export const detachVendor = (siteId, vendorId) => {
    return dispatch => {

        const api = `${url}/sites/${siteId}/vendors/${vendorId}`;

        axios.delete(api, {headers: headers}).then(res => {
            dispatch({
                type: actionTypes.DETACH_VENDOR,
                site: res.data.data
            })
        })

    }
}

export const editSite = () => {
    return {
        type: actionTypes.EDIT_SITE,
        edit: true
    }
}


export const cancel = () => {
    return {
        type: actionTypes.CANCEL,
        edit: false,
        new: false
    }
}