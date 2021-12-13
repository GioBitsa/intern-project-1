import React, {useState} from 'react';
// import React, {useState, useEffect} from 'react';
import { Form, Input, Button, Spin } from 'antd';
import axios from 'axios';
import { UserOutlined, LoadingOutlined } from '@ant-design/icons';

const AppDelete = ({handleSubmit, handleOk, rowInfo}) => {

    const [form] = Form.useForm();
    const [submited, setSubmited] = useState(false);
    const antIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />;

    const onFinish = () => {
        setSubmited(true);
        handleSubmit(true);
        setTimeout(function() {
            form.resetFields();
            handleOk(true);
            setSubmited(false);
        }, 1000);

        deleteList(rowInfo.id)
        
    };

    const deleteList = (list) => {
        handleSubmit(false);
        const data = parseInt(list);
        axios.delete(`https://localhost:44322/Patient/Delete?PatientID=${data}`)
            .then(handleSubmit(true))
            .catch(error => console.log(error))
    }

    return (
        <>
        <Form
            form={form}
            name="normal_login"
            className="login-form"
            initialValues={{
                remember: true,
            }}
            onFinish={onFinish}
        >
            <Form.Item
                name="id"
            >
                <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder={rowInfo['id']} disabled />
            </Form.Item>
            <Form.Item>
                <Button type="danger" htmlType="submit" onClick={onFinish} className="login-form-button">
                    წაშლა
                    {submited && 
                        <>
                            <Spin style={{marginLeft: '10px'}} indicator={antIcon} />
                        </>
                    }
                </Button>
            </Form.Item>
        </Form>
        </>
    )
}

export default AppDelete
