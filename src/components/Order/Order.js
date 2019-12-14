import React from 'react';

import classes from './Order.css';

const order = (props) => {
    const ingredients = [];

    for (let ingredientName in props.ingredients) {
        ingredients.push({
            name: ingredientName,
            amount: props.ingredients[ingredientName]
        });
    }

    const ingredientOutput = ingredients.map(
        (ingredient, ind) => {
            return <span
                key={ind}
                style={{
                    textTransform: "capitalize",
                    border: '1px solid #ccc',
                    boxShadow: "0px 2px 3px #eee",
                    margin: "0 8px",
                    padding: "10px",
                    display: 'inline-block'
                }}
            >
                {ingredient.name} ( {ingredient.amount} )</span>;
        }
    );

    return (
        <div className={classes.Order}>
            <h3 style={{ textAlign: "center" }}>Order</h3>
            <p>Ingredients : {ingredientOutput}</p>
            <p>Price : <strong>USD {props.price.toFixed(2)}</strong></p>
        </div >
    );
};

export default order;