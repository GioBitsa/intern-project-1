import React, {useState, useEffect} from 'react';
import { Table } from 'antd';
import axios from 'axios';
import moment from 'moment';

const dateFormatList = ['DD-MM-YYYY', 'DD-MM-YY'];

const AppTable = ({submitProp, selectedRow}) => {

  const [dataSource, setDataSource] = useState();

  useEffect(() => {
    axios.get("https://localhost:44322/Patient/ListGet")
      .then(res => {
        const data = res.data.data;
        
        // date format dd/mm/yyyy
        for(var i = 0; i < data.length; i++){
          const date = data[i].dob;

          let formattedDate = moment(date).format(dateFormatList[0])
          
          data[i].dob = formattedDate
        }
        setDataSource(data)
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
      title: 'პაციენტის გვარი, სახელი',
      dataIndex: 'fullName',
      key: 'fullName',
    },
    {
      title: 'დაბადების თარიღი',
      dataIndex: 'dob',
      key: 'dob',
    },
    {
      title: 'სქესი',
      dataIndex: 'genderName',
      key: 'genderName',
    },
    {
      title: 'ტელეფონის ნომერი',
      dataIndex: 'phone',
      key: 'phone',
    },
    {
      title: 'მისამართი',
      dataIndex: 'address',
      key: 'address',
    },
  ];

  const rowSelection = {
    onChange: (selectedRowKeys, selectedRows) => {
      selectedRow(selectedRows[0]);
    },
  };


  return (
    <>
    <Table
      onRow={(record) => {
        return {
          onClick: event => {
            selectedRow(record)
          }, // click row
        };
      }}
      rowSelection={{
        type: "radio",
        ...rowSelection,
      }}
      columns={columns}
      dataSource={dataSource}
    />
    </>
  )
}

export default AppTable
