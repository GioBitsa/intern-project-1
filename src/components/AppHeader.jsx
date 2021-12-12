import React, { useState } from 'react';
import { Modal, Button } from 'antd';
import AppForm from './AppForm';
import AppEdit from './AppEdit';
import AppDelete from './AppDelete';
import AppAdd from './AppAdd';

const AppHeader = ({handleSubmitApp, selectedRowInfo}) => {

  const [isModalVisible, setIsModalVisible] = useState(false);
  const [formType, setFormType] = useState('');
  const [rowInfo, setRowInfo] = useState()

  const showModal = (item) => {

    if(item === 'edit' || item === 'delete'){
      if(selectedRowInfo === undefined){
        alert("Please tag user")
      }else{
        setIsModalVisible(true);
        setFormType(item);
        setRowInfo(selectedRowInfo) // get info to specific form
      }
    }else if(item === "add"){
      setIsModalVisible(true);
      setFormType(item);
    }

  };

  const handleOk = () => {
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const handleSubmit = (item) => {
    handleSubmitApp(item)
  }

  return (
    <div className="btn-container">
      <Button type="primary" onClick={() => showModal('add')}>
        დამატება
      </Button>
      <Button type="default" onClick={() => showModal('edit')}>
        შეცვლა
      </Button>
      <Button type="danger" onClick={() => showModal('delete')}>
        წაშლა
      </Button>
      <Modal footer={null} title={formType === "add" ? "დაამატე" : formType === "edit" ? "დაარედაქტირე" : formType === "delete" ? "დარწმუნებული ხარ?" : "Form"} visible={isModalVisible} onOk={handleOk} onCancel={handleCancel}>
        {
          formType === "add" ? 
          <AppAdd handleOk={handleOk} handleSubmit={handleSubmit} visible={isModalVisible} /> :
          formType === "edit" ? 
          <AppEdit handleOk={handleOk} handleSubmit={handleSubmit} type={formType} rowInfo={rowInfo} /> :
          formType === "delete" ?
          <AppDelete handleOk={handleOk} handleSubmit={handleSubmit} rowInfo={rowInfo} /> :
          "nothing"
        }
      </Modal>
    </div>
  );
}

export default AppHeader
