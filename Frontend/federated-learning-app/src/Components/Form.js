// src/components/VoteForm.js

import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { makeStyles } from '@mui/styles';
import { Container, Typography, Paper, TextField, Button, Grid, Select, MenuItem, FormControl, InputLabel } from '@mui/material';
import Web3 from 'web3';

const web3 = new Web3(Web3.givenProvider || 'http://localhost:7545'); 

const contractAddress = '0xD5a94852082027037AA7834BE8973612E1d0670b'; 
const abi = [
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": true,
        "internalType": "address",
        "name": "voter",
        "type": "address"
      },
      {
        "indexed": false,
        "internalType": "string",
        "name": "name",
        "type": "string"
      },
      {
        "indexed": false,
        "internalType": "uint256",
        "name": "age",
        "type": "uint256"
      },
      {
        "indexed": false,
        "internalType": "string",
        "name": "gender",
        "type": "string"
      },
      {
        "indexed": false,
        "internalType": "string",
        "name": "region",
        "type": "string"
      },
      {
        "indexed": false,
        "internalType": "string",
        "name": "candidate",
        "type": "string"
      }
    ],
    "name": "VoteStored",
    "type": "event"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "name": "voterAddresses",
    "outputs": [
      {
        "internalType": "address",
        "name": "",
        "type": "address"
      }
    ],
    "stateMutability": "view",
    "type": "function",
    "constant": true
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "",
        "type": "address"
      }
    ],
    "name": "voters",
    "outputs": [
      {
        "internalType": "string",
        "name": "name",
        "type": "string"
      },
      {
        "internalType": "uint256",
        "name": "age",
        "type": "uint256"
      },
      {
        "internalType": "string",
        "name": "gender",
        "type": "string"
      },
      {
        "internalType": "string",
        "name": "region",
        "type": "string"
      },
      {
        "internalType": "string",
        "name": "candidate",
        "type": "string"
      }
    ],
    "stateMutability": "view",
    "type": "function",
    "constant": true
  },
  {
    "inputs": [
      {
        "internalType": "string",
        "name": "_name",
        "type": "string"
      },
      {
        "internalType": "uint256",
        "name": "_age",
        "type": "uint256"
      },
      {
        "internalType": "string",
        "name": "_gender",
        "type": "string"
      },
      {
        "internalType": "string",
        "name": "_region",
        "type": "string"
      },
      {
        "internalType": "string",
        "name": "_candidate",
        "type": "string"
      }
    ],
    "name": "storeVote",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "_voterAddress",
        "type": "address"
      }
    ],
    "name": "getVoter",
    "outputs": [
      {
        "internalType": "string",
        "name": "",
        "type": "string"
      },
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      },
      {
        "internalType": "string",
        "name": "",
        "type": "string"
      },
      {
        "internalType": "string",
        "name": "",
        "type": "string"
      },
      {
        "internalType": "string",
        "name": "",
        "type": "string"
      }
    ],
    "stateMutability": "view",
    "type": "function",
    "constant": true
  },
  {
    "inputs": [],
    "name": "getVoterAddresses",
    "outputs": [
      {
        "internalType": "address[]",
        "name": "",
        "type": "address[]"
      }
    ],
    "stateMutability": "view",
    "type": "function",
    "constant": true
  }
];

const contract = new web3.eth.Contract(abi, contractAddress);

const useStyles = makeStyles((theme) => ({
    logo1: {
        fontFamily: 'Play, sans-serif',
        fontWeight: 200,
        fontStyle: 'normal',
        fontSize: 12,
    },
}));

function Form() {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const [account, setAccount] = useState('');

    useEffect(() => {
        async function loadAccount() {
            if (window.ethereum) {
                try {
                    await window.ethereum.enable();
                    const accounts = await web3.eth.getAccounts();
                    setAccount(accounts[0]);
                } catch (error) {
                    console.error("User denied account access");
                }
            } else if (window.web3) {
                const accounts = await web3.eth.getAccounts();
                setAccount(accounts[0]);
            } else {
                console.error("Non-Ethereum browser detected. You should consider trying MetaMask!");
            }
        }

        loadAccount();
    }, []);

    const onSubmit = async (data) => {
      const gasLimit = 3000000;
        try {
            await contract.methods.storeVote(
                data.name, 
                parseInt(data.age), 
                data.gender, 
                data.region, 
                data.candidate
            ).send({ from: account , gas: gasLimit});
            console.log('Vote stored successfully:', data);
        } catch (error) {
            console.error('Error storing vote:', error);
        }
    };

    const classes = useStyles();
    return (
        <Container>
            <Paper sx={{ padding: 2, marginTop: 2 }}>
                <h1 className={classes.logo}>Vote now</h1>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <TextField
                                fullWidth
                                label="Name"
                                {...register('name', { required: 'Name is required' })}
                                error={!!errors.name}
                                helperText={errors.name ? errors.name.message : ''}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                fullWidth
                                label="Age"
                                type="number"
                                {...register('age', { required: 'Age is required', min: { value: 18, message: 'Must be at least 18 years old' } })}
                                error={!!errors.age}
                                helperText={errors.age ? errors.age.message : ''}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <FormControl fullWidth>
                                <InputLabel>Gender</InputLabel>
                                <Select
                                    {...register('gender', { required: 'Gender is required' })}
                                    error={!!errors.gender}
                                >
                                    <MenuItem value="Male">Male</MenuItem>
                                    <MenuItem value="Female">Female</MenuItem>
                                    <MenuItem value="Other">Other</MenuItem>
                                </Select>
                                {errors.gender && <Typography variant="caption" color="error">{errors.gender.message}</Typography>}
                            </FormControl>
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                fullWidth
                                label="Region"
                                {...register('region', { required: 'Region is required' })}
                                error={!!errors.region}
                                helperText={errors.region ? errors.region.message : ''}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <FormControl fullWidth>
                                <InputLabel>Candidate</InputLabel>
                                <Select
                                    {...register('candidate', { required: 'Candidate selection is required' })}
                                    error={!!errors.candidate}
                                >
                                    <MenuItem value="A">A</MenuItem>
                                    <MenuItem value="B">B</MenuItem>
                                    <MenuItem value="C">C</MenuItem>
                                </Select>
                                {errors.candidate && <Typography variant="caption" color="error">{errors.candidate.message}</Typography>}
                            </FormControl>
                        </Grid>
                        <Grid item xs={12}>
                            <Button variant="contained" color="primary" type="submit">
                                Vote
                            </Button>
                        </Grid>
                    </Grid>
                </form>
            </Paper>
        </Container>
    );
}

export default Form;
