import React from 'react';

import Aux from '../../../hoc/Aux';
import Button from '../../UI/Button/Button';

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
            <p><strong>Your Total is ${props.price.toFixed(2)}</strong></p>
            <p>Click Continue to Checkout.</p>
            <Button clicked={props.purchaseCanceled} type="Danger">Cancel</Button>
            <Button type="Success" clicked={props.purchaseContinued}>Continue</Button>
        </Aux>
    );
}

export default orderSummary;