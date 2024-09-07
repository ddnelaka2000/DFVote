// src/App.js

import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './Components/Home';
import Blockchain from './Components/Blockchain';
import FederatedLearning from './Components/FederatedLearning';
import Admin from './Components/Admin';
import Vote from './Components/Vote'; 
import { ThemeProvider, createTheme } from '@mui/material/styles';

const theme = createTheme({
 
    palette: {
        mode: 'light',
    },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
    <Router>
    <Routes>
      <Route exact path="/" element={<Home />} />
      <Route path="/blockchain" element={<Blockchain />} />
      <Route path="/federated-learning" element={<FederatedLearning />} />
      <Route path="/admin" element={<Admin />} />
      <Route path="/voting" element={<Vote />} />
    </Routes>
  </Router>
  </ThemeProvider>
  );
}

export default App;
