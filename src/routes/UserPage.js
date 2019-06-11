import React from 'react';
import axios from '../utils/axios'
import {Table,Button,Icon,message} from 'antd'

// 组件类，任何一个页面或者是子页面都可以理解为是一个组件
class UserPage extends React.Component {

    //构造函数
    constructor(){
        super();
        this.state = {
            msg:"hello user",
            list:[]
        }
    }

    //生命周期函数，组件绑定时执行
    componentDidMount(){
        this.handleLoad();
    }
    handleLoad(){
        // 查询数据，进行数据绑定
        axios.get("/user/findAll")
        .then((result)=>{
            console.log(JSON.stringify(result));
            //console.log('查询到的数据为：',result.data);
            //将查询到的数据设置到state中
            this.setState({
                list:result.data
            })
        })
    }

    // 点击删除按钮的处理函数
    handleDelete(id){
        axios.get("/user/deleteById?id="+id)
        .then((result)=>{
            // 提示
            message.success(result.statusText);
            // 页面刷新 数据刷新
            this.handleLoad();
        })
        
    }

    // 渲染函数
    render(){
        //控制表格的列
        let columns = [{
            title:"编号",
            dataIndex:"id"
        },{
            title:"姓名",
            dataIndex:"realname"
        },{
            title:"性别",
            dataIndex:"gender"
        },{
            title:"类型",
            dataIndex:"type"
        },{
            title:"状态",
            dataIndex:"status"
        },{
            title:"操作",
            render:(text,record)=>{
                return (
                    <div>
                        <Icon type="delete" onClick={this.handleDelete.bind(this,record.id)}></Icon>
                        &nbsp;&nbsp;
                        <Icon type="edit"></Icon>
                    </div>
                )
            }
        }]

        return (
            <div>
                <h2>用户管理</h2>
                <div>
                    <Button type="primary">添加</Button> &nbsp;
                    <Button type="danger">批量删除</Button>
                </div>

                <Table size="small" rowKey="id" dataSource={this.state.list} columns={columns}/>
                
            </div>
        )
    }
}
//暴露接口
export default UserPage;