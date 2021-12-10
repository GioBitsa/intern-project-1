import React, {useState, useEffect} from 'react';
import {Table} from 'antd';
import axios from 'axios'


const AppTable = ({submitProp}) => {

  const [dataSource, setDataSource] = useState()
  

  useEffect(() => {
    axios.get("https://localhost:44322/Patient/ListGet")
      .then(res => {
        setDataSource(res.data.data);
        console.log("Table updated");
      })
      .catch(error => {
        console.log(error);
      })
  }, [submitProp])


  const columns = [
    {
      title: 'ID',
      dataIndex: 'id',
      key: 'id',
    },
    {
      title: 'Fullname',
      dataIndex: 'fullName',
      key: 'fullName',
    },
    {
      title: 'Date',
      dataIndex: 'dob',
      key: 'dob',
    },
    {
      title: 'Gender',
      dataIndex: 'genderName',
      key: 'genderName',
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
      <Table dataSource={dataSource} columns={columns} />
    </>
  )
}

export default AppTable
