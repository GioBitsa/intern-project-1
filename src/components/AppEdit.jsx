import React, {useState, useEffect} from 'react';
import { Form, Input, Button, Select, Spin, DatePicker } from 'antd';
import axios from 'axios';
import { UserOutlined, HomeOutlined, IdcardOutlined, CalendarOutlined, PhoneOutlined, LoadingOutlined  } from '@ant-design/icons';
import moment from 'moment';

const dateFormatList = ['DD/MM/YYYY', 'DD/MM/YY'];
const { Option } = Select;

const AppEdit = ({handleSubmit, handleOk, rowInfo}) => {

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
        const genderID = list.gender === "მამრობითი" ? 1 : 2;
        
        let date = list.date
        let dateList = date.split('-')
        let newDate = '';
        if (dateList[0].length > 2){
            newDate = date + 'T12:00:00'
        }else{
            newDate = dateList[2] + '-' + dateList[1] + '-' + dateList[0] + 'T12:00:00'
        }
        
        list = {
            "id": data,
            "fullName": list.name,
            "dob": newDate,
            "genderID": genderID,
            "phone": list.phone,
            "address": list.address
        }
        axios.post(`https://localhost:44322/Patient/post?PatientID=${data}`, list)
            .then(handleSubmit(true))
            .catch(error => console.log(error))
    }

    
    let inputData = {
        ...rowInfo,
        name: rowInfo['fullName'],
        gender: rowInfo['genderName'],
        date: rowInfo['dob']
    }

    const updateForm = () => {
        form.resetFields()
    }

    useEffect(() => {
        updateForm()
    }, [handleSubmit]);

    return (
        <Form
            name="form-name"
            form={form}
            className="login-form"
            initialValues={inputData}
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
                <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="სრული სახელი" />
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
                    type="date"
                    style={{width: '100%'}}
                    prefix={<CalendarOutlined className="site-form-item-icon" />}
                    placeholder="დაბადების თარიღი"
                />
                {/* <DatePicker
                    style={{width: '100%'}}
                    format={dateFormatList} 
                    prefix={<CalendarOutlined className="site-form-item-icon" />}
                    placeholder={rowInfo['dob']}
                /> */}
            </Form.Item>
            <Form.Item
                name="gender"
                rules={[
                  {
                    required: false,
                    message: 'Please input your Gender!',
                  },
                ]}
            >
                <Select prefix={<CalendarOutlined className="site-form-item-icon" />} placeholder="სქესი">
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
                    Save
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
