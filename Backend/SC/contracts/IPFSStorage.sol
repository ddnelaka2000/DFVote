pragma solidity ^0.8.17;


contract IPFSStorage {
    mapping(string => string) public ipfsHashes;
    string[] public clients;

    // Function to store IPFS hash with client ID
    function storeHash(string memory clientId, string memory ipfsHash) public {
        require(bytes(ipfsHash).length > 0, "IPFS hash must not be empty");
        ipfsHashes[clientId] = ipfsHash;
        clients.push(clientId);
    }

    // Function to retrieve IPFS hash for a client
    function getHash(string memory clientId) public view returns (string memory) {
        return ipfsHashes[clientId];
    }

    // Function to get all registered client keys
    function getRegisteredClients() public view returns (string[] memory) {
        return clients;
    }
}