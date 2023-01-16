require("@nomicfoundation/hardhat-toolbox");

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.17",
  defaultNetwork: "polygon",
  networks: {
    hardhat: {},
    polygon: {
      url: 'https://polygon-mumbai.g.alchemy.com/v2/8fOryHa1SJ4_uuLO4WfpKY1ffzgebhJU',
      accounts: ['c0df6e0154bd65736b9c446db3d613c73df85e2cc064069441274c6bac7ca961']
    }
  }
};
