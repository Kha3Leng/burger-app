import React, { Component } from 'react';

import axiosInstance from '../../axios';
import Aux from '../../hoc/Aux/Aux';
import Burger from '../../components/Burger/Burger';
import BurgerControls from '../../components/Burger/BurgerControls/BurgerControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/OrderSummary/OrderSummary';
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';

const INGREDIENT_PRICES = {
    salad: 0.5,
    bacon: 0.4,
    meat: 1.2,
    cheese: 0.2
};

class BurgerBuilder extends Component {
    constructor(props) {
        super(props);
        this.state = {
            ingredients: null,
            totalprice: 4,
            purchasable: false,
            purchasing: false,
            loading: false,
            error: false
        };
    }

    orderNowHandler(ingredientOld) {
        const sum = Object.keys(ingredientOld).map(
            igKey => {
                return ingredientOld[igKey];
            }
        ).reduce((sum, el) => {
            return sum + el;
        }, 0);

        this.setState({ purchasable: sum > 0 });
    }

    addIngredientHandler = (type) => {
        const oldCount = this.state.ingredients[type];
        const updateCount = oldCount + 1;
        const updateState = { ...this.state.ingredients };
        updateState[type] = updateCount;

        const oldPrice = INGREDIENT_PRICES[type]
        const newPrice = this.state.totalprice + oldPrice;

        this.setState({
            ingredients: updateState,
            totalprice: newPrice
        });
        this.orderNowHandler(updateState);
    };

    removeIngredientHandler = (type) => {
        const oldCount = this.state.ingredients[type];
        console.log("Key or Value : " + oldCount);
        if (oldCount <= 0) {
            return;
        }
        const updateCount = oldCount - 1;
        const updateState = { ...this.state.ingredients };
        updateState[type] = updateCount;

        const oldPrice = INGREDIENT_PRICES[type]
        const newPrice = this.state.totalprice - oldPrice;

        this.setState({
            ingredients: updateState,
            totalprice: newPrice
        });
        this.orderNowHandler(updateState);
    };

    orderedSummaryModalHandler = () => {
        this.setState({ purchasing: true });
    }

    orderSummaryModalCancelHandler = () => {
        this.setState({ purchasing: false });
    };

    purchaseContinued = () => {
        // alert('You purchased a burger');
        // this.setState({ loading: true });
        // const orderData = {
        //     ingredients: this.state.ingredients,
        //     customer: "Max",
        //     price: this.state.totalprice,
        //     delivery: 'fastest',
        //     address: 'St. Margo Street, Berlin, Germany'
        // };

        // axiosInstance.post('/order.json', orderData)
        //     .then(response => {
        //         // console.log("[Posting orderData] : " + response);
        //         this.setState({ loading: false, purchasing: false });
        //     })
        //     .catch(error => {
        //         // console.log(error);
        //         this.setState({ loading: false, purchasing: false });
        //     });
        // this.setState({ checkout: true });
        // this.props.history.push("/checkout");
        const queryParams = [];
        for (let i in this.state.ingredients) {
            queryParams.push(encodeURIComponent(i) + "=" + encodeURIComponent(this.state.ingredients[i]))
        }
        queryParams.push("price=" + this.state.totalprice);
        const queryString = queryParams.join('&');
        this.props.history.push({
            pathname: '/checkout',
            search: "?" + queryString
        });
    }


    componentDidMount() {
        axiosInstance.get('https://my-burger-app-94e8d.firebaseio.com/ingredients.json')
            .then(response => {
                this.setState({ ingredients: response.data });
            })
            .catch(error => { this.setState({ error: true }); });
    }


    render() {
        let orderSummary = null;
        let burger = this.state.error ? <p>Ingredients cannot be loaded</p> : <Spinner />;

        if (this.state.ingredients) {
            const disableInfo = {
                ...this.state.ingredients
            };

            for (let key in disableInfo) {
                disableInfo[key] = disableInfo[key] <= 0;
            }
            burger = (
                <Aux>
                    <Burger ingredients={this.state.ingredients} />
                    <BurgerControls
                        addedIngredients={this.addIngredientHandler}
                        removedIngredients={this.removeIngredientHandler}
                        disabledObj={disableInfo}
                        price={this.state.totalprice}
                        orderNow={this.state.purchasable}
                        ordered={this.orderedSummaryModalHandler} />
                </Aux>);
            orderSummary = (<OrderSummary
                ingredients={this.state.ingredients}
                totalPrice={this.state.totalprice}
                purchaseCancelled={this.orderSummaryModalCancelHandler}
                purchaseContinued={this.purchaseContinued} />);
        }

        if (this.state.loading) {
            orderSummary = <Spinner />;
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

export default withErrorHandler(BurgerBuilder, axiosInstance);