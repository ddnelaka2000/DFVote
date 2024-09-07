// src/components/FederatedLearning.js

import React from 'react';
import { Container, Typography } from '@mui/material';
import { makeStyles } from '@mui/styles';
import { Link } from 'react-router-dom';
import { Button } from '@mui/material';
const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    padding: '20px',
      margin: '10px',
      textAlign: 'center',
    background: 'linear-gradient(to right bottom, #4e54c8, #8f94fb)', // Light blue gradient background
 
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
function FederatedLearning() {
  const classes = useStyles();

  return (
    <Container className={classes.root}>
      <Navbar />
      <Typography variant="h3" align="center" className={classes.heading} gutterBottom>
        Federated Learning for Voting Analysis
        <br></br>
       
       <br></br>
      </Typography>
      <Typography variant="body1" gutterBottom>
      Federated learning is a way to train machine learning models using data that is stored locally on different devices or servers, like smartphones or voting station computers. Instead of sending all the data to a central server, which can raise privacy concerns, federated learning sends only the updated model parameters (the things that make the model work better) back and forth between the central server and the local devices. This way, each device can improve its own model without sharing its private data, like personal voting details, making it more secure and private
      <br></br>
      <br></br>
      <ul>
          <li>
            <strong>Decentralized Training:</strong> Federated learning enables model training on data distributed across multiple voting stations without centrally aggregating sensitive voter information. This preserves data privacy and security.
          </li>
          <br></br>
          <li>
            <strong>Efficient Model Updates:</strong> By aggregating model updates locally at each station and transmitting only model parameters (not raw data) to a central server, federated learning reduces communication costs and latency.
          </li>
          <li>
          <br></br>
            <strong>Scalability:</strong> Federated learning is scalable across a large number of voting stations, allowing the global model to be trained on diverse and extensive datasets while maintaining local autonomy.
          </li>
          <br></br>
          <li>
            <strong>Data Privacy:</strong> With federated learning, sensitive voter data remains localized and is not transmitted in its raw form, mitigating privacy concerns and adhering to data protection regulations.
          </li>
        </ul>
      </Typography>
      {/* Add more content about federated learning and its role */}
    </Container>
  );
}

export default FederatedLearning;
