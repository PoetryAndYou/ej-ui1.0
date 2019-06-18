import React from 'react'
import {Button,Tabs,Table } from 'antd'
import axios from '../utils/axios';

class CustomerDetails extends React.Component {

  constructor(props){
    super(props);
    this.state = {
      customer:{},
      address:[],
      orders:[],
    }
  }

  componentDidMount(){
    let payload = this.props.location.payload;
    if(payload){
      this.setState({customer:payload})
      this.loadAddress();
      this.loadOrders();
    } else {
      this.props.history.push("/customer")
    }
  }
  //加载地址信息
  loadAddress(){
    axios.get("/address/query",{
      params:{customerId:this.props.location.payload.id}
    })
    .then((result)=>{
      this.setState({
        address:result.data
      })
    })
  }
   //加载订单信息
   loadOrders(){
    axios.get("/order/queryBasic",{
      params:{customerId:this.props.location.payload.id}
    })
    .then((result)=>{
      this.setState({
        orders:result.data
      })
    })
  }



  render(){
    const { TabPane } = Tabs;
    function callback(key) {
      console.log(key);
    }
    const ord = [
      {
        title: '顾客姓名',
        dataIndex: 'customerName',
      },
      {
        title: '服务人员',
        dataIndex: 'waiterName',
      },
      {
        title: '地址',
        dataIndex: 'address',
      }
    ,{
      title:'订单时间',
      dataIndex:'orderTime'
    },
      {
        title: '总价',
        dataIndex: 'total',
      }
      
    ]


    

    const columns = [
      {
        title: '省',
        dataIndex: 'province',
      },
      {
        title: '市',
        dataIndex: 'city',
       
      },
      {
        title: '区',
        dataIndex: 'area',
      
      },
      {
        title: '详细地址',
        dataIndex: 'address',
      
      },
      {
        title: '电话',
        dataIndex: 'telephone',
       
      }
    
    ]
    return (
      <div>
        <Tabs defaultActiveKey="1" onChange={callback}>
          <TabPane tab="基本信息" key="1">
            <p> 顾客姓名 {this.state.customer.realname}</p>
            <p> 电   话：{this.state.customer.telephone}</p>
            <p> 密   码：{this.state.customer.password}</p>
            <p> 状   态：{this.state.customer.status}</p>
            <img alt="图片找不到..." src={this.state.customer.photo}/>
          </TabPane>
          <TabPane tab="服务地址" key="2">
            <Table columns={columns} dataSource={this.state.address} />
          </TabPane>
          <TabPane tab="订单" key="3">
              <Table rowKey="id" columns={ord} dataSource={this.state.orders}></Table>
          </TabPane>
        </Tabs>
        <Button type="link" onClick={()=>{this.props.history.goBack()}}>返回</Button>
      </div>
    )
  }
}

export default CustomerDetails;