// src/components/Vote.js

import React from 'react';
import { Container, Typography, Paper } from '@mui/material';
import VoteForm from './Form';
import { makeStyles } from '@mui/styles';
import { Link } from 'react-router-dom';
import { Button } from '@mui/material';
const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    padding: '20px',
      margin: '10px',
      textAlign: 'center',
    background: 'linear-gradient(to right bottom, #4e54c8, #8f94fb)', 
    borderRadius: 10,
    color: 'white',
  },
  navbar: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '10px 20px',
    backgroundColor: '#2196f3',
    color: 'white',
  },
  logo: {
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


function Vote() {
  const classes = useStyles();

  return (
    <Container>
      <Navbar />
      <Paper sx={{ padding: 2, marginTop: 2 }}>
      
       < div className={classes.logo}>
          Please enter your details and vote for your preferred candidate.
          </div>
        <VoteForm />
      </Paper>
    </Container>
  );
}

export default Vote;
