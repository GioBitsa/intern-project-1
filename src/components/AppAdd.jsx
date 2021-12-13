import React, {useState, useEffect} from 'react';
import { Form, Input, Button, Select, Spin, DatePicker } from 'antd';
import axios from 'axios';
import moment from 'moment';
import { UserOutlined, HomeOutlined, CalendarOutlined, PhoneOutlined, LoadingOutlined  } from '@ant-design/icons';
const { Option } = Select;

const dateFormatList = ['DD/MM/YYYY', 'DD/MM/YY'];

const AppAdd = ({visible, handleSubmit, handleOk}) => {

    const [form] = Form.useForm();
    const [submited, setSubmited] = useState(false);
    const antIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />;

    const onFinish = (values) => {
        setSubmited(true); // for adding animation when submited
        handleSubmit(true); // for re-rendering table when I add a new info
        setTimeout(function() {
            form.resetFields(); // for resetting form inputs
            handleOk(true); // for closing modal when submited
            setSubmited(false); // for cancelling animation when submited
        }, 1000);
    
        createList(values) // for adding a new list row
        
    };


    // creating new list item

    const createList = (list) => {
        handleSubmit(false)
        // list['date'].format('MM/DD/YYYY HH:mm:ss') // formating date DD/MM/YYYY
        list = {
            "fullName": list.name,
            "dob": list['date'],
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



    // getting gender list from server

    // const [genderInfo, setGenderInfo] = useState();

    // useEffect(() => {
    //     axios.get("https://localhost:44322/Gender/ListGet")
    //     .then(res => {
    //         setGenderInfo(res.data.data)
    //     }).then(console.log(genderInfo))
    //     .catch(error => {
    //         console.log(error);
    //       })
    // }, [visible])



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
                name="name"
                rules={[
                  {
                    required: true,
                    message: 'Please input your Fullname!',
                  },
                ]}
            >
                <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder={"სრული სახელი"} />
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
                    placeholder={"დაბადების თარიღი"}
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
                <Select  prefix={<CalendarOutlined className="site-form-item-icon" />} placeholder="სქესი">
                    <Option value={1}>male</Option>
                    <Option value={2}>female</Option>
                    {/* {genderInfo.map((item) => {
                        <Option value={genderInfo['genderID']}>{genderInfo['genderName']}</Option>
                    })} */}
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
                    placeholder="ტელეფონის ნომერი"
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
                    placeholder="მისამართი"
                />
            </Form.Item>
            <Form.Item>
                <Button type="primary" htmlType="submit" className="login-form-button">
                    დამატება
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

export default AppAdd
