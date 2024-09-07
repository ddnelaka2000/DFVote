// Import the contract artifacts
const VotingContract = artifacts.require("VotingContract");

contract("VotingContract", (accounts) => {
  let votingContract;

  before(async () => {
    // Deploy the contract before each test
    votingContract = await VotingContract.new();
  });

  it("should store and retrieve a vote correctly", async () => {
    const voterAddress = accounts[0];
    const name = "Alice";
    const age = 30;
    const gender = "Female";
    const region = "East";
    const candidate = "Candidate A";

    // Call the storeVote function
    await votingContract.storeVote(name, age, gender, region, candidate, { from: voterAddress });

    // Retrieve voter details and assert they match the stored values
    const voterDetails = await votingContract.getVoter(voterAddress);
    assert.equal(voterDetails[0], name, "Stored name does not match");
    assert.equal(voterDetails[1], age, "Stored age does not match");
    assert.equal(voterDetails[2], gender, "Stored gender does not match");
    assert.equal(voterDetails[3], region, "Stored region does not match");
    assert.equal(voterDetails[4], candidate, "Stored candidate does not match");
  });


  it("should return correct list of voter addresses", async () => {
    const voterAddress1 = accounts[1];
    const voterAddress2 = accounts[2];

    // Store votes for two different addresses
    await votingContract.storeVote("Bob", 25, "Male", "West", "Candidate B", { from: voterAddress1 });
    await votingContract.storeVote("Carol", 40, "Female", "North", "Candidate C", { from: voterAddress2 });

    // Retrieve the list of voter addresses
    const voterAddresses = await votingContract.getVoterAddresses();

    // Assert that both addresses are returned and the previously inserted
    assert.equal(voterAddresses.length, 3, "Number of voter addresses returned is incorrect");
    assert.include(voterAddresses, voterAddress1, "Voter address 1 not found in list");
    assert.include(voterAddresses, voterAddress2, "Voter address 2 not found in list");
  });



});
