import React, {useState} from 'react';
import { Form, Input, Button, Select, Spin } from 'antd';
import axios from 'axios';
import { UserOutlined, HomeOutlined, IdcardOutlined, CalendarOutlined, PhoneOutlined, LoadingOutlined  } from '@ant-design/icons';
const { Option } = Select;



const AppForm = ({type, handleSubmit}) => {

    const [form] = Form.useForm();
    const [submited, setSubmited] = useState(false);
    const antIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />;

    const onFinish = (values) => {
        console.log('Received values of form: ', values);
        setSubmited(true);
        handleSubmit(true)
        setTimeout(function() {
            form.resetFields();
            setSubmited(false)
        }, 2000);
        // {
        //     type === "add" ?
        //     createList(values) :
        //     type === "edit" ?
        //     editList(values) :
        //     deleteList(values)
        // }
    };

    function handleChange(value) {
        console.log(`selected ${value}`);
    }

    const createList = (list) => {
       const data = list={
           "id": list.id,
           "fullName": list.name,
            "dob": list.date,
            "genderID": list.gender,
            "phone": list.phone,
            "address": list.address
       }
       axios.post("https://localhost:44322/Patient/Post", data)
        .then(res => {
            console.log(res);
        })
        .catch(error => console.log(error.request))
    }

    const editList = (list) => {
        console.log(list);
    }

    const deleteList = (list) => {
        const data = parseInt(list.id);
        axios.delete('https://localhost:44322/Patient/Delete', data)
            .then(res => console.log(res))
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
                <Select  prefix={<CalendarOutlined className="site-form-item-icon" />} placeholder="Gender" onChange={handleChange}>
                    <Option value="male">Male</Option>
                    <Option value="female">Female</Option>
                    <Option value="other">Other...</Option>
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
