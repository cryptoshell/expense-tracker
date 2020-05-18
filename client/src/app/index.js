import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { NavBar } from '../components';
import Routes from '../routes/Routes';
import 'bootstrap/dist/css/bootstrap.min.css';

const App = () => (
  <Router>
    <NavBar />
    <Routes />
  </Router>
);

export default App;
