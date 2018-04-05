import React from 'react';


const FormControl = (props) => {

    let formControl = ''

    if(props.edit || props.new){
        formControl =  <div className='form__control'>
                          <button   className='button' 
                                    onClick={props.onSave} >Save</button>
                          <button   className='button' 
                                    onClick={props.onCancel} >Cancel</button>
                        </div>
    }else if(props.delete){
        formControl =  <div className='form__control'>
                            <span>Are your sure you want to delete? </span>
                            <button     className='button' 
                                        onClick={() => props.onDelete(props.id)} >Yes</button>
                            <button     className='button' 
                                        onClick={props.onDeleteCancel} >No</button>
                        </div>
    }else {
        formControl =  <div className='form__control'>
                            <button className='button' 
                                onClick={props.onEditToggle} >Edit</button>
                            <button className='button' 
                                onClick={props.onDeleteToggle} >Delete</button>
                        </div>
    }

    return formControl;

}

export default FormControl;