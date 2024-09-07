import React, { useState, useEffect } from 'react';
import { Container, Typography, Paper, Button } from '@mui/material';
import axios from 'axios';
import Web3 from 'web3';
import { makeStyles } from '@mui/styles';
import { Link } from 'react-router-dom';
import keyImage from './key.png';

const useStyles = makeStyles((theme) => ({
 
  navbar: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '10px 20px',
    backgroundColor: '#2196f3',
    color: 'white',
  },logo: {
    fontFamily: 'Play, sans-serif',
    fontWeight: 700,
    fontStyle: 'normal',
    fontsize: 18,
  },
  logo1: {
    fontFamily: 'Play, sans-serif',
    fontWeight: 200,
    fontStyle: 'normal',
    fontsize: 12,
  },


}));
function Navbar() {
  const classes = useStyles();

  return (
    <div className={classes.navbar}>
      <div>
        <h1 className={classes.logo}>DFVote</h1>
      </div>
      <div>
        <Button component={Link} to="/admin" color="inherit">
          Admin
        </Button>
        <Button component={Link} to="/voting" color="inherit">
          Vote
        </Button>
        <Button component={Link} to="/" color="inherit">
          Home
        </Button>
      </div>
    </div>
  );
}



function Admin() {
  const [files, setFiles] = useState([]);
  const [message, setMessage] = useState('');
  const [account, setAccount] = useState('');

  useEffect(() => {
    if (window.ethereum) {
      window.ethereum.on('accountsChanged', accounts => {
        setAccount(accounts[0]);
      });
    }
  }, []);

  const handleFileChange = (e) => {
    setFiles(e.target.files);
  };

  const handleUpload = async () => {
    const formData = new FormData();
    Array.from(files).forEach(file => {
      formData.append('files', file);
    });

    try {
      const response = await axios.post('http://localhost:5000/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      setMessage(response.data.message);
    } catch (error) {
      console.error('Error uploading file:', error);
      setMessage('Error uploading file');
    }
  };

  const handleTrain = async () => {
    try {
      const response = await axios.post('http://localhost:5000/train', {
        client_id: account,
        file_path: files[0].name
      });
      setMessage(response.data.message);
    } catch (error) {
      console.error('Error starting training:', error);
      setMessage('Error starting training');
    }
  };

  const connectWallet = async () => {
    if (window.ethereum) {
      const web3 = new Web3(window.ethereum);
      try {
        await window.ethereum.request({ method: 'eth_requestAccounts' });
        const accounts = await web3.eth.getAccounts();
        setAccount(accounts[0]);
      } catch (error) {
        console.error('Error connecting wallet:', error);
        setMessage('Error connecting wallet');
      }
    } else {
      setMessage('MetaMask is not installed');
    }
  };

  return (
    <Container>
      <Navbar />
      <Paper sx={{ padding: 2, marginTop: 2 }}>
        <Typography variant="h5">Admin Panel</Typography>
        <div style={{ textAlign: 'center', marginBottom: '20px' }}>
          <img src={keyImage} alt="Key" style={{ width: '100px', marginBottom: '10px' }} />
          <br />
          {account ? (
            <>
              <Typography variant="body1">Connected account: {account}</Typography>
              <input type="file" multiple onChange={handleFileChange} />
              <Button variant="contained" color="primary" onClick={handleUpload}>
                Upload Datasets
              </Button>
              <Button variant="contained" color="secondary" onClick={handleTrain} sx={{ marginLeft: 2 }}>
                Start Training
              </Button>
            </>
          ) : (
            <Button variant="contained" color="primary" onClick={connectWallet} sx={{ marginTop: '20px' }}>
              Connect Wallet
            </Button>
          )}
        </div>
        <Typography variant="body1" sx={{ marginTop: 2 }}>{message}</Typography>
      </Paper>
    </Container>
  );
}

export default Admin;
