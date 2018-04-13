import * as actionTypes from './actionTypes';


export const documentUploadStart = () => {

    return dispatch => {
        dispatch({
            type: actionTypes.DOCUMENT_UPLOADING
        })
    }

}

export const documentUploadCompleted = () => {

    return dispatch => {
        dispatch({
            type: actionTypes.DOCUMENT_UPLOADED
        })
    }

}