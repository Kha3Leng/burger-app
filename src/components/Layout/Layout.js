import React, { Component } from 'react';

import Toolbar from '../Navigation/Toolbar/Toolbar';
import Aux from '../../hoc/Aux';
import Sidebar from '../Navigation/Sidebar/Sidebar';
import Classes from './Layout.css';

class Layout extends Component {
    state = {
        showDrawer: false
    }

    showDrawerHandler = () => {
        this.setState({ showDrawer: false });
    };

    drawerToggleHander = () => {
        this.setState((prevState, props) => { return { showDrawer: !prevState.showDrawer } });
    };

    render() {
        return (
            <Aux>
                <Toolbar showDrawerToggle={this.drawerToggleHander} />
                <Sidebar open={this.state.showDrawer} showDrawer={this.showDrawerHandler} />
                <main className={Classes.Content}>
                    {this.props.children}
                </main>

            </Aux>
        );

    }
}
export default Layout;