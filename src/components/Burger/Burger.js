import React from 'react';

import './Burger.css';
import BurgerIngredient from './BurgerIngredient/BurgerIngredient';

const burger = (props) => {
    const obj = Object.keys(props.ingredients);

    let transformedIngredients = Object.keys(props.ingredients).map(ingredKey => {
        return [...Array(props.ingredients[ingredKey])].map((_, index) => {
            return <BurgerIngredient key={ingredKey + index} type={ingredKey} />
        })
    }).reduce((prevArr, newArr)=> {
        return prevArr.concat(newArr)
    },[])

    console.log(obj);
    if(transformedIngredients.length === 0){
        transformedIngredients = <p>Please add ingredients to the Burger!</p>
    }
    return (
        <div className="Burger">
            <BurgerIngredient type="bread-top"/>
            {transformedIngredients}
            <BurgerIngredient type="bread-bottom"/>
        </div>
    )
}

export default burger;