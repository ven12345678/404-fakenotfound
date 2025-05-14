const hre = require("hardhat");

async function main() {
  console.log("Deploying TrueToken contract...");

  // Deploy the contract
  const TrueToken = await hre.ethers.getContractFactory("TrueToken");
  const trueToken = await TrueToken.deploy();

  await trueToken.waitForDeployment();

  const address = await trueToken.getAddress();
  console.log("TrueToken deployed to:", address);
  
  // Verify the contract on Etherscan
  if (process.env.ETHERSCAN_API_KEY) {
    console.log("Waiting for block confirmations...");
    await trueToken.deploymentTransaction().wait(6);
    
    console.log("Verifying contract on Etherscan...");
    await hre.run("verify:verify", {
      address: address,
      constructorArguments: [],
    });
    console.log("Contract verified on Etherscan");
  }

  // Save the contract address to a file
  const fs = require("fs");
  const envContent = fs.readFileSync(".env", "utf8");
  const updatedEnvContent = envContent.replace(
    /CONTRACT_ADDRESS=.*/,
    `CONTRACT_ADDRESS=${address}`
  );
  fs.writeFileSync(".env", updatedEnvContent);

  console.log("Contract address saved to .env file");
  console.log("Deployment completed successfully!");
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  }); 