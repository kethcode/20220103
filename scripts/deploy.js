
const delay = ms => new Promise(res => setTimeout(res, ms));

const main = async () => {
    
    const [deployer] = await ethers.getSigners();

    const tokenFactory = await ethers.getContractFactory("SoladayToken");
    const tokenContract = await tokenFactory.deploy();
    await tokenContract.deployed();

    const registryFactory = await ethers.getContractFactory("SoladayRegistry");
    const registryContract = await registryFactory.deploy(tokenContract.address);
    await registryContract.deployed();

    console.log("Token Contract:   ", tokenContract.address);
    console.log("Registry Contract:", registryContract.address);
    console.log("Deployer:         ", deployer.address);

    console.log("Waiting for bytecode to propogate (60sec)");
    await delay(60000);

    console.log("Verifying on Etherscan");

    await hre.run("verify:verify", {
        address: registryContract.address,
      });

    console.log("Verified on Etherscan");

    let txn = await registryContract.registerDeployment(registryContract.address, deployer.address)
    await txn.wait();
    console.log("SoladayRegistry deployed and registered");

};

const runMain = async () => {
    try {
        await main();
        process.exit(0);
    } catch (error) {
        console.log(error);
        process.exit(1);
    }
};

runMain();