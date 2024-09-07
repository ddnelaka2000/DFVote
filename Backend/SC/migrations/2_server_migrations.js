const CentralServer = artifacts.require("CentralServer");

module.exports = function (deployer) {
  deployer.deploy(CentralServer);
};