import React, {useState, useEffect} from 'react';
import { Form, Input, Button, Select, Spin, DatePicker } from 'antd';
import axios from 'axios';
import { UserOutlined, HomeOutlined, IdcardOutlined, CalendarOutlined, PhoneOutlined, LoadingOutlined  } from '@ant-design/icons';
import moment from 'moment';

const dateFormatList = ['DD-MM-YYYY', 'DD-MM-YY'];

const { Option } = Select;

const AppEdit = ({handleSubmit, handleOk, rowInfo}) => {

    const [form] = Form.useForm();
    const [submited, setSubmited] = useState(false);
    const [newRules, setNewRules] = useState(
        [
            {
              required: false,
              message: 'Please input your Phone!',
            },
        ]
    )
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

        const date = moment(list['date']);
        const day = date.date();
        const dateList = date.format(dateFormatList[0]).split('-')
        dateList[0] = day
        
        const finalDate = dateList[2] + '-' + dateList[1] + '-' + dateList[0] + 'T17:17:05.686Z'

        list = {
            "id": data,
            "fullName": list.name,
            "dob": finalDate,
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
        date: moment(rowInfo['dob'], dateFormatList[0])
    }

    const updateForm = () => {
        form.resetFields()
    }

    useEffect(() => {
        updateForm()
    }, [handleSubmit]);

    

    // number validation

    const handleNum = (value) => {
        if(value.length > 0){
            if(value[0] == 5){
                setNewRules([
                    {
                        required: true,
                        message: "გთხოვთ შეიყვანოთ სწორი ტელეფონის ნომერი!",
                    },
                    {
                        pattern: /^\d{9}$/,
                        message: "ტელეფონის ნომერი უნდა შედგებოდეს 9 ციფრისგან!",
                    }
                ])
            }else{
                setNewRules([
                    {
                        required: true,
                        message: "გთხოვთ შეიყვანოთ სწორი ტელეფონის ნომერი!",
                    },
                    {
                        max: 0,
                        message: "ტელეფონის ნომერი უნდა იწყებოდეს ციფრი 5-ით!",
                    },
                ])
            }
            
        }else{
            setNewRules([
                {
                    required: false,
                    message: "გთხოვთ შეიყვანოთ სწორი ტელეფონის ნომერი!",
                },
            ])
        }
        console.log(value.length);
    }

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
                    message: 'გთხოვთ შეიყვანოთ პაციენტის გვარი და სახელი!',
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
                    message: 'გთხოვთ შეიყვანოთ დაბადების თარიღი!',
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
                    message: 'გთხოვთ შეიყვანოთ სქესი!',
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
                rules={newRules}
                onChange={(e) => handleNum(e.target.value)}
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
