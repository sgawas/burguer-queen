import React, { Component } from 'react';

import Aux from '../../../hoc/Aux/Aux';
import Button from '../../UI/Button/Button';

class OrderSummary extends Component {

    // componentWillUpdate(){
    //     console.log('OrderSummary will update')
    // }

    render(){
        const ingredientSummary = Object.keys(this.props.ingredients)
            .map(ingredKey => {
                if(this.props.ingredients[ingredKey] > 0){
                    return (
                        <li key={ingredKey}>
                            <span style={{ textTransform: 'capitalize' }}>{ingredKey}</span>: {this.props.ingredients[ingredKey]}
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
                <p><strong>Your Total is ${this.props.price.toFixed(2)}</strong></p>
                <p>Click Continue to Checkout.</p>
                <Button clicked={this.props.purchaseCanceled} type="Danger">Cancel</Button>
                <Button type="Success" clicked={this.props.purchaseContinued}>Continue</Button>
            </Aux>
        );
    }
}

export default OrderSummary;