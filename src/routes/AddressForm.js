import React from 'react';
import { Form, Modal, Input } from 'antd'

class AddressForm extends React.Component {

    render() {
        let formLayout = {
            labelCol: {
                xs: { span: 24 },
                sm: { span: 6 },
            },
            wrapperCol: {
                xs: { span: 24 },
                sm: { span: 16 },
            },
        }
        // 父组件传递给子组件值
        const { visible, onCancel, onCreate, form } = this.props;
        const { getFieldDecorator } = form;
        // 将表单中没有出现的值做一个双向数据绑定
        getFieldDecorator("id");
        getFieldDecorator("address_id");
        return (
            <Modal
                visible={visible}
                title="添加地址信息"
                okText="提交"
                onCancel={onCancel}
                onOk={onCreate}
            >
                <Form layout="vertical" {...formLayout}>
                    <Form.Item label="省" >
                        {getFieldDecorator('province', {
                            rules: [{ required: true, message: '請輸入所在省!' }],
                        })(<Input />)}
                    </Form.Item>
                    <Form.Item label="县/市" >
                        {getFieldDecorator('city', {
                            rules: [{ required: true, message: '请输入所在县/市!' }],
                        })(<Input />)}
                    </Form.Item>
                    <Form.Item label="地区">
                        {getFieldDecorator('area', {
                            rules: [{ required: true, message: '请输入所在乡/镇/区!' }],
                        })(<Input />)}
                    </Form.Item>
                    <Form.Item label="地址">
                        {getFieldDecorator('address', {
                            rules: [{ required: true, message: '请输入所在详细地址!' }],
                        })(<Input />)}
                    </Form.Item>
                    <Form.Item label="联系电话">
                        {getFieldDecorator('telephone', {
                            rules: [{ required: true, message: '请输入联系电话！' }],
                        })(<Input />)}
                    </Form.Item>
                </Form>
            </Modal>
        );
    }
}
// 将通过props从父组件中获取的值拿出来设置到表单元素上
const mapPropsToFields = (props) => {
    let obj = {};
    for (let key in props.initData) {
        let val = props.initData[key];
        obj[key] = Form.createFormField({ value: val })
    }
    return obj;
}

export default Form.create({
    mapPropsToFields
})(AddressForm);