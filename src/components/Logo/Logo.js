import React from 'react';

import classes from './Logo.css';
import burgerLogo from '../../assets/images/burger.png';
const logo = props => (
    <div className={classes.Logo}>
        <img src={burgerLogo} />
    </div>
);

export default logo;