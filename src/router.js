import React from 'react';
import { Router, Route, Switch } from 'dva/router';
import IndexPage from './routes/IndexPage';
import OrderLinePage from './routes/OrderLinePage'
import CustomerPage from './routes/CustomerPage'
import OrderPage from './routes/OrderPage'
import CategoryPage from './routes/CategoryPage'
import CommentPage from './routes/CommentPage'
import AddressPage from './routes/AddressPage'

function RouterConfig({ history }) {
  return (
    <Router history={history}>
      <Switch>
        <Route path="/" exact component={IndexPage} />
        <Route path="/orderLine" exact component={OrderLinePage} />
        <Route path="/customer" exact component={CustomerPage} />
        <Route path="/order" exact component={OrderPage} />
        <Route path="/category" exact component={CategoryPage} />
        <Route path="/comment" exact component={CommentPage} />
        <Route path="/address" exact component={AddressPage} />
      </Switch>
    </Router>
  );
}

export default RouterConfig;
