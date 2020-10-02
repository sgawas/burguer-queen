import React, {Component} from 'react';

import Aux from '../../hoc/Aux/Aux';
import Burger from '../../components/Burger/Burger';
import BurgerControls  from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import axios from '../../axios-orders';
import Spinner from '../../components/UI/Spinner/Spinner';
import WithErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';

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
        ingredients: null,
        totalPrice: 2,
        purchasable: false,
        orderNow: false,
        loading: false,
        error: false
    };

    componentDidMount(){
        axios.get('https://burger-queen-1924f.firebaseio.com/ingredients.json')
        .then(response => {
            this.setState({ ingredients : response.data });
            console.log(this.state.ingredients);
        })
        .catch(error=> {
            this.setState({ error :  true });
        })
    }

    updatePuchaseState ( ingredients ) {
        const sum = Object.keys(ingredients)
            .map(ingredKey=> {
                return ingredients[ingredKey];
            })
            .reduce((total, element)=> {
                return total + element;
            },0);
        this.setState({purchasable: sum > 0});
    }
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
        
        this.updatePuchaseState(updatedIngredients);
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

        this.updatePuchaseState(updatedIngredients);
    }

    purchaseHandler = () => {
        this.setState({ orderNow : true });
    }

    purchaseCancelHandler = () => {
        this.setState({ orderNow : false });
    }

    purchaseContinueHandler = () => {
        //alert('you can continue')
        this.setState({ loading : true });
        const order = {
            ingredients: this.state.ingredients,
            price: this.state.totalPrice,
            customer: {
                name:'suraj',
                address: {
                    street: '100 sw 777th ave',
                    zipcode: '403516',
                    country: 'USA'
                },
                email: 'suraj@email.com'
            },
            deliveryMethod: 'standard'
        }
        axios.post('/orders.json',order)
            .then(response=>{
                this.setState({ loading : false, orderNow : false });
            })
            .catch(error=> {
                this.setState({ loading : false, orderNow : false });
            });

    }

    render(){
        const disabledInfo = {
            ...this.state.ingredients
        }

        for(let key in disabledInfo){
            disabledInfo[key] = disabledInfo[key] <=0;
        }
        let burger = this.state.error ? <p>Ingredients cannot be loaded due to some error!</p> : <Spinner />;
        let orderSummary = null;
        
        if(this.state.ingredients) {
            burger = (
                <Aux>
                    <Burger ingredients={this.state.ingredients}/>
                    <BurgerControls 
                        ingredientAdded={this.addIngredientHandler} 
                        ingredientRemoved={this.removeIngredientHandler}
                        disabled={disabledInfo}
                        price={this.state.totalPrice}
                        purchasable={this.state.purchasable}
                        orderNow={this.purchaseHandler}
                    />
                </Aux>
            );

            orderSummary = <OrderSummary 
                ingredients={this.state.ingredients}
                purchaseCanceled={this.purchaseCancelHandler}
                purchaseContinued={this.purchaseContinueHandler}  
                price={this.state.totalPrice}  
            />;
        }
        
        if(this.state.loading){
            orderSummary = <Spinner />
        }
        
        return (
        <Aux>
            <Modal show={this.state.orderNow} modalClosed={this.purchaseCancelHandler}>
                {orderSummary}
            </Modal>
            {burger}
        </Aux>
        );
    }
}

export default WithErrorHandler( BurgerBuilder, axios );