// SPDX-License-Identifier: MIT
pragma solidity ^0.8.17;

contract VotingContract {
    struct Voter {
        string name;
        uint256 age;
        string gender;
        string region;
        string candidate;
    }

    mapping(address => Voter) public voters;
    address[] public voterAddresses;

    event VoteStored(address indexed voter, string name, uint256 age, string gender, string region, string candidate);

    function storeVote(string memory _name, uint256 _age, string memory _gender, string memory _region, string memory _candidate) public {
        voters[msg.sender] = Voter(_name, _age, _gender, _region, _candidate);
        voterAddresses.push(msg.sender);
        
        emit VoteStored(msg.sender, _name, _age, _gender, _region, _candidate);
    }

    function getVoter(address _voterAddress) public view returns (string memory, uint256, string memory, string memory, string memory) {
        Voter memory voter = voters[_voterAddress];
        require(bytes(voter.name).length > 0, "No voter found");
        return (voter.name, voter.age, voter.gender, voter.region, voter.candidate);
    }

    function getVoterAddresses() public view returns (address[] memory) {
        return voterAddresses;
    }
}