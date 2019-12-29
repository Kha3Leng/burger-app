import React, { Component } from 'react';
import { connect } from 'react-redux';

import Button from '../../../components/UI/Button/Button';
import classes from './ContactData.css';
import axiosInstance from '../../../axios';
import Spinner from '../../../components/UI/Spinner/Spinner';
import Input from '../../../components/UI/Input/Input';
import withErrorHandler from '../../../hoc/withErrorHandler/withErrorHandler';
import * as actions from '../../../store/actions/index';

class ContactData extends Component {
    state = {
        formIsValid: false,
        orderForm: {

            customer: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Your Name',
                },
                value: '',
                validation: {
                    required: true
                },
                valid: false,
                touched: false
            },
            street: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Your Street',
                },
                value: '',
                validation: {
                    required: true
                },
                valid: false,
                touched: false
            },
            zipCode: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'ZIP Code',
                },
                value: '',
                validation: {
                    required: true,
                    max_length: 5,
                    min_length: 5
                },
                valid: false,
                touched: false
            },
            country: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Country'
                },
                value: '',
                validation: {
                    required: true
                },
                valid: false,
                touched: false
            },
            email: {
                elementType: 'input',
                elementConfig: {
                    type: 'email',
                    placeholder: 'Your E-Mail'
                },
                value: '',
                validation: {
                    required: true
                },
                valid: false,
                touched: false
            },
            delivery: {
                elementType: 'select',
                elementConfig: {
                    options: [{
                        value: 'fastest', displayValue: 'Fastest'
                    },
                    {
                        value: 'cheapest', displayValue: 'Cheapest'
                    }
                    ],
                    placeholder: 'Your Name',
                },
                value: 'fastest',
                validation: {},
                valid: true

            }
        },
        loading: false
    };

    orderHandler = (event) => {
        event.preventDefault();
        const formData = {};

        for (let key in this.state.orderForm) {
            formData[key] = this.state.orderForm[key].value;
        }

        const orderData = {
            ingredients: this.props.ings,
            price: this.props.totalPrice,
            formData: formData
        };

        this.props.onBurgerPurchase(orderData);
    }

    checkValidity = (value, rule) => {
        let isValid = true;

        if (!rule) {
            return true;
        }

        if (rule.required) {
            isValid = value.trim() !== '' && isValid;
        }

        if (rule.min_length) {
            isValid = value.length >= rule.min_length && isValid;
        }

        if (rule.max_length) {
            isValid = value.length <= rule.max_length && isValid;
        }

        return isValid;
    };

    inputChangedHandler = (event, inputId) => {
        // console.log(event.target.value);
        const updatedForm = { ...this.state.orderForm };
        const updatedFormElement = { ...updatedForm[inputId] };

        updatedFormElement.value = event.target.value;
        updatedFormElement.touched = true;
        updatedFormElement.valid = this.checkValidity(updatedFormElement.value, updatedFormElement.validation);

        updatedForm[inputId] = updatedFormElement;
        let formIsValid = true;
        for (let key in updatedForm) {
            formIsValid = updatedForm[key].valid && formIsValid;
        }
        this.setState({ orderForm: updatedForm, formIsValid: formIsValid });
    };

    render() {
        let formElement = [];

        for (let key in this.state.orderForm) {
            formElement.push(
                {
                    id: key,
                    config: this.state.orderForm[key]
                }
            );
        }

        let form = (
            <form onSubmit={this.orderHandler}>
                {formElement.map(
                    element => (
                        <Input
                            key={element.id}
                            elementType={element.config.elementType}
                            elementConfig={element.config.elementConfig}
                            value={element.config.value}
                            shouldUpdate={element.config.validation}
                            invalid={!element.config.valid}
                            touched={element.config.touched}
                            changed={(event) => this.inputChangedHandler(event, element.id)} />
                    )
                )}
                <Button buttonType="Success" disabled={!this.state.formIsValid}>ORDER</Button>
            </form>)
            ;
        if (this.props.loading) {
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

const mapStateToProps = state => {
    return {
        ings: state.burgerBuilder.ingredients,
        totalPrice: state.burgerBuilder.price,
        loading: state.order.loading
    }
};

const mapDispatchToProps = dispatch => {
    return {
        onBurgerPurchase: (orderData) => dispatch(actions.startPurchase(orderData))
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(ContactData, axiosInstance));