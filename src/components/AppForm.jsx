import React, {useState} from 'react';
import { Form, Input, Button, Select, Spin } from 'antd';
import axios from 'axios';
import { UserOutlined, HomeOutlined, IdcardOutlined, CalendarOutlined, PhoneOutlined, LoadingOutlined  } from '@ant-design/icons';
const { Option } = Select;



const AppForm = ({type, handleSubmit, handleOk}) => {

    const [form] = Form.useForm();
    const [submited, setSubmited] = useState(false);
    const antIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />;

    const onFinish = (values) => {
        setSubmited(true);
        handleSubmit(true);
        setTimeout(function() {
            form.resetFields();
            handleOk(true);
            setSubmited(false);
        }, 1000);
        
        type === "add" ?
        createList(values) :
        type === "edit" ?
        editList(values) :
        deleteList(values)
        
    };

    const createList = (list) => {
        handleSubmit(false)
        list = {
            "id": 0,
            "fullName": list.name,
            "dob": "2021-12-10T08:15:14.456Z",
            "genderID": list.gender,
            "phone": list.phone,
            "address": list.address
        }
        axios.post(`https://localhost:44322/Patient/Post`, list)
            .then(res => {
                handleSubmit(true)
            })
            .catch(error => {
                console.log(error);
            })
    }

    const editList = (list) => {
        handleSubmit(false);
        const data = parseInt(list.id);
        list = {
            "id": data,
            "fullName": list.name,
             "dob": list.date,
             "genderID": list.gender,
             "phone": list.phone,
             "address": list.address
        }
        axios.post(`https://localhost:44322/Patient/post?PatientID=${data}`, list)
            .then(handleSubmit(true))
            .catch(error => console.log(error))
    }

    const deleteList = (list) => {
        handleSubmit(false);
        const data = parseInt(list.id);
        axios.delete(`https://localhost:44322/Patient/Delete?PatientID=${data}`)
            .then(handleSubmit(true))
            .catch(error => console.log(error))
    }


    return (
        <Form
            form={form}
            name="normal_login"
            className="login-form"
            initialValues={{
                remember: true,
            }}
            onFinish={onFinish}
        >
            {type !== "delete" ?
            <>
            <Form.Item
                name="id"
                rules={[
                  {
                    required: true,
                    message: 'Please input your ID!',
                  },
                ]}
            >
                <Input prefix={<IdcardOutlined className="site-form-item-icon" />} placeholder="ID" />
            </Form.Item>
            <Form.Item
                name="name"
                rules={[
                  {
                    required: true,
                    message: 'Please input your Fullname!',
                  },
                ]}
            >
                <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Fullname" />
            </Form.Item>
            <Form.Item
                name="date"
                rules={[
                  {
                    required: true,
                    message: 'Please input your Date!',
                  },
                ]}
            >
                <Input
                    prefix={<CalendarOutlined className="site-form-item-icon" />}
                    type="date"
                    placeholder="Date"
                />
            </Form.Item>
            <Form.Item
                name="gender"
                rules={[
                  {
                    required: false,
                    message: 'Please input your Date!',
                  },
                ]}
            >
                <Select  prefix={<CalendarOutlined className="site-form-item-icon" />} placeholder="Gender">
                    <Option value={1}>Male</Option>
                    <Option value={2}>Female</Option>
                </Select>
            </Form.Item>
            <Form.Item
                name="phone"
                rules={[
                  {
                    required: false,
                    message: 'Please input your Phone!',
                  },
                ]}
            >
                <Input
                    prefix={<PhoneOutlined className="site-form-item-icon" />}
                    type="number"
                    placeholder="Phone"
                />
            </Form.Item>
            <Form.Item
                name="address"
                rules={[
                  {
                    required: false,
                    message: 'Please input your Address!',
                  },
                ]}
            >
                <Input
                    prefix={<HomeOutlined className="site-form-item-icon" />}
                    placeholder="Address"
                />
            </Form.Item>
            <Form.Item>
                <Button type="primary" htmlType="submit" className="login-form-button">
                    {type === "add" ? "Save" : "Update"}
                    {submited && 
                        <>
                            <Spin style={{marginLeft: '10px'}} indicator={antIcon} />
                        </>
                    }
                </Button>
            </Form.Item>
            </>
            :
            <>
            <Form.Item
                name="id"
                rules={[
                  {
                    required: true,
                    message: 'Please input your ID!',
                  },
                ]}
            >
                <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="ID" />
            </Form.Item>
            <Form.Item>
                <Button type="danger" htmlType="submit" onClick={onFinish} className="login-form-button">
                    Delete
                    {submited && 
                        <>
                            <Spin style={{marginLeft: '10px'}} indicator={antIcon} />
                        </>
                    }
                </Button>
            </Form.Item>
            </>
            }
        </Form>
    )
}

export default AppForm
