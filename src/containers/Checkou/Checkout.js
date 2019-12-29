import React, { Component } from 'react';
import { Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';
import ContactData from './ContactData/ContactData';

class Checkout extends Component {

    // componentDidMount() {
    //     const query = new URLSearchParams(this.props.location.search);
    //     const ingredients = {};
    //     let price = 0;
    //     for (let q of query.entries()) {
    //         //[salad: 1]
    //         if (q[0] === 'price')
    //             price = q[1];
    //         else
    //             ingredients[q[0]] = +q[1];

    //     }
    //     this.setState({ ingredients: ingredients, price: price });
    // }

    cancelledCheckout = () => {
        this.props.history.goBack();
    };

    continuedCheckout = () => {
        this.props.history.replace(this.props.match.url + "/contact-data");
    };

    render() {
        let summary = <Redirect to="/" />;
        let purchased = this.props.purchased ? <Redirect to='/' /> : null;
        if (this.props.ing) {
            summary = (
                <div>
                    {purchased}
                    <CheckoutSummary
                        ingredients={this.props.ing}
                        cancelCheckout={this.cancelledCheckout}
                        continueCheckout={this.continuedCheckout} />
                    <Route
                        path="/checkout/contact-data"
                        component={ContactData} />
                </div>
            );
        }
        return summary;
    }
}

const mapStateToProps = state => {
    return {
        ing: state.burgerBuilder.ingredients,
        purchased: state.order.purchased
    }
}


export default connect(mapStateToProps)(Checkout);