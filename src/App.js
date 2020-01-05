import React, { Component } from 'react';
import { BrowserRouter, Switch, Route, withRouter, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

import Checkout from './containers/Checkou/Checkout';
import Layout from './hoc/Layout/Layout';
import BurgerBuilder from './containers/BurgerBuilder/BurgerBuilder';
import Orders from './containers/Orders/Orders';
import Auth from './containers/Auth/Auth';
import Logout from './containers/Auth/Logout/Logout';
// import asyncComponent from './hoc/asyncComponent/asyncComponent';
import * as actions from './store/actions/index';

class App extends Component {
  // state = {
  //   show: true
  // };

  // componentDidMount() {
  //   setTimeout(_ => {
  //     this.setState({ show: false });
  //   }, 5000);
  // }

  componentDidMount() {
    this.props.onTryAutoSignIn();
  }

  render() {
    // const asyncCheckout = asyncComponent(() => {
    //   return import('./containers/Checkou/Checkout');
    // });

    // const asyncOrder = asyncComponent(() => {
    //   return import('./containers/Orders/Orders');
    // });

    // const asyncAuth = asyncComponent(() => {
    //   return import('./containers/Auth/Auth');
    // });
    // const LazyLoadingOrder = React.lazy(() => import('./containers/Orders/Orders'));
    // const LazyLoadingCheckout = React.lazy(() => import('./containers/Checkou/Checkout'));
    // const LazyLoadingAuth = React.lazy(() => import('./containers/Auth/Auth'));
    let routes = (
      <Switch>
        <Route path="/" exact component={BurgerBuilder} />
        <Route path='/authenticate' component={Auth} />
        <Redirect to="/" />
      </Switch>
    );
    if (this.props.isAuth) {
      routes = (
        <Switch>
          <Route path="/" exact component={BurgerBuilder} />
          {/* <Route path="/orders/" render={() => { return <Suspense><LazyLoadingOrder /></Suspense> }} /> */}
          <Route path="/orders/" component={Orders} />
          <Route path="/checkout/" component={Checkout} />
          <Route path="/authenticate/" component={Auth} />
          {/* <Route path="/checkout/" render={() => <Suspense><LazyLoadingCheckout /></Suspense>} /> */}
          <Route path="/logout" component={Logout} />
          {/* <Route path='/authenticate' render={() => <Suspense><LazyLoadingAuth /></Suspense>} /> */}
          <Redirect to="/" />
        </Switch>
      );
    }
    return (
      <div>
        <BrowserRouter>
          <Layout>
            {/* {this.state.show ? <BurgerBuider /> : null} */}
            {routes}
          </Layout>

        </BrowserRouter>
      </div >
    );
  }

}

const mapStateToProps = state => {
  return {
    isAuth: state.auth.token !== null
  }
};

const mapDispatchToProps = dispatch => {
  return {
    onTryAutoSignIn: () => dispatch(actions.authCheckState())
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));
