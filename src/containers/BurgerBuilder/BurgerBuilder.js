import React, { Component } from 'react';
import { connect } from 'react-redux';

import axiosInstance from '../../axios';
import Aux from '../../hoc/Aux/Aux';
import Burger from '../../components/Burger/Burger';
import BurgerControls from '../../components/Burger/BurgerControls/BurgerControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/OrderSummary/OrderSummary';
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import * as burgerBuilderActions from '../../store/actions/index';



class BurgerBuilder extends Component {
    constructor(props) {
        super(props);
        this.state = {
            purchasing: false
        };
    }

    componentDidMount() {
        this.props.onInitIngredeints();
    }

    orderNowHandler(ingredientOld) {
        const sum = Object.keys(ingredientOld).map(
            igKey => {
                return ingredientOld[igKey];
            }
        ).reduce((sum, el) => {
            return sum + el;
        }, 0);

        return sum > 0;
    }

    orderedSummaryModalHandler = () => {
        if (this.props.isAuth)
            this.setState({ purchasing: true });
        else {
            this.props.onSetRedirect('/checkout');
            this.props.history.push("/authenticate");
        }
    }

    orderSummaryModalCancelHandler = () => {
        this.setState({ purchasing: false });
    };

    purchaseContinued = () => {
        // const queryParams = [];
        // for (let i in this.state.ingredients) {
        //     queryParams.push(encodeURIComponent(i) + "=" + encodeURIComponent(this.state.ingredients[i]))
        // }
        // queryParams.push("price=" + this.state.totalprice);
        // const queryString = queryParams.join('&');
        this.props.onInitPurchased();
        this.props.history.push({ pathname: '/checkout' });

    }

    render() {
        let orderSummary = null;
        let burger = this.props.error ? <p>Ingredients cannot be loaded</p> : <Spinner />;

        if (this.props.ingr) {
            const disableInfo = {
                ...this.props.ingr
            };

            for (let key in disableInfo) {
                disableInfo[key] = disableInfo[key] <= 0;
            }
            burger = (
                <Aux>
                    <Burger ingredients={this.props.ingr} />
                    <BurgerControls
                        addedIngredients={this.props.onIngredientAdded}
                        removedIngredients={this.props.onIngredientRemoved}
                        disabledObj={disableInfo}
                        price={this.props.price}
                        orderNow={this.orderNowHandler(this.props.ingr)}
                        isAuth={this.props.isAuth}
                        ordered={this.orderedSummaryModalHandler} />
                </Aux>);
            orderSummary = (<OrderSummary
                ingredients={this.props.ingr}
                totalPrice={this.props.price}
                purchaseCancelled={this.orderSummaryModalCancelHandler}
                purchaseContinued={this.purchaseContinued} />);
        }

        return (
            <Aux>
                <Modal orderModal={this.state.purchasing} clicked={this.orderSummaryModalCancelHandler}>
                    {orderSummary}
                </Modal>
                {burger}
            </Aux>
        );
    }
}

const mapStateToProps = state => {
    return {
        ingr: state.burgerBuilder.ingredients,
        price: state.burgerBuilder.price,
        error: state.burgerBuilder.error,
        isAuth: state.auth.token !== null
    };
};

const matDispatchToProps = dispatch => {
    return {
        onIngredientAdded: (ingr) => dispatch(burgerBuilderActions.addIngredients(ingr)),
        onIngredientRemoved: (ingr) => dispatch(burgerBuilderActions.removeIngredients(ingr)),
        onInitIngredeints: _ => dispatch(burgerBuilderActions.initIngredients()),
        onInitPurchased: () => dispatch(burgerBuilderActions.purchaseInit()),
        onSetRedirect: (path) => dispatch(burgerBuilderActions.setAuthRedirectPath(path))
    };
};

export default connect(mapStateToProps, matDispatchToProps)(withErrorHandler(BurgerBuilder, axiosInstance));