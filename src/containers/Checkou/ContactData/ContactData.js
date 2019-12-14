import React, { Component } from 'react';

import Button from '../../../components/UI/Button/Button';
import classes from './ContactData.css';
import axiosInstance from '../../../axios';
import Spinner from '../../../components/UI/Spinner/Spinner';

class ContactData extends Component {
    state = {
        name: '',
        phone: '',
        email: '',
        address: {
            street: '',
            postalCode: ''
        },
        loading: false
    };

    orderHandler = (event) => {
        event.preventDefault();
        console.log(this.props);
        this.setState({ loading: true });
        const orderData = {
            ingredients: this.props.ingredients,
            customer: "Max",
            price: this.props.price,
            delivery: 'fastest',
            address: 'St. Margo Street, Berlin, Germany'
        };

        axiosInstance.post('/order.json', orderData)
            .then(response => {
                // console.log("[Posting orderData] : " + response);
                this.setState({ loading: false });
                this.props.history.push("/");
            })
            .catch(error => {
                // console.log(error);
                this.setState({ loading: false });
            });
        // this.props.history.push("/");            ERROR : asynchronous function
    }

    render() {
        let form = (<form>
            <input className={classes.Input} type="text" name="name" placeholder="Your Name" />
            <input className={classes.Input} type="text" name="phone" placeholder="Your Phone Number" />
            <input className={classes.Input} type="email" name="email" placeholder="Your Email" />
            <input className={classes.Input} type="text" name="street" placeholder="Your Street" />
            <input className={classes.Input} type="text" name="postal" placeholder="Your Postal Code" />
            <Button buttonType="Success" clicked={this.orderHandler}>ORDER</Button>
        </form>);
        if (this.state.loading) {
            form = <Spinner />;
        }
        return (
            <div className={classes.ContactData}>
                <h4>Contact Data</h4>
                {form}
            </div>
        );
    }

};
export default ContactData;