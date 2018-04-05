import axios from 'axios';
import * as actionTypes from './actionTypes';
import { url, headers } from '../../../config';


export const listSystem = () => {
  
    return dispatch => {
        const api = `${url}/systems`;

        axios.get(api, {headers: headers}).then(res => {
            dispatch({
                type: actionTypes.LIST_SYSTEM,
                systems: res.data.data
            })
        })
    }

}