import React, {useEffect} from 'react';
import {Table} from 'antd';
import axios from 'axios'

const AppTable = () => {

  useEffect(() => {
    axios.get("https://localhost:44322/Patient/ListGet")
      .then(res => {
        console.log(res);
      })
      .catch(error => {
        console.log(error);
      })
  }, [])

  const dataSource = [
    {
      key: '1',
      id: 1,
      name: 'Mike',
      age: 32,
      address: '10 Downing Street',
    },
    {
      key: '2',
      id: 2,
      name: 'tony',
      age: 24,
      address: '10 Downing Street',
    },
    {
      key: '3',
      id: 3,
      name: 'John',
      age: 42,
      address: '10 Downing Street',
    },
  ];
      
  const columns = [
    {
      title: 'ID',
      dataIndex: 'id',
      key: 'id',
    },
    {
      title: 'Fullname',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Date',
      dataIndex: 'dob',
      key: 'dob',
    },
    {
      title: 'genderID',
      dataIndex: 'genderID',
      key: 'genderID',
    },
    {
      title: 'Phone',
      dataIndex: 'phone',
      key: 'phone',
    },
    {
      title: 'Address',
      dataIndex: 'address',
      key: 'address',
    },
  ];

  return (
    <>
      <Table dataSource={dataSource} columns={columns} />;
    </>
  )
}

export default AppTable
