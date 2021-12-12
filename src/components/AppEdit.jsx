import React, {useState} from 'react';
import { Form, Input, Button, Select, Spin, DatePicker } from 'antd';
import axios from 'axios';
import { UserOutlined, HomeOutlined, IdcardOutlined, CalendarOutlined, PhoneOutlined, LoadingOutlined  } from '@ant-design/icons';
import moment from 'moment';

const dateFormatList = ['DD/MM/YYYY', 'DD/MM/YY'];
const { Option } = Select;


const AppEdit = ({type, handleSubmit, handleOk, rowInfo}) => {


    const [form] = Form.useForm();
    const [submited, setSubmited] = useState(false);
    const antIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />;

    const onFinish = (values) => {
        setSubmited(true); // for animation when submited
        handleSubmit(true);
        setTimeout(function() {
            form.resetFields();
            handleOk(true);
            setSubmited(false);
        }, 1000);
        
        editList(values)
        
    };

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
        // axios.post(`https://localhost:44322/Patient/post?PatientID=${data}`, list)
        //     .then(handleSubmit(true))
        //     .catch(error => console.log(error))
    }

    console.log(rowInfo);


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
            <Form.Item
                name="id"
                // rules={[
                //   {
                //     required: true,
                //     message: 'Please input your ID!',
                //   },
                // ]}
            >
                <Input prefix={<IdcardOutlined className="site-form-item-icon" />} placeholder={rowInfo['id']} disabled />
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
                <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder={rowInfo['fullName']} />
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
                <DatePicker 
                    style={{width: '100%'}}
                    format={dateFormatList} 
                    prefix={<CalendarOutlined className="site-form-item-icon" />}
                    placeholder={rowInfo['dob']}
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
                <Select  prefix={<CalendarOutlined className="site-form-item-icon" />} placeholder={rowInfo['genderName']}>
                    <Option value={1}>მამრობითი</Option>
                    <Option value={2}>მდედრობითი</Option>
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
                    placeholder={rowInfo['phone']}
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
                    placeholder={rowInfo['address']}
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
        </Form>
    )
}

export default AppEdit