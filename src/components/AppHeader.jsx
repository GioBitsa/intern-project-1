import React, { useState } from 'react';
import { Modal, Button } from 'antd';
import AppForm from './AppForm';

const AppHeader = () => {

  const [isModalVisible, setIsModalVisible] = useState(false);
  const [formType, setFormType] = useState('');

  const showModal = (item) => {
    setIsModalVisible(true);
    setFormType(item);
  };

  const handleOk = () => {
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  return (
    <div className="btn-container">
      <Button type="primary" onClick={() => showModal('add')}>
        Create
      </Button>
      <Button type="default" onClick={() => showModal('edit')}>
        Edit
      </Button>
      <Button type="danger" onClick={() => showModal('delete')}>
        Delete
      </Button>
      <Modal footer={null} title="Form" visible={isModalVisible} onOk={handleOk} onCancel={handleCancel}>
        <AppForm type={formType} />
      </Modal>
    </div>
  );
}

export default AppHeader
