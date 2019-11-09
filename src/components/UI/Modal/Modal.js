import React from 'react';

import classes from './Modal.css';
import Aux from '../../../hoc/Aux';
import Backdrop from '../Backdrop/Backdrop';


const modal = props => {
    return (
        <Aux>
            <Backdrop show={props.orderModal} clicked={props.clicked} />
            <div
                className={classes.Modal}
                style={{
                    transform: props.orderModal ? 'translateY(0)' : 'translateY(-100vh)',
                    opacity: props.orderModal ? '1' : '0'
                }}>
                {props.children}
            </div>
        </Aux>);
};

export default modal;