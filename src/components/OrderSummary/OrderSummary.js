import React from 'react';

import Aux from '../../hoc/Aux';
import Button from '../../components/UI/Button/Button';

const orderSummary = props => {
    const orderedIngredients = Object.keys(props.ingredients).map(
        (igKey, index) => {
            return (
                <li key={igKey + index}>
                    <span style={{ textTransform: 'capitalize', fontWeight: 'bold' }}>{igKey}</span> :
                    {props.ingredients[igKey]} $
                </li>);
        }
    );

    return (
        <Aux>
            <h3>Your Order</h3>
            <p>A delicious burger with the following ingredients : </p>
            <ul>
                {orderedIngredients}
            </ul>
            <p><strong>Total Price :</strong> {props.totalPrice.toFixed(2)}</p>
            <p>Continue to check out?</p>
            <Button buttonType="Danger" clicked={props.purchaseCancelled}>CANCEL</Button>
            <Button buttonType="Success" clicked={props.purchaseContinued}>CONTINUE</Button>
        </Aux>
    );
};

export default orderSummary;