import React from 'react';
import './inputCheckbox.scss';

function InputCheckbox(props) {
    const register = props?.register;

    function handleOnChange(e) {
        if (props.inputOnChange && typeof props.inputOnChange === "function") {
            props.inputOnChange(e);
        }
    }

    return (
        <div className={`input-checkbox ${props.inputClasses}`}>
            {!register && <input
                onChange={handleOnChange}
                type={'checkbox'}
                name={props.inputName}
                id={props.inputId}
                required={props.isRequired}
            >
            </input>}
            {register && <input
                onChange={handleOnChange}
                type={'checkbox'}
                name={props.inputName}
                id={props.inputId}
                required={props.isRequired}
                {...register(props.inputName, {
                    required: props.isRequired,
                    pattern: props.regexValidation ? props.regexValidation : /.*/,
                })}
            >
            </input>}
            <label htmlFor={props.inputId}>{props.label}</label>
        </div>
    )
}

InputCheckbox.defaultProps = {
    isRequired: false,
}

export default InputCheckbox;