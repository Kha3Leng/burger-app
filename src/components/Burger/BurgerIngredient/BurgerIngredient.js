import React, { Component } from 'react';
import Classes from './BurgerIngredient.css';
import PropTypes from 'prop-types';

class BurgerIngredient extends Component {

    render() {
        let ingredient = null;

        switch (this.props.type) {
            case ('bread-bottom'):
                ingredient = <div className={Classes.BreadBottom}></div>
                //if break is not stated at the end of each case then the code will not return if switch and case are equal
                break;
            case ('bread-top'):
                ingredient = <div className={Classes.BreadTop}>
                    <div className={Classes.Seeds1}></div>
                    <div className={Classes.Seeds2}></div>
                </div>
                break;
            case ('meat'):
                ingredient = <div className={Classes.Meat}></div>
                break;
            case ('cheese'):
                ingredient = <div className={Classes.Cheese}></div>
                break;
            case ('salad'):
                ingredient = <div className={Classes.Salad}></div>
                break;
            case ('bacon'):
                ingredient = <div className={Classes.Bacon}></div>
                break;
            // default case if nothing is a match
            default:
                ingredient = null;
        }

        return ingredient;
    }
}

BurgerIngredient.propTypes = {
    type: PropTypes.string.isRequired
};

export default BurgerIngredient;