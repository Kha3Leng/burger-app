import React, { Component } from 'react';

import classes from './Modal.css';
import Aux from '../../../hoc/Aux/Aux';
import Backdrop from '../Backdrop/Backdrop';


class Modal extends Component {

    shouldComponentUpdate(nextProps, nextState) {
        return nextProps.orderModal !== this.props.orderModal || nextProps.children !== this.props.children;
    }

    componentDidUpdate() {
        console.log("[Modal] did update");
    }

    render() {
        return (
            <Aux>
                <Backdrop show={this.props.orderModal} clicked={this.props.clicked} />
                <div
                    className={classes.Modal}
                    style={{
                        transform: this.props.orderModal ? 'translateY(0)' : 'translateY(-100vh)',
                        opacity: this.props.orderModal ? '1' : '0'
                    }}>
                    {this.props.children}
                </div>
            </Aux>);
    }
};

export default Modal;