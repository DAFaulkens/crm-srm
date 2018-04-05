import * as actionTypes from '../actions/actionTypes';


const initialState = {
    collection: [],
    detail: {
        id: '',
        name: '',
        description: '',
        vendors: []
    }
}


const reducer = (state=initialState, action) => {

    switch(action.type){

        case actionTypes.LIST_SYSTEM:

            return {
                ...state,
                collection: action.systems
            }

        default:
            return state;

    }

}

export default reducer;