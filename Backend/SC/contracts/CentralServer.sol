pragma solidity ^0.8.17;

contract CentralServer {

   string public ipfsHash;

    function storeIPFSHash(string memory _ipfsHash) public {
        ipfsHash = _ipfsHash;
    }
}