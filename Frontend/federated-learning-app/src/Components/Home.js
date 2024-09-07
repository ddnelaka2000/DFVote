// src/components/Home.js

import React from 'react';
import { Container, Typography, Paper, Grid } from '@mui/material';
import { makeStyles } from '@mui/styles';
import BlockchainImage from '../Bl.png'; // Replace with your blockchain image path
import VotingImage from '../Vote.png';
import { Link } from 'react-router-dom';
import { Button } from '@mui/material';
import FL from '../FL.png';
import AdminImage from '../Admin.jpg'; 



const useStyles = makeStyles({
    root: {
      padding: '20px',
      margin: '10px',
      textAlign: 'center',
    },
    imageContainer: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      flexWrap: 'wrap',
      gap: '20px',
      marginTop: '20px',
    },
    image: {
      maxWidth: '200px', // Adjust the max-width to control image size
      height: 'auto',
      transition: 'transform 0.3s ease-in-out',
      '&:hover': {
        transform: 'scale(1.1)',
      },
    },
    buttonContainer: {
      display: 'flex',
      justifyContent: 'center',
      gap: '10px',
      marginTop: '20px',
    },
    navbar: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: '25px 20px',
      backgroundColor: '#2196f3',
      color: 'white',
    },
    logo: {
      fontFamily: 'Play, sans-serif',
      fontWeight: 700,
      fontStyle: 'bold',
      fontSize: 'xx-large',
    }, image1: {
      width: '110px', 
      height: 'auto', 
    },
  });
  
  function Home() {
    const classes = useStyles();
  
    return (
      <div>
        <div className={classes.navbar}>
          <div>
          <div className={classes.logo}>DFVote</div>
          </div>
          <div>
            <Button component={Link} to="/admin" color="inherit">
              Admin
            </Button>
            <Button component={Link} to="/voting" color="inherit">
              Vote
            </Button>
          </div>
        </div>
        <div className={classes.root}>
        <div className={classes.logo}>DFVote</div>
        <br></br>
        <div className={classes.logo}>Blockchain for Federated Learning </div>
        <br></br>
          <div className={classes.buttonContainer}>
            <Button component={Link} to="/admin" variant="contained" color="secondary">
              Admin Panel
            </Button>
            <Button component={Link} to="/voting" variant="contained" color="primary">
              Vote Now
            </Button>
          </div>
          <div className={classes.imageContainer}>
            <div>
            <Link to="/admin">
              <img
                className={classes.image}
                src={AdminImage}
                alt="Admin"
              />
              </Link>
            </div>
            <div style={{ marginLeft: '20px', marginRight: '20px' }}>
            <Link to="/voting">
              <img
                className={classes.image}
                src={VotingImage}
                alt="Voting"
              />
              </Link>
            </div>
            <div>
            <Link to="/federated-learning">
              <img
                className={classes.image}
                src={FL}
                alt="Federated Learning"
              />
                 </Link>
            </div>
            <div style={{ marginLeft: '20px', marginRight: '20px' }}>
            <Link to="/blockchain">
              <img
                className={classes.image1}
                src={BlockchainImage}
                alt="Blockchain"
              />
                 </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }
  
  export default Home;