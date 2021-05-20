import React, { useEffect, useState } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import axios from 'axios';
import './App.css';
import AppNavbar from './components/AppNavbar/AppNavbar';
import Landing from './components/Landing/Landing';
import Duration from './components/Duration/Duration';
import Prediction from './components/Prediction/Prediction';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  const [temp, setTemp] = useState('');
  const [humi, setHumi] = useState('');
  const [prec, setPrec] = useState('');

  useEffect(() => {
    axios.get('/current')
      .then(res => {
        setTemp(res.temp);
        setHumi(res.humi);
        setPrec(res.prec);
      })
      .catch(err => console.log(err));
  })

  return (
    <div className="App">
      <AppNavbar />
      <Switch>
        <Route path="/result" component={Prediction} />
        <Route path="/duration" component={Duration} />
        <Route path="/" exact component={Landing} temp={temp} humi={humi} prec={prec} />
        <Redirect to="/" />
      </Switch>
    </div>
  );
}

export default App;
