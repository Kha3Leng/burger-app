import React from 'react';

import Burger from '../../Burger/Burger';
import classes from './CheckoutSummary.css';
import Button from '../../UI/Button/Button';

const CheckoutSummary = props => {
    return (
        <div className={classes.CheckoutSummary}>
            <h1>We hope it's tasty!</h1>
            <Burger ingredients={props.ingredients} style={{
                width: "100%",
                height: "300px",
                margin: "auto"
            }} />
            <Button buttonType="Danger" clicked={props.cancelCheckout}>CANCEL </Button>
            <Button buttonType="Success" clicked={props.continueCheckout}>CONTINUE</Button>
        </div>
    );
};

export default CheckoutSummary;