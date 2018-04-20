import * as actionTypes from '../actions/actionTypes';

const initialState = {
    authenticated: false,
    name: ''

}

const reducer = (state = initialState, action) => {

    switch(action.type){

        case actionTypes.USER_LOGIN:
            return{
                ...state,
                authenticated: action.authenticate,
                name: action.name
            }
        case actionTypes.USER_LOGOUT:
            return{
                ...state,
                authenticated: fales,
                name: ''
        }

        default:
            return state;
    }

}

export default reducer;