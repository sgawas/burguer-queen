import React, {Component} from 'react';
import { connect } from 'react-redux';

import Aux from '../../hoc/Aux/Aux';
import Burger from '../../components/Burger/Burger';
import BurgerControls  from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import axios from '../../axios-orders';
import Spinner from '../../components/UI/Spinner/Spinner';
import WithErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import * as actionTypes from '../../store/actions';


class BurgerBuilder extends Component {
    // constructor(props){
    //     super(props);
    //     this.state = {...}
    // }

    state = {
        orderNow: false,
        loading: false,
        error: false
    };

    componentDidMount(){
        console.log(this.props);
        // axios.get('https://burger-queen-1924f.firebaseio.com/ingredients.json')
        // .then(response => {
        //     this.setState({ ingredients : response.data });
        //     console.log(this.state.ingredients);
        // })
        // .catch(error=> {
        //     this.setState({ error :  true });
        // });
    }

    updatePuchaseState ( ingredients ) {
        const sum = Object.keys(ingredients)
            .map(ingredKey=> {
                return ingredients[ingredKey];
            })
            .reduce((total, element)=> {
                return total + element;
            },0);
        return sum > 0;
    }
    // addIngredientHandler = (type) => {
    //     const oldIngredCount = this.state.ingredients[type];
    //     const updatedIngredCount = oldIngredCount + 1;
    //     const updatedIngredients = {
    //         ...this.state.ingredients
    //     };

    //     updatedIngredients[type] = updatedIngredCount;

    //     const priceAddition = INGREDIENT_PRICES[type];
    //     const oldTotalPrice = this.state.totalPrice;
    //     const newTotalPrice = oldTotalPrice + priceAddition;
    //     this.setState({totalPrice: newTotalPrice, ingredients: updatedIngredients});
        
    //     this.updatePuchaseState(updatedIngredients);
    // }

    // removeIngredientHandler = (type) => {
    //     const oldIngredCount = this.state.ingredients[type];
    //     if( oldIngredCount < 1 ){
    //         return;
    //     }
    //     const updatedIngredCount = oldIngredCount - 1;
    //     const updatedIngredients = {
    //         ...this.state.ingredients
    //     };

    //     updatedIngredients[type] = updatedIngredCount;
    //     const oldTotalPrice = this.state.totalPrice;
    //     const priceSubtract = INGREDIENT_PRICES[type];
    //     const newTotalPrice = oldTotalPrice - priceSubtract;

    //     this.setState({ingredients: updatedIngredients, totalPrice: newTotalPrice});

    //     this.updatePuchaseState(updatedIngredients);
    // }

    purchaseHandler = () => {
        this.setState({ orderNow : true });
    }

    purchaseCancelHandler = () => {
        this.setState({ orderNow : false });
    }

    purchaseContinueHandler = () => {
        //alert('you can continue')
        // const queryParams= [];
        // for(let i  in this.state.ingredients){
        //     queryParams.push(encodeURIComponent(i)+ '=' + encodeURIComponent(this.state.ingredients[i]));
        // }
        // queryParams.push('price=' + this.state.totalPrice);
        
        // const queryString = queryParams.join('&');
        this.props.history.push('/checkout');
        //     pathname: '/checkout',
        //     search: '?' + queryString
        // });
    }

    render(){
        const disabledInfo = {
            ...this.props.ings
        }

        for(let key in disabledInfo){
            disabledInfo[key] = disabledInfo[key] <=0;
        }
        let burger = this.state.error ? <p>Ingredients cannot be loaded due to some error!</p> : <Spinner />;
        let orderSummary = null;
        
        if(this.props.ings) {
            burger = (
                <Aux>
                    <Burger ingredients={this.props.ings}/>
                    <BurgerControls 
                        ingredientAdded={this.props.onIngredientAdded} 
                        ingredientRemoved={this.props.onIngredientRemoved}
                        disabled={disabledInfo}
                        price={this.props.price}
                        purchasable={this.updatePuchaseState(this.props.ings)}
                        orderNow={this.purchaseHandler}
                    />
                </Aux>
            );

            orderSummary = <OrderSummary 
                ingredients={this.props.ings}
                purchaseCanceled={this.purchaseCancelHandler}
                purchaseContinued={this.purchaseContinueHandler}  
                price={this.props.price}  
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

const mapStateToProps = state => {
    return {
        ings: state.ingredients,
        price: state.totalPrice
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onIngredientAdded: (ingName) => dispatch({type: actionTypes.ADD_INGREDIENT, ingredientName: ingName}),
        onIngredientRemoved: (ingName) => dispatch({type: actionTypes.REMOVE_INGREDIENT, ingredientName: ingName})
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(WithErrorHandler( BurgerBuilder, axios ));