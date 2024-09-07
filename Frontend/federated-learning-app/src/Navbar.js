import React from 'react';
import { AppBar, Toolbar, Typography, Button } from '@mui/material';
import { Link } from 'react-router-dom';

function Navbar() {
  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" sx={{ flexGrow: 1 }}>
          Federated Learning System
        </Typography>
        <Button color="inherit" component={Link} to="/">Home</Button>
        <Button color="inherit" component={Link} to="/admin">Admin</Button>
        <Button color="inherit" component={Link} to="/vote">Vote</Button>
      </Toolbar>
    </AppBar>
  );
}

export default Navbar;
