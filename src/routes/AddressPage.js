import React from 'react';
//引入css进行页面美化
import styles from './AddressPage.css'
import { Modal, Button, Table, message, Input } from 'antd'
import axios from '../utils/axios'
import AddressForm from './AddressForm'
import { exportExcel } from 'xlsx-oc'

//组件类继承React.Component
class AddressPage extends React.Component {
    constructor() {
        super();
        this.state = {
            ids: [],  //批量删除时保存的id
            list: [],
            loading: false,
            visible: false,
            address: {}
        }
    }
    // 在生命周期钩子函数中调用重载数据
    componentDidMount() {
        this.reloadData();
    }
    //重载数据
    reloadData() {
        this.setState({ loading: true });
        axios.get("/address/findAll")
            .then((result) => {
                // 将查询数据更新到state中
                this.setState({ list: result.data })
            })
            .finally(() => {
                this.setState({ loading: false });
            })
    }
    //批量删除
    handleBatchDelete() {
        Modal.confirm({
            title: '确定删除这些记录吗？',
            content: '删除后数据将无法恢复',
            onOk: () => {
                axios.post("/address/batchDelete", { ids: this.state.ids })
                    .then((result) => {
                        //批量删除后重载数据
                        message.success(result.statusText)
                        this.reloadData();
                    })
            }
        });
    }

    //单个删除
    handleDelete(id) {
        Modal.confirm({
            title: '确定删除这条记录吗？',
            content: '删除后数据将无法恢复',
            onOk: () => {
                axios.get("/address/deleteById", {
                    params: {
                        id: id
                    }
                })
                    .then((result) => {
                        message.success(result.statusText);
                        this.reloadData();
                    })
            }
        });
    }
    //取消按钮的事件处理函数
    handleCancel = () => {
        this.setState({ visible: false });
    };
    //确认按钮的事件处理函数
    handleCreate = () => {
        const form = this.formRef.props.form;
        form.validateFields((err, values) => {
            if (err) {
                return;
            }
            axios.post("/address/saveOrupdate", values)
                .then((result) => {
                    message.success(result.statusText)
                    //重置表单
                    form.resetFields();
                    //关闭模态框
                    this.setState({ visible: false });
                    this.reloadData();
                })
        });
    };
    //将子组件的引用在父组件中进行保存，方便后期调用
    saveFormRef = formRef => {
        this.formRef = formRef;
    };
    //去添加
    toAdd() {
        //将默认值制空，模态框打开
        this.setState({ address: {}, visible: true })
    }
    //去更新
    toEdit(record) {
        // 更前先先把要更新的数据设置到state中
        this.setState({ address: record })
        // 将record值绑定表单中
        this.setState({ visible: true })
    }
    toDetails(record) {
        console.log(record);
        this.props.history.push("AddressDetails");
    }
    query = (value) => {
        this.setState({ loading: true });
        axios.get("http://localhost:8888/address/query", {
            params: {
                telephone: value,
            }
        })
            .then((result) => {
                this.setState({ list: result.data })
            })
            .finally(() => {
                this.setState({ loading: false });
            })
    }

    //组件类务必要重写的方法，表示页面渲染
    render() {
        //变量定义
        let columns = [{
            title: '省',
            dataIndex: 'province'
        }, {
            title: '县/市',
            dataIndex: 'city'
        }, {
            title: '区',
            dataIndex: 'area'
        }, {
            title: '地址',
            align: 'center',
            dataIndex: 'address'
        }, {
            title: '联系电话',
            align: 'center',
            dataIndex: 'telephone'
        }, {
            title: '操作',
            width: 120,
            align: "center",
            render: (text, record) => {
                return (
                    <div>
                        <Button type='link' size="small" onClick={this.handleDelete.bind(this, record.id)}>删除</Button>
                        <Button type='link' size="small" onClick={this.toEdit.bind(this, record)}>修改</Button>
                    </div>
                )
            }
        }]
        const rowSelection = {
            onChange: (selectedRowKeys, selectedRows) => {
                //当用户操作复选按钮时，将值获取并且保存到state中
                this.setState({
                    ids: selectedRowKeys
                })
            },
            getCheckboxProps: record => ({
                disabled: record.name === 'Disabled User',
                name: record.name,
            }),
        };
        const _headers = [
            { k: 'province', v: '省' }, 
            { k: 'area', v: '区' },
            { k: 'address', v: '地址' }, 
            { k: 'telephone', v: '联系电话' }
          ];
              
          const exportDefaultExcel = () => {
            exportExcel(_headers, this.state.list);
          }

        //搜索框
        const Search = Input.Search;
        //返回结果 jsx(js+xml)
        return (
            <div className={styles.address}>
                <div className={styles.title}>地址管理
                <div className={styles.search} >
                        <Search placeholder="input search text" onSearch={value => { this.query(value) }} enterButton />
                    </div>
                </div>
                <div className={styles.btns}>
                    <Button onClick={this.toAdd.bind(this)}>添加</Button> &nbsp;
                    <Button onClick={this.handleBatchDelete.bind(this)}>批量删除</Button> &nbsp;
                    <Button onClick={() => exportDefaultExcel()}>导出</Button>
                </div>
                <Table
                    bordered
                    rowKey="id"
                    size="small"
                    loading={this.state.loading}
                    rowSelection={rowSelection}
                    columns={columns}
                    dataSource={this.state.list} />
                <AddressForm
                    initData={this.state.address}
                    wrappedComponentRef={this.saveFormRef}
                    visible={this.state.visible}
                    onCancel={this.handleCancel}
                    onCreate={this.handleCreate} />
            </div>
        )
    }
}

export default AddressPage;