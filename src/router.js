import React from 'react';
import { Router, Route, Switch } from 'dva/router';
import IndexPage from './routes/IndexPage';
import OrderLinePage from './routes/OrderLinePage'
import CustomerPage from './routes/CustomerPage'
import OrderPage from './routes/OrderPage'
import CategoryPage from './routes/CategoryPage'
import CommentPage from './routes/CommentPage'
import ProducePage from './routes/ProducePage'
import WaiterPage from './routes/WaiterPage'

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
        <Route path="/orderLine" exact component={OrderLinePage} />
        <Route path="/produce" exact component={ProducePage} />
        <Route path="/waiter" exact component={WaiterPage} />
      </Switch>
    </Router>
  );
}

export default RouterConfig;
