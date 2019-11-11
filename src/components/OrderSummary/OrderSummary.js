import React, { Component } from 'react';

import Aux from '../../hoc/Aux/Aux';
import Button from '../../components/UI/Button/Button';

class OrderSummary extends Component {

    componentDidUpdate() {
        console.log("[OrderSummary] re-rendering");
    }

    render() {
        const orderedIngredients = Object.keys(this.props.ingredients).map(
            (igKey, index) => {
                return (
                    <li key={igKey + index}>
                        <span style={{ textTransform: 'capitalize', fontWeight: 'bold' }}>{igKey}</span> :
                        {this.props.ingredients[igKey]} $
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
                <p><strong>Total Price :</strong> {this.props.totalPrice.toFixed(2)}</p>
                <p>Continue to check out?</p>
                <Button buttonType="Danger" clicked={this.props.purchaseCancelled}>CANCEL</Button>
                <Button buttonType="Success" clicked={this.props.purchaseContinued}>CONTINUE</Button>
            </Aux>
        );

    }

}

export default OrderSummary;