import React, { Component } from 'react';
import { connect } from 'react-redux';

import Order from '../../components/Order/Order';
import Axios from '../../axios';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import * as actions from '../../store/actions/index';
import Spinner from '../../components/UI/Spinner/Spinner';

class Orders extends Component {

    componentDidMount() {
        this.props.onFetchOrder();
    }


    render() {
        let spinner = <Spinner />;
        if (!this.props.loading) {
            spinner = (
                <div>
                    {this.props.orders.map(
                        order => {
                            return <Order
                                ingredients={order.ingredients}
                                key={order.id}
                                price={+order.price}
                            />
                        }
                    )}
                </div>
            );
        }
        return spinner;
    }
}

const mapStateToProps = state => {
    return {
        orders: state.order.order,
        loading: state.order.loading,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        onFetchOrder: () => dispatch(actions.fetchOrder())
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(Orders, Axios));