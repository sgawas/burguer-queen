import React, {Component} from 'react';

import Aux from '../../hoc/Aux';
import Burger from '../../components/Burger/Burger';
import BurgerControls  from '../../components/Burger/BuildControls/BuildControls';

const INGREDIENT_PRICES = {
    salad: 0.5,
    meat: 2.0,
    cheese: 1.0,
    bacon: 1.5
}

class BurgerBuilder extends Component {
    // constructor(props){
    //     super(props);
    //     this.state = {...}
    // }

    state = {
        ingredients: {
            salad: 0,
            meat: 0,
            bacon: 0,
            cheese: 0
        },
        totalPrice: 0
    };

    addIngredientHandler = (type) => {
        const oldIngredCount = this.state.ingredients[type];
        const updatedIngredCount = oldIngredCount + 1;
        const updatedIngredients = {
            ...this.state.ingredients
        };

        updatedIngredients[type] = updatedIngredCount;

        const priceAddition = INGREDIENT_PRICES[type];
        const oldTotalPrice = this.state.totalPrice;
        const newTotalPrice = oldTotalPrice + priceAddition;
        this.setState({totalPrice: newTotalPrice, ingredients: updatedIngredients});
    }

    removeIngredientHandler = (type) => {
        const oldIngredCount = this.state.ingredients[type];
        if( oldIngredCount < 1 ){
            return;
        }
        const updatedIngredCount = oldIngredCount - 1;
        const updatedIngredients = {
            ...this.state.ingredients
        };

        updatedIngredients[type] = updatedIngredCount;
        const oldTotalPrice = this.state.totalPrice;
        const priceSubtract = INGREDIENT_PRICES[type];
        const newTotalPrice = oldTotalPrice - priceSubtract;

        this.setState({ingredients: updatedIngredients, totalPrice: newTotalPrice});
    }

    render(){
        const disabledInfo = {
            ...this.state.ingredients
        }

        for(let key in disabledInfo){
            disabledInfo[key] = disabledInfo[key] <=0;
        }
        
        return (
        <Aux>
            <Burger ingredients={this.state.ingredients}/>
            <BurgerControls 
                ingredientAdded={this.addIngredientHandler} 
                ingredientRemoved={this.removeIngredientHandler}
                disabled={disabledInfo}
                price={this.state.totalPrice}
                />
        </Aux>
        );
    }
}

export default BurgerBuilder;