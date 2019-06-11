import React from 'react';
import axios from '../utils/axios'
import {Table,Button,message} from 'antd'

class CoursePage extends React.Component {
    constructor(){
        super();
        this.state = {
            list:[]
        }
    }

    componentDidMount(){
        this.handleLoad();
    }
    // 加载课程信息
    handleLoad(){
        axios.get("/course/findAll")
        .then((result)=>{
            this.setState({
                list:result.data
            })
        })
    }


    render(){
        let columns = [{
            title:"编号",
            dataIndex:"id"
        },{
            title:"课程名称",
            dataIndex:"name"
        },{
            title:"简介",
            dataIndex:"description"
        },{
            title:"学分",
            dataIndex:"credit"
        }]
        return (
            <div>
                <h2>课程管理</h2>
                <Table 
                    rowKey='id' 
                    dataSource={this.state.list}
                    columns={columns}></Table>
            </div>
        )
    }
}
export default CoursePage;