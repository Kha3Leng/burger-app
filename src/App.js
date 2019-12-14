import React, { Component } from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import Checkout from './containers/Checkou/Checkout';
import Layout from './hoc/Layout/Layout';
import BurgerBuilder from './containers/BurgerBuilder/BurgerBuilder';
import Orders from './containers/Orders/Orders';

class App extends Component {
  // state = {
  //   show: true
  // };

  // componentDidMount() {
  //   setTimeout(_ => {
  //     this.setState({ show: false });
  //   }, 5000);
  // }

  render() {
    return (
      <div>
        <BrowserRouter>
          <Layout>
            {/* {this.state.show ? <BurgerBuider /> : null} */}

            <Switch>
              <Route path="/" exact component={BurgerBuilder} />
              <Route path="/orders/" component={Orders} />
              <Route path="/checkout/" component={Checkout} />

            </Switch>
          </Layout>

        </BrowserRouter>
      </div >
    );
  }

}

export default App;
