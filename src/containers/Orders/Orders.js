import React, { Component } from 'react';

import Order from '../../components/Order/Order';
import Axios from '../../axios';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';

class Orders extends Component {

    state = {
        orders: [],
        loading: true
    };

    componentDidMount() {
        Axios.get("order.json")
            .then(res => {
                const fetchAll = [];

                for (let key in res.data) {
                    fetchAll.push(
                        { ...res.data[key], id: key }
                    );
                }
                console.log(fetchAll);
                this.setState({ orders: fetchAll, loading: false })
            })
            .catch(
                err => this.setState({ loading: false })
            )
    }


    render() {
        return (
            <div>
                {this.state.orders.map(
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
}

export default withErrorHandler(Orders, Axios);