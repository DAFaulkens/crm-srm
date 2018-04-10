import React from 'react';


const FormSelect =(props) => {

    const options = props.options.map(option => {
        return <option key={option.id} value={option.id}>{option.name}</option>
    });


    return(
        <div className="form__group">
            <label  className="form__label">{ props.label }</label>
            <select disabled={!props.edit}
                    name={props.name} className="form__select" onChange={props.onChange}
                    value={props.value} >
                    <option value='0'>--- Please Select ---</option>
                    { options }
            </select>
        </div>
    )


}

export default FormSelect;