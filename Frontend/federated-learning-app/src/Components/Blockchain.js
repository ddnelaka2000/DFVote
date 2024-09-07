// src/components/Blockchain.js

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

function Blockchain() {
  const classes = useStyles();

  return (
    
    <Container className={classes.root}>
       <Navbar />
       <br></br>
       <br></br>
      <Typography variant="h3" align="center" className={classes.heading} gutterBottom>
        Blockchain Technology in Voting Analysis
        <br></br>
      </Typography>
      <Typography variant="body1" gutterBottom>
      Blockchain is a decentralized digital ledger that securely records transactions across a network of computers. In your voting election system, blockchain ensures transparency and security by storing hashes of IPFS-hosted model parameters. This approach guarantees that all changes to model data are traceable and tamper-proof, fostering trust in the system's integrity. 
      <br></br>
      <br></br>
      <ul>
          <li>
            <strong>Decentralization:</strong> Blockchain operates on a decentralized network of computers (nodes) that collectively maintain a shared ledger. This eliminates the need for a central authority, making transactions more transparent and resistant to censorship.
          </li>
          <li>
            <strong>Security:</strong> Transactions on a blockchain are secured using cryptographic techniques. Each block in the chain contains a hash of the previous block, creating a secure and immutable record of all transactions.
          </li>
          <li>
            <strong>Transparency and Trust:</strong> Because blockchain records are publicly accessible and cannot be altered retroactively without consensus from the network, they provide a high level of transparency and trust in data integrity.
          </li>
        </ul>
        <br></br>
        <br></br>
      IPFS, on the other hand, provides a decentralized file storage solution where model parameters can be securely stored and accessed using unique hashes. This setup enhances data resilience and availability, critical for maintaining the accuracy and reliability of voting predictions across multiple distributed voting stations. Together, blockchain and IPFS enable a robust, transparent, and decentralized framework for managing and validating voting model parameters in your federated learning system.
      </Typography>
      {/* Add more content about blockchain and its role */}
    </Container>
  );
}

export default Blockchain;
