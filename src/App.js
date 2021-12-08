import './App.css';
import 'antd/dist/antd.css';
import AppHeader from './components/AppHeader';
import AppTable from './components/AppTable';
import axios from 'axios';

axios.defaults.baseURL = "https://localhost:44322/swagger/index.html";
axios.defaults.headers.common['ApiKey'] = "crTK#PLnfFri7c35^?YfmM64U=^9KL";
axios.defaults.headers.post['Content-Type'] = 'application/json';

function App() {

  return (
    <div className="app">
      <AppHeader />
      <AppTable />
    </div>
  );
}

export default App;
