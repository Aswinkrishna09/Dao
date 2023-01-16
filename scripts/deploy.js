const hre = require("hardhat");

async function main() {
  const OrphanFindZone = await hre.ethers.getContractFactory("OrphanFindZone");
  const orphanFindZone = await OrphanFindZone.deploy();

  await orphanFindZone.deployed();
  console.log("OrphanFindZone deployed at " + orphanFindZone.address);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
