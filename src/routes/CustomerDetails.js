import React from 'react'
import {Button,Tabs} from 'antd'

class CustomerDetails extends React.Component {
    constructor(props) {
        super(props);
        this.state = { 
            id:''
         };
    }
   componentDidMount(){
       console.log(this.props)
       this.setState({
           id:this.props.id
       })
   }
  render(){
    const { TabPane } = Tabs;

    function callback(key) {
      console.log(key);
    }

    return (
        
       


  
      <div>
        <Tabs defaultActiveKey="1" onChange={callback}>
          <TabPane tab="基本信息" key="1">
            <p>姓名：哈哈哈哈哈</p>
            <p>手机号：13256598746</p>
            <p>状态：正常</p>
          </TabPane>
          <TabPane tab="服务地址" key="2">
           <p>河南省</p>
           <p>郑州市</p>
          </TabPane>
          <TabPane tab="订单" key="3">
              <div>
              <p> 订单</p>
              <p> 订单时间：13526541</p>
              <p> 订单总价：100</p>
              </div>
          
          </TabPane>
        </Tabs>
        <Button type="link" onClick={()=>{this.props.history.goBack()}}>返回</Button>
      </div>
    )
  }
}

export default CustomerDetails;