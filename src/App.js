import './App.css';
import 'antd/dist/antd.css';
import {useState} from 'react';
import AppHeader from './components/AppHeader';
import AppTable from './components/AppTable';


function App() {

  const [handleSubmit, setHandleSubmit] = useState(false)

  const handleSubmitApp = (item) => {
    setHandleSubmit(item)
  }

  const [selectedRowInfo, setselectedRowInfo] = useState()

  const selectedRow = (item) => {
    setselectedRowInfo(item)
  }

  return (
    <div className="app">
      <AppHeader selectedRowInfo={selectedRowInfo} handleSubmitApp={handleSubmitApp} />
      <AppTable selectedRow={selectedRow} submitProp={handleSubmit} />
    </div>
  );
}

export default App;
