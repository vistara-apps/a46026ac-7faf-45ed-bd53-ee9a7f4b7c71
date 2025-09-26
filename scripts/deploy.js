const { ethers } = require('hardhat');

async function main() {
  console.log('Deploying TrackerToken to Base...');

  // Get the contract factory
  const TrackerToken = await ethers.getContractFactory('TrackerToken');

  // Deploy the contract
  const trackerToken = await TrackerToken.deploy();

  await trackerToken.deployed();

  console.log('TrackerToken deployed to:', trackerToken.address);

  // Verify the contract on Base
  if (process.env.ETHERSCAN_API_KEY) {
    console.log('Verifying contract...');
    try {
      await hre.run('verify:verify', {
        address: trackerToken.address,
        constructorArguments: [],
      });
      console.log('Contract verified successfully');
    } catch (error) {
      console.error('Verification failed:', error);
    }
  }

  // Save deployment info
  const deploymentInfo = {
    contractAddress: trackerToken.address,
    network: hre.network.name,
    deployer: (await ethers.getSigners())[0].address,
    deployedAt: new Date().toISOString(),
  };

  console.log('Deployment info:', deploymentInfo);

  return trackerToken.address;
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });

