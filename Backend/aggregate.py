import torch
import torch.nn as nn
import requests
from model import Net
from utils import set_parameters
from web3 import Web3


PINATA_API_KEY = '6cdb21ead5451ddb9a89'
PINATA_API_SECRET = 'c9e7cec4981203c0f58395aecd7ca67e6e193688ad2bf137facf438be3283fe9'

# Blockchain setup
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

# Contract instance
contract = web3.eth.contract(address=contract_address, abi=contract_abi)


#function to fetch the IPFS hashes from the blockchain
def fetch_ipfs_hashes_from_blockchain():
    ipfs_hashes = []
    print("Fetching IPFS hashes from blockchain", web3.eth.accounts[0])
    
    # Call the contract function to get registered clients
    clients = contract.functions.getRegisteredClients().call()
    print("clients", clients)
    
    for client in clients:
        # Check if client is a string
        if isinstance(client, str):
            # Call the contract function to get IPFS hash for each client
            ipfs_hash = contract.functions.getHash(client).call()
            print(f"IPFS hash for client {client}: {ipfs_hash}")
            if ipfs_hash:
                ipfs_hashes.append(ipfs_hash)
            else:
                print(f"No IPFS hash found for client {client}")
        else:
            print(f"Client ID {client} is not a string. Skipping.")
    
    print("ipfs_hashes", ipfs_hashes)
    return ipfs_hashes


#function to fetch the parameters from IPFS
def fetch_parameters_from_ipfs(ipfs_hash):
    url = f"https://gateway.pinata.cloud/ipfs/{ipfs_hash}"
    response = requests.get(url)
    
    # Print the response for debugging
    print("Response from IPFS:", response.text[:100])  # Print first 100 chars

    if response.status_code == 200:
        try:
            params_json = response.json()
            # Convert the JSON parameters to a state_dict
            state_dict = {k: torch.tensor(v) for k, v in params_json.items()}
            return state_dict
        except Exception as e:
            print(f"Failed to load parameters from IPFS: {e}")
            return None
    else:
        print(f"Failed to fetch from IPFS. Status code: {response.status_code}")
        return None


#function to average the parameters after training 
def average_parameters(param_list):
    """Average the parameters of a list of models."""
    avg_params = {}
    for key in param_list[0]:
        avg_params[key] = torch.stack([params[key] for params in param_list], dim=0).mean(dim=0)
    return avg_params

def evaluate(server_round, parameters, config):
    pass

def fit_config(server_round):
    return {"batch_size": 32, "epochs": 1}


def main():
    ipfs_hashes = fetch_ipfs_hashes_from_blockchain()  # IPFS hashes retrieved from blockchain
    
    if not ipfs_hashes:
        print("No IPFS hashes found.")
        return
    
    params_list = []
    for h in ipfs_hashes:
        if h:  # Check if the hash is not empty
            params = fetch_parameters_from_ipfs(h)
            if params:
                params_list.append(params)
        else:
            print(f"Empty IPFS hash encountered: {h}")
    
    if not params_list:
        print("No valid parameters fetched from IPFS.")
        return

    # Average the parameters
    avg_params = average_parameters(params_list)
    print("Averaged parameters:", avg_params)
    
    
    model = Net()
    set_parameters(model, avg_params)

if __name__ == "__main__":
    main()
