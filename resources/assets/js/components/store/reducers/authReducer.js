import * as actionTypes from '../actions/actionTypes';

const initialState = {
    authenticated: false,
    token: ''

}

const reducer = (state = initialState, action) => {

    switch(action.type){

        case actionTypes.USER_LOGIN:
        console.log(action);
            return{
                ...state,
                authenticated: action.results.authenticate,
                token: action.results.token
            }
        case actionTypes.USER_LOGOUT:
            return{
                ...state,
                authenticated: false,
                token: ''
        }

        default:
            return state;
    }

}

export default reducer;