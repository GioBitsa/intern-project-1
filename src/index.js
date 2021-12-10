import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

import axios from 'axios';

axios.defaults.baseURL = "https://localhost:44322/swagger/index.html";
axios.defaults.headers.common['ApiKey'] = "crTK#PLnfFri7c35^?YfmM64U=^9KL";
axios.defaults.headers.post['Access-Control-Allow-Origin'] = '*';
axios.defaults.headers.post['content-type'] = 'application/json';

ReactDOM.render(
    <App />,
  document.getElementById('root')
);
