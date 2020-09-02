import React from 'react';

import './BuildControl.css';

const buildControl = (props) => {
    console.log(props.disabled, props.label);
    return (
        <div className="BuildControl">
            <div className="Label">{props.label}</div>
            <button className="Less" 
                onClick={props.remove} 
                disabled={props.disabled}>Less</button>
            <button className="More" onClick={props.added}>More</button>
        </div>
    );
}

export default buildControl;
