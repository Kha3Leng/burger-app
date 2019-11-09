import React from 'react';

import Toolbar from '../Navigation/Toolbar/Toolbar';
import Aux from '../../hoc/Aux';
import Classes from './Layout.css';

const layout = (props) => (
    <Aux>
        <Toolbar />
        <main className={Classes.Content}>
            {props.children}
        </main>
    </Aux>
);

export default layout;