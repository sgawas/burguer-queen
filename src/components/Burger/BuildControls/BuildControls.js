import React from 'react';

import './BuildControls.css';
import BuildControl from './BuildControl/BuildControl';

const controls = [
    { label: 'Salad', type: 'salad' },
    { label: 'Meat', type: 'meat' },
    { label: 'Cheese', type: 'cheese' },
    { label: 'Bacon', type: 'bacon' }
];

const buildControls = (props) => {

    return (
        <div className="BuildControls">
            <p>Current Price: <strong>${props.price.toFixed(2)}</strong></p>
            {controls.map(ctrl=> {
                console.log(props.disabled[ctrl.type]);
               return <BuildControl 
                        key={ctrl.label} 
                        label={ctrl.label}
                        added={() => props.ingredientAdded(ctrl.type)}
                        remove={()=> props.ingredientRemoved(ctrl.type)}
                        disabled={props.disabled[ctrl.type]}
                    />
            })}
            <button 
                className="OrderButton" 
                disabled={!props.purchasable}
                onClick={props.orderNow}
            >ORDER NOW</button>
        </div>
    );
}

export default buildControls;
