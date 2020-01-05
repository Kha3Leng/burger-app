import React from 'react';
import classes from './BurgerControls.css';
import BurgerControl from './BurgerControl/BurgerControl';

const controls = [
    { label: 'Meat', type: 'meat' },
    { label: 'Cheese', type: 'cheese' },
    { label: 'Salad', type: 'salad' },
    { label: 'Bacon', type: 'bacon' }
];

const burgerControls = (props) => (
    <div className={classes.BurgerControls}>
        <p>Current Price : <strong>≈{props.price.toFixed(2)}</strong> </p>
        {controls.map(
            (ctrl, index) => {
                return <BurgerControl label={ctrl.label}
                    key={ctrl + index}
                    added={() => props.addedIngredients(ctrl.type)}
                    removed={() => props.removedIngredients(ctrl.type)}
                    disabled={props.disabledObj[ctrl.type]} />
            }
        )}
        <button className={classes.OrderButton}
            disabled={!props.orderNow}
            onClick={props.ordered}>
            {props.isAuth ? 'ORDER NOW' : 'Sign Up To Order'}
        </button>
    </div>
);

export default burgerControls;