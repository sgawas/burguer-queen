import React from 'react';

import './Input.css';

const input = (props) => {
    let inputElement = null;
    const inputClasses = ["InputElement"];
    let validationError = null;

    if(props.invalid && props.shouldValidate && props.touched){
        inputClasses.push("Invalid");
        validationError = <p className="ValidationError">Please enter a valid {props.elementConfig.placeholder}.</p>
    }

    switch( props.elementType){
        case ('input'): 
            inputElement = <input 
                            className={inputClasses.join(" ")}
                            onChange={props.changed} 
                            {...props.elementConfig} 
                            value={props.value}
                            />
            break;
        case ('textarea'): 
            inputElement = <textarea 
                            className={inputClasses.join(" ")}
                            onChange={props.changed} 
                            {...props.elementConfig} 
                            value={props.value}
                            />
            break;
        case ('select'): 
            inputElement = <select 
                            className={inputClasses.join(" ")}
                            onChange={props.changed} 
                            value={props.value}
                            >
                                {props.elementConfig.options.map(option=>(
                                    <option key={option.value} value={option.value}>
                                        {option.displayValue}
                                    </option>
                                ))}
                            </select>
            break;
        default: 
            inputElement= <input 
                            className={inputClasses.join(" ")}
                            onChange={props.changed} 
                            {...props.elementConfig} 
                            value={props.value}
                          />
    }

    return (
        <div className="Input">
            <label className="Label">{props.label}</label>
            {inputElement}
            {validationError}
        </div>
    );
}

export default input;