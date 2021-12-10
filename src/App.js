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

  return (
    <div className="app">
      <AppHeader handleSubmitApp={handleSubmitApp} />
      <AppTable submitProp={handleSubmit} />
    </div>
  );
}

export default App;
