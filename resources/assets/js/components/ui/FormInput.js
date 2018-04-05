import React from 'react';

const FormInput = (props) => {

    return(
        <div className="form__group">
            <label  className="form__label">{ props.label }</label>

            <input  className="form__input" 
                    type="text"
                    disabled={!props.edit} 
                    name={props.name}
                    value={props.value} 
                    onChange={props.onChange} />
        </div>
    )

}

export default FormInput;