import React from 'react';

import Aux from '../../../hoc/Aux';

const orderSummary = (props) => {
    const ingredientSummary = Object.keys(props.ingredients)
        .map(ingredKey => {
            if(props.ingredients[ingredKey] > 0){
                return (
                    <li key={ingredKey}>
                        <span style={{ textTransform: 'capitalize' }}>{ingredKey}</span>: {props.ingredients[ingredKey]}
                    </li>
                );
            }
            return null;  
        });

    return (
        <Aux>
            <h3>Your Order Summary</h3>
            <p>A delicious burger with following ingredients:</p>
            <ul>
                {ingredientSummary}
            </ul>
        </Aux>
    );
}

export default orderSummary;