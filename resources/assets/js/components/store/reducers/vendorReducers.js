import * as actionTypes from '../actions/actionTypes';

const initialState = {
    id: '',
    name: '',
    support_number: '',
    support_email: '',
    system: '',
    system_id: ''
}


const reducer = (state = initialState, action) => {

    switch(action.type){

        case actionTypes.CREATE_VENDOR:
            return {
                ...state,
                id: action.vendor.id,
                name: action.vendor.name,
                support_number: action.vendor.support_number,
                support_email: action.vendor.support_email,
                system: action.vendor.system,
                system_id: action.vendor.system_id
            }
            
        case actionTypes.SHOW_VENDOR:
            return {
                ...state,
                id: action.vendor.id,
                name: action.vendor.name,
                support_number: action.vendor.support_number,
                support_email: action.vendor.support_email,
                system: action.vendor.system,
                system_id: action.vendor.system_id
            }
        case actionTypes.UPDATE_VENDOR:
            return{
                ...state,
                id: action.vendor.id,
                name: action.vendor.name,
                support_number: action.vendor.support_number,
                support_email: action.vendor.support_email,
                system: action.vendor.system,
                system_id: action.vendor.system_id
            }
        case actionTypes.CLEAR_VENDOR:
            return {
                id: '',
                name: '',
                support_number: '',
                support_email: '',
                system: '',
                system_id: ''
            }
        default:
            return state;
    }


}

export default reducer;