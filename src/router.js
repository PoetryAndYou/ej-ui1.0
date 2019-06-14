import React from 'react';
import { Router, Route, Switch,Link } from 'dva/router';
import IndexPage from './routes/IndexPage';
import OrderLinePage from './routes/OrderLinePage'
import CustomerPage from './routes/CustomerPage'
import OrderPage from './routes/OrderPage'
import CategoryPage from './routes/CategoryPage'
import CommentPage from './routes/CommentPage'
import WaiterPage from './routes/WaiterPage'
import AddressPage from './routes/AddressPage'
import ProductPage from './routes/ProductPage'
import { Layout, Menu, Breadcrumb, Icon } from 'antd';

function RouterConfig({ history } ) {
  //const { SubMenu } = Menu;
const { Header, Content, Sider } = Layout;

  return (<Router  history={history}>
    <Layout>
    <Header className="header">
      <div className="logo" />
      <a style={{ color:'#FFFFFF'}}>e洁家政</a>
      <Menu
        theme="dark"
        mode="horizontal"
        defaultSelectedKeys={['2']}
        style={{ lineHeight: '64px' }}
      >
        {/* <Menu.Item key="1">nav 1</Menu.Item>
        <Menu.Item key="2">nav 2</Menu.Item>
        <Menu.Item key="3">nav 3</Menu.Item> */}
        
      </Menu>
    </Header>
    <Layout>
      <Sider width={200} style={{ background: '#fff' }}>
        <Menu
          mode="inline"
          defaultSelectedKeys={['1']}
          defaultOpenKeys={['sub1']}
          style={{ height: '100%', borderRight: 0 }}
        >
       <Menu.Item key="1">
              <Icon type="pie-chart" />
              <span><Link to="/customer">顾客管理</Link></span>
            </Menu.Item>
        <Menu.Item key="2">
          <Icon type="user" />
          <span className="nav-text"><Link to="/order">订单管理</Link></span>
        </Menu.Item>
        <Menu.Item key="3">
          <Icon type="user" />
          <span className="nav-text"><Link to="/category">服务分类管理</Link></span>
        </Menu.Item>
        <Menu.Item key="4">
          <Icon type="user" />
          <span className="nav-text"><Link to="/comment">评论管理</Link></span>
        </Menu.Item>
        <Menu.Item key="5">
          <Icon type="user" />
          <span className="nav-text"><Link to="/waiter">服务员管理</Link></span>
        </Menu.Item>
        <Menu.Item key="6">
          <Icon type="user" />
          <span className="nav-text"><Link to="/address">地址管理</Link></span>
        </Menu.Item>
        <Menu.Item key="7">
          <Icon type="user" />
          <span className="nav-text"><Link to="/product">服务管理</Link></span>
        </Menu.Item>
        </Menu>
      </Sider>
      <Layout style={{ padding: '0 24px 24px' }}>
        <Breadcrumb style={{ margin: '16px 0' }}>
          <Breadcrumb.Item>Home</Breadcrumb.Item>
          <Breadcrumb.Item>List</Breadcrumb.Item>
          <Breadcrumb.Item>App</Breadcrumb.Item>
        </Breadcrumb>
        <Content
          style={{
            background: '#fff',
            padding: 24,
            margin: 0,
            minHeight: 500,
          }}
        >
                <Switch> 
        <Route path="/" exact component={IndexPage} />
        <Route path="/orderLine" exact component={OrderLinePage} />
        <Route path="/customer" exact component={CustomerPage} />
        <Route path="/order" exact component={OrderPage} />
        <Route path="/category" exact component={CategoryPage} />
        <Route path="/comment" exact component={CommentPage} />
        <Route path="/waiter" exact component={WaiterPage} />
        <Route path="/address" exact component={AddressPage} />
        <Route path="/product" exact component={ProductPage} />
</Switch>
        
        </Content>
      </Layout>
    </Layout>
  </Layout>
  </Router>
  );
}

export default RouterConfig;
