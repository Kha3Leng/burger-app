import React, { Component } from 'react';
import { connect } from 'react-redux';

import Toolbar from '../../components/Navigation/Toolbar/Toolbar';
import Aux from '../Aux/Aux';
import Sidebar from '../../components/Navigation/Sidebar/Sidebar';
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
                <Toolbar
                    isAuthenticated={this.props.isAuthenticated}
                    showDrawerToggle={this.drawerToggleHander} />
                <Sidebar
                    isAuthenticated={this.props.isAuthenticated}
                    open={this.state.showDrawer}
                    showDrawer={this.showDrawerHandler} />
                <main className={Classes.Content}>
                    {this.props.children}
                </main>

            </Aux>
        );

    }
}

const mapStateToProps = state => {
    return {
        isAuthenticated: state.auth.token !== null
    }
};
export default connect(mapStateToProps)(Layout);