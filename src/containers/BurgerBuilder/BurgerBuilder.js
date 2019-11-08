import React, { Component } from 'react';
import Aux from '../../hoc/Aux';
import Burger from '../../components/Burger/Burger';
import BurgerControls from '../../components/Burger/BurgerControls/BurgerControls';

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
            ingredients: {
                salad: 0,
                bacon: 0,
                cheese: 0,
                meat: 0
            },
            totalprice: 4,
            purchasable: false
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



        console.log("Object : " + Object.keys(ingredientOld).map(
            igKey => {
                return ingredientOld[igKey];
            }
        ));

        console.log("Reduce : " + Object.keys(ingredientOld).map(
            igKey => {
                return ingredientOld[igKey];
            }
        ).reduce((sum, el) => {
            return sum + el;
        }, 0));
    }

    addIngredientHandler = (type) => {
        const oldCount = this.state.ingredients[type];
        console.log("Key or Value : " + oldCount);
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


    render() {
        const disableInfo = {
            ...this.state.ingredients
        };

        for (let key in disableInfo) {
            disableInfo[key] = disableInfo[key] <= 0;
        }

        console.log("[render] method, Key/Value :" + disableInfo);

        return (<Aux>
            <Burger ingredients={this.state.ingredients} />
            <BurgerControls
                addedIngredients={this.addIngredientHandler}
                removedIngredients={this.removeIngredientHandler}
                disabledObj={disableInfo}
                price={this.state.totalprice}
                orderNow={this.state.purchasable} />
        </Aux>
        );
    }
}

export default BurgerBuilder;