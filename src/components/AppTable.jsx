import React, {useState, useEffect} from 'react';
import { Table } from 'antd';
import axios from 'axios';

const AppTable = ({submitProp, selectedRow}) => {

  const [dataSource, setDataSource] = useState();
  

  useEffect(() => {
    axios.get("https://localhost:44322/Patient/ListGet")
      .then(res => {
        const data = res.data.data;
        
        // date format dd/mm/yyyy
        for(var i = 0; i < data.length; i++){
          const date = data[i].dob;

          function pad2(n) {
            return (n < 10 ? '0' : '') + n;
          }
          
          var newDate = new Date(date);
          var month = pad2(newDate.getMonth()+1); //months (0-11)
          var day = pad2(newDate.getDate()); //day (1-31)
          var year = newDate.getFullYear();
          
          var formattedDate =  day + "-" + month + "-" + year;
          
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
      title: 'სრული სახელი',
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
      // console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
      selectedRow(selectedRows[0]);
    }
  };

  return (
    <>
      <div>

        <Table
          rowSelection={{
            type: "radio",
            ...rowSelection,
          }}
          columns={columns}
          dataSource={dataSource}
        />
    </div>
    </>
  )
}

export default AppTable
