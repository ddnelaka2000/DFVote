import pandas as pd
import torch
import requests
from web3 import Web3
# Pinata credentials
PINATA_API_KEY = '6cdb21ead5451ddb9a89'
PINATA_API_SECRET = 'c9e7cec4981203c0f58395aecd7ca67e6e193688ad2bf137facf438be3283fe9'

ganache_url = "http://127.0.0.1:7545"
web3 = Web3(Web3.HTTPProvider(ganache_url))
web3.eth.defaultAccount = web3.eth.accounts[0]

contract_address = "0xe82bf548bA64f8C0243dD9a24EB9c28977517821"
contract_abi = [
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "name": "clients",
      "outputs": [
        {
          "internalType": "string",
          "name": "",
          "type": "string"
        }
      ],
      "stateMutability": "view",
      "type": "function",
      "constant": True
    },
    {
      "inputs": [
        {
          "internalType": "string",
          "name": "",
          "type": "string"
        }
      ],
      "name": "ipfsHashes",
      "outputs": [
        {
          "internalType": "string",
          "name": "",
          "type": "string"
        }
      ],
      "stateMutability": "view",
      "type": "function",
      "constant": True
    },
    {
      "inputs": [
        {
          "internalType": "string",
          "name": "clientId",
          "type": "string"
        },
        {
          "internalType": "string",
          "name": "ipfsHash",
          "type": "string"
        }
      ],
      "name": "storeHash",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "string",
          "name": "clientId",
          "type": "string"
        }
      ],
      "name": "getHash",
      "outputs": [
        {
          "internalType": "string",
          "name": "",
          "type": "string"
        }
      ],
      "stateMutability": "view",
      "type": "function",
      "constant": True
    },
    {
      "inputs": [],
      "name": "getRegisteredClients",
      "outputs": [
        {
          "internalType": "string[]",
          "name": "",
          "type": "string[]"
        }
      ],
      "stateMutability": "view",
      "type": "function",
      "constant": True
    }
  ]
#creating the contract instance
contract = web3.eth.contract(address=contract_address, abi=contract_abi)

#loading data function
def load_data(file_path):
    df = pd.read_csv(file_path, index_col=0)
    print("read",df)
    target_column = 'candidate'
    if target_column not in df.columns:
        raise ValueError(f"Target column '{target_column}' not found in the dataset")
    
    bool_columns = df.select_dtypes(include=bool).columns
    df[bool_columns] = df[bool_columns].astype(int)
    
    categorical_columns = ['gender', 'region']
    df = pd.get_dummies(df, columns=categorical_columns, drop_first=True)
    
    X = df.drop(columns=[target_column]).values.astype('float32')
    y = df[target_column].astype('category').cat.codes.values
    print("x",X)
    print("y",y)
    
    return X, y


#uploading parameters to IPFS function
def pin_to_ipfs(params):
    url = "https://api.pinata.cloud/pinning/pinJSONToIPFS"
    headers = {
        "Content-Type": "application/json",
        "pinata_api_key": PINATA_API_KEY,
        "pinata_secret_api_key": PINATA_API_SECRET
    }
    response = requests.post(url, json=params, headers=headers)
    ipfs_hash = response.json()['IpfsHash']
    print("IPFS hash:", ipfs_hash)
    return ipfs_hash


#saving the hash to blockchain with the respective client addresses
def save_to_blockchain(client_id,ipfs_hash):
    # Interact with smart contract to save IPFS hash
    tx_hash = contract.functions.storeHash(client_id, ipfs_hash).transact({'from': web3.eth.defaultAccount, 'gas': 500000})
    receipt = web3.eth.get_transaction_receipt(tx_hash)
    print("Transaction receipt:", receipt)
 
    print("Transaction hash:", tx_hash.hex())    
    
    clients = contract.functions.getRegisteredClients().call({
            'from': web3.eth.accounts[0]

        })
    print("registered clients",clients)

def get_parameters(model):
    return {k: v.tolist() for k, v in model.state_dict().items()}

def set_parameters(model, params):
    state_dict = {k: torch.tensor(v) for k, v in params.items()}
    model.load_state_dict(state_dict)
