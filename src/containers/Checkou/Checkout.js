import React, { Component } from 'react';
import { Route } from 'react-router-dom';

import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';
import ContactData from './ContactData/ContactData';

class Checkout extends Component {
    state = {
        ingredients: {
            meat: 1,
            cheese: 1,
            salad: 1,
            bacon: 1
        }
        , price: 0
    };

    componentDidMount() {
        const query = new URLSearchParams(this.props.location.search);
        const ingredients = {};
        let price = 0;
        for (let q of query.entries()) {
            //[salad: 1]
            if (q[0] === 'price')
                price = q[1];
            else
                ingredients[q[0]] = +q[1];

        }
        this.setState({ ingredients: ingredients, price: price });
    }

    cancelledCheckout = () => {
        this.props.history.goBack();
    };

    continuedCheckout = () => {
        this.props.history.replace(this.props.match.url + "/contact-data");
    };

    render() {
        console.log(this.props);
        return (
            <div>
                <CheckoutSummary
                    ingredients={this.state.ingredients}
                    cancelCheckout={this.cancelledCheckout}
                    continueCheckout={this.continuedCheckout} />
                <Route
                    path="/checkout/contact-data"
                    render={(props) => <ContactData price={this.state.price} ingredients={this.state.ingredients} {...this.props} />} />
            </div>
        );
    }
}

export default Checkout;