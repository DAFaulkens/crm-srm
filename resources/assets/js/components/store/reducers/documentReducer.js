import * as actionTypes from '../actions/actionTypes';

const initialState = {
    uploading: false
}


const reducer = (state = initialState, action) => {

    switch(action.type){

        case actionTypes.DOCUMENT_UPLOADING:
            return {
                ...state,
                uploading: true
            }

        case actionTypes.DOCUMENT_UPLOADED:
            return {
                ...state,
                uploading: false
            }

        default:

            return state;


    }

}

export default reducer;