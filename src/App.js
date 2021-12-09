import './App.css';
import 'antd/dist/antd.css';
import {useState} from 'react';
import AppHeader from './components/AppHeader';
import AppTable from './components/AppTable';
import axios from 'axios';

axios.defaults.baseURL = "https://localhost:44322/swagger/index.html";
axios.defaults.headers.common['ApiKey'] = "crTK#PLnfFri7c35^?YfmM64U=^9KL";
axios.defaults.headers.post['content-type'] = 'application/json';

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
