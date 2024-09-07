const IPFSStorage = artifacts.require("IPFSStorage");

contract("IPFSStorage", (accounts) => {
  let ipfsStorage;

  before(async () => {
    ipfsStorage = await IPFSStorage.deployed();
  });

  it("should store and retrieve IPFS hash correctly", async () => {
    const clientAddress = accounts[0];
    const ipfsHash = "QmXjXYM9Xt43f7a2zh41K8QRKzRKVQxQifmXKr2yGTk5hU";

    await ipfsStorage.storeHash(ipfsHash, { from: clientAddress });

    const storedHash = await ipfsStorage.getHash(clientAddress);
    assert.equal(storedHash, ipfsHash, "Stored hash does not match");

    // Additional assertions can be added to ensure correct event emission and state changes
  });

  it("should handle non-existent hash retrieval", async () => {
    const nonExistentClient = accounts[1];

    try {
      await ipfsStorage.getHash(nonExistentClient);
      assert.fail("Expected revert not received");
    } catch (error) {
      assert(error.message.includes("No hash found"), "Error message does not match expected");
    }
  });
});
